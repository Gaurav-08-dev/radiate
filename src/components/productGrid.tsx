import Image from 'next/image'
import { Button } from '@/components/ui/button';
import signatureCandle from "@/assets/signature-candle.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Product {
  id: string
  name: string
  description: string
  size: string
  price: number
  pricePerPc?: number
  image: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Chocolate Fudge - 2 Wick Candle',
    description: 'Comforting notes of Chocolate, Hazelnut & Vanilla',
    size: 'Classic- 160 gm/ 5.6 oz',
    price: 599,
    image: signatureCandle.src
  },
  {
    id: '2',
    name: 'Dancing Cacti- Set Of 4',
    description: 'Colorful mini cactus candles for lively decor.',
    size: 'Mini - 50 gm each',
    price: 324,
    pricePerPc: 81,
    image:signatureCandle.src
  },
  {
    id: '3',
    name: 'Purple Haze - 2 Wick Candle',
    description: 'Delicate Floral notes of Lavender, Ylang-Ylang & Sandalwood',
    size: 'Classic- 160 gm/ 5.6 oz',
    price: 599,
    image:signatureCandle.src
  }
  ,
  {
    id: '4',
    name: 'Dancing Cacti- Set Of 4',
    description: 'Colorful mini cactus candles for lively decor.',
    size: 'Mini - 50 gm each',
    price: 324,
    pricePerPc: 81,
    image:signatureCandle.src
  },
  {
    id: '5',
    name: 'Purple Haze - 2 Wick Candle',
    description: 'Delicate Floral notes of Lavender, Ylang-Ylang & Sandalwood',
    size: 'Classic- 160 gm/ 5.6 oz',
    price: 599,
    image:signatureCandle.src
  }
]

export function ProductGrid() {
  return (
    <div className="px-44 py-12">
      <h1 className="text-4xl font-serif text-center py-8">Customer Favorites</h1>
      
      <nav className="flex gap-8 p-6 text-sm font-medium tracking-wider">
        <a href="#" className="hover:text-purple-600">VIEW ALL</a>
        <a href="#" className="hover:text-purple-600">SCENTED CANDLES</a>
        <a href="#" className="hover:text-purple-600">PILLAR CANDLES</a>
      </nav>
      
      <div className="px-6">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col p-4 border-[0.5px] border-purple-200 rounded-lg w-72 mx-auto h-[500px]">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4 h-[200px] ">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-items-end">
                    <h2 className="text-2xl font-serif mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-gray-600 mb-2">{product.size}</p>
                    
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl">Rs {product.price}</span>
                      {product.pricePerPc && (
                        <span className="text-sm text-gray-600">
                          / Rs {product.pricePerPc} per pc
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="mt-auto bg-purple-800 hover:bg-purple-700"
                    >
                      ADD TO MY BAG
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2"  />
        </Carousel>
      </div>
    </div>
  )
}

