import { JobStatus, JobStage, statusConfig, stageConfig } from '@/types/job'

interface StatusBadgeProps {
  type: 'status' | 'stage'
  value: JobStatus | JobStage
}

export default function StatusBadge({ type, value }: StatusBadgeProps) {
  const config = type === 'status' ? statusConfig : stageConfig
  const item = config[value as keyof typeof config]

  if (!item) return null

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${item.color}`}
    >
      {item.label}
    </span>
  )
}
