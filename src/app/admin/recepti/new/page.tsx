import { RecipeForm } from '@/components/admin/RecipeForm'
import Link from 'next/link'

export default function NewRecipePage() {
  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/recepti"
          className="text-warm-500 hover:text-warm-700 text-sm mb-2 inline-block"
        >
          ← Natrag na listu
        </Link>
        <h1 className="font-display text-3xl font-bold text-warm-900">
          Novi recept
        </h1>
      </div>
      
      <RecipeForm mode="create" />
    </div>
  )
}

