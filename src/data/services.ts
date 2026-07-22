/**
 * Service catalogue, grouped by care direction.
 * Prices are transparent ranges in UAH (₴) — hiding prices is treated as a
 * critical trust error in the research. Ranges reflect that final cost depends
 * on hair length, condition and chosen products.
 */

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

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    title: 'Волосся',
    summary: 'Стрижка, колористика та відновлення — з увагою до структури вашого волосся.',
    accent: 'mocha',
    items: [
      {
        name: 'Жіноча стрижка та укладка',
        note: 'Форма, що враховує тип волосся й ритм вашого життя.',
        duration: '60–90 хв',
        priceFrom: 750,
      },
      {
        name: 'Чоловіча стрижка',
        note: 'Класика або сучасна форма з деталізацією контуру.',
        duration: '45 хв',
        priceFrom: 550,
      },
      {
        name: 'Складна колористика',
        note: 'Air touch, розтяжка, балаяж — мʼякі природні переходи.',
        duration: 'від 180 хв',
        priceFrom: 2400,
      },
      {
        name: 'Тонування та догляд',
        note: 'Оновлення відтінку й глибоке живлення після фарбування.',
        duration: '90 хв',
        priceFrom: 1200,
      },
    ],
  },
  {
    id: 'skincare',
    title: 'Догляд за обличчям',
    summary: 'Естетичний догляд, що повертає шкірі баланс, тонус і природне сяйво.',
    accent: 'olive',
    items: [
      {
        name: 'Глибоке очищення',
        note: 'Мʼяка комбінована чистка з фінальним заспокоєнням шкіри.',
        duration: '90 хв',
        priceFrom: 1400,
      },
      {
        name: 'Догляд за типом шкіри',
        note: 'Індивідуальний протокол за результатом попередньої діагностики.',
        duration: '75 хв',
        priceFrom: 1250,
      },
      {
        name: 'Пілінг-оновлення',
        note: 'Делікатне вирівнювання тону й текстури обличчя.',
        duration: '60 хв',
        priceFrom: 1600,
      },
      {
        name: 'Масаж обличчя',
        note: 'Скульптурний ручний масаж для тонусу та лімфодренажу.',
        duration: '50 хв',
        priceFrom: 900,
      },
    ],
  },
  {
    id: 'nails',
    title: 'Манікюр і педикюр',
    summary: 'Охайні руки й стопи, стерильність інструменту та стійке покриття.',
    accent: 'lavender',
    items: [
      {
        name: 'Манікюр із покриттям',
        note: 'Опрацювання форми, кутикули та щільне рівне покриття.',
        duration: '90 хв',
        priceFrom: 650,
      },
      {
        name: 'Педикюр',
        note: 'Апаратна обробка стоп із доглядом і покриттям.',
        duration: '90 хв',
        priceFrom: 850,
      },
      {
        name: 'Дизайн та архітектура',
        note: 'Зміцнення, вирівнювання й акуратний авторський дизайн.',
        duration: '120 хв',
        priceFrom: 1100,
      },
    ],
  },
  {
    id: 'brows',
    title: 'Брови та вії',
    summary: 'Природна форма, що підкреслює риси обличчя без надмірності.',
    accent: 'mocha',
    items: [
      {
        name: 'Корекція та фарбування брів',
        note: 'Форма за архітектурою вашого обличчя, мʼякий відтінок.',
        duration: '45 хв',
        priceFrom: 450,
      },
      {
        name: 'Ламінування брів',
        note: 'Доглянута фіксована форма з ефектом густоти.',
        duration: '60 хв',
        priceFrom: 700,
      },
      {
        name: 'Ламінування та фарбування вій',
        note: 'Природний вигин і глибина погляду без нарощування.',
        duration: '75 хв',
        priceFrom: 850,
      },
    ],
  },
];
