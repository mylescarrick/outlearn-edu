#!/usr/bin/env bun
import { exec } from "child_process"
import { promises as fs } from "fs"
import * as util from "util"
import type { Client } from "@1password/sdk"
import { createClient } from "@1password/sdk"
import { remember } from "@epic-web/remember"

const execPromise = util.promisify(exec)

// Main function to set secrets in Fly
const main = async (): Promise<void> => {
  await checkRequirements()

  const secrets = await loadEncodedSecrets(process.env.ENV_FILE_PATH!)
  console.log(`Loaded ${secrets.length} secret(s)…`)

  const client = await createOPClient()

  const decodedSecrets = await decodeSecrets(client, secrets)
  // log last 4 characters of each secret for debugging
  console.debug(
    "Decoded secrets…",
    Object.fromEntries(
      Object.entries(decodedSecrets).map(([key, value]) => [
        key,
        `…${value.slice(0, 4)}`,
      ])
    )
  )
  console.log("Now to set secrets…")
  await setFlySecrets(decodedSecrets)
  console.log("Secrets set. Done.")
  // safely exit
  process.exit(0)
}

// authenticate with OP
const createOPClient = () =>
  remember("op-client", async () => {
    try {
      console.log("Creating OP client…")
      const client = await createClient({
        auth: process.env.OP_SERVICE_ACCOUNT_TOKEN || "",
        integrationName: "knox-tools-secrets",
        integrationVersion: "0.0.1",
      })
      console.log("OP client created…")
      return client
    } catch (error) {
      console.error("Failed to create OP client:", error)
      throw error
    }
  })

// check required things
// env vars: OP_SERVICE_ACCOUNT_TOKEN, ENV_FILE_PATH, FLY_PROJECT_NAME
// file: ENV_FILE_PATH
// fly cli: installed
const checkRequirements = async () => {
  if (!process.env.OP_SERVICE_ACCOUNT_TOKEN) {
    throw new Error("OP_SERVICE_ACCOUNT_TOKEN is required")
  }

  if (!process.env.ENV_FILE_PATH) {
    throw new Error("ENV_FILE_PATH is required")
  }

  if (!process.env.FLY_PROJECT_NAME) {
    throw new Error("FLY_PROJECT_NAME is required")
  }

  try {
    await fs.access(process.env.ENV_FILE_PATH)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`Could not access ${process.env.ENV_FILE_PATH}`)
  }

  try {
    await execPromise("flyctl version")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("fly CLI (flyctl) not found")
  }

  console.log("Requirements met…")
}

// load the file and split into clean key-value pairs
// assume we've already checked the file at ENV_FILE_PATH exists
// trim all values, remove comments, and split on '=', trimming both sides
type EncodedSecret = { key: string; encodedValue: string }
const loadEncodedSecrets = async (
  filePath: string
): Promise<EncodedSecret[]> => {
  const fileStream = await fs.readFile(filePath)
  return fileStream
    .toString()
    .split("\n")
    .reduce<EncodedSecret[]>((secrets, line) => {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith("#")) return secrets

      const [key, ...valueParts] = trimmedLine.split("=")
      const encodedValue = valueParts.join("=").trim()

      if (!key?.trim() || !encodedValue) return secrets

      return [...secrets, { key: key.trim(), encodedValue }]
    }, [])
}

// decode a pair of key and encoded value
// if it doesn't start with 'op:', return the value as-is
// otherwise, decode the value from 1Password
const decodeSecret = async (
  client: Client,
  { key, encodedValue }: EncodedSecret
): Promise<string> => {
  if (!encodedValue.startsWith("op:")) return encodedValue

  const secret = await client.secrets.resolve(encodedValue)

  if (!secret) {
    throw new Error(`No password found for ${key}`)
  }

  return secret
}

// decode all secrets
const decodeSecrets = async (
  client: Client,
  secrets: EncodedSecret[]
): Promise<Record<string, string>> => {
  const decodedSecrets = await Promise.all(
    secrets.map(async (secret) => ({
      key: secret.key,
      value: await decodeSecret(client, secret),
    }))
  )

  return decodedSecrets.reduce<Record<string, string>>(
    (acc, { key, value }) => {
      acc[key] = value
      return acc
    },
    {}
  )
}
type DecodedSecrets = Awaited<ReturnType<typeof decodeSecrets>>

export const setFlySecrets = async (decodedSecrets: DecodedSecrets) => {
  // join the secrets together as SECRET=VALUE SECRET=VALUE
  const secretSetString = Object.entries(decodedSecrets)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ")
  console.log("Setting secrets…")
  const command = `flyctl secrets set ${secretSetString} --app ${process.env.FLY_PROJECT_NAME} --detach`
  await execPromise(command)
}

await main()
