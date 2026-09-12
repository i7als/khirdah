export default function LogoIcon({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="#2563eb" />
      <circle cx="16" cy="23" r="9" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1" />
      <circle cx="24" cy="15" r="9" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1" />
      <circle cx="24" cy="15" r="5.5" fill="none" stroke="#1d4ed8" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
