import 'module-alias/register'
import micro, {RequestHandler} from 'micro'
import cors from '@/utils/cors'
import capture from '@/utils/capture'
import prerequest from '@/utils/prerequest'
import config from '@/config'
import ends from '@/ends'
/**
 *
 */
const handler: RequestHandler = async (req, res) => {
  if (!req.url) throw new Error('Request url required.')
  if (!ends.has(req.url)) throw new Error(`Url ${req.url} is not supported.`)
  const data = await ends.get(req.url)?.(req, res)
  // return "false" to prevent micro sending response
  // return "null" instead of "undefined" to end request
  return data === false ? undefined : data ?? null
}
const $ = cors({origin: config.urlClient})(capture.handle(prerequest(handler)))
export default (micro($) as any).listen(config.port, () => {
  console.log(`1️⃣  Server: http://localhost:${config.port}`)
  console.log(`2️⃣  Environment: ${config.env}`)
  console.log(`3️⃣  Debug: ${config.debug ? 'on' : 'off'}`)
})
