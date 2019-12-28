import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

  i18n
    .use(Backend) // 内部发ajax请求加载locales文件
    .use(LanguageDetector) // 检查浏览器当前的语言
    .use(initReactI18next) // 指定i18n对象
    .init({ // 初始化
      fallbackLng: 'zh', // 如果没有对应的语言资源, 加载指定的
      interpolation: {
        escapeValue: false,
      },
    });

  export default i18n;