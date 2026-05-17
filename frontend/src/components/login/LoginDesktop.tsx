import LoginForm from "./LoginForm";
import { KukiMark } from "./icons";
import { KUKI } from "@/css/utils";
import * as className from "@/css/loginDesktop";

export default function LoginDesktop() {
  return (
    <div className={className.root}>
      <div className={className.leftPane}>
        <svg
          viewBox="0 0 600 800"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className={className.breathSvg}
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M-50 ${100 + i * 50} Q 150 ${70 + i * 50}, 300 ${
                100 + i * 50
              } T 650 ${90 + i * 50}`}
              stroke={KUKI.forest}
              strokeWidth="1"
              fill="none"
              opacity={1 - i * 0.05}
            />
          ))}
        </svg>

        <div className={className.brandHeader}>
          <KukiMark size={32} color={KUKI.white} />
          <div>
            <div className={className.brandTitle}>KUKI</div>
            <div className={className.brandSubtitle}>空気を、読む。</div>
          </div>
        </div>

        <div className={className.heroSection}>
          <div className={className.heroTitle}>
            静けさは、
            <br />
            <span className={className.heroAccent}>空気を読む</span>ことから。
          </div>
          <div className={className.heroDescription}>
            キャンパーと運営、お互いの「気になる」を共有して、夜が深まる前にすこしずつ調整するためのプラットフォーム。
          </div>
        </div>

        <div className={className.footer}>
          <span>© 2026 KUKI Inc.</span>
          <span className={className.footerLinks}>
            <a href="#" className={className.footerLink}>
              規約
            </a>
            <a href="#" className={className.footerLink}>
              プライバシー
            </a>
            <a href="#" className={className.footerLink}>
              サポート
            </a>
          </span>
        </div>
      </div>

      <div className={className.rightPane}>
        <div className={className.rightPaneHeader}>
          <div className={className.eyebrow}>ログイン</div>
          <div className={className.pageTitle}>おかえりなさい</div>
          <div className={className.pageSubtitle}>
            役割を選択してから、ご登録のメールでサインインしてください。
          </div>
        </div>

        <LoginForm defaultRole="owner" />
      </div>
    </div>
  );
}
