import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

const NAV_LINKS = [
  { href: '/#play-game', label: 'Play Game' },
];

export const TopNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 py-4">
        {/* Wordmark */}
        <a
          href="/"
          className="text-lg lg:text-xl font-serif font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 hover:text-[#9E3A14] transition-colors"
        >
          Shax
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-sans font-medium text-[#57534E]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden p-2 text-[#57534E] hover:text-[#1C1917]"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE5DC] bg-[#FAF8F5] px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-widest font-medium text-[#57534E] hover:text-[#1C1917]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};