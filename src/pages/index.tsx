import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import JobTable from '@/components/JobTable'
import JobCard from '@/components/JobCard'
import AddJobModal from '@/components/AddJobModal'
import { useJobs } from '@/hooks/useJobs'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const { jobs, addJob, deleteJob, updateJob } = useJobs()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <Head>
        <title>Job Tracker - Track Your Applications</title>
        <meta name="description" content="Track your job applications with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
      </Head>

      <Layout>
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent mb-2">Job Applications</h1>
            <p className="text-sm md:text-base text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Track and manage your career opportunities
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 font-medium shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Job</span>
          </motion.button>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="px-4 py-2 bg-accent/50 backdrop-blur-sm rounded-lg border border-border/50">
            <span className="text-2xl font-bold text-foreground">{jobs.length}</span>
            <span className="text-sm text-muted-foreground ml-2">{jobs.length === 1 ? 'application' : 'applications'}</span>
          </div>
        </div>

        {isMobile ? (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No applications yet. Add your first one!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={deleteJob}
                  onUpdate={updateJob}
                />
              ))
            )}
          </div>
        ) : (
          <JobTable
            jobs={jobs}
            onDelete={deleteJob}
            onUpdate={updateJob}
          />
        )}

        <AddJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addJob}
        />
      </Layout>
    </>
  )
}
