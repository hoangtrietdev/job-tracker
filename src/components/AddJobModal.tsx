import { useState, FormEvent } from 'react'
import { Job, JobStatus, JobStage } from '@/types/job'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddJobModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (job: Omit<Job, 'id' | 'companyLogo'>) => void
}

export default function AddJobModal({ isOpen, onClose, onAdd }: AddJobModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    url: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'applied' as JobStatus,
    stage: 'resume' as JobStage,
    notes: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      company: '',
      position: '',
      url: '',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      stage: 'resume',
      notes: '',
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Application</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-foreground">
                    Company Name *
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
                    placeholder="e.g., Google, Meta, Apple"
                  />
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-semibold mb-2 text-foreground">
                    Position *
                  </label>
                  <input
                    id="position"
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-semibold mb-2 text-foreground">
                    Job URL *
                  </label>
                  <input
                    id="url"
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
                    placeholder="https://company.com/careers/job-id"
                  />
                </div>

                <div>
                  <label htmlFor="appliedDate" className="block text-sm font-semibold mb-2 text-foreground">
                    Applied Date *
                  </label>
                  <input
                    id="appliedDate"
                    type="date"
                    required
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="block text-sm font-semibold mb-2 text-foreground">
                      Status *
                    </label>
                    <select
                      id="status"
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 cursor-pointer"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="applied">✉️ Applied</option>
                      <option value="interview">💬 Interview</option>
                      <option value="accepted">✅ Accepted</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-sm font-semibold mb-2 text-foreground">
                      Stage *
                    </label>
                    <select
                      id="stage"
                      required
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value as JobStage })}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 cursor-pointer"
                    >
                      <option value="resume">📄 Resume</option>
                      <option value="phone">📞 Phone</option>
                      <option value="technical">💻 Technical</option>
                      <option value="onsite">🏢 On-site</option>
                      <option value="offer">🎉 Offer</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold mb-2 text-foreground">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 resize-none"
                    placeholder="Additional notes about this application..."
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-5 py-3 border-2 border-border/50 rounded-xl hover:bg-accent/50 hover:border-border transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-bold"
                  >
                    ✨ Add Application
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
