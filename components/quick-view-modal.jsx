'use client'

import Image from 'next/image'
import { Dialog, DialogContent } from '../components/ui/dialog'
import { formatPrice } from '../utils/format-price'
import { DialogTitle } from '@radix-ui/react-dialog'
// import { Product } from '@/types/product'

// interface QuickViewModalProps {
//   product: Product | null
//   isOpen: boolean
//   onClose: () => void
// }

export function QuickViewModal({ product, isOpen, onClose }) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTitle className="text-lg font-semibold">{product.title}</DialogTitle>   */}
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[3/4]">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <DialogTitle className="text-lg font-semibold">{product.title}</DialogTitle>
            {/* <h2 className="text-xl font-semibold mt-1">{product.title}</h2> */}
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-blue-600 text-2xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

