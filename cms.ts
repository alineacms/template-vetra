import {Config} from 'alinea'
import {createCMS} from 'alinea/next'
import * as schema from './cms/schema'

export const cms = createCMS({
  // List available types in your schema
  schema,

  // Define the content structure of your CMS
  workspaces: {
    main: Config.workspace('Vetra', {
      source: 'content',
      mediaDir: 'public',
      roots: {
        pages: Config.root('Vetra', {
          contains: [schema.Page, schema.FormPage],
          children: {
            // Seed the CMS with initial pages
            index: Config.page({
              type: schema.HomePage,
              fields: {title: 'Home'}
            }),
            blog: Config.page({
              type: schema.BlogList,
              fields: {title: 'Blog'}
            }),
            authors: Config.page({
              type: schema.AuthorList,
              fields: {title: 'Authors'}
            }),
            categories: Config.page({
              type: schema.CategoryList,
              fields: {title: 'Categories'}
            }),
            contact: Config.page({
              type: schema.FormPage,
              fields: {title: 'Contact Us'}
            })
          }
        }),
        media: Config.media()
      }
    })
  },

  // Enable the drafts workflow
  enableDrafts: true,

  baseUrl: {
    // Point to your local website
    development: 'http://localhost:3000',
    // The production URL of your website
    production: process.env.VERCEL_URL ?? 'https://example.com'
  },

  // Enable live previews after adding <cms.previews widget /> to your layout
  preview: true,

  // The handler route URL
  handlerUrl: '/api/cms',

  // The admin dashboard will be bundled in this static file
  dashboardFile: 'admin.html'
})
