import { KUKI } from "@/css/utils";

export const KukiMark = ({
  size = 22,
  color = KUKI.forest,
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 8 Q 9 5, 15 8 T 21 9"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M3 13 Q 9 10, 15 13 T 21 14"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M3 18 Q 9 15, 15 18 T 21 19"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
    />
  </svg>
);

export const CheckIcon = ({ size = 10 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const GoogleGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.9z"
    />
    <path
      fill="#34A853"
      d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .6-2.2 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2.1v2.8C4 19.9 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.7 14c-.2-.6-.4-1.3-.4-2s.1-1.4.4-2V7.2H2.1C1.4 8.6 1 10.3 1 12s.4 3.4 1.1 4.8L5.7 14z"
    />
    <path
      fill="#EA4335"
      d="M12 5.4c1.6 0 3 .6 4.2 1.7l3.1-3.1C17.5 2.3 15 1 12 1 7.7 1 4 4.1 2.1 7.2L5.7 10c.9-2.6 3.4-4.6 6.3-4.6z"
    />
  </svg>
);

export const AppleGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
    <path d="M17.6 12.5c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5C2.9 12.3 4.2 17 6 19.5c.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.9 3.4-.9 1.6 0 2 .9 3.4.8 1.4 0 2.3-1.3 3.2-2.6.7-1 1.3-2.1 1.6-3.2-2-.8-3.3-2.6-3.3-3.7zM15 4.8c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z" />
  </svg>
);

export const LineGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="5" fill="#06C755" />
    <path
      fill="#fff"
      d="M20 10.5c0-3.6-3.6-6.5-8-6.5s-8 2.9-8 6.5c0 3.2 2.9 5.9 6.7 6.4.3 0 .6.2.7.4 0 .2.1.4 0 .6l-.1.6c0 .2-.1.7.6.4s4-2.4 5.5-4.1c1-1.2 1.6-2.4 1.6-4.3z"
    />
  </svg>
);
