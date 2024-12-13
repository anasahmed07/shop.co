'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react'

interface Review {
  id: number
  author: string
  rating: number
  content: string
  date: string
}

interface Product {
  id: number
  name: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  reviewCount: number
  description: string
  colors: string[]
  sizes: string[]
  images: string[]
  reviews: Review[]
}

interface RelatedProduct {
  id: number
  name: string
  price: number
  oldPrice: number
  rating: number
  image: string
}

// This would typically come from an API or database
const product: Product = {
  id: 1,
  name: "ONE LIFE GRAPHIC T-SHIRT",
  price: 260,
  oldPrice: 300,
  discount: 13,
  rating: 4.5,
  reviewCount: 45,
  description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  colors: ["#5A5B40", "#2B4754", "#3C4854"],
  sizes: ["Small", "Medium", "Large", "X-Large"],
  images: ["/images/products/gradient-graphic-t-shirt.png", "/images/products/black-striped-t-shirt.png", "/images/products/polo-with-tipping-details.png"],
  reviews: [
    {
      id: 1,
      author: "Samantha D.",
      rating: 5,
      content: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. It's my new favorite shirt. I appreciate the attention to detail. It's definitely worth the purchase!",
      date: "August 14, 2023"
    },
    {
      id: 2,
      author: "Alex M.",
      rating: 4,
      content: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Sizing is pretty accurate. Really happy about this purchase!",
      date: "August 15, 2023"
    },
    // Add more reviews as needed
  ]
}

const relatedProducts: RelatedProduct[] = [
  { id: 2, name: "Polo with Contrast Trims", price: 212, oldPrice: 242, rating: 4.3, image: "/placeholder.svg" },
  { id: 3, name: "Gradient Graphic T-shirt", price: 145, oldPrice: 165, rating: 4.5, image: "/placeholder.svg" },
  { id: 4, name: "Polo with Tipping Details", price: 180, oldPrice: 200, rating: 4.8, image: "/placeholder.svg" },
  { id: 5, name: "Black Striped T-shirt", price: 120, oldPrice: 150, rating: 4.4, image: "/placeholder.svg" },
]

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [mainImage, setMainImage] = useState(product.images[0])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li><Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
          <li><span className="text-gray-300 mx-2">&gt;</span></li>
          <li><Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link></li>
          <li><span className="text-gray-300 mx-2">&gt;</span></li>
          <li><Link href="/shop/men" className="text-gray-500 hover:text-gray-700">Men</Link></li>
          <li><span className="text-gray-300 mx-2">&gt;</span></li>
          <li><Link href="/shop/men/t-shirts" className="text-gray-500 hover:text-gray-700">T-shirts</Link></li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  onClick={() => setMainImage(image)}
                >
                  <span className="sr-only">Image {index + 1}</span>
                  <span className="absolute inset-0 rounded-md overflow-hidden">
                    <Image src={image} alt="" className="w-full h-full object-center object-cover" width={96} height={96} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full aspect-w-1 aspect-h-1">
            <Image
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-center object-cover sm:rounded-lg"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`${
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                    } h-5 w-5 flex-shrink-0`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">{product.description}</p>
          </div>

          <div className="mt-4 flex items-center">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            <p className="ml-4 text-xl font-medium text-gray-500 line-through">${product.oldPrice}</p>
            <p className="ml-4 text-lg font-medium text-red-500">-{product.discount}%</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    color === selectedColor ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 flex items-center space-x-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    size === selectedSize
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <div className="max-w-xs w-full">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-5 w-5" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full text-center border-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-4"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Product details, reviews, and FAQs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['details', 'reviews', 'faqs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'details' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <p className="mt-4 text-gray-500">
                Detailed information about the product would go here. This could include materials,
                care instructions, sizing details, and other relevant information.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <div className="mt-6 space-y-10">
                {product.reviews.map((review) => (
                  <div key={review.id} className="flex flex-col sm:flex-row">
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={`${
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                            } h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                      <div className="mt-3 space-y-6 text-sm text-gray-600">{review.content}</div>
                      <p className="mt-2 text-sm text-gray-500">Posted on {review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
              <p className="mt-4 text-gray-500">
                FAQs about the product would be listed here. This could include questions about sizing,
                care, shipping, returns, and other common inquiries.
              </p>
            
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div className="mt-24">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                  width={280}
                  height={320}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">${product.oldPrice}</p>
              <div className="mt-1">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`${
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                    } h-5 w-5 inline-block`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}