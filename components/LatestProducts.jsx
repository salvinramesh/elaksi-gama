'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {
  const displayQuantity = 4
  const products = useSelector(state => state.product.list || [])

  // Identify best-selling IDs
  const bestIds = products
    .slice()
    .sort((a, b) => (b.rating ? b.rating.length : 0) - (a.rating ? a.rating.length : 0))
    .slice(0, 8)
    .map(p => p.id)

  // Latest list (fallback: show even if overlaps when few items)
  const latestList = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(p => products.length > 8 ? !bestIds.includes(p.id) : true)
    .slice(0, displayQuantity)

  return (
    <div id="latest-products" className="px-6 my-30 max-w-6xl mx-auto scroll-mt-24">
      <Title
        title="Latest Products"
        description={`Showing ${latestList.length} of ${products.length} products`}
        href="/shop"
      />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {latestList.length > 0 ? (
          latestList.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          <p className="text-center text-slate-500 w-full py-10">No latest products available.</p>
        )}
      </div>
    </div>
  )
}

export default LatestProducts
