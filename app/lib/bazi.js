import { Solar } from "lunar-javascript";

export const fiveElements = {
  Wood: {
    negative: "Negative Wood",
    positive: "Positive Wood",
    colorNegative: "bg-emerald-300/70",
    colorPositive: "bg-emerald-600/80",
    meaning: "growth, creativity, kindness, flexibility"
  },
  Fire: {
    negative: "Negative Fire",
    positive: "Positive Fire",
    colorNegative: "bg-red-300/70",
    colorPositive: "bg-red-600/80",
    meaning: "passion, expression, warmth, visibility"
  },
  Earth: {
    negative: "Negative Earth",
    positive: "Positive Earth",
    colorNegative: "bg-yellow-300/70",
    colorPositive: "bg-yellow-700/80",
    meaning: "stability, patience, responsibility, grounding"
  },
  Metal: {
    negative: "Negative Metal",
    positive: "Positive Metal",
    colorNegative: "bg-slate-300/70",
    colorPositive: "bg-slate-500/80",
    meaning: "discipline, clarity, structure, logic"
  },
  Water: {
    negative: "Negative Water",
    positive: "Positive Water",
    colorNegative: "bg-sky-300/70",
    colorPositive: "bg-blue-700/80",
    meaning: "intuition, adaptability, wisdom, emotion"
  }
};

const stemMap = {
  甲: { name: "Jia", symbol: "Jia", element: "Wood", yinYang: "Positive" },
  乙: { name: "Yi", symbol: "Yi", element: "Wood", yinYang: "Negative" },
  丙: { name: "Bing", symbol: "Bing", element: "Fire", yinYang: "Positive" },
  丁: { name: "Ding", symbol: "Ding", element: "Fire", yinYang: "Negative" },
  戊: { name: "Wu", symbol: "Wu", element: "Earth", yinYang: "Positive" },
  己: { name: "Ji", symbol: "Ji", element: "Earth", yinYang: "Negative" },
  庚: { name: "Geng", symbol: "Geng", element: "Metal", yinYang: "Positive" },
  辛: { name: "Xin", symbol: "Xin", element: "Metal", yinYang: "Negative" },
  壬: { name: "Ren", symbol: "Ren", element: "Water", yinYang: "Positive" },
  癸: { name: "Gui", symbol: "Gui", element: "Water", yinYang: "Negative" }
};

const branchMap = {
  子: { name: "Zi", symbol: "Zi", animal: "Rat", element: "Water", yinYang: "Positive", time: "23:00-01:00" },
  丑: { name: "Chou", symbol: "Chou", animal: "Ox", element: "Earth", yinYang: "Negative", time: "01:00-03:00" },
  寅: { name: "Yin", symbol: "Yin", animal: "Tiger", element: "Wood", yinYang: "Positive", time: "03:00-05:00" },
  卯: { name: "Mao", symbol: "Mao", animal: "Rabbit", element: "Wood", yinYang: "Negative", time: "05:00-07:00" },
  辰: { name: "Chen", symbol: "Chen", animal: "Dragon", element: "Earth", yinYang: "Positive", time: "07:00-09:00" },
  巳: { name: "Si", symbol: "Si", animal: "Snake", element: "Fire", yinYang: "Negative", time: "09:00-11:00" },
  午: { name: "Wu", symbol: "Wu", animal: "Horse", element: "Fire", yinYang: "Positive", time: "11:00-13:00" },
  未: { name: "Wei", symbol: "Wei", animal: "Goat", element: "Earth", yinYang: "Negative", time: "13:00-15:00" },
  申: { name: "Shen", symbol: "Shen", animal: "Monkey", element: "Metal", yinYang: "Positive", time: "15:00-17:00" },
  酉: { name: "You", symbol: "You", animal: "Rooster", element: "Metal", yinYang: "Negative", time: "17:00-19:00" },
  戌: { name: "Xu", symbol: "Xu", animal: "Dog", element: "Earth", yinYang: "Positive", time: "19:00-21:00" },
  亥: { name: "Hai", symbol: "Hai", animal: "Pig", element: "Water", yinYang: "Negative", time: "21:00-23:00" }
};

export const heavenlyStems = Object.values(stemMap);
export const stemDetails = {
  Jia: {
    element: "Wood",
    polarity: "Positive",
    direction: "East",
    organ: "Gallbladder",
    image: "Tall tree",
    traits: "upright, ambitious, principled"
  },
  Yi: {
    element: "Wood",
    polarity: "Negative",
    direction: "East",
    organ: "Liver",
    image: "Flowering vine",
    traits: "flexible, graceful, resilient"
  },
  Bing: {
    element: "Fire",
    polarity: "Positive",
    direction: "South",
    organ: "Small Intestine",
    image: "Bright sun",
    traits: "radiant, warm, expressive"
  },
  Ding: {
    element: "Fire",
    polarity: "Negative",
    direction: "South",
    organ: "Heart",
    image: "Candle flame",
    traits: "focused, refined, enduring"
  },
  Wu: {
    element: "Earth",
    polarity: "Positive",
    direction: "Center",
    organ: "Stomach",
    image: "Mountain earth",
    traits: "stable, honest, protective"
  },
  Ji: {
    element: "Earth",
    polarity: "Negative",
    direction: "Center",
    organ: "Spleen",
    image: "Garden soil",
    traits: "nurturing, inclusive, patient"
  },
  Geng: {
    element: "Metal",
    polarity: "Positive",
    direction: "West",
    organ: "Large Intestine",
    image: "Iron blade",
    traits: "strong, decisive, disciplined"
  },
  Xin: {
    element: "Metal",
    polarity: "Negative",
    direction: "West",
    organ: "Lung",
    image: "Jewelry metal",
    traits: "precise, elegant, refined"
  },
  Ren: {
    element: "Water",
    polarity: "Positive",
    direction: "North",
    organ: "Bladder",
    image: "Ocean water",
    traits: "strategic, flowing, intelligent"
  },
  Gui: {
    element: "Water",
    polarity: "Negative",
    direction: "North",
    organ: "Kidney",
    image: "Rain and mist",
    traits: "subtle, wise, hidden"
  }
};
export const earthlyBranches = Object.values(branchMap);

export const chineseHourPeriods = [
  { branch: "Zi", animal: "Rat", time: "23:00-01:00", meaning: "Midnight" },
  { branch: "Chou", animal: "Ox", time: "01:00-03:00", meaning: "Deep night" },
  { branch: "Yin", animal: "Tiger", time: "03:00-05:00", meaning: "Before dawn" },
  { branch: "Mao", animal: "Rabbit", time: "05:00-07:00", meaning: "Sunrise" },
  { branch: "Chen", animal: "Dragon", time: "07:00-09:00", meaning: "Morning meal" },
  { branch: "Si", animal: "Snake", time: "09:00-11:00", meaning: "Late morning" },
  { branch: "Wu", animal: "Horse", time: "11:00-13:00", meaning: "Midday" },
  { branch: "Wei", animal: "Goat", time: "13:00-15:00", meaning: "Early afternoon" },
  { branch: "Shen", animal: "Monkey", time: "15:00-17:00", meaning: "Late afternoon" },
  { branch: "You", animal: "Rooster", time: "17:00-19:00", meaning: "Sunset" },
  { branch: "Xu", animal: "Dog", time: "19:00-21:00", meaning: "Dusk" },
  { branch: "Hai", animal: "Pig", time: "21:00-23:00", meaning: "Night rest" }
];

export const generatingCycle = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood"
};

export const controllingCycle = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood"
};

function parseGanZhi(ganZhi) {
  const stemChar = ganZhi?.[0];
  const branchChar = ganZhi?.[1];

  return {
    stem: stemMap[stemChar],
    branch: branchMap[branchChar]
  };
}

function padTime(num) {
  return String(num).padStart(2, "0");
}

function minutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour = Math.floor(normalized / 60);
  const minute = Math.round(normalized % 60);
  return `${padTime(hour)}:${padTime(minute)}`;
}

function getTimezoneOffsetHours(timezone, dateString) {
  try {
    const date = new Date(`${dateString}T12:00:00Z`);

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset"
    }).formatToParts(date);

    const offset = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";
    const match = offset.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);

    if (!match) return 0;

    const hours = Number(match[1]);
    const minutes = Number(match[2] || 0);

    return hours + Math.sign(hours || 1) * (minutes / 60);
  } catch {
    return 0;
  }
}

export function getColorClass(item) {
  const elementData = fiveElements[item.element];

  return item.yinYang === "Positive"
    ? elementData.colorPositive
    : elementData.colorNegative;
}

export function getRelationship(from, to) {
  if (generatingCycle[from] === to) return "generates";
  if (controllingCycle[from] === to) return "controls";
  if (from === to) return "same element";
  return "neutral";
}

export function getHourBranchByMinutes(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour = Math.floor(normalized / 60);
  const index = Math.floor(((hour + 1) % 24) / 2);

  return {
    branchData: earthlyBranches[index],
    period: chineseHourPeriods[index]
  };
}

export function calculateTrueSolarTime({
  birthDate,
  birthTime,
  longitude,
  timezone
}) {
  const [hour, minute] = (birthTime || "12:00").split(":").map(Number);
  const localMinutes = hour * 60 + minute;

  const timezoneOffset = getTimezoneOffsetHours(timezone, birthDate);
  const standardMeridian = timezoneOffset * 15;
  const correctionMinutes = Math.round((longitude - standardMeridian) * 4);
  const trueSolarMinutes = localMinutes + correctionMinutes;

  const { branchData, period } = getHourBranchByMinutes(trueSolarMinutes);

  return {
    inputLocalTime: birthTime || "12:00",
    timezone,
    longitude,
    timezoneOffset,
    standardMeridian,
    correctionMinutes,
    trueSolarTime: minutesToTime(trueSolarMinutes),
    hourBranch: branchData.name,
    hourAnimal: branchData.animal,
    hourElement: branchData.element,
    hourYinYang: branchData.yinYang,
    traditionalPeriod: period.time,
    traditionalMeaning: period.meaning
  };
}

function createSolarWithTime(birthDate, birthTime, location) {
  const [year, month, day] = birthDate.split("-").map(Number);
  let [hour, minute] = (birthTime || "12:00").split(":").map(Number);

  if (location?.longitude && location?.timezone) {
    const hourInfo = calculateTrueSolarTime({
      birthDate,
      birthTime: birthTime || "12:00",
      longitude: location.longitude,
      timezone: location.timezone
    });

    [hour, minute] = hourInfo.trueSolarTime.split(":").map(Number);
  }

  return Solar.fromYmdHms(year, month, day, hour, minute, 0);
}

export function createBaziProfile(birthDate, birthTime, location = null) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const solar = createSolarWithTime(birthDate, birthTime, location);
  const lunar = solar.getLunar();

  const yearGz =
    lunar.getYearInGanZhiExact?.() ||
    lunar.getYearInGanZhi();

  const monthGz =
    lunar.getMonthInGanZhiExact?.() ||
    lunar.getMonthInGanZhi();

  const dayGz = lunar.getDayInGanZhi();

  const timeGz =
    lunar.getTimeInGanZhi?.() ||
    lunar.getTimeInGanZhiExact?.();

  const yearParsed = parseGanZhi(yearGz);
  const monthParsed = parseGanZhi(monthGz);
  const dayParsed = parseGanZhi(dayGz);
  const hourParsed = parseGanZhi(timeGz);

  const hourInfo =
    location?.longitude && location?.timezone
      ? calculateTrueSolarTime({
          birthDate: birthDate,
          birthTime: birthTime || "12:00",
          longitude: location.longitude,
          timezone: location.timezone
        })
      : null;

  function enrichBranch(branch, dayMaster) {
      const hidden = hiddenStems[branch.name] || [];

      const hiddenDetailed = hidden.map((stemName) => {
        const stem = heavenlyStems.find((s) => s.name === stemName);

        return {
          name: stem.name,
          element: stem.element,
          yinYang: stem.yinYang,
          tenGod: getTenGod(dayMaster, stem.element, stem.yinYang === "Positive")
        };
      });

      return {
        ...branch,
        hiddenStems: hiddenDetailed
      };
    }

    const dayStem = dayParsed.stem;

    const eightChars = [
      {
        pillar: "Year",
        stem: yearParsed.stem,
        branch: enrichBranchWithHiddenStems(yearParsed.branch, dayStem)
      },
      {
        pillar: "Month",
        stem: monthParsed.stem,
        branch: enrichBranchWithHiddenStems(monthParsed.branch, dayStem)
      },
      {
        pillar: "Day",
        stem: dayParsed.stem,
        branch: enrichBranchWithHiddenStems(dayParsed.branch, dayStem)
      },
      {
        pillar: "Hour",
        stem: hourParsed.stem,
        branch: enrichBranchWithHiddenStems(hourParsed.branch, dayStem)
      }
    ];

  const dayMaster = dayParsed.stem.element;

  const allElements = eightChars.flatMap((pillar) => [
    pillar.stem.element,
    pillar.branch.element
  ]);

  const elementCount = {
    Wood: allElements.filter((element) => element === "Wood").length,
    Fire: allElements.filter((element) => element === "Fire").length,
    Earth: allElements.filter((element) => element === "Earth").length,
    Metal: allElements.filter((element) => element === "Metal").length,
    Water: allElements.filter((element) => element === "Water").length
  };

  const strength = judgeDayMasterStrength({
    dayMaster,
    monthBranch: monthParsed.branch,
    dayBranch: dayParsed.branch,
    elementCount
  });

  return {
    eightChars,
    dayMaster,
    dayStem: `${dayParsed.stem.name} ${dayParsed.stem.element}`,
    dayStemCN: dayParsed.stem.symbol,
    dominantElement: Object.entries(elementCount).sort((a, b) => b[1] - a[1])[0][0],
    elementCount,
    hourInfo,
    rawGanZhi: {
      year: `${yearParsed.stem.name} ${yearParsed.branch.name}`,
      month: `${monthParsed.stem.name} ${monthParsed.branch.name}`,
      day: `${dayParsed.stem.name} ${dayParsed.branch.name}`,
      hour: `${hourParsed.stem.name} ${hourParsed.branch.name}`
    },
    strength
  };
}

export function judgeDayMasterStrength({
  dayMaster,
  monthBranch,
  dayBranch,
  elementCount
}) {
  let score = 0;
  const reasons = [];

  const monthRelation = getRelationship(monthBranch.element, dayMaster);

  if (monthBranch.element === dayMaster || monthRelation === "generates") {
    score += 3;
    reasons.push(
      `Seasonal support: Month branch (${monthBranch.name}) strengthens the Day Master.`
    );
  } else {
    reasons.push(
      `Weak seasonal support: Month branch (${monthBranch.name}) does not support the Day Master.`
    );
  }

  const dayBranchRelation = getRelationship(dayBranch.element, dayMaster);

  if (dayBranch.element === dayMaster || dayBranchRelation === "generates") {
    score += 2;
    reasons.push(
      `Root support: Day branch (${dayBranch.name}) provides grounding.`
    );
  } else {
    reasons.push(
      `Weak root: Day branch (${dayBranch.name}) provides limited support.`
    );
  }

  const supportElements = Object.keys(elementCount).filter(
    (element) => element === dayMaster || generatingCycle[element] === dayMaster
  );

  const supportCount = supportElements.reduce(
    (sum, element) => sum + elementCount[element],
    0
  );

  if (supportCount >= 4) {
    score += 2;
    reasons.push(`Strong influence: Supporting elements appear ${supportCount} times.`);
  } else {
    reasons.push(`Weak influence: Supporting elements appear only ${supportCount} times.`);
  }

  const status = score >= 5 ? "Strong Day Master" : "Weak Day Master";

  const favorable =
    status === "Strong Day Master"
      ? "Favorable: balancing and releasing excess energy."
      : "Favorable: strengthening and supporting core energy.";

  return {
    score,
    status,
    supportCount,
    reasons,
    favorable
  };
}

export const hiddenStems = {
  Zi: ["Gui"],

  Chou: ["Ji", "Gui", "Xin"],

  Yin: ["Jia", "Bing", "Wu"],

  Mao: ["Yi"],

  Chen: ["Wu", "Yi", "Gui"],

  Si: ["Bing", "Wu", "Geng"],

  Wu: ["Ding", "Ji"],

  Wei: ["Ji", "Ding", "Yi"],

  Shen: ["Geng", "Ren", "Wu"],

  You: ["Xin"],

  Xu: ["Wu", "Xin", "Ding"],

  Hai: ["Ren", "Jia"]
};

const elementRelation = {
  generates: {
    Wood: "Fire",
    Fire: "Earth",
    Earth: "Metal",
    Metal: "Water",
    Water: "Wood"
  },
  controls: {
    Wood: "Earth",
    Earth: "Water",
    Water: "Fire",
    Fire: "Metal",
    Metal: "Wood"
  }
};

function getTenGod(dayMaster, otherElement, sameYinYang) {
  if (dayMaster === otherElement) {
    return sameYinYang ? "Friend" : "Rob Wealth";
  }

  if (elementRelation.generates[dayMaster] === otherElement) {
    return sameYinYang ? "Eating God" : "Hurting Officer";
  }

  if (elementRelation.generates[otherElement] === dayMaster) {
    return sameYinYang ? "Indirect Resource" : "Direct Resource";
  }

  if (elementRelation.controls[dayMaster] === otherElement) {
    return sameYinYang ? "Indirect Wealth" : "Direct Wealth";
  }

  if (elementRelation.controls[otherElement] === dayMaster) {
    return sameYinYang ? "Seven Killings" : "Direct Officer";
  }

  return "Neutral";
}

function getTenGodFromStem(dayStem, targetStem) {
  return getTenGod(
    dayStem.element,
    targetStem.element,
    dayStem.yinYang === targetStem.yinYang
  );
}

export function enrichBranchWithHiddenStems(branch, dayStem) {
  const stems = hiddenStems[branch.name] || [];

  return {
    ...branch,
    hiddenStems: stems.map((stemName, index) => {
      const stem = heavenlyStems.find((s) => s.name === stemName);

      return {
        order:
          index === 0
            ? "Main Qi"
            : index === 1
              ? "Middle Qi"
              : "Residual Qi",
        name: stem.name,
        symbol: stem.symbol,
        element: stem.element,
        polarity: stem.yinYang,
        tenGod: getTenGodFromStem(dayStem, stem),
        details: stemDetails[stem.name]
      };
    })
  };
}
