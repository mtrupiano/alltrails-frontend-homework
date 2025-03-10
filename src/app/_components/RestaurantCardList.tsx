"use client";

import { useContext } from "react";
import { useInView } from "react-intersection-observer";
import { useMap } from "@vis.gl/react-google-maps";

import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import { SearchResultsContext } from "../context/SearchResultsContext";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext";
import { nextPageSearch } from "../actions";

import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export default function RestaurantCardList() {
  const map = useMap();
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);
  const { updateSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { ref: skeletonLoaderRef } = useInView({
    onChange: (inView) => {
      if (inView) {
        handleFetchMore();
      }
    },
  });

  const handleFetchMore = async () => {
    if (searchResults?.next_page_token) {
      const moreResults = await nextPageSearch(searchResults.next_page_token);
      if (moreResults) {
        setSearchResults((prev) => {
          return {
            ...prev,
            results: [...prev.results, ...(moreResults.results || [])],
            next_page_token: moreResults.next_page_token,
          };
        });
      }
    }
  };

  const handleSelectRestaurant = (placeData: Place) => {
    updateSelectedRestaurant(placeData);
    if (placeData.geometry?.location) {
      map?.setCenter(placeData.geometry.location);
    }
  };

  return (
    <div className="h-full w-full sm:w-[480px] bg-gray-200 overflow-y-auto no-scrollbar px-6 py-8 space-y-6">
      {!searchResults.status && (
        <div className="flex justify-center items-center">
          <span className="text-gray-400">Search for restaurants</span>
        </div>
      )}

      {searchResults.status && searchResults.status !== "OK" && (
        <div className="flex justify-center items-center">
          <span className="text-gray-700">
            {searchResults.status === "ZERO_RESULTS"
              ? "Oops, we found no results for that search."
              : "Oops, something went wrong."}
          </span>
        </div>
      )}

      {searchResults?.results?.map((place) => (
        <div key={place.place_id} className="w-full">
          <RestaurantCard
            key={place.place_id}
            placeData={place}
            handleSelectRestaurant={handleSelectRestaurant}
          />
        </div>
      ))}

      {searchResults?.results?.length > 0 && searchResults?.next_page_token && (
        <div ref={skeletonLoaderRef} className="space-y-6">
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
        </div>
      )}
    </div>
  );
}
