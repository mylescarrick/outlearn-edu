import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

const homeRoutes = await flatRoutes({
  rootDirectory: "./routes/home",
})

export default [
  layout("./routes/_layout.tsx", [...homeRoutes]),
  route("up", "./routes/up.tsx"),
] satisfies RouteConfig
