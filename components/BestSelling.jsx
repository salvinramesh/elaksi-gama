'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const BestSelling = () => {
  const displayQuantity = 8
  const products = useSelector(state => state.product.list || [])

  // Defensive: ensure rating is an array before using .length
  const bestList = products
    .slice()
    .sort((a, b) => (b.rating ? b.rating.length : 0) - (a.rating ? a.rating.length : 0))
    .slice(0, displayQuantity)

  // Debug log (remove after verifying)
  if (typeof window !== 'undefined') {
    console.log('BestSelling picks:', bestList.map(p => ({ id: p.id, name: p.name, ratingLen: p.rating ? p.rating.length : 0 })))
  }

  return (
    <div id="best-selling" className='px-6 my-30 max-w-6xl mx-auto scroll-mt-24'>
      <Title
        title='Best Selling'
        description={`Showing ${bestList.length} of ${products.length} products`}
        href='/shop'
      />
      <div className='mt-12  grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
        {bestList.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSelling
