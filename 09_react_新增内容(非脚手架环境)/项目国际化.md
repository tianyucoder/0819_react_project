## 1. 应用国际化(i18n)
    1). 应用国际化: 本质就是把所有用于界面显示的字符串全部提取出来,做成多个语言版本, 根据指定语言显示对应语言的文本
    2). 应用本地化: 给应用做一个当地语言的版本

## 2. React项目国际化

### 2.1. 使用react-i18next实现国际化
    1). 在线文档: 
        https://github.com/i18next/react-i18next
    2). 下载相当依赖包
        react-i18next
        i18next
        i18next-xhr-backend
        i18next-browser-languagedetector

### 2.2. 实现应用国际化: 支持多语言显示
    (1). 创建国际化的message文件
* public/locales/en/translation.json: 
        {
		  "title": "GG ADMIN",
		  "menus": {
		    "home": "home",
		    "prod_about":"prodAbout",
		    "category":"category",
		    "product":"product",
		    "user":"user",
		    "role":"role",
		    "charts":"charts",
		    "bar":"bar",
		    "line":"line",
		    "pie":"pie"
		  }
		}
* public/locales/zh/translation.json
        {
		  "title": "硅谷后台",
		  "menus": {
		    "home": "首页",
		    "prod_about":"商品",
		    "category":"分类管理",
		    "product":"商品管理",
		    "user":"用户管理",
		    "role":"角色管理",
		    "charts":"图形图表",
		    "bar":"柱形图",
		    "line":"折线图",
		    "pie":"饼图"
		  }
		}
* public/locales/zh-CN/translation.json
		{
		  "title": "硅谷后台",
		  "menus": {
		    "home": "首页",
		    "prod_about":"商品",
		    "category":"分类管理",
		    "product":"商品管理",
		    "user":"用户管理",
		    "role":"角色管理",
		    "charts":"图形图表",
		    "bar":"柱形图",
		    "line":"折线图",
		    "pie":"饼图"
		  }
		}

    (2). i18n全局配置: config/i18n.js
        import i18n from 'i18next';
        import Backend from 'i18next-xhr-backend';
        import LanguageDetector from 'i18next-browser-languagedetector';
        import { initReactI18next } from 'react-i18next';
        import {IS_DEV} from './config'

        i18n
          // load translation using xhr -> see /public/locales
          // learn more: https://github.com/i18next/i18next-xhr-backend
          .use(Backend) // 内部发ajax请求加载locale文件
          // detect user language
          // learn more: https://github.com/i18next/i18next-browser-languageDetector
          .use(LanguageDetector) // 检查浏览器当前的语言
          // pass the i18n instance to react-i18next.
          .use(initReactI18next) // 指定i18n对象
          // init i18next
          // for all options read: https://www.i18next.com/overview/configuration-options
          .init({ // 初始化
            fallbackLng: 'en', // 如果没有对应的语言资源, 加载指定的
            debug: IS_DEV, // 是否使用调试模式

            interpolation: {
              escapeValue: false, // not needed for react as it escapes by default
            },
          });

        export default i18n;
    
    (3). 在入口文件index.js中加载配置
        import './config/i18n.js'
		
		将Provider组件用<React.Suspense fallback={<div>loading......</div>}>包裹

    (4). 在组件中读取当前应用指定local语言的message
	    import { withTranslation, getI18n } from 'react-i18next'
    	@withTranslation() : 包装组件, 组件就会收到2个属性
        i18n对象: 得到当前语言, 进行语言切换
        t函数:  根据指定的key得到当前语言对应的文本 t('title')
    	getI18n(): 得到当前语言的函数


    (5). 切换语言
        i18n.changeLanguage(语言)