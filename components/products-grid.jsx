'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './product-card'

export function ProductsGrid() {
  const [sampleData, setSampleData] = useState([]) // Initialize with an empty array
  const [loading, setLoading] = useState(true)    // Loading state

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)
        setSampleData(data.products)  // Assuming data has a 'products' array
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setLoading(false) // Set loading to false once fetch completes
      })
  }, [])

  // Show a loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>
  }

  // Render the grid once the data is available
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {sampleData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://dummyjson.com/products')
  console.log("🚀 ~ getServerSideProps ~ res:", res)
  const repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}