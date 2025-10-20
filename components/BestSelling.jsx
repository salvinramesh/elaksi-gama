'use client'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'

const BestSelling = () => {
  const displayQuantity = 8
  const [bestList, setBestList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchBestSelling() {
      try {
        const res = await fetch(`/api/products?mode=best&limit=${displayQuantity}`)
        if (!res.ok) throw new Error('Failed to fetch best selling products')
        const data = await res.json()
        if (mounted) setBestList(data.products || [])
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchBestSelling()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div id="best-selling" className="px-6 my-30 max-w-6xl mx-auto scroll-mt-24">
      <Title
        title="Best Selling"
        description={`Showing ${bestList.length} products`}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {loading ? (
          <p className="text-center text-slate-500 w-full py-10">Loading best selling products...</p>
        ) : error ? (
          <p className="text-center text-red-500 w-full py-10">{error}</p>
        ) : bestList.length > 0 ? (
          bestList.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          <p className="text-center text-slate-500 w-full py-10">No best selling products available.</p>
        )}
      </div>
    </div>
  )
}

export default BestSelling
