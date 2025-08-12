import type { NextRequest } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get("ref")

  if (!ref) {
    return new Response("<h2>Référence manquante</h2>", {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }

  try {
    const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

    process.env.POSTGRES_URL = connectionString

    await sql`
      UPDATE gestion_courier 
      SET statut = 'traite', "update" = NOW()
      WHERE reference = ${ref}
    `

    return new Response("<h2>Courrier marqué comme LU !</h2>", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  } catch (error) {
    console.error("Error processing courier:", error)

    return new Response("<h2>Erreur lors du traitement du courrier</h2>", {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }
}
