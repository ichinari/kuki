// LoginDesktop.tsx 用 Tailwind class 定数
import { KUKI } from "@/css/utils";

export const root = `flex min-h-screen bg-white text-[${KUKI.ink}] font-[Noto_Sans_JP,system-ui]`;

export const leftPane =
  "relative flex flex-col justify-between overflow-hidden flex-[1_1_52%] " +
  "pt-14 px-14 pb-10 text-white " +
  "bg-[linear-gradient(165deg,#0f2417_0%,#2c5530_55%,#3d6a42_100%)]";

export const breathSvg = "absolute inset-0 opacity-[0.16]";

export const brandHeader = "relative flex items-center gap-3";

export const brandTitle =
  "text-[22px] font-extrabold tracking-[0.1em] leading-none";

export const brandSubtitle = "text-[9.5px] opacity-70 tracking-[0.2em] mt-1";

export const heroSection = "relative";

export const heroTitle =
  "text-[38px] font-bold leading-[1.35] mb-[18px] tracking-[-0.01em]";

export const heroAccent = `text-[${KUKI.accent}]`;

export const heroDescription =
  "text-[13.5px] opacity-[0.78] leading-[1.85] max-w-[380px]";

export const footer = "relative text-[10.5px] opacity-55 flex justify-between";

export const footerLinks = "flex gap-[18px]";

export const footerLink = "text-inherit";

export const rightPane =
  "flex flex-col justify-center flex-[1_1_48%] " +
  `bg-[${KUKI.dark}] max-w-[540px] ` +
  "pt-16 px-16 pb-10";

export const rightPaneHeader = "mb-8";

export const eyebrow = `text-[11px] text-[${KUKI.muted}] tracking-[0.15em] mb-2`;

export const pageTitle = `text-[26px] font-bold text-[${KUKI.muted}] tracking-[-0.01em]`;

export const pageSubtitle = `text-[12.5px] text-[${KUKI.muted}] mt-[6px]`;
