import { useState } from 'react'
import { Job, JobStatus, JobStage } from '@/types/job'
import StatusBadge from './StatusBadge'
import { ExternalLink, Trash2, Share2, Check, Calendar, Edit2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateShareLink, copyToClipboard } from '@/utils/storage'

interface JobCardProps {
  job: Job
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Job>) => void
}

export default function JobCard({ job, onDelete, onUpdate }: JobCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleShare = async () => {
    const shareLink = generateShareLink(job)
    const success = await copyToClipboard(shareLink)
    
    if (success) {
      setCopiedId(job.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="relative border border-border/50 rounded-2xl p-5 bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-xl shadow-lg border border-border/50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shadow-lg border border-border/50">
                <span className="text-xl font-bold">{job.company[0]}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{job.company}</h3>
              <p className="text-sm text-muted-foreground truncate font-medium">{job.position}</p>
            </div>
          </div>
        </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex flex-wrap gap-2 flex-1">
          {isEditing ? (
            <>
              <select
                value={job.status}
                onChange={(e) => onUpdate(job.id, { status: e.target.value as JobStatus })}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-background cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={job.stage}
                onChange={(e) => onUpdate(job.id, { stage: e.target.value as JobStage })}
                className="px-2.5 py-1 rounded-md text-xs font-medium border bg-background cursor-pointer"
              >
                <option value="resume">Resume</option>
                <option value="phone">Phone Screen</option>
                <option value="technical">Technical</option>
                <option value="onsite">On-site</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </>
          ) : (
            <>
              <StatusBadge type="status" value={job.status} />
              <StatusBadge type="stage" value={job.stage} />
            </>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded-lg transition-colors ${
            isEditing ? 'bg-primary/20 text-primary' : 'hover:bg-accent'
          }`}
          title="Edit status"
        >
          <Edit2 className="w-4 h-4" />
        </motion.button>
      </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-accent/30 rounded-lg px-3 py-2 border border-border/30">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium">
            {new Date(job.appliedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {job.notes && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 italic bg-muted/30 rounded-lg p-3 border border-border/30">
            {job.notes}
          </p>
        )}

        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">View Job</span>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-2.5 rounded-xl hover:bg-green-500/10 hover:text-green-500 transition-all duration-200 border border-border/50 hover:border-green-500/30 hover:shadow-lg"
            title="Copy share link"
          >
            {copiedId === job.id ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(job.id)}
            className="p-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 border border-border/50 hover:border-red-500/30 hover:shadow-lg"
            title="Delete application"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
