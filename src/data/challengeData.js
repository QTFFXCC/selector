export const challengeData = {
  // Straight Way - Challenge 1
  straightWay: {
    id: 'straight',
    name: "Straight Way",
    type: '2stage',
    phases: 2,
    icon: "🎯",
    advantages: [
      "Классический челлендж",
      "Стандартные условия",
      "Проверенная система",
      "Оптимальный баланс"
    ],
    description: "Классический двухфазный челлендж со стандартными условиями",
    drawdownType: "static",
    phase1: {
      targetProfit: 8,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    phase2: {
      targetProfit: 5,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    liveFundedAccount: {
      targetProfit: null,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    payoutRules: {
      minTradingDays: null,
      consistencyRule: 45,
      profitSplit: 80,
      minPayout: 1,
      maxPayout: 5
    },
    pricing: {
      5000: null,
      10000: 119,
      25000: 219,
      50000: 339,
      100000: 549,
      150000: null,
      200000: null
    }
  },
  
  // Swift Way - Challenge 2
  swiftWay: {
    id: 'swift',
    name: "Swift Way",
    type: '1stage',
    phases: 1,
    icon: "⚡",
    advantages: [
      "Самый быстрый путь",
      "Только одна фаза",
      "Легкие условия",
      "Быстрый старт"
    ],
    description: "Однофазный челлендж для быстрого старта",
    drawdownType: "static",
    phase1: {
      targetProfit: 9,
      dailyDrawdown: 3,
      maxDrawdown: 6,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    liveFundedAccount: {
      targetProfit: null,
      dailyDrawdown: 3,
      maxDrawdown: 6,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    payoutRules: {
      minTradingDays: null,
      consistencyRule: 30,
      profitSplit: 80,
      minPayout: 1,
      maxPayout: 5
    },
    pricing: {
      5000: null,
      10000: 119,
      25000: 299,
      50000: 459,
      100000: 649,
      150000: null,
      200000: null
    }
  },
  
  // Starter Way - Challenge 3
  starterWay: {
    id: 'starter',
    name: "Starter Way",
    type: '2stage',
    phases: 2,
    icon: "🚀",
    advantages: [
      "Для начинающих",
      "Самая низкая цена",
      "Легкий профит таргет",
      "Простые условия"
    ],
    description: "Идеальный челлендж для начинающих трейдеров",
    drawdownType: "static",
    phase1: {
      targetProfit: 6,
      dailyDrawdown: 3,
      maxDrawdown: 6,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    phase2: {
      targetProfit: 3,
      dailyDrawdown: 3,
      maxDrawdown: 6,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    liveFundedAccount: {
      targetProfit: null,
      dailyDrawdown: 3,
      maxDrawdown: 6,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    payoutRules: {
      minTradingDays: null,
      consistencyRule: 45,
      profitSplit: 80,
      minPayout: 1,
      maxPayout: 5
    },
    pricing: {
      5000: 39,
      10000: 69,
      25000: 139,
      50000: 269,
      100000: 489,
      150000: null,
      200000: null
    }
  },
  
  // Pro Way - Challenge 4
  proWay: {
    id: 'pro',
    name: "Pro Way",
    type: '2stage',
    phases: 2,
    icon: "💎",
    advantages: [
      "Без ограничений консистенции",
      "Для опытных трейдеров",
      "Больше свободы",
      "Гибкие условия"
    ],
    description: "Челлендж для профессионалов без ограничений",
    drawdownType: "static",
    phase1: {
      targetProfit: 10,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    phase2: {
      targetProfit: 5,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      minTradingDays: 3,
      timeLimit: null,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    liveFundedAccount: {
      targetProfit: null,
      dailyDrawdown: 5,
      maxDrawdown: 10,
      maxDrawdownThreshold: "3profitable(0.5%)"
    },
    payoutRules: {
      minTradingDays: null,
      consistencyRule: null, // No consistency rule
      profitSplit: 80,
      minPayout: 1,
      maxPayout: 5
    },
    pricing: {
      5000: null,
      10000: 189,
      25000: 299,
      50000: 455,
      100000: 655,
      150000: null,
      200000: null
    }
  }
};

// Массив всех челленджей для удобства
export const allChallenges = [
  challengeData.starterWay,
  challengeData.swiftWay,
  challengeData.straightWay,
  challengeData.proWay
];

// Типы челленджей для UI - больше не используются
export const challengeTypes = [
  { id: '1stage', label: '1 stage', value: 'oneEvaluation' },
  { id: '2stage', label: '2 stage', value: 'twoEvaluation' }
];

// Размеры счетов
export const accountSizes = [
  { value: 5000, label: '5K' },
  { value: 10000, label: '10K' },
  { value: 25000, label: '25K' },
  { value: 50000, label: '50K' },
  { value: 100000, label: '100K' }
]; 