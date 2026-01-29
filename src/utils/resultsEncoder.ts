import type { Candidate } from '@/types'

export interface EncodedResult {
  name: string
  matchScore: number
  experience: string
  skills: string[]
}

export function encodeResults(candidates: Candidate[]): string {
  const simplified = candidates.map((c) => ({
    name: c.name,
    matchScore: c.matchScore,
    experience: c.experience,
    skills: c.skills,
  }))

  const json = JSON.stringify(simplified)
  return btoa(encodeURIComponent(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeResults(encoded: string): EncodedResult[] {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')

    while (base64.length % 4) {
      base64 += '='
    }

    const json = decodeURIComponent(atob(base64))
    return JSON.parse(json)
  } catch (error) {
    console.error('Error decoding results:', error)
    return []
  }
}

export function generateShareUrl(candidates: Candidate[], baseUrl?: string): string {
  const encoded = encodeResults(candidates)
  const base = baseUrl || window.location.origin
  return `${base}/share?r=${encoded}`
}
