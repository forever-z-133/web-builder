import { describe, test, expect } from 'vitest'
import {
  hyphenate,
  camelize
} from '../src/utils/for-health'

describe('src/utils/for-health.ts', () => {
  test('hyphenate', () => {
    expect(camelize('font')).toBe('font')
    expect(hyphenate('fontSize')).toBe('font-size')
    expect(hyphenate('FontSize')).toBe('font-size')
  })

  test('camelize', () => {
    expect(camelize('font')).toBe('font')
    expect(camelize('font-')).toBe('font-')
    expect(camelize('font-size')).toBe('fontSize')
    expect(camelize('-font-size')).toBe('FontSize')
  })
})
