"use server";
const GOOGLE_PLACES_LEGACY_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY}`;

export async function searchAction(
  searchText: string,
  location: { latitude: number; longitude: nubmer },
) {
  try {
    const results = await fetch(
      GOOGLE_PLACES_LEGACY_URL +
        `&query=${searchText}&location=${location.latitude},${location.longitude}&type=restaurant`,
    );

    return await results.json();
  } catch (error: Error) {
    console.error(error);
  }
}

export async function nextPageSearch(nextPageToken: string) {
  try {
    const url = `${GOOGLE_PLACES_LEGACY_URL}&pagetoken=${nextPageToken}`;
    const results = await fetch(url);
    return await results.json();
  } catch (error: Error) {
    console.error(error);
  }
}
