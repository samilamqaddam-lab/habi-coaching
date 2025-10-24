'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';

const navigation = [
  { name: 'Organisations', href: '/organisations' },
  { name: 'Programmes', href: '/programmes' },
  { name: 'Coaching', href: '/coaching' },
  { name: 'Ressources', href: '/ressources' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-warm-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="font-heading text-2xl md:text-3xl font-bold text-morocco-blue leading-none">
              HABI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-primary hover:text-terracotta transition-colors duration-200 font-medium text-[15px] leading-none py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <Button variant="primary" size="md" href="/contact">
              Réserver une session
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 space-y-4 animate-fadeIn">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-text-primary hover:text-terracotta transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" size="md" href="/contact" fullWidth>
              Réserver une session
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
