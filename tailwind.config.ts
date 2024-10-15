import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#0079FF",
        "custom-skyblue": "#57A7FF",
        "custom-pink": "#FF6DCE",
        "custom-yellow": "#F6FA70",
        "custom-green": "#A3FF5E"
      },
      fontFamily: {
        cafe24meongi: ["Cafe24Meongi-W-v1.0", "sans-serif"] // 커스텀 폰트 추가
      }
    }
  },
  plugins: []
};

export default config;
