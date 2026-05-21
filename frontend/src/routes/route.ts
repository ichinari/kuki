export const ROUTES = {
  HOME: {
    path: "/",
    name: "ホーム",
  },
  LOGIN: {
    path: "/login",
    name: "ログイン",
  },
  SIGNUP: {
    path: "/signup",
    name: "サインアップ",
  },
  OWNER: {
    TOP: {
      pattern: "/owner/:ownerId/",
      build: (ownerId: string) => `/owner/${ownerId}/`,
      name: "トップ",
    },
    SITEMAP: {
      pattern: "/owner/:ownerId/sitemap",
      build: (ownerId: string) => `/owner/${ownerId}/sitemap`,
      name: "サイトマップ",
    },
    REQUEST: {
      pattern: "/owner/:ownerId/request",
      build: (ownerId: string) => `/owner/${ownerId}/request`,
      name: "リクエスト",
    },
    NIGHT_CONTACT: {
      pattern: "/owner/:ownerId/nightContact",
      build: (ownerId: string) => `/owner/${ownerId}/nightContact`,
      name: "夜間連絡",
    },
  },
  CAMPER: {
    TOP: {
      pattern: "/camper/:camperId/",
      build: (camperId: string) => `/camper/${camperId}/`,
      name: "トップ",
    },
    REQUEST: {
      pattern: "/camper/:camperId/request",
      build: (camperId: string) => `/camper/${camperId}/request`,
      name: "リクエスト",
    },
    MY_PAGE: {
      pattern: "/camper/:camperId/myPage",
      build: (camperId: string) => `/camper/${camperId}/myPage`,
      name: "マイページ",
    },
    NIGHT_CONTACT: {
      pattern: "/camper/:camperId/nightContact",
      build: (camperId: string) => `/camper/${camperId}/nightContact`,
      name: "夜間連絡",
    },
  },
} as const;
