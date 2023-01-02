// @ts-ignore
const env = import.meta.env
/**
 *
 */
export interface TBrowserConfig {
  urlClient: string
  urlServer: string
  prefix: string
  title: string
}
/**
 *
 */
export const config: TBrowserConfig = {
  urlClient: env.VITE_URL_CLIENT,
  urlServer: env.VITE_URL_SERVER,
  prefix: 'thng',
  title: 'thng',
}
