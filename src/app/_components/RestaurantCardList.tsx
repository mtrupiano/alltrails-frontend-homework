"use client";

import { useContext } from "react";
import { useInView } from "react-intersection-observer";
import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";
import { SearchResultsContext } from "../context/SearchResultsContext";
import { nextPageSearch } from "../actions";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext";
import { useMap } from "@vis.gl/react-google-maps";

export default function RestaurantCardList() {
  const { ref: skeletonLoaderRef } = useInView({
    onChange: (inView) => {
      if (inView) {
        (async function () {
          if (searchResults?.next_page_token) {
            const moreResults = await nextPageSearch(
              searchResults.next_page_token,
            );
            setSearchResults((prev) => {
              return {
                ...prev,
                results: [...prev.results, ...moreResults.results],
                next_page_token: moreResults?.next_page_token,
              };
            });
          }
        })();
      }
    },
  });
  const { searchResults, setSearchResults } = useContext(SearchResultsContext);

  const { updateSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const map = useMap();

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

      {searchResults.status &&
        searchResults.status !== "OK" &&
        (searchResults.status === "ZERO_RESULTS" ? (
          <div>Oops, we found no results for that search.</div>
        ) : (
          <div>Oops, something went wrong.</div>
        ))}

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
