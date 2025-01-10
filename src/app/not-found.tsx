import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#FDF6F0] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="font-serif text-6xl text-[#500769]">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl text-[#500769]">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you&apos;re looking for seems to have melted away. Let&apos;s get you back home.
        </p>
        <Link href="/" >
          <Button 
            variant="default" 
            size="lg"
            className="bg-[#500769] hover:bg-[#500769]/90 mt-4"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}