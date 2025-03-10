"use server";

import { PlacesTextSearchResponse } from "@/types/GooglePlacesLegacyApiTypes";

const GOOGLE_PLACES_LEGACY_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY}`;

export async function searchAction(
  searchText: string,
  location: google.maps.LatLngLiteral | undefined,
): PlacesTextSearchResponse {
  try {
    let url = GOOGLE_PLACES_LEGACY_URL + `&query=${searchText}&type=restaurant`;
    if (location) {
      url += `&location=${location.lat},${location.lng}`;
    }
    const results = await fetch(url);
    return await results.json();
  } catch (error) {
    console.error(error);
    return {
      status: "UNKNOWN_ERROR",
    };
  }
}

export async function nextPageSearch(
  nextPageToken: string,
): PlacesTextSearchResponse | null {
  try {
    throw new Error("bonk");
    const url = `${GOOGLE_PLACES_LEGACY_URL}&pagetoken=${nextPageToken}`;
    const results = await fetch(url);
    return await results.json();
  } catch (error) {
    console.error(error);
    return {
      status: "UNKNOWN_ERROR",
    };
  }
}
