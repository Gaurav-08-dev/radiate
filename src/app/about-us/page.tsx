import Image from "next/image";
import logo from "@/assets/logo.svg";
import AboutUsImage from "@/assets/right.jpg";
import safe from "@/assets/sustainably-sourced.png";
import madeInIndia from "@/assets/made-in-india.png";

export default function AboutUs() {
  return (
    <main className="min-h-screen px-0 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 h-20 w-20 px-4">
            <Image src={logo} alt="Diamond" className="h-full w-full" />
          </div>

          {/* Main Heading */}
            <h1 className="px-4 mb-4 text-center font-serif text-3xl italic md:text-4xl">
            Crafted with love, rooted in India
          </h1>

          {/* Subheading */}
            <p className="px-4 mb-8 max-w-2xl text-center text-gray-700">
            A homegrown, women-led brand creating handcrafted products inspired
            by Indian traditions and self-care rituals
          </p>

          {/* Image Section */}
          <div className="px-4 mb-10 w-full max-w-2xl flex justify-center">
            <Image
              src={AboutUsImage}
              alt="Candle making process"
              width={400}
              height={300}
              className="w-[400px] h-[300px] object-cover"
            />
          </div>

          {/* Experience Section */}
          <h2 className="px-4 mb-4 text-center font-serif text-2xl italic">
            More than just products, we create experiences
          </h2>
          <p className="px-4 mb-10 max-w-2xl text-center text-gray-700">
            Every fragrance, every product is designed to bring warmth, love,
            and meaning into your everyday moments.
          </p>

          {/* Values Section */}
          
          <div className="py-2 px-0 text-xs mb-10 flex w-full justify-center gap-4 bg-[#500769] text-white md:flex-row flex-col items-center md:items-start overflow-hidden relative">
            {/* Mobile carousel animation wrapper */}
            <div className="flex md:hidden w-full overflow-hidden">
              <div className="animate-carousel flex gap-4 items-center">
                {/* First set of items */}
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <span className="font-medium">Handcrafted with care</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Sustainably sourced</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white font-bold">
                    <Image src={safe} alt="Safe" className="h-6 w-6" />
                  </div>
                  <span className="font-medium">Safe & toxin-free</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <Image src={madeInIndia} alt="Made for India" className="h-6 w-6" />
                  </div>
                  <span className="font-medium">Made for Indian preferences</span>
                </div>
                
                {/* Duplicate items for seamless looping - exact copies of the above */}
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <span className="font-medium">Handcrafted with care</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Sustainably sourced</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white font-bold">
                    <Image src={safe} alt="Safe" className="h-6 w-6" />
                  </div>
                  <span className="font-medium">Safe & toxin-free</span>
                </div>
                <div className="flex items-center gap-2 min-w-max px-4">
                  <div className="text-white">
                    <Image src={madeInIndia} alt="Made for India" className="h-6 w-6" />
                  </div>
                  <span className="font-medium">Made for Indian preferences</span>
                </div>
              </div>
            </div>
            
            {/* Desktop static display */}
            <div className="hidden md:flex md:gap-4">
              <div className="flex items-center gap-2">
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <span className="font-medium">Handcrafted with care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">Sustainably sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white font-bold">
                  <Image src={safe} alt="Safe" className="h-6 w-6" />
                </div>
                <span className="font-medium">Safe & toxin-free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-white">
                  <Image src={madeInIndia} alt="Made for India" className="h-6 w-6" />
                </div>
                <span className="font-medium">Made for Indian preferences</span>
              </div>
            </div>
          </div>

          {/* Built for India Section */}
          <h2 className="px-4 mb-4 text-center font-serif text-2xl italic">
            Built for India, by India
          </h2>
          <p className="px-4 mb-10 max-w-2xl text-center text-gray-700">
            Unlike mass-produced imports, our products are designed keeping in
            mind Indian culture, traditions, and preferences.
          </p>

          {/* Certifications Grid */}
          <div className="px-4 grid w-full max-w-2xl grid-cols-2 gap-6 md:grid-cols-2">
            <div className="rounded-md bg-[#f8f8f8] p-4 shadow-md">
              <h3 className="text-center text-xs mb-2 font-medium text-purple-800">
                Registered Trademark & GST Certified
              </h3>
              <p className="text-gray-600 text-center text-xs">Authenticity you can trust</p>
            </div>
            <div className="rounded-md bg-[#f8f8f8] p-4 shadow-md">
              <h3 className="text-center text-xs mb-2 font-medium text-purple-800">
                Ancient Indian Fragrance Knowledge
              </h3>
              <p className="text-gray-600 text-center text-xs">
                Blends that enhance mood & well-being
              </p>
            </div>
            <div className="rounded-md bg-[#f8f8f8] p-4 shadow-md">
              <h3 className="text-center text-xs mb-2 font-medium text-purple-800">
                In-House Production
              </h3>
              <p className="text-gray-600 text-center text-xs">Quality control at every step</p>
            </div>
            <div className="rounded-md bg-[#f8f8f8] p-4 shadow-md">
              <h3 className="text-center text-xs mb-2 font-medium text-purple-800">
                Community-Driven
              </h3>
              <p className="text-gray-600 text-center text-xs">Following sustainable practices</p>
            </div>
          </div>

          <div className="mb-6 mt-12 px-4">
            
            <div className="flex justify-center space-x-8">
              {/* Instagram */}
              <a
                title="Instagram"
                href="https://www.instagram.com/letsradiate.in/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#500769] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                title="YouTube"
                href="https://www.youtube.com/@letsradiate-in"
                target="_blank"
                rel="noopener noreferrer"
                  className="text-[#500769] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                title="Facebook"
                href="https://www.facebook.com/people/Radiate-Candles/61562013155559/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#500769] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
