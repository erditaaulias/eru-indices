export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[−–—]/g, '-')
    .replace(/\*\*/g, '^')
    .replace(/\s+/g, '');
}

export function parseFractionOrNumber(str: string): number | null {
  const s = normalizeAnswer(str);
  if (!s) return null;

  // Single decimal or integer
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    return parseFloat(s);
  }

  // Fraction like -1/8 or 1/25
  const fracMatch = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (den !== 0) {
      return num / den;
    }
  }

  return null;
}

export function isAnswerCorrect(userValue: string, expectedPattern: string): boolean {
  const normUser = normalizeAnswer(userValue);
  if (!normUser) return false;

  const userNum = parseFractionOrNumber(normUser);
  const options = expectedPattern.split('|');

  for (const opt of options) {
    const normOpt = normalizeAnswer(opt);

    // Direct string match after normalization
    if (normUser === normOpt) return true;

    // Numerical / fraction match
    const optNum = parseFractionOrNumber(normOpt);
    if (userNum !== null && optNum !== null) {
      if (Math.abs(userNum - optNum) < 1e-6) {
        return true;
      }
    }

    // Special case for algebraic expressions with commutative additions e.g. 2^(n+3) == 2^(3+n)
    if (normOpt.includes('^')) {
      const cleanU = normUser.replace(/[()]/g, '');
      const cleanO = normOpt.replace(/[()]/g, '');
      if (cleanU === cleanO) return true;
    }
  }

  return false;
}

export function formatExponentDisplay(n: number | string): string {
  const s = String(n);
  return s.replace(/^-/, '−');
}
