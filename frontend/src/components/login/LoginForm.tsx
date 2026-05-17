"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { KUKI } from "@/css/utils";
import { CheckIcon, LockIcon, MailIcon } from "./icons";
import * as className from "@/css/loginForm";

export type Role = "camper" | "owner";

interface LoginFormProps {
  defaultRole?: Role;
}

type LoginState = { error: string | null };

export default function LoginForm({ defaultRole = "camper" }: LoginFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: defaultRole,
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const accent = formData.role === "owner" ? KUKI.dusk : KUKI.forest;

  const loginFormAction = async (
    _previousState: LoginState,
    submitted: FormData,
  ): Promise<LoginState> => {
    const email = submitted.get("email") as string;
    const password = submitted.get("password") as string;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      return { error: body?.error ?? "ログインに失敗しました" };
    }

    router.push("/");
    router.refresh();
    return { error: null };
  };

  const [status, formAction, isPending] = useActionState(loginFormAction, {
    error: null,
  });
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

      {status.error && (
        <p className="text-[12px] text-red-500 -mt-1">{status.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={className.submit}
        style={{ background: accent, boxShadow: `0 6px 18px ${accent}3a` }}
      >
        {isPending ? "ログイン中..." : "ログイン"}
      </button>

      <div className={className.signupFooter}>
        はじめての方は
        <a
          href="/signup"
          className={className.signupLink}
          style={{ color: accent }}
        >
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
