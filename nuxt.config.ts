// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  runtimeConfig: {
    public: {
      FB_API_KEY: process.env.FB_API_KEY || "",
      FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN || "",
      FB_PROJECT_ID: process.env.FB_PROJECT_ID || "",
      FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET || "",
      FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID || "",
      FB_APP_ID: process.env.FB_APP_ID || "",
      FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID || "",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
        prefix: "og: https://ogp.me/ns#",
      },
      title: "RandomConvo",
      meta: [
        {
          name: "description",
          content:
            "ランダムマッチチャットサービスは、世界中の誰かと瞬時にチャットをすることができるサービスです。特定のトピックや興味を共有する相手を探すこともできます。匿名性を保つこともできます。友達を作ったり、新しい出会いを楽しむことができます。",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "RandomConvo" },
        {
          property: "og:image",
          content: "https://random-convo.vercel.app/ogp.png",
        },
      ],
    },
  },
});
