/**
 * Service catalogue, grouped by care direction.
 * Prices are transparent ranges in UAH (₴) — hiding prices is treated as a
 * critical trust error in the research. Ranges reflect that final cost depends
 * on hair length, condition and chosen products.
 *
 * The data itself lives in services.json so the salon can edit it in Pages CMS
 * (see .pages.yml). This file only types it.
 */
import data from './services.json';

export interface ServiceItem {
  name: string;
  /** Short, calm description of the outcome — not a technical procedure list. */
  note?: string;
  /** Duration in minutes, shown as a range where relevant. */
  duration: string;
  /** Starting price in UAH. */
  priceFrom: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  /** One-line editorial summary of the direction. */
  summary: string;
  /** Accent used for the category chip. */
  accent: 'mocha' | 'olive' | 'lavender';
  items: ServiceItem[];
}

export const currency = '₴';

export const serviceCategories = data.categories as ServiceCategory[];
