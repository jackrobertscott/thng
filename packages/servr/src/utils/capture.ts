import {StatusCodes, getReasonPhrase} from 'http-status-codes'
import {IncomingMessage} from 'http'
import {send, RequestHandler} from 'micro'
import config from '@/config'
/**
 *
 */
export default {
  /**
   *
   */
  handle(handler: RequestHandler): RequestHandler {
    return async (req, res) => {
      try {
        const data = await handler(req, res)
        if (
          data !== undefined &&
          typeof data !== 'object' &&
          !Array.isArray(data)
        ) {
          const message = `Request handler may only return an object or an array but got ${typeof data}.`
          throw new Error(message)
        }
        return data
      } catch (error) {
        if (typeof error === 'string') error = new Error(error)
        const pretty = this.pretty(error, req)
        if (config.debug) console.log(pretty)
        send(res, pretty.code, pretty)
      }
    }
  },
  /**
   *
   */
  pretty(error: any = {}, req: IncomingMessage) {
    let code = error.statusCode || error.code
    code = code
      ? code
      : error.name === 'ValidationError'
      ? StatusCodes.UNPROCESSABLE_ENTITY
      : StatusCodes.INTERNAL_SERVER_ERROR
    let status: string = ''
    try {
      status = getReasonPhrase(code)
    } catch (e) {}
    let stack =
      typeof error.stack === 'string' &&
      error.stack.split('\n').map((i: string) => i.trim())
    return {
      code,
      url: req.url,
      status,
      message: error.message,
      line: stack[1],
    }
  },
}
