import React from "react";
import { assets } from "../assets/assets";
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

const Foot = () => {
  return (
    <footer className="w-full bg-[#f5f5f7] px-6 md:px-20 py-14 mt-20">
      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & Description */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="w-16 sm:w-20 cursor-pointer hover:scale-105 transition duration-300"
          />

          <p className="text-gray-500 leading-8 mt-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>

          <ul className="text-gray-500 space-y-3 mt-5">
            <li>
              <a href="/" className="hover:text-black transition">
                Home
              </a>
            </li>

            <li>
              <a href="/blog" className="hover:text-black transition">
                Blog
              </a>
            </li>

            <li>
              <a href="/guidance" className="hover:text-black transition">
                Offers & Deals
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-black transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Need Help */}
        <div>
          <h2 className="text-lg font-semibold">Need Help?</h2>

          <ul className="text-gray-500 space-y-3 mt-5">
            <li>
              <a href="/" className="hover:text-black transition">
                Delivery Information
              </a>
            </li>

            <li>
              <a href="/blog" className="hover:text-black transition">
                Return & Refund Policy
              </a>
            </li>

            <li>
              <a href="/guidance" className="hover:text-black transition">
                Payment Methods
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-black transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>

          <ul className="text-gray-500 space-y-4 mt-5">
            <li className="flex items-center gap-2 hover:text-black cursor-pointer transition">
              <FaInstagram />
              Instagram
            </li>

            <li className="flex items-center gap-2 hover:text-black cursor-pointer transition">
              <FaTwitter />
              Twitter
            </li>

            <li className="flex items-center gap-2 hover:text-black cursor-pointer transition">
              <FaFacebookF />
              Facebook
            </li>

            <li className="flex items-center gap-2 hover:text-black cursor-pointer transition">
              <FaYoutube />
              YouTube
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-500 text-sm">
        Copyright 2026 © Ashutosh Chaubey - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Foot;
