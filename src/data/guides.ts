import type { FaqItem, GlossaryTerm, GuideStep } from '../types'
import { refs } from './sources'

/**
 * Сквозные гайды. Каждый шаг и ответ опирается на источник; без источника — не пишем.
 * Порядок шагов — логический, это не таймер: игровых «минут» источники не дают.
 */
export const firstDaySteps: GuideStep[] = [
  {
    id: 'pick',
    when: 'Перед стартом',
    title: 'Выбери динозавра и режим',
    body: 'Новичкам оба источника советуют мелких быстрых динозавров — Dryosaurus и Hypsilophodon. Режим Survival включает рост и пермасмерть, в Sandbox ты сразу взрослый.',
    checklist: ['Выбери вид из рекомендованных новичкам', 'Помни: в Survival смерть окончательная'],
    sources: [refs.officialBeginner, refs.tigHowToPlay],
  },
  {
    id: 'spawn',
    when: 'Сразу после спавна',
    title: 'Найди воду и еду, не выдавая себя',
    body: 'Первая задача — вода и еда, пока ты не заметен. Запах (Q по умолчанию) показывает еду, воду и следы без риска.',
    checklist: ['Нажми Q и найди воду', 'Не пересекай открытые места без нужды'],
    sources: [refs.tigHowToPlay, refs.officialBeginner],
  },
  {
    id: 'senses',
    when: 'В пути',
    title: 'Слушай и смотри компас',
    body: 'Шаги и крики — подсказки об опасности. Новички часто игнорируют иконки компаса и бегут на далёкие звуки.',
    checklist: ['Следи за иконками компаса', 'Не беги на дальние звуки'],
    sources: [refs.officialBeginner, refs.tigHowToPlay],
  },
  {
    id: 'stamina',
    when: 'Постоянно',
    title: 'Береги стамину',
    body: 'Лишний спринт опустошает выносливость до появления хищника. Восстановление в покое быстрее, чем на ходу.',
    checklist: ['Спринтуй только когда нужно', 'Отдыхай стоя, пока никого нет'],
    sources: [refs.officialBeginner, refs.eqgStamina],
  },
  {
    id: 'nutrients',
    when: 'Когда осмотрелся',
    title: 'Разберись с диетой',
    body: 'Нутриенты β, γ и α восстанавливают HP, переломы и кровотечение. Пока не съешь подходящую еду, шкала на нуле.',
    checklist: ['Открой страницу своего вида, раздел «Питание»', 'Ешь разные группы еды, чтобы активировать все нутриенты'],
    sources: [refs.eqgDiet],
  },
  {
    id: 'risks',
    when: 'При движении по карте',
    title: 'Обходи опасные места',
    body: 'Глубокая вода и крутой рельеф — частые ловушки для новичков. Голодный и обезвоженный динозавр медленный и слабый.',
    checklist: ['Не заходи в глубокую воду без необходимости', 'Не иди в путь голодным и обезвоженным'],
    sources: [refs.officialBeginner, refs.tigHowToPlay],
  },
  {
    id: 'group',
    when: 'Если встретил своего',
    title: 'Группа и звуки',
    body: 'Зов 2 (Friendly) — приветствие и приглашение в группу; зов 1 — «я здесь» для своего вида. Группы между видами не формируются.',
    checklist: ['Нажми 2 рядом со своим видом', 'Используй зов 4, чтобы позвать на помощь'],
    sources: [refs.eqgPacks, refs.xgsCalls],
  },
  {
    id: 'logout',
    when: 'Когда заканчиваешь',
    title: 'Выходи безопасно',
    body: 'Alt+F4 или выход на виду оставляет персонажа в мире. Используй безопасный выход и укрытие.',
    checklist: ['Спрячься в укрытии', 'Выйди через безопасный логаут'],
    sources: [refs.officialBeginner, refs.tigHowToPlay],
  },
]

/**
 * Глоссарий. Английские термины — из перечисленных источников. Русская колонка — перевод/калька автора сайта,
 * а не подтверждённый сленг русскоязычного сообщества (такого источника найти не удалось).
 */
export const glossary: GlossaryTerm[] = [
  { id: 'pounce', en: 'Pounce', ru: 'Прыжок-захват', meaning: 'Атака, при которой часть хищников цепляется за цель; у жертвы есть шанс сбросить нападающего.', source: refs.eqgFighting },
  { id: 'buck', en: 'Buck', ru: 'Сбросить', meaning: 'Удерживая E, жертва сбрасывает вцепившегося динозавра; тратит стамину.', source: refs.eqgFighting },
  { id: 'grapple', en: 'Grapple', ru: 'Захват', meaning: 'Весовая механика захвата цели; пороги веса в источнике даны для патча 0.18.11 и могли измениться.', source: refs.eqgFighting },
  { id: 'knockdown', en: 'Knockdown', ru: 'Нокдаун', meaning: 'Эффект от разбега или удара ногой, обездвиживающий небольшую цель.', source: refs.eqgFighting },
  { id: 'stagger', en: 'Stagger', ru: 'Пошатывание', meaning: 'Состояние, останавливающее динозавра на месте и облегчающее добивание.', source: refs.eqgFighting },
  { id: 'bleed', en: 'Bleed', ru: 'Кровотечение', meaning: 'Рана со следом крови: может убить даже при полном HP.', source: refs.eqgFighting },
  { id: 'bacterial', en: 'Bacterial', ru: 'Бактерии', meaning: 'Инфекция от укуса Ceratosaurus; может вызывать рвоту; лечится соляными камнями.', source: refs.eqgFighting },
  { id: 'envenomed', en: 'Envenomed', ru: 'Отравлен', meaning: 'Прогрессивный яд, действующий около 45 секунд.', source: refs.eqgFighting },
  { id: 'glass-bones', en: 'Glass Bones', ru: 'Хрупкие кости', meaning: 'Состояние после нескольких переломов.', source: refs.eqgHealth },
  { id: 'broadcast', en: 'Broadcast', ru: 'Призыв «я здесь»', meaning: 'Дальний зов, привлекающий игроков своего вида (клавиша 1).', source: refs.xgsCalls },
  { id: 'friendly', en: 'Friendly call', ru: 'Дружелюбный зов', meaning: 'Короткое приветствие без агрессии; также формирует и принимает группу (клавиша 2).', source: refs.xgsCalls },
  { id: 'threaten', en: 'Threaten', ru: 'Угроза', meaning: 'Предупреждение чужакам держаться подальше от территории, добычи или пары (клавиша 3).', source: refs.xgsCalls },
  { id: 'distress', en: 'Help / Distress', ru: 'Зов о помощи', meaning: 'Тревога для союзников при хищнике рядом или опасности (клавиша 4).', source: refs.xgsCalls },
  { id: 'prime', en: 'Prime', ru: 'Прайм', meaning: 'Постоянный бонус за выполнение 5 из 10 условий жизненного цикла до 75% роста.', source: refs.tigPrime },
  { id: 'frail', en: 'Frail', ru: 'Хилый (Frail)', meaning: 'Статус без Prime; в источниках описывается по-разному (см. раздел «Механики»).', source: refs.tigPrime },
  { id: 'entomb', en: 'Entomb', ru: 'Энтомб', meaning: 'Перезапуск малышом того же вида на 100% роста с сохранением усиленных мутаций.', source: refs.tigPrime },
  { id: 'sanctuary', en: 'Sanctuary', ru: 'Санктуарий', meaning: 'Защищённая зона для молодых динозавров.', source: refs.eqgSanctuary },
  { id: 'patrol', en: 'Patrol zone', ru: 'Патрульная зона', meaning: 'Зона хищников, активная при наличии еды и недавней активности игроков.', source: refs.eqgMigration },
  { id: 'migration', en: 'Migration zone', ru: 'Миграционная зона', meaning: 'Зона еды для травоядных, переносится по мере поедания.', source: refs.eqgMigration },
  { id: 'nutrients', en: 'Nutrients α/β/γ', ru: 'Нутриенты', meaning: 'Углеводы, белки и липиды: отвечают за кровотечение, HP и переломы.', source: refs.eqgDiet },
]

export const faq: FaqItem[] = [
  { id: 'patch', question: 'Какой патч актуален?', answer: 'Сайт ориентирован на патч 0.21.772 (3 августа 2026).', caveat: '⚠️ Страница серверов показывает 0.21.784 — считаем артефактом страницы.', sources: [refs.patch772, refs.servers] },
  { id: 'count', question: 'Сколько играбельных существ в Evrima?', answer: 'На сайте — 22 играбельных вида.', caveat: '⚠️ Baryonyx по официальным девблогам пока в тестировании; по решению владельца сайта в число 22 не входит.', sources: [refs.devblog72] },
  { id: 'start', question: 'С кого начать новичку?', answer: 'Оба источника советуют мелких быстрых — Dryosaurus и Hypsilophodon.', sources: [refs.officialBeginner, refs.tigHowToPlay] },
  { id: 'logout', question: 'Как выйти, не потеряв динозавра?', answer: 'Через безопасный логаут в укрытии; Alt+F4 оставляет персонажа в мире.', sources: [refs.officialBeginner, refs.tigHowToPlay] },
  { id: 'prime', question: 'Как получить Prime?', answer: 'Выполни 5 из 10 условий до 75% роста (для малых видов — 4 по theisle.info). Список условий — в разделе «Механики».', sources: [refs.eqgElder, refs.tigPrime] },
  { id: 'bite', question: 'Bite — это урон?', answer: 'Нет. Bite Force из таблиц — не эквивалент урона, мы показываем его с такой пометкой.', sources: [refs.eqgCarnivores] },
  { id: 'trophies', question: 'Есть ли в Evrima трофеи?', answer: 'В источниках такой игровой системы не найдено — данных нет.', sources: [] },
  { id: 'servers', question: 'Почему серверы недоступны после патча?', answer: 'При обновлении ветки Evrima официальные серверы выключаются (пример: 0.21.772).', sources: [refs.patch772] },
  { id: 'group', question: 'Как создать группу?', answer: 'Нажми 2 (Friendly) рядом с особью своего вида; игрок должен принять приглашение. Между видами группы не формируются.', sources: [refs.eqgPacks, refs.xgsCalls] },
  { id: 'bleed', question: 'Что делать при кровотечении?', answer: 'Отдыхай (H) и ешь еду с углеводами (α); кровотечение может убить при полном HP.', sources: [refs.eqgHealth, refs.eqgDiet] },
]
