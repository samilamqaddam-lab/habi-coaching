'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents as PTComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

export const portableTextComponents: PTComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(1200).quality(85).auto('format').url()}
              alt={value.alt || 'Image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-text-secondary mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-heading text-4xl font-bold text-deep-blue mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-3xl font-bold text-deep-blue mt-10 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl font-bold text-deep-blue mt-8 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-xl font-semibold text-deep-blue mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-primary leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-terracotta pl-6 my-8 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-soft-gray/30 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-terracotta hover:text-terracotta/80 underline underline-offset-2 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-text-primary leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-text-primary leading-relaxed">{children}</li>,
  },
}
