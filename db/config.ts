import { NOW, column, defineDb, defineTable } from 'astro:db'

const Urls = defineTable({
	columns: {
		url: column.text(),
		short_url: column.text({ unique: true }),
		created_at: column.date({ default: new Date })
	}
})

// https://astro.build/db/config
export default defineDb({
	tables: { Urls }
})
