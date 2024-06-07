import { type APIRoute } from 'astro'
import { Urls, db, like } from 'astro:db'

const URL_DOMAIN = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.SITE

export const GET: APIRoute = async ({ params, redirect }) => {
	// 1. If not shortUrl, redirect to page 404
	// 2. Retrieve the real url from the database
	// 3. If not real url, redirect to page 404
	// 4. Redirect to real url
	const shortUrl = params.shortUrl

	// Check if exists a shortUrl
	if (!shortUrl) {
		return redirect('/404', 307)
	}

	// Retrieve the real url from the database
	const completeShortUrl = `${URL_DOMAIN}/link/${shortUrl}`
	const url = await db.select().from(Urls).where(like(Urls.short_url, completeShortUrl)).then(row => row[0])

	// If not real url, redirect to page 404
	if (!url) {
		return redirect('/404', 307)
	}

	// Redirect to real url
	return redirect(url.url, 301)
}