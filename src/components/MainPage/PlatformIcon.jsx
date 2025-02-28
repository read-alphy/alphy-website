import React from 'react';
import Image from 'next/image';

/**
 * PlatformIcon component for rendering consistent platform icons
 * with support for custom elements and optimized image loading
 */
export default function PlatformIcon({ 
  icon, 
  name, 
  alt, 
  isCustom = false,
  showLabel = true
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {isCustom ? (
        <div className="flex justify-center items-center">
          {icon}
        </div>
      ) : (
        <Image
          src={icon}
          alt={alt || name}
          height={64}
          width={80}
          className="object-contain h-16 rounded-lg"
        />
      )}
      {showLabel && (
        <p className="hidden md:block text-center mt-2 text-sm text-slate-600 dark:text-zinc-400 quicksand">
          {name}
        </p>
      )}
    </div>
  );
}