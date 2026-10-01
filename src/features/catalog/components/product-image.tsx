import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Above-the-fold LCP candidate: load eagerly with high fetch priority */
  priority?: boolean;
}

/**
 * Product imagery container. Keeps a neutral surface behind the image
 * so products stay visually accurate in both light and dark themes.
 */
export function ProductImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  priority = false,
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "product-surface relative aspect-4/5 w-full overflow-hidden",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        draggable="false"
        fill
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );
}
