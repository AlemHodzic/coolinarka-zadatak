'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { difficultyLabels, mealGroupLabels } from '@/types/recipe'

export function RecipeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentDifficulty = searchParams.get('difficulty') || ''
  const currentMealGroup = searchParams.get('mealGroup') || ''
  const currentSearch = searchParams.get('search') || ''

  // Local state for search input (for debouncing)
  const [searchInput, setSearchInput] = useState(currentSearch)

  // Sync local state when URL changes (e.g., clear filters)
  useEffect(() => {
    setSearchInput(currentSearch)
  }, [currentSearch])

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/recepti?${params.toString()}`)
  }, [router, searchParams])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateFilter('search', searchInput)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, currentSearch, updateFilter])

  function clearFilters() {
    setSearchInput('')
    router.push('/recepti')
  }

  const hasFilters = currentDifficulty || currentMealGroup || currentSearch

  return (
    <div className="bg-white rounded-xl shadow-sm border border-warm-200 p-4 mb-8">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-warm-700 mb-1">
            Pretraži
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Naziv recepta..."
            className="w-full px-3 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
          />
        </div>

        {/* Difficulty */}
        <div className="w-40">
          <label className="block text-sm font-medium text-warm-700 mb-1">
            Težina
          </label>
          <select
            value={currentDifficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
          >
            <option value="">Sve</option>
            {Object.entries(difficultyLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Meal Group */}
        <div className="w-44">
          <label className="block text-sm font-medium text-warm-700 mb-1">
            Grupa jela
          </label>
          <select
            value={currentMealGroup}
            onChange={(e) => updateFilter('mealGroup', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
          >
            <option value="">Sve</option>
            {Object.entries(mealGroupLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-warm-600 hover:text-warm-900 hover:bg-warm-100 rounded-lg transition-colors"
          >
            Očisti filtere
          </button>
        )}
      </div>
    </div>
  )
}
