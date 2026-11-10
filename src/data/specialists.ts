/**
 * Salon specialists. In the premium segment clients come "for a person",
 * so each master gets a clear specialisation and a direct booking path.
 * No fabricated experience counts — focus is on craft and approach.
 *
 * The data lives in specialists.json (editable in Pages CMS, see .pages.yml).
 * Portraits are stored there as repo paths and resolved here to images that
 * astro:assets can optimise, so a photo uploaded from the CMS gets the same
 * treatment as the original ones.
 */
import type { ImageMetadata } from 'astro';
import data from './specialists.json';

export interface Specialist {
  id: string;
  name: string;
  role: string;
  /** Short, human description of their focus and approach. */
  focus: string;
  /** Care directions shown as tags on their card (free-text, for reading). */
  areas: string[];
  /** serviceCategories ids this specialist covers — drives booking-form filtering. */
  directions: string[];
  /** Portrait photograph, processed through astro:assets. */
  portrait: ImageMetadata;
  /** Descriptive alt text for the portrait. */
  portraitAlt: string;
}

const portraits = import.meta.glob<ImageMetadata>(
  '/src/assets/specialists/*.{webp,jpg,jpeg,png,avif}',
  { eager: true, import: 'default' },
);

export const specialists: Specialist[] = data.specialists.map((person) => {
  const portrait = portraits[person.portrait];
  // Fail the build, not the page: a wrong path from the CMS must never ship a broken photo.
  if (!portrait) throw new Error(`Portrait not found for "${person.name}": ${person.portrait}`);
  return { ...person, portrait };
});
