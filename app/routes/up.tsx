import { data, useLoaderData } from "react-router"

export const loader = async () => {
  return null
}

export default function Healthcheck() {
  const status = "healthy"
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow"></div>
      {status === "healthy" ? (
        <h1 className="mx-auto my-10 text-center text-4xl font-extrabold text-green-600">
          UP
        </h1>
      ) : (
        <h1 className="mx-auto my-10 text-center text-4xl font-extrabold text-red-600">
          Oh dear…
        </h1>
      )}
      <div className="flex-grow" />
    </div>
  )
}
