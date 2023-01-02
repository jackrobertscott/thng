import {ServerResponse} from 'http'
import {Readable} from 'stream'
import puppeteer from 'puppeteer'
/**
 *
 */
export const pdf = {
  /**
   *
   */
  async create(printUrl: string) {
    const browser = await puppeteer.launch()
    const browserPage = await browser.newPage()
    await browserPage.goto(printUrl, {
      waitUntil: ['networkidle0', 'networkidle2'],
    })
    const buffer = await browserPage.pdf({
      format: 'A4',
      margin: {top: 96, bottom: 96},
      displayHeaderFooter: true,
      footerTemplate: '<div></div>',
      headerTemplate: `
      <style>
        html {-webkit-print-color-adjust: exact;}
        #header, #footer {margin: 0;padding: 0;}
      </style>
      <div style="background-color: red;margin: 0;height: 96px;width: 100%;"></div>
    `,
    })
    await browser.close()
    return buffer
  },
  /**
   *
   */
  send(res: ServerResponse, buffer: Buffer) {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    })
    Readable.from(buffer).pipe(res)
  },
}
