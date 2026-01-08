import { Difficulty, MealGroup, difficultyLabels, mealGroupLabels } from '@/types/recipe'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'easy' | 'medium' | 'hard' | 'mealGroup'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-warm-100 text-warm-800',
    easy: 'bg-emerald-100 text-emerald-800',
    medium: 'bg-amber-100 text-amber-800',
    hard: 'bg-rose-100 text-rose-800',
    mealGroup: 'bg-primary-100 text-primary-800',
  }

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const variantMap: Record<Difficulty, 'easy' | 'medium' | 'hard'> = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  }

  return (
    <Badge variant={variantMap[difficulty]}>
      {difficultyLabels[difficulty]}
    </Badge>
  )
}

export function MealGroupBadge({ mealGroup }: { mealGroup: MealGroup }) {
  return (
    <Badge variant="mealGroup">
      {mealGroupLabels[mealGroup]}
    </Badge>
  )
}

