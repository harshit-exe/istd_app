import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const response = await axios.get(url, { timeout: 30000 }) // 30 seconds timeout
    const $ = cheerio.load(response.data)

    // Remove script tags, style tags, and comments
    $('script, style, comment').remove()

    // Extract text from body, focusing on main content areas
    let content = $('body').find('main, article, .content, #content, .main, #main').text()

    // If no main content area is found, fall back to the entire body
    if (!content.trim()) {
      content = $('body').text()
    }

    // For Next.js documentation, extract specific sections
    if (url.includes('nextjs.org/docs')) {
      const title = $('h1').first().text()
      const description = $('p').first().text()
      const sections = $('h2, h3').map((i, el) => {
        return {
          title: $(el).text(),
          content: $(el).nextUntil('h2, h3').text()
        }
      }).get()

      content = JSON.stringify({ title, description, sections })
    }

    // Clean up the content
    content = content.replace(/\s+/g, ' ').trim()

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error scraping website:', error)
    let errorMessage = 'Failed to scrape website content'
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. The website might be slow or unavailable.'
    } else if (error.response) {
      errorMessage = `Server responded with status ${error.response.status}`
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

