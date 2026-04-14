import Image from 'next/image';

type GlowMode = 'teal' | 'lilac' | 'blue' | 'neutral';

type BaseMediaPlaceholderProps = {
  title?: string;
  label?: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  aspectRatio?: string;
  deviceFrame?: boolean;
  glowMode?: GlowMode;
  className?: string;
  previewLabel?: string;
};

const glowMap: Record<GlowMode, string> = {
  teal: 'from-[#62d5ce]/30 via-[#62d5ce]/15 to-transparent',
  lilac: 'from-[#af8bda]/30 via-[#b799dd]/14 to-transparent',
  blue: 'from-[#5888d9]/28 via-[#6997e1]/14 to-transparent',
  neutral: 'from-white/20 via-white/5 to-transparent'
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PremiumMediaPlaceholder({
  title = 'Product Preview',
  label = 'Preview Area',
  imageSrc,
  videoSrc,
  posterSrc,
  aspectRatio = '16 / 10',
  deviceFrame = false,
  glowMode = 'teal',
  className,
  previewLabel
}: BaseMediaPlaceholderProps) {
  const frameClass = deviceFrame
    ? 'rounded-[28px] border border-white/20 bg-black/90 p-3 shadow-[0_35px_80px_rgba(9,9,14,0.55)]'
    : 'rounded-[26px] border border-white/12 bg-black/50 p-2 shadow-[0_25px_70px_rgba(9,9,14,0.3)]';

  return (
    <div className={joinClasses('relative isolate overflow-hidden', className)} style={{ aspectRatio }}>
      <div
        className={joinClasses(
          'pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] blur-3xl',
          glowMap[glowMode]
        )}
        aria-hidden="true"
      />

      <div className={joinClasses('relative h-full w-full', frameClass)}>
        <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#0f1018]">
          <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-white/10 bg-black/35 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <p className="ml-2 text-[11px] uppercase tracking-[0.16em] text-white/55">{label}</p>
          </div>

          {videoSrc ? (
            <video
              src={videoSrc}
              poster={posterSrc}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          ) : imageSrc ? (
            <Image src={imageSrc} alt={title} fill className="object-cover" sizes="100vw" />
          ) : (
            <div className="relative h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(98,213,206,0.2),transparent_48%),radial-gradient(circle_at_80%_15%,rgba(175,139,218,0.18),transparent_45%),linear-gradient(160deg,#10111a,#171927_35%,#12131b)] pt-12">
              <div className="grid h-full w-full grid-cols-12 gap-3 p-5">
                <div className="col-span-8 rounded-xl border border-white/10 bg-white/[0.03]" />
                <div className="col-span-4 space-y-3">
                  <div className="h-16 rounded-xl border border-white/10 bg-white/[0.03]" />
                  <div className="h-20 rounded-xl border border-white/10 bg-white/[0.03]" />
                  <div className="h-24 rounded-xl border border-white/10 bg-white/[0.03]" />
                </div>
                <div className="col-span-12 h-16 rounded-xl border border-white/10 bg-white/[0.03]" />
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-4 pt-20">
            <p className="text-sm text-white/85">{title}</p>
            <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/65">
              {previewLabel ?? 'Ready for AWS media'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroProductPlaceholder(props: BaseMediaPlaceholderProps) {
  return <PremiumMediaPlaceholder {...props} glowMode={props.glowMode ?? 'teal'} deviceFrame />;
}

export function ProductShowcasePlaceholder(props: BaseMediaPlaceholderProps) {
  return <PremiumMediaPlaceholder {...props} glowMode={props.glowMode ?? 'lilac'} deviceFrame={props.deviceFrame ?? true} />;
}

export function FeatureMediaPlaceholder(props: BaseMediaPlaceholderProps) {
  return <PremiumMediaPlaceholder {...props} glowMode={props.glowMode ?? 'blue'} />;
}

export function DeviceFramePlaceholder(props: BaseMediaPlaceholderProps) {
  return <PremiumMediaPlaceholder {...props} deviceFrame glowMode={props.glowMode ?? 'neutral'} />;
}

export function VideoPreviewPlaceholder(props: BaseMediaPlaceholderProps) {
  return (
    <PremiumMediaPlaceholder
      {...props}
      label={props.label ?? 'Screen Recording Preview'}
      previewLabel={props.previewLabel ?? 'Attach videoSrc + posterSrc'}
      deviceFrame={props.deviceFrame ?? true}
    />
  );
}
