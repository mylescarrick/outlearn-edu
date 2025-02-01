/**
 * A helper for environment variables & settings
 */

import dotenv from "dotenv"
import env from "env-var"
import { pick } from "remeda"

dotenv.config()

export const config = {
  baseUrl: env.get("BASE_URL").asString() || "http://localhost:5173",
  environment: env.get("NODE_ENV").asString() || "development",

  // Sessions (main)
  sessionSecret:
    env.get("SESSION_SECRET").asString() ||
    "cheacivifelabaNgoozahp3iongoofieShevae3D",
  sessionCookieName: env.get("SESSION_COOKIE_NAME").asString() || "outlearn",

  // Email
  defaultEmailFrom: env.get("EMAIL_FROM").asString() || "ict@knox.nsw.edu.au",
  smtpHost: env.get("SMTP_HOST").required().asString(),
  smtpPort: env.get("SMTP_PORT").required().asIntPositive(),
  smtpUsername: env.get("SMTP_USERNAME").required().asString(),
  smtpPassword: env.get("SMTP_PASSWORD").required().asString(),

  // Cloudflare Turnstile
  turnstileSiteKey: env.get("TURNSTILE_SITE_KEY").required().asString(),
  turnstileSecretKey: env.get("TURNSTILE_SECRET_KEY").required().asString(),
  turnstileVerifyUrl:
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
}

// "client" configs must be safe to be externally shared

// i.e. should be nothing that would allow access to data
const clientConfigKeys = ["baseUrl", "environment", "turnstileSiteKey"] as const

export const loadClientConfig = () => pick(config, clientConfigKeys)
