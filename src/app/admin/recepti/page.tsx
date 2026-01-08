import Link from 'next/link'
import { prisma } from '@/lib/db'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { difficultyLabels, mealGroupLabels } from '@/types/recipe'

async function getRecipes() {
  return prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function AdminRecipesPage() {
  const recipes = await getRecipes()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-900">
            Upravljanje receptima
          </h1>
          <p className="text-warm-600 mt-1">
            {recipes.length} {recipes.length === 1 ? 'recept' : 'recepata'}
          </p>
        </div>
        <Link
          href="/admin/recepti/new"
          className="btn btn-primary"
        >
          + Novi recept
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-warm-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-warm-600">Naziv</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-warm-600">Grupa</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-warm-600">Težina</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-warm-600">Vrijeme</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-warm-600">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100">
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-warm-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-warm-900">{recipe.title}</p>
                    <p className="text-sm text-warm-500">/{recipe.slug}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-warm-600">
                  {mealGroupLabels[recipe.mealGroup as keyof typeof mealGroupLabels] || recipe.mealGroup}
                </td>
                <td className="px-6 py-4">
                  <span className={`badge ${
                    recipe.difficulty === 'EASY' ? 'badge-easy' : 
                    recipe.difficulty === 'MEDIUM' ? 'badge-medium' : 'badge-hard'
                  }`}>
                    {difficultyLabels[recipe.difficulty as keyof typeof difficultyLabels] || recipe.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-warm-600">
                  {recipe.prepTime} min
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/recepti/${recipe.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 text-sm text-warm-600 hover:text-warm-900 hover:bg-warm-100 rounded-lg transition-colors"
                    >
                      Pogledaj
                    </Link>
                    <Link
                      href={`/admin/recepti/${recipe.slug}/edit`}
                      className="px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      Uredi
                    </Link>
                    <DeleteButton slug={recipe.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recipes.length === 0 && (
          <div className="text-center py-12 text-warm-500">
            Nema recepata. Dodajte prvi recept!
          </div>
        )}
      </div>
    </div>
  )
}

