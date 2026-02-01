import { Job } from '@/types/job'

const STORAGE_KEY = 'job-tracker-data'

export const loadJobs = (): Job[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading jobs:', error)
    return []
  }
}

export const saveJobs = (jobs: Job[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch (error) {
    console.error('Error saving jobs:', error)
  }
}

export const getCompanyLogo = (companyUrl: string): string => {
  try {
    const url = new URL(companyUrl)
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`
  } catch {
    return ''
  }
}

export const generateShareLink = (job: Job): string => {
  const data = {
    company: job.company,
    position: job.position,
    url: job.url,
    date: job.appliedDate,
    status: job.status,
    stage: job.stage,
  }
  
  const encoded = btoa(JSON.stringify(data))
  return `${window.location.origin}?share=${encoded}`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return false
  }
}
