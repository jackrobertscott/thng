import config from '@/config'
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns'
/**
 *
 */
const client = new SNSClient({
  region: 'us-east-1',
})
/**
 *
 */
export const textMessage = {
  /**
   *
   */
  async send({
    to,
    from = config.appName,
    message,
  }: {
    to: string
    from?: string
    message: string
  }) {
    return client.send(
      new PublishCommand({
        Message: message,
        PhoneNumber: to, // E.164 phone number
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: from,
          },
        },
      })
    )
  },
}
