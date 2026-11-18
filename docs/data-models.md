# Справочник: моковые данные и модели

## Модели данных

Этот документ описывает все типы данных, используемые в приложении. Агенты должны следовать этим типам при создании компонентов и мок-данных.

---

## User

```js
{
  id: "user-001",
  username: "PlayerOne",
  email: "player@example.com",
  avatar: "/images/avatars/default.png",
  balance: 12450,
  registeredAt: "2026-10-01T12:00:00Z",
  stats: {
    casesOpened: 142,
    totalDropValue: 85200,
    bestDrop: {
      skinId: "karambit-fade",
      name: "★ Karambit | Fade",
      value: 15000,
      rarity: "GOLD"
    }
  }
}
```

## Case

```js
{
  id: "gamma-case",
  name: "Gamma Case",
  image: "/images/cases/gamma-case.png",
  price: 499,
  category: "standard",        // standard | premium | special
  isNew: true,
  isHot: false,
  discount: null,              // null | { percent: 20, oldPrice: 625 }
  contents: [
    {
      skinId: "mac10-lapis-gator",
      name: "MAC-10 | Lapis Gator",
      weapon: "MAC-10",
      rarity: "CONSUMER",
      image: "/images/skins/mac10-lapis-gator.png",
      minPrice: 50,
      maxPrice: 150
    },
    {
      skinId: "ak47-vulcan",
      name: "AK-47 | Vulcan",
      weapon: "AK-47",
      rarity: "RESTRICTED",
      image: "/images/skins/ak47-vulcan.png",
      minPrice: 800,
      maxPrice: 2500
    },
    // ... 15-25 скинов в кейсе
  ]
}
```

## Skin (выпавший / в инвентаре)

```js
{
  id: "inv-item-001",
  
  // Информация о скине
  skin: {
    id: "ak47-vulcan",
    name: "AK-47 | Vulcan",
    weapon: "AK-47",
    category: "rifle",         // rifle | pistol | smg | shotgun | knife | gloves
    image: "/images/skins/ak47-vulcan.png",
    rarity: "RESTRICTED",      // CONSUMER | INDUSTRIAL | MILSPEC | RESTRICTED | CLASSIFIED | COVERT | GOLD
    collection: "The Huntsman Collection"
  },
  
  // Индивидуальные характеристики
  condition: "MW",             // FN | MW | FT | WW | BS
  conditionFull: "Minimal Wear",
  float: 0.0834,
  pattern: 245,
  statTrak: false,
  
  // Метаданные
  price: 1200,                 // текущая рыночная оценка
  obtainedAt: "2026-11-15T10:30:00Z",
  source: "Gamma Case",       // откуда получен
  
  // Статус
  isListed: false,             // на маркетплейсе или нет
  listingId: null              // ID листинга если выставлен
}
```

## Market Listing

```js
{
  id: "listing-001",
  
  seller: {
    id: "user-042",
    username: "Player123",
    avatar: "/images/avatars/default.png"
  },
  
  skin: {
    id: "ak47-vulcan",
    name: "AK-47 | Vulcan",
    weapon: "AK-47",
    category: "rifle",
    image: "/images/skins/ak47-vulcan.png",
    rarity: "RESTRICTED",
    condition: "MW",
    conditionFull: "Minimal Wear",
    float: 0.0834,
    statTrak: false,
    pattern: 245
  },
  
  price: 1200,
  listedAt: "2026-11-14T15:00:00Z",
  views: 42
}
```

## Transaction

```js
{
  id: "txn-001",
  type: "deposit",             // deposit | case_open | case_drop | market_buy | market_sell | market_cancel
  amount: 1000,                // положительное = приход, отрицательное = расход
  balanceAfter: 12450,
  description: "Пополнение баланса",
  metadata: {                  // зависит от типа
    // case_open: { caseId, caseName }
    // case_drop: { skinId, skinName, rarity }
    // market_buy: { listingId, skinName, sellerId }
    // market_sell: { listingId, skinName, buyerId, commission }
  },
  createdAt: "2026-11-18T14:30:00Z"
}
```

## Case Open Result

```js
{
  success: true,
  wonSkin: {
    id: "inv-item-042",
    skin: {
      id: "ak47-vulcan",
      name: "AK-47 | Vulcan",
      weapon: "AK-47",
      image: "/images/skins/ak47-vulcan.png",
      rarity: "RESTRICTED"
    },
    condition: "MW",
    conditionFull: "Minimal Wear",
    float: 0.0834,
    statTrak: false,
    pattern: 245,
    price: 1200
  },
  newBalance: 11951
}
```

## Live Drop (для фида последних дропов)

```js
{
  id: "drop-001",
  user: {
    username: "Player42",
    avatar: "/images/avatars/default.png"
  },
  skin: {
    name: "AWP | Dragon Lore",
    image: "/images/skins/awp-dragon-lore.png",
    rarity: "COVERT",
    condition: "FN"
  },
  caseName: "Gamma Case",
  price: 25000,
  droppedAt: "2026-11-18T14:35:00Z"
}
```

---

## Категории оружия

```js
export const WEAPON_CATEGORIES = {
  rifle: {
    name: 'Винтовки',
    weapons: ['AK-47', 'M4A4', 'M4A1-S', 'AWP', 'SSG 08', 'SG 553', 'AUG', 'FAMAS', 'Galil AR', 'SCAR-20', 'G3SG1']
  },
  pistol: {
    name: 'Пистолеты',
    weapons: ['Glock-18', 'USP-S', 'P2000', 'P250', 'Five-SeveN', 'Tec-9', 'CZ75-Auto', 'Desert Eagle', 'R8 Revolver', 'Dual Berettas']
  },
  smg: {
    name: 'Пистолеты-пулемёты',
    weapons: ['MAC-10', 'MP9', 'MP7', 'MP5-SD', 'UMP-45', 'P90', 'PP-Bizon']
  },
  shotgun: {
    name: 'Дробовики',
    weapons: ['Nova', 'XM1014', 'MAG-7', 'Sawed-Off']
  },
  machinegun: {
    name: 'Пулемёты',
    weapons: ['M249', 'Negev']
  },
  knife: {
    name: 'Ножи',
    weapons: ['Karambit', 'M9 Bayonet', 'Bayonet', 'Butterfly Knife', 'Flip Knife', 'Gut Knife', 'Huntsman Knife', 'Falchion Knife', 'Shadow Daggers', 'Bowie Knife', 'Navaja Knife', 'Stiletto Knife', 'Talon Knife', 'Ursus Knife', 'Classic Knife', 'Paracord Knife', 'Survival Knife', 'Nomad Knife', 'Skeleton Knife', 'Kukri Knife']
  },
  gloves: {
    name: 'Перчатки',
    weapons: ['Sport Gloves', 'Specialist Gloves', 'Driver Gloves', 'Hand Wraps', 'Moto Gloves', 'Hydra Gloves', 'Broken Fang Gloves']
  }
};
```

---

## Пример набора кейсов (для мока)

```js
export const MOCK_CASES = [
  {
    id: 'gamma-case',
    name: 'Gamma Case',
    price: 499,
    image: '/images/cases/gamma.png',
    category: 'standard',
    isNew: false,
    isHot: true,
  },
  {
    id: 'fracture-case',
    name: 'Fracture Case',
    price: 299,
    image: '/images/cases/fracture.png',
    category: 'standard',
    isNew: true,
    isHot: false,
  },
  {
    id: 'revolution-case',
    name: 'Revolution Case',
    price: 399,
    image: '/images/cases/revolution.png',
    category: 'standard',
    isNew: true,
    isHot: true,
  },
  {
    id: 'gold-case',
    name: 'Gold Case',
    price: 1499,
    image: '/images/cases/gold.png',
    category: 'premium',
    isNew: false,
    isHot: false,
  },
  {
    id: 'dreams-nightmares',
    name: 'Dreams & Nightmares Case',
    price: 599,
    image: '/images/cases/dreams.png',
    category: 'standard',
    isNew: false,
    isHot: false,
  },
  {
    id: 'recoil-case',
    name: 'Recoil Case',
    price: 349,
    image: '/images/cases/recoil.png',
    category: 'standard',
    isNew: false,
    isHot: false,
  },
  {
    id: 'kilowatt-case',
    name: 'Kilowatt Case',
    price: 449,
    image: '/images/cases/kilowatt.png',
    category: 'standard',
    isNew: true,
    isHot: true,
  },
  {
    id: 'knife-case',
    name: 'Knife Case',
    price: 2499,
    image: '/images/cases/knife.png',
    category: 'special',
    isNew: false,
    isHot: true,
  },
];
```
