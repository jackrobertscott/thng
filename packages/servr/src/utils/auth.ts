import {StatusCodes} from 'http-status-codes'
/**
 *
 */
export class UnauthedError extends Error {
  code: number
  constructor(message?: string) {
    super(message)
    this.code = StatusCodes.UNAUTHORIZED
  }
}
