function calculateEcoScore(distanceKm: number, currentScore: number): number {
  const maxScore = 99;
  const minScore = 0;

  // Emission factors (grams CO₂ per km)
  const carEmissionPerKm = 200;
  const busEmissionPerKm = 70;

  // Total emissions for given distance
  const carEmissions = distanceKm * carEmissionPerKm;
  const busEmissions = distanceKm * busEmissionPerKm;

  // Calculate eco-saving percentage
  const ecoSavingPercentage =
    ((carEmissions - busEmissions) / carEmissions) * 100;

  // Adjust score based on eco-saving
  let scoreAdjustment = ecoSavingPercentage / 10; // Scaling factor
  let newScore = currentScore + scoreAdjustment;

  // Ensure score remains within 0-99 range
  newScore = Math.max(minScore, Math.min(maxScore, newScore));

  return Math.round(newScore);
}
