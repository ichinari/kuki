"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon } from "./icons";
import * as className from "@/css/loginForm";
import { ROUTES } from "@/routes/route";
import { ClientAuthClient } from "@/api/auth/client";

type LoginState = { error: string | null };

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginFormAction = async (
    _previousState: LoginState,
    submitted: FormData,
  ): Promise<LoginState> => {
    const email = submitted.get("email") as string;
    const password = submitted.get("password") as string;

    const authClient = new ClientAuthClient();
    const { data, error } = await authClient.signIn(email, password);

    if (error) {
      return { error: error.message ?? "ログインに失敗しました" };
    }

    const userId = data.user?.id;
    if (!userId) {
      return { error: "ユーザー情報の取得に失敗しました" };
    }

    // path id には profiles.member_id を使う (useUser フックの更新を待たずに直接取得)
    const res = await authClient.fetch(userId);
    if (!res) {
      return { error: "プロフィール情報の取得に失敗しました" };
    }

    const { memberId, roleType } = res;
    const isOwner = roleType;
    const dest = isOwner
      ? ROUTES.OWNER.TOP.build(memberId)
      : ROUTES.CAMPER.TOP.build(memberId);

    router.push(dest);
    router.refresh();
    return { error: null };
  };

  const [status, formAction, isPending] = useActionState(loginFormAction, {
    error: null,
  });
  return (
    <form action={formAction} className={className.form}>
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
        className={className.submitForest}
      >
        {isPending ? "ログイン中..." : "ログイン"}
      </button>

      <div className={className.signupFooter}>
        はじめての方は
        <a href="/signup" className={className.signupLinkForest}>
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
