export type JobStatus = 'pending' | 'applied' | 'interview' | 'accepted' | 'rejected'

export type JobStage = 'resume' | 'phone' | 'technical' | 'onsite' | 'offer' | 'rejected'

export interface Job {
  id: string
  company: string
  position: string
  url: string
  appliedDate: string
  status: JobStatus
  stage: JobStage
  notes?: string
  companyLogo?: string
}

export const statusConfig: Record<JobStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  applied: { label: 'Applied', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  interview: { label: 'Interview', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  accepted: { label: 'Accepted', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

export const stageConfig: Record<JobStage, { label: string; color: string }> = {
  resume: { label: 'Resume', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
  phone: { label: 'Phone Screen', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
  technical: { label: 'Technical', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  onsite: { label: 'On-site', color: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
  offer: { label: 'Offer', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
}
