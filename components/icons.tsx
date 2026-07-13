export function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 3.5 16 10 5 16.5V3.5Z" fill="currentColor" />
    </svg>
  );
}

export function DressIcon() {
  return (
    <svg className="dress-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M9 3h6l1.5 3-2 1 1 12H8.5l1-12-2-1L9 3Z" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
