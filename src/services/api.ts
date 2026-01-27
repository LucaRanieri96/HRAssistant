import type { Candidate } from '@/types'
import resultsData from '@/data/resultsData.json'

export interface RankingRequest {
  jobOfferId: string
  candidateIds: string[]
}

export interface RankingResponse {
  candidates: Array<{
    id: string
    nameKey: string
    matchScore: number
    experienceKey: string
    skills: string[]
    educationKey: string
  }>
}

/**
 * Simula una chiamata API al backend per il ranking dei candidati
 * TODO: Sostituire con la vera chiamata API quando il backend sarà pronto
 *
 * @param request - Contiene l'ID dell'offerta lavorativa e gli ID dei candidati selezionati
 * @returns Promise con i candidati rankedati dall'AI
 */
export const rankCandidates = async (request: RankingRequest): Promise<RankingResponse> => {
  // Simula il tempo di processing del backend
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock: per ora restituiamo i dati dal JSON locale
  // TODO: Sostituire con fetch() vera quando il backend sarà pronto
  /*
  const response = await fetch('/api/rank-candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Failed to rank candidates')
  }

  return await response.json()
  */

  // Filtra i candidati in base agli ID selezionati (per demo)
  const filteredCandidates = resultsData.filter((c) => request.candidateIds.includes(c.id))

  // Se non ci sono abbastanza candidati selezionati, usa tutti
  const candidates = filteredCandidates.length > 0 ? filteredCandidates : resultsData

  return {
    candidates: candidates.map((c) => ({
      id: c.id,
      nameKey: c.nameKey,
      matchScore: c.matchScore,
      experienceKey: c.experienceKey,
      skills: c.skills,
      educationKey: c.educationKey,
    })),
  }
}
