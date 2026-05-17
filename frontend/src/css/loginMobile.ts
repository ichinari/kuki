// LoginMobile.tsx 用 Tailwind class 定数
import { KUKI } from "@/css/utils";

export const root = `relative min-h-screen bg-[${KUKI.brown}] text-[${KUKI.ink}]`;

export const breathLines =
  "absolute inset-x-0 top-0 h-[220px] overflow-hidden pointer-events-none opacity-50";

export const content = "relative pt-14 px-6 pb-8";

export const brandBlock = "flex flex-col items-center mb-8";

export const brandTitle =
  "mt-3 text-[30px] font-extrabold text-white tracking-[0.12em] leading-none";

export const brandSubtitle = `mt-2 text-[12px] text-[${KUKI.muted}] tracking-[0.15em]`;

export const legal = `px-6 pb-[60px] mt-6 text-center text-[12px] text-[${KUKI.faint}] leading-[1.8]`;

export const legalLink = `text-[${KUKI.muted}]`;
