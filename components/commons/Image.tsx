import React from 'react';
type StaticImport = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

type NativeImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

interface ImageProps extends NativeImgProps {
  src: string | StaticImport;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean
}

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  fill = false,
  ...rest
}: ImageProps) => {
  const imgWidth = width ?? (typeof src !== 'string' ? src.width : undefined);
  const imgHeight = height ?? (typeof src !== 'string' ? src.height : undefined);
  const imageSrc = typeof src === 'string' ? src : src.src

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      className={`${className} ${fill?'absolute top-0 left-0 w-full h-full':''}`}
      style={style}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
};

export default Image;
