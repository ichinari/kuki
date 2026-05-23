"use client";

import type { ReactNode } from "react";
import { KukiMark } from "@/components/login/icons";
import { useUserContext } from "@/contexts/UserProvider";
import { KUKI } from "@/css/utils";
import * as className from "@/css/owner/sidebar";
import {
  BellIcon,
  ChartIcon,
  ListIcon,
  SettingsIcon,
  UsersIcon,
} from "./icons";

type NavId = "dashboard" | "feedback" | "visitors" | "repeat" | "settings";

type NavItem = {
  id: NavId;
  label: string;
  icon: ReactNode;
  badge?: number;
};

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "ダッシュボード", icon: <ChartIcon /> },
  { id: "feedback", label: "要望一覧", icon: <ListIcon />, badge: 2 },
  { id: "visitors", label: "利用者分布", icon: <UsersIcon /> },
  { id: "repeat", label: "リピーター", icon: <BellIcon /> },
  { id: "settings", label: "設定", icon: <SettingsIcon /> },
];

export default function Sidebar({ active = "dashboard" }: { active?: NavId }) {
  const { user } = useUserContext();
  const initial = user?.userName?.[0]?.toUpperCase() ?? "?";
  const name = user?.userName ?? "...";

  return (
    <aside className={className.sidebar}>
      <div className={className.brand}>
        <KukiMark size={26} color={KUKI.accent} />
        <div>
          <div className={className.brandTitle}>KUKI</div>
          <div className={className.brandSub}>FOR OWNERS</div>
        </div>
      </div>

      <div className={className.siteWrap}>
        <div className={className.siteCard}>
          <div className={className.siteLabel}>SITE</div>
          <div className={className.siteName}>森のキャンプ場</div>
        </div>
      </div>

      <nav className={className.navList}>
        {NAV_ITEMS.map((n) => {
          const on = n.id === active;
          return (
            <a
              key={n.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`${className.navItemBase} ${
                on ? className.navItemOn : className.navItemOff
              }`}
            >
              <span className={on ? className.navIconOn : className.navIconOff}>
                {n.icon}
              </span>
              <span className={className.navLabel}>{n.label}</span>
              {n.badge !== undefined && (
                <span className={className.badge}>{n.badge}</span>
              )}
            </a>
          );
        })}
      </nav>

      <div className={className.spacer} />

      <div className={className.userFooter}>
        <div className={className.avatar}>{initial}</div>
        <div className={className.userMeta}>
          <div className={className.userName}>{name}</div>
          <div className={className.userRole}>オーナー</div>
        </div>
      </div>
    </aside>
  );
}
