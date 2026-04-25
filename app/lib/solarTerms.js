import { Solar } from "lunar-javascript";

export const solarTermEnglishMap = {
  立春: "Beginning of Spring",
  雨水: "Rain Water",
  惊蛰: "Awakening of Insects",
  春分: "Spring Equinox",
  清明: "Clear and Bright",
  谷雨: "Grain Rain",

  立夏: "Beginning of Summer",
  小满: "Grain Full",
  芒种: "Grain in Ear",
  夏至: "Summer Solstice",
  小暑: "Minor Heat",
  大暑: "Major Heat",

  立秋: "Beginning of Autumn",
  处暑: "End of Heat",
  白露: "White Dew",
  秋分: "Autumn Equinox",
  寒露: "Cold Dew",
  霜降: "Frost Descent",

  立冬: "Beginning of Winter",
  小雪: "Minor Snow",
  大雪: "Major Snow",
  冬至: "Winter Solstice",
  小寒: "Minor Cold",
  大寒: "Major Cold"
};

function translateTerm(term) {
  if (!term) return null;

  return {
    ...term,
    nameCN: term.name,
    nameEN: solarTermEnglishMap[term.name] || term.name
  };
}

export function getSolarTermsForDate(birthDate) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();

  const jieQiTable = lunar.getJieQiTable();

  return Object.entries(jieQiTable)
    .map(([name, solarObj]) => ({
      name,
      nameCN: name,
      nameEN: solarTermEnglishMap[name] || name,
      date: solarObj.toYmdHms()
    }))
    .sort((a, b) => new Date(a.date.replace(" ", "T")) - new Date(b.date.replace(" ", "T")));
}

export function findNearestSolarTerms(birthDate) {
  const target = new Date(`${birthDate}T12:00:00`);
  const [year] = birthDate.split("-").map(Number);

  const allTerms = [
    ...getSolarTermsForDate(`${year - 1}-12-31`),
    ...getSolarTermsForDate(birthDate),
    ...getSolarTermsForDate(`${year + 1}-01-01`)
  ].sort((a, b) => new Date(a.date.replace(" ", "T")) - new Date(b.date.replace(" ", "T")));

  let previous = null;
  let next = null;

  for (const term of allTerms) {
    const termDate = new Date(term.date.replace(" ", "T"));

    if (termDate <= target) {
      previous = term;
    }

    if (termDate > target) {
      next = term;
      break;
    }
  }

  return {
    previous: translateTerm(previous),
    next: translateTerm(next)
  };
}

export function daysBetweenBirthAndTerm(birthDate, termDate) {
  const birth = new Date(`${birthDate}T12:00:00`);
  const term = new Date(termDate.replace(" ", "T"));
  const diffMs = Math.abs(term - birth);

  return diffMs / (1000 * 60 * 60 * 24);
}
