/**
 * Site logo — the RG monogram image (transparent PNG).
 * Rendered via <img> so the header/footer share the same mark as /RG.png.
 */
export default function Logo({
  height = 44,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/RG.png"
      alt="Rabin Glan - Full Stack Developer Logo"
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
