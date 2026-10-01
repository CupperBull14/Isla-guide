/**
 * Шкалы для баров статов. Максимум — наибольшее значение среди взрослых особей
 * играбельного ростера по данным Evrima Quick Guide (страницы видов, чтение 2026-10-01).
 */
export const statScales = {
  /** кг. Triceratops, взрослый (9,5 т) */
  weight: 9500,
  /** км/ч. Carnotaurus, взрослый (49,5) → округлено до 50 */
  speed: 50,
  /** условные единицы Bite Force. Tyrannosaurus, взрослый (699) */
  bite: 700,
  /** минут. Tyrannosaurus, полный рост 35 ч 33 мин */
  growth: 2133,
  /** минут. Deinosuchus, голод 90 мин (Triceratops/Stegosaurus/Kentrosaurus — тоже 90) */
  hunger: 90,
  /** минут. Максимум по ростеру — 60 (Deinosuchus 10, Dryosaurus 45, Beipiaosaurus 20) */
  thirst: 60,
} as const
