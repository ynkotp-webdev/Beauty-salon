/**
 * Salon specialists. In the premium segment clients come "for a person",
 * so each master gets a clear specialisation and a direct booking path.
 * No fabricated experience counts — focus is on craft and approach.
 */

export interface Specialist {
  id: string;
  name: string;
  role: string;
  /** Short, human description of their focus and approach. */
  focus: string;
  /** Care directions they cover (maps to service category ids). */
  areas: string[];
  /** Descriptive alt text for the (placeholder) portrait. */
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
    portraitAlt:
      'Портрет майстрині брів і вій Христини Мельник у робочому просторі салону VERVENA',
  },
];
