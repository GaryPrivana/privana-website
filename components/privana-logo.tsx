import Image from 'next/image';

type PrivanaLogoProps = {
  variant: 'white' | 'black';
  className?: string;
  priority?: boolean;
  sizes?: string;
  scale?: number;
  offsetX?: string;
  offsetY?: string;
  align?: 'center' | 'left';
};

const LOGO_SOURCES = {
  white:
    'https://privana-website-images.s3.amazonaws.com/Privana%20Logo%20-%20White%20Text%20%28Transparent%20BG%29.svg',
  black:
    'https://privana-website-images.s3.amazonaws.com/Privana%20Logo%20-%20Black%20Text%20%28Transparent%20BG%29.svg'
} as const;

export function PrivanaLogo({
  variant,
  className = '',
  priority = false,
  sizes = '240px',
  scale = 1,
  offsetX = '0px',
  offsetY = '0px',
  align = 'center'
}: PrivanaLogoProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={LOGO_SOURCES[variant]}
        alt="Privana"
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
        style={{
          transform: `translate(${offsetX}, ${offsetY}) scale(${scale})`,
          transformOrigin: align === 'left' ? 'left center' : 'center'
        }}
      />
    </div>
  );
}
