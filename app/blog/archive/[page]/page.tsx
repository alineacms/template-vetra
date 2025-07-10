import {cms} from '@/cms'
import {BlogPost} from '@/cms/BlogPost'

export {default} from '../../page'

export async function generateStaticParams() {
  const perPage = 3 * 4
  const total = await cms.count({type: BlogPost})
  return Array.from({length: Math.ceil(total / perPage)}, (_, i) => ({
    page: String(i)
  }))
}
