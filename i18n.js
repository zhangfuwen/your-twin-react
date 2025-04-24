import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our app!",
      "greeting": "Hello, {{name}}!",
      "description": "This is an example using react-i18next.",
      "changeLanguage": "Change Language",
      "home": "Home",
      "timeline_tab":"TimeLine",
      "about": "About",
      "home_tab":"Home",
      "TimeLine": "TimeLine",
      "explore_tab":"Explore",
      "close": "Close",
      "stop_recording": "Stop Recording",
      "start_recording": "Start Recording",
      "loading":"loading...",
    }
  },
  zh: {
    translation: {
      "welcome": "欢迎来到我们的应用！",
      "greeting": "你好，{{name}}！",
      "description": "这是一个使用 react-i18next 的例子。",
      "changeLanguage": "切换语言",
      "home": "主页",
      "about": "关于",
      "timeline_tab":"时间线",
      "home_tab":"首页",
      "TimeLine": "时间线",
      "explore_tab":"发现",
      "close": "关闭",
      "stop_recording": "停止录制",
      "start_recording": "开始录制",
      "loading":"加载中...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', 
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;