'use client'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'

const LatestProducts = () => {
  const displayQuantity = 4
  const [latestList, setLatestList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchLatestProducts() {
      try {
        const res = await fetch(`/api/products?mode=latest&limit=${displayQuantity}`)
        if (!res.ok) throw new Error('Failed to fetch latest products')
        const data = await res.json()
        if (mounted) setLatestList(data.products || [])
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchLatestProducts()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div id="latest-products" className="px-6 my-30 max-w-6xl mx-auto scroll-mt-24">
      <Title
        title="Latest Products"
        description={`Showing ${latestList.length} products`}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {loading ? (
          <p className="text-center text-slate-500 w-full py-10">Loading latest products...</p>
        ) : error ? (
          <p className="text-center text-red-500 w-full py-10">{error}</p>
        ) : latestList.length > 0 ? (
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
