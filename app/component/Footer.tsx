"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // Handle newsletter subscription
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend or email service
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-burntgold">About Us</h3>
            <p className="text-gray-400">
              TDA Couture is a bespoke and ready-to-wear tailoring company
              providing affordable outfits for today’s man. Our unique selling
              point is our speed—we provide outfits 24 hours after taking
              measurements. Our headquarters is located in Lagos, Nigeria, with
              branches in a few other countries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-burntgold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-burntgold">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-burntgold"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-burntgold"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/exchange-and-return"
                  className="text-gray-400 hover:text-burntgold"
                >
                  Return & Exchange Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-burntgold">
              Contact Us
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@example.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>
                Address: 7a Wole Ariyo St, Lekki Phase I, Lekki, Nigeria, Lagos,
                Lagos State
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-burntgold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-burntgold"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-burntgold"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-burntgold"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-burntgold"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-burntgold">
              Newsletter
            </h3>
            {subscribed ? (
              <p className="text-gray-400">
                Thank you for subscribing to our newsletter!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-burntgold"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-burntgold text-black py-2 rounded hover:bg-opacity-80 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} TDA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
