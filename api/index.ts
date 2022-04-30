import 'dotenv/config'
import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'
import express from 'express'
import type { Request, Response } from 'express'
import urlMetadata from 'url-metadata'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const IS_DEV = process.env.NODE_ENV === 'development'

const getHtml = (params: { title?: string; description?: string; color?: string; }) => {
  const title = params.title || '웹 개발자 Kidow'
  const description = params.description || '더 게으르게 일하기 위해, 더 부지런히 공부하는 개발자가 되고 싶습니다.'
  const color = params.color || '#171717'
  return `
      <!DOCTYPE html>
    <html>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
            Pretendard, Roboto, 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic',
            sans-serif;
          background: #fff;
          color: #2f363d;
        }
        body {
          margin: 0;
          word-break: keep-all;
          padding: 5rem;
        }
        .container {
          width: 1040px;
          height: 600px;
        }
        .box {
          display: flex;
          gap: 10rem;
        }
        .box-left {
          flex: 1;
        }
        .logo {
          width: 150px;
        }
        .ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .title {
          color: #2f363d;
          font-size: 5rem;
          font-weight: bold;
          line-height: 1.2;
          margin-bottom: 1.8rem;
          max-height: 192px;
        }
        .description {
          color: #6e7681;
          font-size: 2.1rem;
          line-height: 1.5;
          max-height: 100px;
        }
        .bottom-bar {
          position: fixed;
          bottom: 0px;
          left: 0px;
          height: 24px;
          width: 100%;
          background-color: ${color};
        }
        .meta {
          position: fixed;
          left: 5rem;
          bottom: 5rem;
          color: #2f363d;
          font-size: 2rem;
        }
        svg {
          fill: #2f363d;
          width: 32px;
          height: 32px;
        }
        .item-center {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.8rem;
        }
        .item-end {
          display: flex;
          align-items: end;
          gap: 1rem;
        }
      </style>
      <body>
        <div class="container">
          <div class="box">
            <div class="box-left">
              <div class="title ellipsis">${title}</div>
              <div class="description ellipsis">
                ${description}
              </div>
            </div>
            <div>
              <img src="${process.env.SUPABASE_URL}/storage/v1/object/public/publics/kidow.png" alt="" class="logo" />
            </div>
          </div>
        </div>
        <div class="meta">
          <div class="item-center">
            <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"/>
            </svg>
            <span>https://github.com/kidow</span>
          </div>
          
          <div class="item-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330.001 330.001"
              style="enable-background: new 0 0 330.001 330.001"
              xml:space="preserve"
            >
              <path
                d="M173.871 177.097a14.982 14.982 0 0 1-8.87 2.903 14.98 14.98 0 0 1-8.871-2.903L30 84.602.001 62.603 0 275.001c.001 8.284 6.716 15 15 15L315.001 290c8.285 0 15-6.716 15-14.999V62.602l-30.001 22-126.129 92.495z"
              />
              <path d="M165.001 146.4 310.087 40.001 19.911 40z" />
            </svg>
            <span>wcgo2ling@gmail.com</span>
          </div>
        </div>
        <div class="bottom-bar"></div>
      </body>
    </html>
    `
}


const app = express()

const isDev = process.env.NODE_ENV === 'development'
const executablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const evaluate = async () => {
  const selectors = Array.from(document.querySelectorAll('img'))
  await Promise.all([document.fonts.ready, ...selectors.map(img => {
    if (img.complete) {
      if (img.naturalHeight !== 0) return
      throw new Error('Image failed to load')
    }
    return new Promise((resolve, reject) => {
      img.addEventListener('load', resolve)
      img.addEventListener('error', reject)
    })
  })])
}


app.use(express.static('public'))

app.get('/api', async (req: Request<any, any, any, { id: string }>, res: Response) => {
  try {
    const { data, error } = await supabase.from<IThumbnail>('thumbnails')
      .select('*')
      .eq('id', req.query.id).single()
    if (error || !data) {
      res.status(200).setHeader('Content-Type', 'image/png')
      fs.createReadStream(path.join(__dirname, IS_DEV ? '../../public/404.png' : 'static/404.png')).pipe(res)
      return
    }
    const metadata = await urlMetadata(data.url)
    if (metadata['og:title'] !== data.title
      || metadata['og:description'] !== data.description
      // @ts-ignore
      || metadata['theme-color'] !== data.color) {
      await supabase.from<IThumbnail>('thumbnails').update({
        title: metadata['og:title'],
        description: metadata['og:description'],
        // @ts-ignore
        color: metadata['theme-color']
      }).eq('id', req.query.id)
    }
    const html = getHtml({
      title: metadata['og:title'],
      description: metadata['og:description'],
      // @ts-ignore
      color: metadata['theme-color']
    })

    await chrome.font(
      `${process.env.SUPABASE_URL}/storage/v1/object/public/fonts/Pretendard-Regular.otf`
    )
    const browser = await puppeteer.launch({
      args: isDev ? [] : chrome.args,
      executablePath: isDev ? executablePath : await chrome.executablePath,
      headless: isDev ? true : chrome.headless,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 600 })
    await page.setContent(html, { waitUntil: 'domcontentloaded' })
    await page.evaluate(evaluate)
    const file = await page.screenshot({ type: 'png' })
    await browser.close()
    res.status(200)
      .setHeader('Content-Type', 'image/png')
      .setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=86400, max-age=86400')
      .end(file)
  } catch (err) {
    res.status(200).setHeader('Content-Type', 'image/png')
    fs.createReadStream(path.join(__dirname, IS_DEV ? '../../public/500.png' : 'static/500.png')).pipe(res)
    console.error(err)
  }
})

app.listen(3000, () => console.log('Listening on 3000...'))
