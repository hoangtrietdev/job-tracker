import { useState, useEffect } from 'react'
import { Job, JobStatus, JobStage } from '@/types/job'
import { loadJobs, saveJobs, getCompanyLogo } from '@/utils/storage'

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const loadedJobs = loadJobs()
    setJobs(loadedJobs)
  }, [])

  const addJob = (jobData: Omit<Job, 'id' | 'companyLogo'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      companyLogo: getCompanyLogo(jobData.url),
    }
    
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    saveJobs(updatedJobs)
  }

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter((job) => job.id !== id)
    setJobs(updatedJobs)
    saveJobs(updatedJobs)
  }

  const updateJob = (id: string, updates: Partial<Job>) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, ...updates } : job
    )
    setJobs(updatedJobs)
    saveJobs(updatedJobs)
  }

  return {
    jobs,
    addJob,
    deleteJob,
    updateJob,
  }
}
