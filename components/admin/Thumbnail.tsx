'use client'

import Image from 'next/image'
import { Music } from 'lucide-react'

interface ThumbnailProps {
  imageUrl: string | null
  name: string
  size?: number
}

export default function Thumbnail({ imageUrl, name, size = 36 }: ThumbnailProps) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-md bg-slate-100"
      style={{ width: size, height: size }}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <div className="flex h-full items-center justify-center text-slate-300">
          <Music className="h-4 w-4" strokeWidth={1.5} />
        </div>
      )}
    </div>
  )
}
