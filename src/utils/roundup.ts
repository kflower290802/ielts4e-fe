export const roundToHalfOrWhole = (score: number): number => {
    const integerPart = Math.floor(score);
    const decimalPart = score - integerPart;
  
    if (decimalPart < 0.25) {
      return integerPart;
    } else if (decimalPart < 0.75) {
      return integerPart + 0.5;
    } else {
      return integerPart + 1;
    }
  };