import {config} from '@/config'
/**
 *
 */
export const radio = {
  /**
   *
   */
  async send(path: string, payload?: any, token?: string) {
    return fetch(`${config.urlServer}${path}`, {
      method: 'POST',
      body: JSON.stringify({
        payload,
        createdOn: Date.now(),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
    }).then(this.handleResponse)
  },
  /**
   *
   */
  async multipart(path: string, payload?: FormData, token?: string) {
    return fetch(`${config.urlServer}${path}`, {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: token ?? '',
      },
    }).then(this.handleResponse)
  },
  /**
   *
   */
  async handleResponse(i: Response) {
    if (i.status === 204) return undefined
    if (i.status >= 200 && i.status < 300) {
      if (i.headers.get('Content-Type')?.startsWith('application/json'))
        return i.json()
      return i.blob()
    }
    const payload = await i.json()
    const error = new Error(payload.message ?? 'Server request failed.') as any
    error.code = i.status
    throw error
  },
}
