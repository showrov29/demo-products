'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Trash2 } from 'lucide-react'
import { cn } from '../lib/utils'
import { formatPrice } from '../utils/format-price'
// import { Product } from '@/types/product'
import { QuickViewModal } from './quick-view-modal'
import { useCart } from '../contexts/cart-context'
import { Button } from '../components/ui/button'

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    cartItems, 
    toggleWishlist, 
    isInWishlist 
  } = useCart()

  const cartItem = cartItems.find(item => item.product.id === product.id)
  const quantity = cartItem?.quantity || 0
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const handleQuantityChange = (increment) => {
    const newQuantity = increment ? quantity + 1 : quantity - 1
    if (newQuantity === 0) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id)
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product.id)
  }

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-sm relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 z-10 bg-[#F97316] text-white px-2 py-1 rounded text-sm">
            -{formatPrice(product.discountPercentage)}%
          </div>
        )}
        <button 
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full transition-opacity",
            isHovered || quantity > 0 ? "opacity-100" : "opacity-0",
            isWishlisted ? "bg-red-100" : "bg-white"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
        
        <div className="relative aspect-[3/4]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className={cn(
            "absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-4/5 py-2 bg-white hover:bg-gray-100 rounded text-gray-800 font-medium transition-colors"
              >
                Add to Cart
              </button>
            ) : (
              <div className="w-4/5 bg-green-600 text-white rounded px-3 py-2 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFromCart}
                  className="text-white hover:text-red-200 hover:bg-green-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <span>{quantity} Added in Cart</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleQuantityChange(false)}
                    className="hover:bg-green-700 p-1 rounded transition-colors"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => handleQuantityChange(true)}
                    className="hover:bg-green-700 p-1 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <button 
              onClick={() => setIsQuickViewOpen(true)}
              className="w-4/5 py-2 bg-white hover:bg-gray-100 rounded text-gray-800 font-medium transition-colors"
            >
              Quick View
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600">{product.brand}</p>
          <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-blue-600 font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <QuickViewModal 
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}

