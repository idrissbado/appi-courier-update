import type { NextRequest } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ref = searchParams.get("ref")

  if (!ref) {
    return new Response("<h2>Référence manquante</h2>", {
      status: 400,
      headers: { "Content-Type": "text/html" },
    })
  }

  const client = await pool.connect()

  try {
    await client.query(
      `
      UPDATE gestion_courier 
      SET statut = 'traite', update = NOW()
      WHERE reference = $1
    `,
      [ref],
    )

    return new Response("<h2>Courrier marqué comme LU !</h2>", {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Error processing courier:", error)

    return new Response("<h2>Erreur lors du traitement du courrier</h2>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
    })
  } finally {
    client.release()
  }
}

// This endpoint matches your Python Flask code:
// @app.route('/api/traiter', methods=['GET'])
// - Uses GET method with query parameter 'ref'
// - Returns HTML responses directly
// - Same database connection and SQL query structure
