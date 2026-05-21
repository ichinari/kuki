// LoginForm.tsx 用 Tailwind class 定数

export const form = "flex flex-col gap-[14px]";

// Role toggle
export const roleToggle = "flex p-1 bg-kuki-brown rounded-xl";

export const roleBtn =
  "flex-1 py-[9px] px-2 border-none rounded-[9px] text-center cursor-pointer";

export const roleBtnOn =
  "text-kuki-muted bg-kuki-darker shadow-[0_1px_3px_rgba(20,30,25,0.08)]";

export const roleBtnOff = "text-kuki-ink-soft bg-transparent";

export const roleLabel = "text-[13px] font-bold";

export const roleSub = "text-[9.5px] mt-px";

// Show password toggle
export const showPwdBtn =
  "text-[11px] text-kuki-muted font-semibold bg-transparent border-none cursor-pointer";

// Input (base, used inside Field)
export const input =
  "flex-1 text-[14px] text-kuki-ink border-none outline-none bg-transparent";

// Password input extra class when masked
export const inputMasked = "font-mono tracking-[0.2em]";

// Remember / forgot row
export const rememberRow = "flex justify-between items-center -mt-1";

export const rememberLabel =
  "flex items-center gap-[7px] text-[11.5px] text-kuki-ink-soft cursor-pointer";

export const rememberHiddenInput = "absolute opacity-0 pointer-events-none";

export const rememberBox =
  "w-4 h-4 rounded text-kuki-muted flex items-center justify-center";

// Unchecked variant (bg + border)。Checked 時は背景に accent を inline で適用
export const rememberBoxOff = "bg-white border-[1.5px] border-kuki-hair";

export const forgotLink =
  "text-[11.5px] text-kuki-dusk font-semibold no-underline";

// Submit button (background / boxShadow は accent 依存なので inline style 併用)
export const submit =
  "w-full py-[14px] mt-1 text-white border-none rounded-xl text-[14px] font-bold cursor-pointer tracking-[0.02em]";

// Login 用 submit (固定で forest accent)
export const submitForest =
  `${submit} bg-kuki-forest shadow-[0_6px_18px_rgba(44,85,48,0.23)]`;

// Signup footer
export const signupFooter = "text-center mt-1.5 text-[12px] text-kuki-muted";

// Signup link (color は accent 依存なので inline style 併用)
export const signupLink = "font-bold no-underline";

// Login 用 signup link (固定で forest accent)
export const signupLinkForest = `${signupLink} text-kuki-forest`;

// Field component
export const fieldLabel =
  "text-[11px] text-kuki-muted mb-1.5 tracking-[0.02em] font-semibold";

export const fieldBox =
  "flex items-center gap-2.5 py-3 px-[14px] bg-white rounded-[10px] transition-[border,box-shadow] duration-150";

export const fieldIcon = "text-kuki-muted flex";
