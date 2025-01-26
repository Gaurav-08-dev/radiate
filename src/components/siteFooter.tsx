import Link from "next/link"
import { Instagram, FacebookIcon as Facebook, MailIcon as Mail, PhoneIcon as Phone } from 'lucide-react'
import { cn } from "@/lib/utils"

export function SiteFooter({className}: {className?: string}) {
  return (
    <footer className={cn("bg-[#500769] text-white py-12 px-16 mt-auto", className)} id="contact">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Us Section */}
        <div className="space-y-4  pr-16">
          <h2 className="text-2xl font-playfair mb-6">Contact us</h2>
          <div className="space-y-3">
            <a 
              href="mailto:radiatecandles24@gmail.com" 
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Mail className="h-5 w-5" />
              radiatecandles24@gmail.com
            </a>
            <a 
              href="tel:+917011456324" 
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Phone className="h-5 w-5" />
              +91 7011456324
            </a>
          </div>
        </div>

        {/* Connect with Us Section */}
        <div className="space-y-4  pr-16">
          <h2 className="text-2xl font-playfair mb-6">Connect with us</h2>
          <div className="space-y-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair mb-6">Quick Links</h2>
          <div className="space-y-3">
            <Link 
              href="/faqs" 
              className="block hover:opacity-80"
            >
              FAQs
            </Link>
            <Link 
              href="/return-policy" 
              className="block hover:opacity-80"
            >
              Return & refund policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

