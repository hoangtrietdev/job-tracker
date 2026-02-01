import { useState } from 'react'
import { Job, JobStatus, JobStage, statusConfig, stageConfig } from '@/types/job'
import StatusBadge from './StatusBadge'
import { ExternalLink, Trash2, Share2, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { generateShareLink, copyToClipboard } from '@/utils/storage'

interface JobTableProps {
  jobs: Job[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Job>) => void
}

export default function JobTable({ jobs, onDelete, onUpdate }: JobTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleShare = async (job: Job) => {
    const shareLink = generateShareLink(job)
    const success = await copyToClipboard(shareLink)
    
    if (success) {
      setCopiedId(job.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border/50 rounded-2xl bg-accent/20 backdrop-blur-sm">
        <div className="text-6xl mb-4 opacity-50">📋</div>
        <p className="text-lg font-medium text-foreground mb-2">No applications yet</p>
        <p className="text-sm text-muted-foreground">Click "Add Job" to track your first application</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden border border-border/50 rounded-2xl shadow-xl bg-background/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 bg-background/80 backdrop-blur-sm">
            {jobs.map((job) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-gradient-to-r hover:from-accent/50 hover:to-transparent transition-all duration-200 group cursor-pointer"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg shadow-md border border-border/50"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shadow-md border border-border/50">
                        <span className="text-lg">{job.company[0]}</span>
                      </div>
                    )}
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{job.company}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-foreground/90">{job.position}</span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-muted-foreground font-medium">
                  {new Date(job.appliedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <select
                    value={job.status}
                    onChange={(e) => onUpdate(job.id, { status: e.target.value as JobStatus })}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-background/50 backdrop-blur-sm cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                    style={{
                      borderColor: statusConfig[job.status].color.split(' ')[2].replace('border-', '').replace('/20', ''),
                      color: statusConfig[job.status].color.split(' ')[1].replace('text-', '')
                    }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="applied">✉️ Applied</option>
                    <option value="interview">💬 Interview</option>
                    <option value="accepted">✅ Accepted</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <select
                    value={job.stage}
                    onChange={(e) => onUpdate(job.id, { stage: e.target.value as JobStage })}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-background/50 backdrop-blur-sm cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                    style={{
                      borderColor: stageConfig[job.stage].color.split(' ')[2].replace('border-', '').replace('/20', ''),
                      color: stageConfig[job.stage].color.split(' ')[1].replace('text-', '')
                    }}
                  >
                    <option value="resume">📄 Resume</option>
                    <option value="phone">📞 Phone</option>
                    <option value="technical">💻 Technical</option>
                    <option value="onsite">🏢 On-site</option>
                    <option value="offer">🎉 Offer</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <motion.a
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-200 border border-transparent hover:border-blue-500/20"
                      title="Open job posting"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(job)}
                      className="p-2 rounded-lg hover:bg-green-500/10 hover:text-green-500 transition-all duration-200 border border-transparent hover:border-green-500/20"
                      title="Copy share link"
                    >
                      {copiedId === job.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(job.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 border border-transparent hover:border-red-500/20"
                      title="Delete application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
