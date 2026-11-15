export function SiteBackdrop() {
  return (
    <div aria-hidden="true" className="site-backdrop">
      <div className="grid-plane absolute inset-0" />
      <div className="scanlines absolute inset-0 opacity-25" />
      <div className="noise absolute inset-0" />
      <div className="horizon absolute inset-x-0 top-0" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
}
