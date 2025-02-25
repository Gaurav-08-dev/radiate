import Link from "next/link"
import { Instagram, FacebookIcon as Facebook, MailIcon as Mail, PhoneIcon as Phone } from 'lucide-react';
import { cn, playfair } from "@/lib/utils"

export function SiteFooter({className}: {className?: string}) {
  return (
    <footer className={cn("bg-[#500769] text-white py-8 md:py-12 px-8 md:px-16 mt-auto", className)} id="contact">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Quick Links Section - Visible on both mobile and desktop */}
        <div className="space-y-3 md:space-y-4 order-1">
          <h2 className={`${playfair.className} text-xl md:text-2xl mb-4 md:mb-6`}>Quick Links</h2>
          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <Link 
              href="/faq" 
              className="block hover:opacity-80"
            >
              FAQs
            </Link>
            {/* <Link 
              href="/return-refund-policy" 
              className="block hover:opacity-80"
            >
              Return & Refund Policy
            </Link> */}

            <Link 
              href="/terms&conditions" 
              className="block hover:opacity-80"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Contact Us Section - Visible on both mobile and desktop */}
        <div className="space-y-3 md:space-y-4 order-2">
          <h2 className={`${playfair.className} text-xl md:text-2xl mb-4 md:mb-6`}>Contact us</h2>
          <div className="space-y-2 md:space-y-3 text-sm md:text-base">
            <a 
              href="mailto:radiatecandles24@gmail.com"  
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              radiatecandles24@gmail.com
            </a>
            <a 
              href="tel:+917011145443" 
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Phone className="h-4 w-4 md:h-5 md:w-5" />
              +91 7011145443
            </a>
          </div>
        </div>

        {/* Connect with Us Section - Desktop Only */}
        <div className="hidden md:block space-y-4 order-3">
          <h2 className={`${playfair.className} text-xl md:text-2xl mb-4 md:mb-6`}>Connect with us</h2>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/radiatecandles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Radiate-Candles/61562013155559/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Social Media Icons - Mobile Only */}
        <div className="flex md:hidden gap-4 order-3">
          <a 
            href="https://instagram.com/radiatecandles" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a 
            href="https://www.facebook.com/people/Radiate-Candles/61562013155559/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

