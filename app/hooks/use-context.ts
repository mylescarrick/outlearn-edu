/**
 * Our own useContext hook that works with the context we created
 * and sent via the root loader
 */

import { useRouteLoaderData } from "react-router"
import type { loader as rootLoader } from "../root"

export const useContext = () => {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root")

  return {
    ...rootLoaderData,
  }
}
