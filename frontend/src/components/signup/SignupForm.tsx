"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { KUKI } from "@/css/utils";
import { CheckIcon, LockIcon, MailIcon } from "../login/icons";
import * as className from "@/css/loginForm";
import { ROUTES } from "@/routes/route";
import { ClientAuthClient } from "@/api/auth/client";

export type Role = "camper" | "owner";

interface SignupFormProps {
  defaultRole?: Role;
}

type SignupState = { error: string | null; message: string | null };

export default function SignupForm({
  defaultRole = "camper",
}: SignupFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: defaultRole,
    email: "",
    password: "",
    confirmPassword: "",
    agree: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const accent = formData.role === "owner" ? KUKI.dusk : KUKI.forest;

  const signupFormAction = async (
    _previousState: SignupState,
    submitted: FormData,
  ): Promise<SignupState> => {
    const email = submitted.get("email") as string;
    const password = submitted.get("password") as string;
    const confirmPassword = submitted.get("confirmPassword") as string;
    const role = submitted.get("role") as Role;
    const agree = submitted.get("agree") === "on";
    const roleType = role === "owner";

    if (!agree) {
      return { error: "利用規約への同意が必要です", message: null };
    }
    if (password.length < 8) {
      return { error: "パスワードは8文字以上にしてください", message: null };
    }
    if (password !== confirmPassword) {
      return { error: "パスワードが一致しません", message: null };
    }

    const authClient = new ClientAuthClient();
    const { data, error } = await authClient.signUp({
      email,
      password,
      roleType,
      emailRedirectTo: `${window.location.origin}/api/auth/confirm`,
    });

    if (error) {
      return { error: error.message ?? "登録に失敗しました", message: null };
    }

    // session が無い = メール確認が必要なので、確認メッセージを表示して待つ
    if (!data.session) {
      return {
        error: null,
        message: "確認メールを送信しました。受信箱をご確認ください。",
      };
    }

    // session 即発行 = メール確認不要設定。profiles が作成されていれば role 別トップへ.
    const userId = data.user?.id;
    if (userId) {
      const profile = await authClient.fetch(userId);
      if (profile) {
        const dest = profile.roleType
          ? ROUTES.OWNER.TOP.build(profile.memberId)
          : ROUTES.CAMPER.TOP.build(profile.memberId);
        router.push(dest);
        router.refresh();
        return { error: null, message: null };
      }
    }

    // profile が未作成 (DB trigger 待ち等) のケースは HOME へフォールバック
    router.push(ROUTES.HOME.path);
    router.refresh();
    return { error: null, message: null };
  };

  const [status, formAction, isPending] = useActionState(signupFormAction, {
    error: null,
    message: null,
  });

  return (
    <form action={formAction} className={className.form}>
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={className.input}
          required
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
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="8文字以上"
          className={`${className.input} ${
            showPassword ? "" : className.inputMasked
          }`}
          required
        />
      </Field>

      <Field label="パスワード(確認)" icon={<LockIcon />}>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="もう一度入力"
          className={`${className.input} ${
            showPassword ? "" : className.inputMasked
          }`}
          required
        />
      </Field>

      <div className={className.rememberRow}>
        <label className={className.rememberLabel}>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={(e) =>
              setFormData({ ...formData, agree: e.target.checked })
            }
            className={className.rememberHiddenInput}
          />
          <span
            className={`${className.rememberBox} ${
              formData.agree ? "" : className.rememberBoxOff
            }`}
            style={formData.agree ? { background: accent } : undefined}
          >
            {formData.agree && <CheckIcon size={10} />}
          </span>
          利用規約・プライバシーポリシーに同意
        </label>
      </div>

      {status.error && (
        <p className="text-[12px] text-red-500 -mt-1">{status.error}</p>
      )}
      {status.message && (
        <p className="text-[12px] text-kuki-forest -mt-1">{status.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={className.submit}
        style={{ background: accent, boxShadow: `0 6px 18px ${accent}3a` }}
      >
        {isPending ? "登録中..." : "新規登録"}
      </button>

      <div className={className.signupFooter}>
        すでにアカウントをお持ちの方は
        <a
          href="/login"
          className={className.signupLink}
          style={{ color: accent }}
        >
          ログイン
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
