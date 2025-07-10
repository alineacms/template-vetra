import {execSync} from 'node:child_process'
import {withAlinea} from 'alinea/next'

// Bolt seems to default to `npx next dev` so force it to use alinea dev
const isAlineaDev = process.env.ALINEA_DEV_SERVER
if (!isAlineaDev) {
  try {
    execSync('npx alinea dev -- next dev', {
      stdio: 'inherit'
    })
    process.exit(0)
  } catch (error) {
    console.error('Failed to start alinea dev:', error)
    process.exit(1)
  }
}

export default withAlinea({
  eslint: {
    ignoreDuringBuilds: true
  }
})
