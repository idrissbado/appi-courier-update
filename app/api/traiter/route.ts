import type { NextRequest } from "next/server"

import postgres from "postgres"

const sql = postgres({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

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

// This endpoint matches your Python Flask code exactly:
// @app.route('/api/traiter', methods=['GET'])
// - Uses GET method with query parameter 'ref'
// - Returns HTML responses directly
// - Same database connection and SQL query structure
// - Uses your exact environment variables
