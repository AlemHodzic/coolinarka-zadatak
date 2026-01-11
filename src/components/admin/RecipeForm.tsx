'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { difficultyLabels, mealGroupLabels, prepMethodLabels } from '@/types/recipe'

interface Ingredient {
  name: string
  quantity: string
  unit: string
}

interface Step {
  order: number
  instruction: string
}

interface RecipeFormData {
  title: string
  lead: string
  imageId: string
  prepTime: number
  servings: number
  difficulty: string
  mealGroup: string
  prepMethod: string
  tags: string[]
  ingredients: Ingredient[]
  steps: Step[]
}

interface RecipeFormProps {
  initialData?: RecipeFormData & { slug?: string }
  mode: 'create' | 'edit'
}

const defaultFormData: RecipeFormData = {
  title: '',
  lead: '',
  imageId: '/recipes/default/hero.jpg',
  prepTime: 30,
  servings: 4,
  difficulty: 'MEDIUM',
  mealGroup: 'MAIN_DISH',
  prepMethod: 'COOKING',
  tags: [],
  ingredients: [{ name: '', quantity: '', unit: '' }],
  steps: [{ order: 1, instruction: '' }]
}

export function RecipeForm({ initialData, mode }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>(initialData || defaultFormData)
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function updateField<K extends keyof RecipeFormData>(field: K, value: RecipeFormData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function addIngredient() {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }]
    }))
  }

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }))
  }

  function removeIngredient(index: number) {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }))
    }
  }

  function addStep() {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { order: prev.steps.length + 1, instruction: '' }]
    }))
  }

  function updateStep(index: number, instruction: string) {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, instruction } : step
      )
    }))
  }

  function removeStep(index: number) {
    if (formData.steps.length > 1) {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps
          .filter((_, i) => i !== index)
          .map((step, i) => ({ ...step, order: i + 1 }))
      }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    const ingredients = formData.ingredients.filter(i => i.name.trim())
    const steps = formData.steps.filter(s => s.instruction.trim())

    if (ingredients.length === 0) {
      setError('Dodajte barem jedan sastojak')
      setLoading(false)
      return
    }

    if (steps.length === 0) {
      setError('Dodajte barem jedan korak pripreme')
      setLoading(false)
      return
    }

    const payload = {
      ...formData,
      tags,
      ingredients: JSON.stringify(ingredients),
      steps: JSON.stringify(steps.map((s, i) => ({ ...s, order: i + 1 })))
    }

    try {
      const url = mode === 'create' ? '/api/recipes' : `/api/recipes/${initialData?.slug}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/recepti')
        router.refresh()
      } else {
        let errorMessage = data.error || 'Greška pri spremanju recepta'
        if (data.details?.fieldErrors) {
          const fieldErrors = Object.entries(data.details.fieldErrors)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
            .join('\n')
          if (fieldErrors) {
            errorMessage += '\n\n' + fieldErrors
          }
        }
        setError(errorMessage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      setError('Greška pri spremanju recepta')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-lg whitespace-pre-wrap flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-medium mb-1">Greška</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-display text-xl font-bold text-warm-900 mb-6">
          Osnovne informacije
        </h2>
        
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Naziv recepta *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="npr. Sarma s kiselim zeljem"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Kratki opis *
            </label>
            <textarea
              value={formData.lead}
              onChange={(e) => updateField('lead', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              rows={2}
              placeholder="Ukratko opišite recept..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Putanja slike (CDN)
            </label>
            <input
              type="text"
              value={formData.imageId}
              onChange={(e) => updateField('imageId', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="/recipes/naziv-recepta/hero.jpg"
            />
            <p className="text-sm text-warm-500 mt-1">
              Format: /recipes/slug/hero.jpg (npr. /recipes/sarma/hero.jpg)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Tagovi
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="tradicionalno, zimnica, svinjetina (odvojeno zarezom)"
            />
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-display text-xl font-bold text-warm-900 mb-6">
          Detalji
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Vrijeme pripreme (min)
            </label>
            <input
              type="number"
              value={formData.prepTime}
              onChange={(e) => updateField('prepTime', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Broj porcija
            </label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) => updateField('servings', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Težina
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => updateField('difficulty', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            >
              {Object.entries(difficultyLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Grupa jela
            </label>
            <select
              value={formData.mealGroup}
              onChange={(e) => updateField('mealGroup', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            >
              {Object.entries(mealGroupLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Način pripreme
            </label>
            <select
              value={formData.prepMethod}
              onChange={(e) => updateField('prepMethod', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            >
              {Object.entries(prepMethodLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-warm-900">
            Sastojci
          </h2>
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Dodaj sastojak
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="Naziv sastojka"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="Količina"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="Jedinica"
                />
              </div>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-warm-400 hover:text-red-500 transition-colors"
                disabled={formData.ingredients.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-warm-900">
            Koraci pripreme
          </h2>
          <button
            type="button"
            onClick={addStep}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Dodaj korak
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <textarea
                  value={step.instruction}
                  onChange={(e) => updateStep(index, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-warm-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  rows={2}
                  placeholder={`Korak ${index + 1}...`}
                />
              </div>
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="p-2 text-warm-400 hover:text-red-500 transition-colors"
                disabled={formData.steps.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-warm-600 hover:text-warm-900 transition-colors"
        >
          Odustani
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Spremanje...' : mode === 'create' ? 'Kreiraj recept' : 'Spremi promjene'}
        </button>
      </div>
    </form>
  )
}

