import Local from "./locale";
import Vue from 'vue'
import VueI18n from 'vue-i18n';


Vue.use(VueI18n)

// 自动设置语言,优先级：网页定义语言、本地语言、简体中文
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = localLang || window.localStorage.lang || 'zh-CN';

export const i18n = new VueI18n({
  locale: lang,    // 语言标识
  messages: {
    'zh-CN': Local['zh-CN'],   // 中文语言包
    'en-US': Local['en-US']    // 英文语言包
  }
})

console.log('i18n',lang)
export default i18n;
