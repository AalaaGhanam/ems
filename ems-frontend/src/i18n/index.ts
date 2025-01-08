import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enGeneric from './locales/en.json'

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translation: {
                ...enGeneric,
            },
        },
    },
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
