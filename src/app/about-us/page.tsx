import Image from "next/image";
import logo from "@/assets/logo.svg"; 
import AboutUsImage from "@/assets/right.jpg";

export default function AboutUs() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="mb-6 h-20 w-20">
            <Image src={logo} alt="Diamond" className="h-full w-full" />
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 font-serif text-3xl italic text-center md:text-4xl">
            Crafted with love, rooted in India
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-center text-gray-700 max-w-2xl">
            A homegrown, women-led brand creating handcrafted products inspired by Indian traditions and self-care rituals
          </p>

          {/* Image Section */}
          <div className="w-full max-w-2xl mb-10 border border-gray-300">
            <Image 
              src={AboutUsImage}
              alt="Candle making process" 
              width={600} 
              height={400}
              className="w-full"
            />
          </div>

          {/* Experience Section */}
          <h2 className="mb-4 font-serif text-2xl italic text-center">
            More than just products, we create experiences
          </h2>
          <p className="mb-10 text-center text-gray-700 max-w-2xl">
            Every fragrance, every product is designed to bring warmth, love, and meaning into your everyday moments.
          </p>

          {/* Values Section */}
          <div className="w-full flex justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <div className="text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <span className="font-medium">Handcrafted with care</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Sustainably sourced</span>
            </div>
          </div>

          {/* Built for India Section */}
          <h2 className="mb-4 font-serif text-2xl italic text-center">
            Built for India, by India
          </h2>
          <p className="mb-10 text-center text-gray-700 max-w-2xl">
            Unlike mass-produced imports, our products are designed keeping in mind Indian culture, traditions, and preferences.
          </p>

          {/* Certifications Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl">
            <div className=" p-4 rounded-md shadow-lg bg-[#E5E5E5]">
              <h3 className="text-purple-800 font-medium mb-2">Registered Trademark & GST Certified</h3>
              <p className="text-gray-600">Authenticity you can trust</p>
            </div>
            <div className=" p-4 rounded-md shadow-lg bg-[#E5E5E5]">
              <h3 className="text-purple-800 font-medium mb-2">Ancient Indian Fragrance Knowledge</h3>
              <p className="text-gray-600">Blends that enhance mood & well-being</p>
            </div>
            <div className=" p-4 rounded-md shadow-lg bg-[#E5E5E5]">
              <h3 className="text-purple-800 font-medium mb-2">In-House Production</h3>
              <p className="text-gray-600">Quality control at every step</p>
            </div>
            <div className=" p-4 rounded-md shadow-lg bg-[#E5E5E5]">
              <h3 className="text-purple-800 font-medium mb-2">Community-Driven</h3>
              <p className="text-gray-600">Following sustainable practices</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
