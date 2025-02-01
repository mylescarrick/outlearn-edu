import { render } from "@react-email/render"
import nodemailer from "nodemailer"
import type { SendMailOptions, Transporter } from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import type { ReactElement } from "react"
import { config } from "~/lib/config"

// Types
type EmailAddress = string
type ApiResponse = {
  messageId: string
  accepted: string[]
  rejected: string[]
  response: string
  error?: Error
}

interface SendEmailOptions {
  to: EmailAddress[]
  subject: string
  html?: string
  text?: string
  cc?: EmailAddress[]
  bcc?: EmailAddress[]
  sender?: EmailAddress
  customHeaders?: Record<string, string>[]
  attachments?: Array<{
    filename: string
    content: string | Buffer
    contentType?: string
    cid?: string
  }>
  live?: boolean
}

interface NodemailerConfig {
  host: string
  port: number
  secure?: boolean
  auth?: {
    user: string
    pass: string
  }
  tls?: {
    ciphers?: string
  }
}

// Configuration
const mockConfig: NodemailerConfig = {
  host: "localhost",
  port: 1025,
  secure: false,
}

const prodConfig: NodemailerConfig = {
  host: config.smtpHost,
  port: config.smtpPort,
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
}

// Transporters
let mockTransporter: Transporter<SMTPTransport.SentMessageInfo>
let prodTransporter: Transporter<SMTPTransport.SentMessageInfo>

const getTransporter = (options: { live?: boolean } = { live: false }) => {
  const useProd = process.env.NODE_ENV === "production" || options.live

  if (useProd) {
    if (!prodTransporter) {
      prodTransporter = nodemailer.createTransport(prodConfig)
    }
    return prodTransporter
  }

  if (!mockTransporter) {
    mockTransporter = nodemailer.createTransport(mockConfig)
  }
  return mockTransporter
}

const transformCustomHeaders = (
  headers: Record<string, string>[]
): { key: string; value: string }[] => {
  return headers.flatMap((header) =>
    Object.entries(header).map(([key, value]) => ({
      key,
      value,
    }))
  )
}

export async function sendEmail(
  options: SendEmailOptions
): Promise<ApiResponse> {
  const sender = options.sender || config.defaultEmailFrom

  try {
    const transport = getTransporter({ live: options.live })

    const mailOptions: SendMailOptions = {
      from: sender,
      to: options.to.join(", "),
      subject: options.subject,
      html: options.html,
      text: options.text,
      ...(options.cc && { cc: options.cc.join(", ") }),
      ...(options.bcc && { bcc: options.bcc.join(", ") }),
      ...(options.customHeaders && {
        headers: transformCustomHeaders(options.customHeaders),
      }),
      ...(options.attachments && { attachments: options.attachments }),
    }

    const result = await transport.sendMail(mailOptions)

    return {
      messageId: result.messageId,
      accepted: result.accepted.map((addr) =>
        typeof addr === "string" ? addr : addr.address
      ),
      rejected: result.rejected.map((addr) =>
        typeof addr === "string" ? addr : addr.address
      ),
      response: result.response,
    }
  } catch (error) {
    return {
      messageId: "",
      accepted: [],
      rejected: options.to,
      response: "",
      error: error as Error,
    }
  }
}

export async function sendReactEmail(
  emailContent: ReactElement,
  options: Omit<SendEmailOptions, "html" | "text">
): Promise<ApiResponse> {
  const [html, text] = await Promise.all([
    render(emailContent, { pretty: true }),
    render(emailContent, { plainText: true }),
  ])

  return sendEmail({
    ...options,
    html,
    text,
  })
}

// Types export
export type { SendEmailOptions, NodemailerConfig, ApiResponse }
