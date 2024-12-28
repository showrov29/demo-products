import { CartProvider } from '../contexts/cart-context'
import { MenuBar } from '../components/menu-bar'
import { ProductsGrid } from '../components/products-grid'

export default function Home() {
  return (
    <CartProvider>
      <MenuBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>
        <ProductsGrid />
      </main>
    </CartProvider>
  )
}

