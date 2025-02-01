import { config } from "./config"

interface TurnstileVerifyResponse {
  success: boolean
  "error-codes": string[]
  challenge_ts: string
  hostname: string
}

export async function verifyTurnstileToken(token: string) {
  const response = await fetch(config.turnstileVerifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: config.turnstileSecretKey,
      response: token,
    }),
  })

  return response.json() as Promise<TurnstileVerifyResponse>
}
