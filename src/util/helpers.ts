export function weightedRandom(probabilities: number[]) {
  const r = Math.random();
  let cumulative = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];

    if (r < cumulative) {
      return i;
    }
  }

  return probabilities.length - 1;
}