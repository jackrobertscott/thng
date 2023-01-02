import {SESv2Client, SendEmailCommand} from '@aws-sdk/client-sesv2'
import config from '@/config'
/**
 *
 */
const client = new SESv2Client({
  region: 'us-east-1',
})
/**
 *
 */
export const mail = {
  /**
   *
   */
  async send({
    to,
    cc,
    bcc,
    fromName = config.appName,
    fromEmail = config.AWSFromEmail,
    subject,
    text,
    html,
    reply,
  }: {
    to: string[]
    cc?: string[]
    bcc?: string[]
    fromName?: string
    fromEmail?: string
    subject: string
    text?: string
    html?: string
    reply?: string
  }) {
    return client.send(
      new SendEmailCommand({
        FromEmailAddress: `${fromName} <${fromEmail}>`,
        Destination: {
          ToAddresses: to,
          CcAddresses: cc,
          BccAddresses: bcc,
        },
        Content: {
          Simple: {
            Subject: {Data: subject},
            Body: html ? {Html: {Data: html}} : {Text: {Data: text}},
          },
        },
        ReplyToAddresses: reply ? [reply] : undefined,
      })
    )
  },
}
