import LoginForm from "./LoginForm";
import { KukiMark } from "./icons";
import { KUKI } from "@/css/utils";
import * as className from "@/css/loginMobile";

export default function LoginMobile() {
  return (
    <div className={className.root}>
      <div className={className.breathLines}>
        <svg
          viewBox="0 0 400 220"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 60 Q 100 30, 200 60 T 420 50"
            stroke={KUKI.forest}
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M-20 100 Q 100 70, 200 100 T 420 90"
            stroke={KUKI.forest}
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M-20 140 Q 100 110, 200 140 T 420 130"
            stroke={KUKI.forest}
            strokeWidth="1.5"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </div>

      <div className={className.content}>
        <div className={className.brandBlock}>
          <KukiMark size={48} />
          <div className={className.brandTitle}>KUKI</div>
          <div className={className.brandSubtitle}>空気を、読む。</div>
        </div>

        <LoginForm />
      </div>

      <div className={className.legal}>
        続行することで
        <a href="#" className={className.legalLink}>
          利用規約
        </a>
        および
        <a href="#" className={className.legalLink}>
          プライバシーポリシー
        </a>
        に
        <br />
        同意したものとみなします
      </div>
    </div>
  );
}
