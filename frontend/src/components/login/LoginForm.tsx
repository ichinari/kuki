"use client";

import { useActionState, useState, type ReactNode } from "react";
import { KUKI } from "@/css/utils";
import { CheckIcon, LockIcon, MailIcon } from "./icons";
import * as className from "@/css/loginForm";

export type Role = "camper" | "owner";

interface LoginFormProps {
  defaultRole?: Role;
}

const loginFormAction = async (_previousState: null, formData: FormData) => {
  const role = formData.get("role") as Role;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "on";

  // ここでログイン処理を実装
  console.log("Logging in with", { role, email, password, remember });

  return _previousState;
};

export default function LoginForm({ defaultRole = "camper" }: LoginFormProps) {
  const [formData, setFormData] = useState({
    role: defaultRole,
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const accent = formData.role === "owner" ? KUKI.dusk : KUKI.forest;

  const [_status, formAction, isPending] = useActionState(
    loginFormAction,
    null,
  );
  return (
    <form action={formAction} className={className.form}>
      {/* role はトグル (JS state) なので hidden で FormData に乗せる */}
      <input type="hidden" name="role" value={formData.role} />

      <div className={className.roleToggle}>
        {(
          [
            { id: "camper", label: "キャンパー", sub: "泊まる人" },
            { id: "owner", label: "オーナー", sub: "運営する人" },
          ] as const
        ).map((r) => {
          const on = r.id === formData.role;
          return (
            <button
              type="button"
              key={r.id}
              onClick={() => setFormData({ ...formData, role: r.id })}
              className={`${className.roleBtn} ${
                on ? className.roleBtnOn : className.roleBtnOff
              }`}
            >
              <div className={className.roleLabel}>{r.label}</div>
              <div className={className.roleSub}>{r.sub}</div>
            </button>
          );
        })}
      </div>

      <Field label="メールアドレス" icon={<MailIcon />}>
        <input
          type="email"
          name="email"
          autoCapitalize=""
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={className.input}
        />
      </Field>

      <Field
        label="パスワード"
        icon={<LockIcon />}
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={className.showPwdBtn}
          >
            {showPassword ? "隠す" : "表示"}
          </button>
        }
      >
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="8文字以上"
          className={`${className.input} ${
            showPassword ? "" : className.inputMasked
          }`}
        />
      </Field>

      <div className={className.rememberRow}>
        <label className={className.rememberLabel}>
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={(e) =>
              setFormData({ ...formData, remember: e.target.checked })
            }
            className={className.rememberHiddenInput}
          />
          <span
            className={`${className.rememberBox} ${
              formData.remember ? "" : className.rememberBoxOff
            }`}
            style={formData.remember ? { background: accent } : undefined}
          >
            {formData.remember && <CheckIcon size={10} />}
          </span>
          ログイン状態を保持
        </label>
        <a href="#" className={className.forgotLink}>
          パスワードを忘れた
        </a>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={className.submit}
        style={{ background: accent, boxShadow: `0 6px 18px ${accent}3a` }}
      >
        ログイン
      </button>

      <div className={className.signupFooter}>
        はじめての方は
        <a href="#" className={className.signupLink} style={{ color: accent }}>
          新規登録
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  icon,
  suffix,
  children,
}: {
  label: string;
  icon: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className={className.fieldLabel}>{label}</div>
      <div className={className.fieldBox}>
        <span className={className.fieldIcon}>{icon}</span>
        {children}
        {suffix}
      </div>
    </div>
  );
}
