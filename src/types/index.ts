export interface JobOffer {
  id: string
  title: string
  department: string
  description: string
}

export interface Candidate {
  id: string
  name: string
  matchScore: number
  experience: string
  skills: string[]
  education: string
  selected?: boolean
  documentUrl?: string
}

export type Screen =
  | 'splash'
  | 'jobs'
  | 'candidates'
  | 'processing'
  | 'podium'
  | 'history'
  | 'settings'
