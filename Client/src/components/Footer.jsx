import React from "react";
import { assets } from "../assets/assets";
import {motion} from 'motion/react'

const Footer = () => {
  return (
    <motion.footer
    initial={{opacity:0, y:30}} whileInView={{opacity:1,y:0}} transition={{duration: 0.5}}
    className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white mt-26">
      {/* Top section */}
      <motion.div
      initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} transition={{duration: 0.5,delay:0.3}}
      className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-borderColor text-gray-500">
        {/* Logo + description */}
        <div className="max-w-sm">
          <motion.img 
          initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 0.6,delay:0.2}}
          className="w-32" src={assets.logo} alt="logo" />
          <motion.p 
          initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 0.5,delay:0.4}} 
          className="mt-6 text-sm leading-relaxed">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
          initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 0.5,delay:0.5}} 
          className="flex items-center gap-4 mt-6">
            <a href="#" className="hover:opacity-70 transition">
              <img
                src={assets.instagram_logo}
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>

            <a href="#" className="hover:opacity-70 transition">
              <img
                src={assets.facebook_logo}
                alt="Facebook"
                className="w-5 h-5"
              />
            </a>

            <a href="#" className="hover:opacity-70 transition">
              <img
                src={assets.twitter_logo}
                alt="Twitter"
                className="w-5 h-5"
              />
            </a>

            <a href="#" className="hover:opacity-70 transition">
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Links */}
        <motion.div
        initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration: 0.6,delay:0.4}} 
        className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Browse Cars
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  List Your Car
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 94107</li>
              <li>+1 234 567890</li>
              <li>info@example.com</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom section */}
      <motion.div 
      initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} transition={{duration: 0.6,delay:0.6}} 
      className="flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <span> | </span>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <span> | </span>
          <a href="#" className="hover:underline">
            Cookies
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
