export const WEAR_CONDITIONS = {
  FN: { key: 'FN', name: 'Factory New', nameRu: 'Прямо с завода', min: 0.00, max: 0.07 },
  MW: { key: 'MW', name: 'Minimal Wear', nameRu: 'Немного поношенное', min: 0.07, max: 0.15 },
  FT: { key: 'FT', name: 'Field-Tested', nameRu: 'После полевых испытаний', min: 0.15, max: 0.38 },
  WW: { key: 'WW', name: 'Well-Worn', nameRu: 'Поношенное', min: 0.38, max: 0.45 },
  BS: { key: 'BS', name: 'Battle-Scarred', nameRu: 'Закалённое в боях', min: 0.45, max: 1.00 },
};

export const getConditionFromFloat = (floatVal) => {
  const f = parseFloat(floatVal);
  if (isNaN(f)) return WEAR_CONDITIONS.FT;
  if (f <= 0.07) return WEAR_CONDITIONS.FN;
  if (f <= 0.15) return WEAR_CONDITIONS.MW;
  if (f <= 0.38) return WEAR_CONDITIONS.FT;
  if (f <= 0.45) return WEAR_CONDITIONS.WW;
  return WEAR_CONDITIONS.BS;
};
