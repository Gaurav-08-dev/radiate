import React from 'react'
import FiltersSection from './FiltersSection'
const Page = () => {
  return (
    <div className="flex gap-8 p-6">
      <FiltersSection />
      <div className="flex-1">
        {/* Add your products grid component here */}
      </div>
    </div>
  )
}

export default Page