// LoginForm.tsx 用 Tailwind class 定数
import { KUKI } from "@/css/utils";

export const form = "flex flex-col gap-[14px]";

// Role toggle
export const roleToggle = `flex p-1 bg-[${KUKI.brown}] rounded-xl`;

export const roleBtn =
  "flex-1 py-[9px] px-2 border-none rounded-[9px] text-center cursor-pointer";

export const roleBtnOn = `text-[${KUKI.muted}] bg-[${KUKI.darker}] shadow-[0_1px_3px_rgba(20,30,25,0.08)]`;

export const roleBtnOff = `text-[${KUKI.inkSoft}] bg-transparent`;

export const roleLabel = "text-[13px] font-bold";

export const roleSub = "text-[9.5px] mt-px";

// Show password toggle
export const showPwdBtn = `text-[11px] text-[${KUKI.muted}] font-semibold bg-transparent border-none cursor-pointer`;

// Input (base, used inside Field)
export const input = `flex-1 text-[14px] text-[${KUKI.ink}] border-none outline-none bg-transparent`;

// Password input extra class when masked
export const inputMasked = "font-mono tracking-[0.2em]";

// Remember / forgot row
export const rememberRow = "flex justify-between items-center -mt-1";

export const rememberLabel = `flex items-center gap-[7px] text-[11.5px] text-[${KUKI.inkSoft}] cursor-pointer`;

export const rememberHiddenInput = "absolute opacity-0 pointer-events-none";

export const rememberBox = `w-4 h-4 rounded text-[${KUKI.muted}] flex items-center justify-center`;

// Unchecked variant (bg + border)。Checked 時は背景に accent を inline で適用
export const rememberBoxOff = `bg-white border-[1.5px] border-[${KUKI.hair}]`;

export const forgotLink = `text-[11.5px] text-[${KUKI.dusk}] font-semibold no-underline`;

// Submit button (background / boxShadow は accent 依存なので inline style 併用)
export const submit =
  "w-full py-[14px] mt-1 text-white border-none rounded-xl text-[14px] font-bold cursor-pointer tracking-[0.02em]";

// Signup footer
export const signupFooter = `text-center mt-1.5 text-[12px] text-[${KUKI.muted}]`;

// Signup link (color は accent 依存なので inline style 併用)
export const signupLink = "font-bold no-underline";

// Field component
export const fieldLabel = `text-[11px] text-[${KUKI.muted}] mb-1.5 tracking-[0.02em] font-semibold`;

export const fieldBox =
  "flex items-center gap-2.5 py-3 px-[14px] bg-white rounded-[10px] transition-[border,box-shadow] duration-150";

export const fieldIcon = `text-[${KUKI.muted}] flex`;
