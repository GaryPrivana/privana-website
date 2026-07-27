import { EDITORIAL_IMAGE_BREAK_BACKGROUND } from "./marketing-assets";

export function EditorialImageBreak() {
  return (
    <section
      className="editorial-image-break"
      aria-labelledby="editorial-image-break-heading"
      style={{
        backgroundImage: `url(${EDITORIAL_IMAGE_BREAK_BACKGROUND})`,
      }}
    >
      <div className="editorial-image-break-shade" aria-hidden="true" />
      <div className="editorial-image-break-top-transition" aria-hidden="true" />
      <div className="editorial-image-break-bottom-transition" aria-hidden="true" />
      <h2
        id="editorial-image-break-heading"
        className="editorial-image-break-heading"
      >
        <span className="editorial-line-1">
          Deliver exceptional member experiences
        </span>
        <span className="editorial-line-2">with Privana</span>
      </h2>
    </section>
  );
}
