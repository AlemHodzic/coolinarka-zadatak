import { describe, it, expect } from 'vitest'
import { createSlug } from '@/lib/slug'

describe('createSlug', () => {
  it('converts title to lowercase slug', () => {
    expect(createSlug('Sarma')).toBe('sarma')
    expect(createSlug('Burek S Mesom')).toBe('burek-s-mesom')
  })

  it('handles Croatian characters', () => {
    expect(createSlug('Ćevapi')).toBe('cevapi')
    expect(createSlug('Čokoladna Torta')).toBe('cokoladna-torta')
    expect(createSlug('Šopska Salata')).toBe('sopska-salata')
    expect(createSlug('Đuveč')).toBe('djuvec')
    expect(createSlug('Žito')).toBe('zito')
  })

  it('removes special characters', () => {
    expect(createSlug('Recept #1!')).toBe('recept-1')
    expect(createSlug('Mama\'s Kolač')).toBe('mamas-kolac')
  })

  it('handles multiple spaces', () => {
    expect(createSlug('Juha   od   rajčice')).toBe('juha-od-rajcice')
  })

  it('trims whitespace', () => {
    expect(createSlug('  Sarma  ')).toBe('sarma')
  })

  it('handles empty string', () => {
    expect(createSlug('')).toBe('')
  })

  it('handles numbers', () => {
    expect(createSlug('Recept 123')).toBe('recept-123')
    expect(createSlug('5 minuta palačinke')).toBe('5-minuta-palacinke')
  })
})
