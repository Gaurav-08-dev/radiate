'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface FilterOptions {
  candleType?: string[]
  scentFamily?: string[]
  mood?: string[]
  room?: string[] 
  specialDays?: string[]
  availability?: string[]
}

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sortBy, setSortBy] = useState('Featured')

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const urlFilters: FilterOptions = {}
    
    // Parse URL params into filters
    params.forEach((value, key) => {
      if (value) {
        urlFilters[key as keyof FilterOptions] = value.split(',')
      }
    })
    
    setFilters(urlFilters)
    setSortBy(params.get('sortBy') || 'Featured')
  }, [searchParams])

  const updateFilters = (category: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters }
    
    if (!newFilters[category]) {
      newFilters[category] = [value]
    } else if (newFilters[category]?.includes(value)) {
      newFilters[category] = newFilters[category]?.filter(v => v !== value)
      if (newFilters[category]?.length === 0) {
        delete newFilters[category]
      }
    } else {
      newFilters[category] = [...(newFilters[category] || []), value]
    }

    // Update URL
    const params = new URLSearchParams(searchParams)
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values?.length) {
        params.set(key, values.join(','))
      } else {
        params.delete(key)
      }
    })
    
    router.push(`${pathname}?${params.toString()}`)
    setFilters(newFilters)
  }

  return (
    <div className="flex gap-8 p-6">
      {/* Filters sidebar */}
      <div className="w-64 space-y-6">
        <div>
          <label className="block mb-2 font-medium">Sort By</label>
          <select 
            title="Sort By"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              const params = new URLSearchParams(searchParams)
              params.set('sortBy', e.target.value)
              router.push(`${pathname}?${params.toString()}`)
            }}
            className="w-full p-2 border rounded outline-none"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Filter sections */}
        <FilterSection
          title="Candle Type"
          options={[
            'Signature Candles',
            'Scented Votive Candles',
            'Designer Pillars Candles',
            'Floating Candles'
          ]}
          selected={filters.candleType || []}
          onChange={(value) => updateFilters('candleType', value)}
        />
        {/* Add other filter sections similarly */}
      </div>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  options: string[]
  selected: string[]
  onChange: (value: string) => void
}

function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
  return (
    <div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
