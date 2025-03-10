export default function Spinner() {
  return (
    // Spinner tailwind classes taken from PrelineUI https://preline.co/docs/spinners.html
    <div
      className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-green-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      {/* span for screen reader only */}
      <span className="sr-only">Loading...</span>{" "}
    </div>
  );
}
