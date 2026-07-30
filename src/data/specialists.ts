/**
 * Salon specialists. In the premium segment clients come "for a person",
 * so each master gets a clear specialisation and a direct booking path.
 * No fabricated experience counts — focus is on craft and approach.
 */
import type { ImageMetadata } from 'astro';

import iryna from '@/assets/specialist-iryna.webp';
import marta from '@/assets/specialist-marta.webp';
import solomiya from '@/assets/specialist-solomiya.webp';
import ostap from '@/assets/specialist-ostap.webp';
import khrystyna from '@/assets/specialist-khrystyna.webp';

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

export const specialists: Specialist[] = [
  {
    id: 'iryna',
    name: 'Ірина Ковальчук',
    role: 'Провідна стилістка-колористка',
    focus:
      'Працює зі складними переходами кольору й повертає волоссю здоровий блиск. Любить природні, «дорогі» відтінки.',
    areas: ['Колористика', 'Стрижка', 'Догляд'],
    directions: ['hair'],
    portrait: iryna,
    portraitAlt:
      'Портрет стилістки-колористки Ірини Ковальчук у робочому просторі салону VERVENA при мʼякому денному світлі',
  },
  {
    id: 'marta',
    name: 'Марта Гнатишин',
    role: 'Косметологиня-естетистка',
    focus:
      'Вибудовує догляд за обличчям навколо стану шкіри, а не тренду. Починає роботу з діагностики та спокійної розмови.',
    areas: ['Догляд за обличчям', 'Пілінги', 'Масаж обличчя'],
    directions: ['skincare'],
    portrait: marta,
    portraitAlt:
      'Портрет косметологині Марти Гнатишин у кабінету догляду за обличчям салону VERVENA',
  },
  {
    id: 'solomiya',
    name: 'Соломія Данилюк',
    role: 'Майстриня манікюру',
    focus:
      'Цінує геометрію й чистоту роботи. Робить стійке покриття та природну архітектуру нігтя без зайвого декору.',
    areas: ['Манікюр', 'Педикюр', 'Дизайн'],
    directions: ['nails'],
    portrait: solomiya,
    portraitAlt:
      'Портрет майстрині манікюру Соломії Данилюк за робочим столом салону VERVENA',
  },
  {
    id: 'ostap',
    name: 'Остап Левицький',
    role: 'Барбер, чоловічий стиліст',
    focus:
      'Точні контури й форма, що легко відновлюється вдома. Радить догляд відповідно до типу волосся й бороди.',
    areas: ['Чоловіча стрижка', 'Борода', 'Стайлінг'],
    directions: ['hair'],
    portrait: ostap,
    portraitAlt:
      'Портрет барбера Остапа Левицького біля робочого крісла салону VERVENA',
  },
  {
    id: 'khrystyna',
    name: 'Христина Мельник',
    role: 'Майстриня брів і вій',
    focus:
      'Вибудовує форму брів за пропорціями обличчя. Робить акцент на природності та охайності ліній.',
    areas: ['Брови', 'Ламінування', 'Вії'],
    directions: ['brows'],
    portrait: khrystyna,
    portraitAlt:
      'Портрет майстрині брів і вій Христини Мельник у робочому просторі салону VERVENA',
  },
];
