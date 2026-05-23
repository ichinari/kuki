// owner/Sidebar.tsx 用 Tailwind class 定数
// 配色は LoginForm 系 (LoginDesktop rightPane = bg-kuki-dark) に合わせた dark テーマ

export const sidebar =
  "w-[220px] shrink-0 bg-kuki-darker border-r border-kuki-brown py-[22px] flex flex-col";

export const brand = "px-[22px] pb-[22px] flex items-center gap-2.5";

export const brandTitle =
  "text-base font-extrabold text-white tracking-[0.04em] leading-none";

export const brandSub = "text-[9px] text-kuki-muted tracking-[0.15em] mt-0.5";

export const siteWrap = "px-3.5 pb-3.5";

export const siteCard =
  "bg-kuki-ink rounded-[10px] px-3 py-2.5 text-[11px] text-kuki-faint";

export const siteLabel = "text-[9px] text-kuki-faint tracking-[0.1em] mb-0.5";

export const siteName = "font-bold text-kuki-accent";

export const navList = "flex flex-col gap-0.5 px-2.5";

export const navItemBase =
  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12.5px] no-underline cursor-default select-none";

export const navItemOff = "bg-transparent text-kuki-muted font-medium";

export const navItemOn =
  "bg-kuki-pine text-kuki-accent font-bold shadow-[0_1px_3px_rgba(0,0,0,0.25)]";

export const navIconOff = "text-kuki-faint flex";

export const navIconOn = "text-kuki-accent flex";

export const navLabel = "flex-1";

export const badge =
  "bg-kuki-ember text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1.5 rounded-[9px] flex items-center justify-center";

export const spacer = "flex-1";

export const userFooter =
  "px-[22px] py-3.5 border-t border-kuki-brown flex items-center gap-2.5";

export const avatar =
  "w-[30px] h-[30px] rounded-full bg-kuki-moss text-white flex items-center justify-center text-[12px] font-bold uppercase";

export const userMeta = "flex-1 text-[11px]";

export const userName = "text-white font-semibold";

export const userRole = "text-kuki-faint text-[10px]";
