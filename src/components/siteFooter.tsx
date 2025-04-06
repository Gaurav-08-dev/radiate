import Link from "next/link";
import {
  Instagram,
  FacebookIcon as Facebook,
  MailIcon as Mail,
  PhoneIcon as Phone,
  Youtube,
} from "lucide-react";
import { cn, playfair } from "@/lib/utils";
import { PHONE_NUMBER } from "@/lib/constants";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-auto bg-[#500769] px-8 py-8 text-white md:px-16 md:py-12",
        className,
      )}
      id="contact"
    >
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {/* Quick Links Section - Visible on both mobile and desktop */}
        <div className="order-1 space-y-3 md:space-y-4">
          <h2
            className={`${playfair.className} mb-4 text-xl md:mb-6 md:text-2xl`}
          >
            Quick Links
          </h2>
          <div className="space-y-2 text-sm md:space-y-3 md:text-base">
            <Link href="/faq" className="block hover:opacity-80">
              FAQs
            </Link>
            {/* <Link 
              href="/return-refund-policy" 
              className="block hover:opacity-80"
            >
              Return & Refund Policy
            </Link> */}

            <Link href="/terms&conditions" className="block hover:opacity-80">
              Terms & Conditions
            </Link>
            <Link href="/return-refund-policy" className="block hover:opacity-80">
              Shipping, Return & Refund Policy
            </Link>
            <Link href="/about-us" className="block hover:opacity-80">
              About Us
            </Link>
          </div>
        </div>

        {/* Contact Us Section - Visible on both mobile and desktop */}
        <div className="order-2 space-y-3 md:space-y-4">
          <h2
            className={`${playfair.className} mb-4 text-xl md:mb-6 md:text-2xl`}
          >
            Contact us
          </h2>
          <div className="space-y-2 text-sm md:space-y-3 md:text-base">
            <a
              href="mailto:radiatecandles24@gmail.com"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              radiatecandles24@gmail.com
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <Phone className="h-4 w-4 md:h-5 md:w-5" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* Connect with Us Section - Desktop Only */}
        <div className="order-3 hidden space-y-4 md:block">
          <h2
            className={`${playfair.className} mb-4 text-xl md:mb-6 md:text-2xl`}
          >
            Connect with us
          </h2>
          <div className="flex items-center gap-4">
            <a
              title="Instagram"
              href="https://www.instagram.com/letsradiate.in/#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              title="YouTube"
              href="https://www.youtube.com/@letsradiate-in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Youtube className="h-6 w-6" />
            </a>

            <a
              title="Facebook"
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
        <div className="order-3 flex items-center gap-4 md:hidden">
          <a
            title="Instagram"
            href="https://www.instagram.com/letsradiate.in/#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            title="YouTube"
            href="https://www.youtube.com/@letsradiate-in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a
            title="Facebook"
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
  );
}
