import { createHonoServer } from "react-router-hono-server/bun"
import { loadClientConfig } from "~/lib/config"

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
  interface AppLoadContext extends ReturnType<typeof loadClientConfig> {}
}

export default await createHonoServer({
  getLoadContext(_, { build, mode }) {
    return {
      ...loadClientConfig(),
    }
  },
})
