'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  const navigation = {
    services: [
      { name: t('common.footer.organisations'), href: '/organisations' },
      { name: t('common.footer.programmesYoga'), href: '/yoga' },
      { name: t('common.footer.coaching'), href: '/coaching' },
    ],
    about: [
      { name: t('common.footer.myJourney'), href: '/expertise' },
      { name: t('common.footer.blog'), href: '/blog' },
      { name: t('common.nav.contact'), href: '/contact' },
    ],
    legal: [
      { name: t('common.footer.mentionsLegales'), href: '/mentions-legales' },
      { name: t('common.footer.privacy'), href: '/confidentialite' },
      { name: t('common.footer.cgv'), href: '/cgv' },
    ],
  };

  return (
    <footer className="bg-deep-blue text-warm-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-dark.png"
              alt="Transcendence Work"
              width={180}
              height={60}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sage-light text-sm leading-relaxed">
              {t('common.footer.tagline')} - {t('common.footer.description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.services')}</h4>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sage-light hover:text-warm-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.about')}</h4>
            <ul className="space-y-2">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sage-light hover:text-warm-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.certifications')}</h4>
            <ul className="space-y-2 text-sm text-sage-light">
              <li>
                <strong className="text-warm-white">{t('common.footer.coachTeamEMCC')}</strong>
                <br />
                <span className="text-xs">(EMCC)</span>
              </li>
              <li className="pt-3">
                <strong className="text-warm-white">{t('common.footer.ishaFoundation')}</strong>
                <br />
                <span className="text-xs">{t('common.footer.hathaYoga')}</span>
              </li>
              <li className="pt-3">
                <strong className="text-warm-white">{t('common.footer.corporateExperience')}</strong>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.nav.contact')}</h4>
            <ul className="space-y-3 text-sm text-sage-light">
              <li>
                <a
                  href="mailto:contact@transcendencework.com"
                  className="hover:text-warm-white transition-colors duration-200"
                >
                  contact@transcendencework.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+212663096857"
                  className="hover:text-warm-white transition-colors duration-200"
                >
                  +212 663 096 857
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              {/* Social Icons */}
              <a
                href="https://open.spotify.com/show/3c1fH8hzdIRcFVwRGYQClR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-light hover:text-warm-white transition-colors p-3 -m-3 rounded-full hover:bg-warm-white/10"
                aria-label="Spotify Podcast"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hajar-habi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-light hover:text-warm-white transition-colors p-3 -m-3 rounded-full hover:bg-warm-white/10"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-morocco-blue">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sage-light text-sm">
              © {new Date().getFullYear()} Transcendence Work - Hajar Habi. {t('common.footer.copyright')}
            </p>
            <div className="flex space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sage-light hover:text-warm-white transition-colors duration-200 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
