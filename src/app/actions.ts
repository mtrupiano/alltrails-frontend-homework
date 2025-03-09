"use server";
const GOOGLE_PLACES_LEGACY_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY}`;

export async function searchAction(
  searchText: string,
  location: google.maps.LatLngLiteral | undefined,
) {
  try {
    let url = GOOGLE_PLACES_LEGACY_URL + `&query=${searchText}&type=restaurant`;
    if (location) {
      url += `&location=${location.lat},${location.lng}`;
    }
    const results = await fetch(url);
    return await results.json();
  } catch (error) {
    console.error(error);
  }
}

export async function nextPageSearch(nextPageToken: string) {
  try {
    const url = `${GOOGLE_PLACES_LEGACY_URL}&pagetoken=${nextPageToken}`;
    const results = await fetch(url);
    return await results.json();
  } catch (error) {
    console.error(error);
  }
}
