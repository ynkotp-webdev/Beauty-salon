/**
 * Central brand + site configuration for VERVENA.
 * Single source of truth for identity, navigation, contacts and metadata.
 */

export const site = {
  name: 'VERVENA',
  /** Wordmark is rendered as text; no raster logo needed. */
  legalName: 'Простір краси VERVENA',
  tagline: 'Простір усвідомленої краси',
  /** Used as the default <title> suffix and OG site name. */
  shortDescription:
    'Салон краси у центрі Львова: волосся, догляд за обличчям, манікюр, брови та вії. Спокійний ритуал догляду і уважні майстри.',
  metaDescription:
    'VERVENA — салон краси на вул. Вірменській у Львові. Стрижка та колористика, догляд за обличчям, манікюр, брови й вії. Прозорі ціни, зручний онлайн-запис, спокійна атмосфера.',
  /** Origin only — the `base` subpath comes from Astro.url / BASE_URL. */
  url: 'https://ynkotp-webdev.github.io',
  locale: 'uk_UA',
  lang: 'uk',
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation — flat structure, mirrors the page narrative. */
export const navLinks: NavLink[] = [
  { label: 'Послуги', href: '#services' },
  { label: 'Філософія', href: '#about' },
  { label: 'Майстри', href: '#specialists' },
  { label: 'Результати', href: '#results' },
  { label: 'Відгуки', href: '#reviews' },
  { label: 'Контакти', href: '#contact' },
];

export const contact = {
  street: 'вул. Вірменська, 12',
  district: 'Галицький район',
  city: 'Львів',
  postcode: '79008',
  country: 'Україна',
  phoneDisplay: '+38 (032) 245 07 12',
  phoneHref: 'tel:+380322450712',
  email: 'hello@vervena.salon',
  emailHref: 'mailto:hello@vervena.salon',
  mapUrl: 'https://maps.google.com/?q=Вірменська+12+Львів',
  /** Approximate coordinates for old-town Lviv (Armenian Street). */
  geo: { lat: 49.8442, lng: 24.0316 },
} as const;

export interface OpeningHour {
  day: string;
  hours: string;
}

export const openingHours: OpeningHour[] = [
  { day: 'Понеділок — Пʼятниця', hours: '09:00 — 21:00' },
  { day: 'Субота', hours: '10:00 — 20:00' },
  { day: 'Неділя', hours: '10:00 — 18:00' },
];

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export const socials: SocialLink[] = [
  { label: 'Instagram', handle: '@vervena.lviv', href: 'https://instagram.com/vervena.lviv' },
  { label: 'Facebook', handle: 'vervena.lviv', href: 'https://facebook.com/vervena.lviv' },
  { label: 'Telegram', handle: '@vervena', href: 'https://t.me/vervena' },
];

/** Soft, informative availability note (no aggressive urgency — per research). */
export const availabilityNote =
  'Найближче вільне вікно до провідного колориста — четвер, 14:00';
