import {
  heavenlyStems,
  earthlyBranches,
  generatingCycle,
  controllingCycle
} from "./bazi";

import {
  findNearestSolarTerms,
  daysBetweenBirthAndTerm
} from "./solarTerms";

const positiveYearStems = ["Jia", "Bing", "Wu", "Geng", "Ren"];

export function getLuckDirection(yearStem, gender) {
  const isPositiveYear = positiveYearStems.includes(yearStem.name);

  if (gender === "Male") {
    return isPositiveYear ? "Forward" : "Backward";
  }

  if (gender === "Female") {
    return isPositiveYear ? "Backward" : "Forward";
  }

  return isPositiveYear ? "Forward" : "Backward";
}

export function calculateLuckStartAge(daysToTerm) {
  const totalMonths = Math.round(daysToTerm * 4);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    years,
    months,
    totalMonths,
    text: `${years} years and ${months} months`
  };
}

function getStemBranchIndex(stem, branch) {
  const stemIndex = heavenlyStems.findIndex((s) => s.name === stem.name);
  const branchIndex = earthlyBranches.findIndex((b) => b.name === branch.name);

  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIndex && i % 12 === branchIndex) {
      return i;
    }
  }

  return 0;
}

function getStemBranchByIndex(index) {
  const normalized = ((index % 60) + 60) % 60;

  return {
    stem: heavenlyStems[normalized % 10],
    branch: earthlyBranches[normalized % 12]
  };
}

export function generateLuckCycles({
  birthDate,
  gender,
  yearStem,
  monthStem,
  monthBranch
}) {
  const direction = getLuckDirection(yearStem, gender);
  const terms = findNearestSolarTerms(birthDate);

  const targetTerm = direction === "Forward" ? terms.next : terms.previous;

  const daysToTerm = targetTerm
    ? daysBetweenBirthAndTerm(birthDate, targetTerm.date)
    : 0;

  const startAge = calculateLuckStartAge(daysToTerm);

  const monthIndex = getStemBranchIndex(monthStem, monthBranch);

  const cycles = Array.from({ length: 8 }).map((_, i) => {
    const offset = direction === "Forward" ? i + 1 : -(i + 1);
    const pillar = getStemBranchByIndex(monthIndex + offset);
    const startYear = startAge.years + i * 10;
    const endYear = startYear + 9;

    return {
      order: i + 1,
      ageRange: `${startYear}-${endYear}`,
      stem: pillar.stem,
      branch: pillar.branch,
      pillar: `${pillar.stem.name} ${pillar.branch.name}`,
      element: pillar.stem.element,
      animal: pillar.branch.animal
    };
  });

  return {
    direction,
    referenceSolarTerm: targetTerm,
    daysToTerm: Number(daysToTerm.toFixed(2)),
    startAge,
    cycles
  };
}

export function getUsefulElements(dayMaster, strengthStatus) {
  if (strengthStatus === "Strong Day Master") {
    return {
      type: "Balancing and Draining",
      explanation:
        "A strong Day Master benefits from energy that releases, drains, or regulates excess strength.",
      favorableElements: [
        generatingCycle[dayMaster],
        controllingCycle[dayMaster]
      ],
      strategy: "release, express, regulate, and avoid over-concentration"
    };
  }

  const supportingElement = Object.entries(generatingCycle).find(
    ([, generated]) => generated === dayMaster
  )?.[0];

  return {
    type: "Supporting and Reinforcing",
    explanation:
      "A weak Day Master benefits from energy that supports, reinforces, and rebuilds the core.",
    favorableElements: [dayMaster, supportingElement],
    strategy: "stabilize, restore, receive support, and build inner strength"
  };
}
