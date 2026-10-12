import { langCodes } from '@/libs/locales'

export type AiPageLocale = (typeof langCodes)[number]

export interface AiPage {
  /** Stable identifier intended for AI tools and frontend consumers. */
  key: string
  title: string
  /** Locale-neutral pathname. Apply a supported locale prefix when linking. */
  path: string
  description: string
  keywords: readonly string[]
  locales: readonly AiPageLocale[]
  /** A route pattern only; consumers must obtain real slugs from the website. */
  dynamic?: true
}

export const aiPagePaths = {
  home: '/',
  about: '/about',
  analyses: '/analyses',
  analysesFilter: '/analyses/filter',
  analysesByLocation: '/analyses/filter/location',
  analysesByCity: '/analyses/filter/city',
  analysesByClinic: '/analyses/filter/clinic',
  experts: '/experts',
  expertDetails: '/experts/[expert]/details',
  expertAppointment: '/experts/[expert]/appointment',
  blogCategory: '/blogs/[category]',
  blogArticle: '/blogs/[category]/[blogDetail]',
  service: '/services/[service]/[subService]',
  contact: '/contact',
  faq: '/faq',
  login: '/login',
  register: '/register',
  verify: '/verify',
  verified: '/verified',
  privacyPolicy: '/privacy-policy',
  userAgreement: '/user-agreement',
} as const

const allLocales = langCodes as readonly AiPageLocale[]

/**
 * Verified public App Router pages under `app/[locale]/(website)`.
 * Dynamic entries are patterns, not links that can be used with made-up IDs.
 */
export const aiPages: readonly AiPage[] = [
  { key: 'home', title: 'Ana səhifə', path: aiPagePaths.home, description: 'Sinapsmed-in əsas məlumat və xidmətlər səhifəsi.', keywords: ['ana səhifə', 'sinapsmed', 'xidmətlər'], locales: allLocales },
  { key: 'about', title: 'Haqqımızda', path: aiPagePaths.about, description: 'Sinapsmed haqqında məlumat.', keywords: ['haqqımızda', 'sinapsmed haqqında'], locales: allLocales },
  { key: 'analyses', title: 'Analizlər', path: aiPagePaths.analyses, description: 'Laborator analizləri araşdırmaq üçün səhifə.', keywords: ['analiz', 'laboratoriya', 'müayinə'], locales: allLocales },
  { key: 'analyses-filter', title: 'Analiz filtri', path: aiPagePaths.analysesFilter, description: 'Analiz axtarışı üçün seçim səhifəsi.', keywords: ['analiz filtri', 'analiz axtarışı'], locales: allLocales },
  { key: 'analyses-by-location', title: 'Məkana görə analizlər', path: aiPagePaths.analysesByLocation, description: 'Məkana görə analiz klinikası seçimi.', keywords: ['analiz', 'məkan', 'ünvan'], locales: allLocales },
  { key: 'analyses-by-city', title: 'Şəhərə görə analizlər', path: aiPagePaths.analysesByCity, description: 'Şəhərə görə analiz klinikası seçimi.', keywords: ['analiz', 'şəhər', 'klinika'], locales: allLocales },
  { key: 'analyses-by-clinic', title: 'Klinikaya görə analizlər', path: aiPagePaths.analysesByClinic, description: 'Klinikaya görə analiz seçimi.', keywords: ['analiz', 'klinika'], locales: allLocales },
  { key: 'experts', title: 'Həkimlər', path: aiPagePaths.experts, description: 'Mütəxəssisləri və həkimləri araşdırmaq üçün səhifə.', keywords: ['həkim', 'mütəxəssis', 'ekspert'], locales: allLocales },
  { key: 'expert-details', title: 'Həkim profili', path: aiPagePaths.expertDetails, description: 'Mövcud həkim slug-u ilə açılan həkim profil səhifəsi.', keywords: ['həkim profili', 'mütəxəssis məlumatı'], locales: allLocales, dynamic: true },
  { key: 'expert-appointment', title: 'Həkim qəbulu', path: aiPagePaths.expertAppointment, description: 'Mövcud həkim slug-u ilə açılan qəbul səhifəsi.', keywords: ['həkim qəbulu', 'randevu'], locales: allLocales, dynamic: true },
  { key: 'blog-category', title: 'Bloq kateqoriyası', path: aiPagePaths.blogCategory, description: 'Mövcud kateqoriya slug-u ilə açılan bloq siyahısı.', keywords: ['bloq', 'məqalə', 'kateqoriya'], locales: allLocales, dynamic: true },
  { key: 'blog-article', title: 'Bloq məqaləsi', path: aiPagePaths.blogArticle, description: 'Mövcud kateqoriya və məqalə slug-ları ilə açılan yazı.', keywords: ['bloq', 'məqalə', 'sağlamlıq'], locales: allLocales, dynamic: true },
  { key: 'service', title: 'Xidmət', path: aiPagePaths.service, description: 'Mövcud xidmət və alt-xidmət slug-ları ilə açılan səhifə.', keywords: ['xidmət', 'alt xidmət', 'tibbi xidmət'], locales: allLocales, dynamic: true },
  { key: 'contact', title: 'Əlaqə', path: aiPagePaths.contact, description: 'Sinapsmed ilə əlaqə və tez-tez verilən suallar.', keywords: ['əlaqə', 'telefon', 'dəstək'], locales: allLocales },
  { key: 'faq', title: 'Tez-tez verilən suallar', path: aiPagePaths.faq, description: 'Tez-tez verilən suallar səhifəsi.', keywords: ['faq', 'sual', 'kömək'], locales: allLocales },
  { key: 'login', title: 'Daxil ol', path: aiPagePaths.login, description: 'İstifadəçi hesabına giriş səhifəsi.', keywords: ['giriş', 'login', 'hesab'], locales: allLocales },
  { key: 'register', title: 'Qeydiyyat', path: aiPagePaths.register, description: 'Yeni istifadəçi hesabı yaratmaq üçün səhifə.', keywords: ['qeydiyyat', 'register', 'hesab yarat'], locales: allLocales },
  { key: 'verify', title: 'E-poçt təsdiqi', path: aiPagePaths.verify, description: 'E-poçt təsdiqləmə səhifəsi.', keywords: ['e-poçt', 'təsdiq', 'verification'], locales: allLocales },
  { key: 'verified', title: 'Təsdiqləndi', path: aiPagePaths.verified, description: 'Təsdiqləmə əməliyyatının tamamlandığını göstərən səhifə.', keywords: ['təsdiqləndi', 'verification'], locales: allLocales },
  { key: 'privacy-policy', title: 'Məxfilik siyasəti', path: aiPagePaths.privacyPolicy, description: 'Məxfilik siyasəti.', keywords: ['məxfilik', 'privacy', 'məlumatların qorunması'], locales: allLocales },
  { key: 'user-agreement', title: 'İstifadəçi razılaşması', path: aiPagePaths.userAgreement, description: 'İstifadəçi şərtləri və razılaşması.', keywords: ['razılaşma', 'şərtlər', 'istifadəçi'], locales: allLocales },
]

function validateRegistry(entries: readonly AiPage[]) {
  const keys = new Set<string>()
  const paths = new Set<string>()
  for (const entry of entries) {
    if (!entry.key || keys.has(entry.key)) throw new Error(`Duplicate AI page key: ${entry.key}`)
    if (!entry.path.startsWith('/') || paths.has(entry.path)) throw new Error(`Invalid or duplicate AI page path: ${entry.path}`)
    keys.add(entry.key)
    paths.add(entry.path)
  }
}

validateRegistry(aiPages)
