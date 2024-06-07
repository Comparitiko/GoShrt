import { type APIRoute } from 'astro'
import { Urls, db } from 'astro:db'

const URL_DOMAIN = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.SITE

export const POST: APIRoute = async ({ request }) => {
	// 1. Get the url (and shortUrl if exists) from the request body
  // 2. If not url, return 400
  // 3. If not shortUrl, generate a new shortUrl
  // 4. Save the shortUrl and url to the database
  // 5. Return the shortUrl
  const { longUrl, path } = await request.json()

	if (!longUrl) {
		return new Response('No url pasado', { status: 400 })
	}

  let newPath = path

	if (!newPath) {
		newPath = crypto.randomUUID().slice(0, 5)
	}

  const shortUrl = `${URL_DOMAIN}/link/${newPath}`

	try {
    await db.insert(Urls).values({ url: longUrl, short_url: shortUrl })
    return new Response(JSON.stringify({ url: longUrl, short_url: shortUrl }), { status: 200 })
  } catch (error) {
    return new Response('Error al generar el shortUrl', { status: 500 })
  }
}