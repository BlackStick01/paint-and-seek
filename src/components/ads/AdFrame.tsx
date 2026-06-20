type AdFrameProps = {
  src: string;
  width: number;
  height: number;
  title: string;
  className?: string;
};

export function AdFrame({ src, width, height, title, className }: AdFrameProps) {
  if (!src) return null;

  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      scrolling="no"
      loading="lazy"
      className={className}
      style={{
        width,
        height,
        border: 'none',
        overflow: 'hidden',
        display: 'block',
        background: 'transparent'
      }}
    />
  );
}
