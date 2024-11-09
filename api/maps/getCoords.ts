export const getAddressFromCoordinates = async (
  lat: number,
  lng: number
): Promise<string> => {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return `${lat}, ${lng}`;
  } catch (error) {
    console.error("Error fetching address:", error);
    return `${lat}, ${lng}`;
  }
};