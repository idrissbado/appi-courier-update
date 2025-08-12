"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function TraiterCourrier() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = searchParams.get("ref")

    if (!ref) {
      setMessage("Référence manquante")
      setLoading(false)
      return
    }

    processReference(ref)
  }, [searchParams])

  const processReference = async (ref: string) => {
    try {
      const response = await fetch(`/api/traiter?ref=${encodeURIComponent(ref)}`)
      if (response.ok) {
        setMessage("Courrier marqué comme LU !")
      } else {
        setMessage("Erreur lors du traitement")
      }
    } catch (error) {
      setMessage("Erreur lors du traitement")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-yellow-400 animate-pulse mx-auto"></div>
          </div>
          <p className="text-white text-lg font-medium">Traitement en cours...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">VE</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              VIVO ENERGY
            </h1>
            <h2 className="text-xl text-white/90 mb-3 font-medium">
              Changement de Statut de Gestion de Courrier Entreprise
            </h2>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <p className="text-white/90 text-sm font-medium">
                Développé par <strong className="text-yellow-300">Eunice Achie</strong>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/20">
          <div className="mb-8">
            {message === "Courrier marqué comme LU !" && (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}

            {message === "Référence manquante" && (
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mb-6 shadow-lg animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            {message}
          </h2>

          {message === "Courrier marqué comme LU !" && (
            <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
              <p className="text-green-100 text-lg font-medium">✨ Traitement effectué avec succès ✨</p>
              <p className="text-green-200/80 text-sm mt-2">Le courrier a été marqué comme lu dans le système</p>
            </div>
          )}

          {message === "Référence manquante" && (
            <div className="bg-gradient-to-r from-red-400/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 animate-fade-in">
              <p className="text-red-100 text-lg font-medium">⚠️ Veuillez fournir une référence de courrier</p>
              <p className="text-red-200/80 text-sm mt-2">La référence est requise pour traiter le courrier</p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mr-3"></div>
              <p className="text-white font-bold text-lg">VIVO ENERGY</p>
            </div>
            <p className="text-white/90 font-medium">Système de Gestion de Courrier</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="w-1 h-1 bg-yellow-400 rounded-full mx-2"></div>
              <p className="text-white/70 text-sm">© 2025 - Développé par</p>
              <span className="text-yellow-300 font-medium ml-1">Eunice Achie</span>
              <div className="w-1 h-1 bg-yellow-400 rounded-full mx-2"></div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
