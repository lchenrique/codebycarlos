import type { CSSProperties, ImgHTMLAttributes } from "react";

const FALLBACK_BY_BASE: Record<string, string> = {
  "eu-v2": "eu-v2.jpg",
  "eu-about-v2": "eu-about-v2.jpg",
  cbc: "cbc.jpeg",
};

type BaseProps = {
  baseName: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  style?: CSSProperties;
};

export function SmartImage({
  baseName,
  alt,
  className,
  sizes,
  fill = false,
  priority = false,
  width,
  height,
  loading,
  decoding,
  style,
}: BaseProps) {
  const avifSrc = `/${baseName}.avif`;
  const fallbackSrc = `/${FALLBACK_BY_BASE[baseName] ?? `${baseName}.jpg`}`;

  const imgStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        color: "transparent",
        ...style,
      }
    : { color: "transparent", ...style };

  const priorityAttrs = priority
    ? ({ fetchPriority: "high" } as Record<string, string>)
    : ({} as Record<string, string>);

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding={priority ? "sync" : decoding ?? "async"}
        className={className}
        style={imgStyle}
        {...priorityAttrs}
      />
    </picture>
  );
}
