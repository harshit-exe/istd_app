import React from 'react';
import ShinyText from '@/components/Home/Animations/ShinyText';
import { Facebook, Twitter, Instagram, LinkedinIcon as LinkedIn, GitlabIcon as GitHub } from 'lucide-react';



export function Footer() {
  return (
    <footer className="relative py-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 animate-gradient"
        style={{
          backgroundSize: "400% 400%",
        }}
      />
      <div
        className="relative container mx-auto px-4 text-center text-white"
      >
        <p className="text-3xl font-bold mb-4"></p>
        <div className='text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500'>
        <ShinyText text="Created with love by Cypher Squad" disabled={false} speed={2} className='custom-class' />
        </div>
        <div className="flex justify-center space-x-4">
          {["Ritesh", "Harshit", "Aman", "Prajjval"].map((member, index) => (
            <span
              key={member}
              className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
            >
              {<ShinyText text={member} disabled={false} speed={1} className='custom-class' />}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          {[
            { Icon: Facebook, href: "#", label: "Facebook" },
            { Icon: Twitter, href: "#", label: "Twitter" },
            { Icon: Instagram, href: "#", label: "Instagram" },
            { Icon: LinkedIn, href: "#", label: "LinkedIn" },
            { Icon: GitHub, href: "#", label: "GitHub" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={label}
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

