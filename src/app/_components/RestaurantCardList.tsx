"use client";

import { useContext } from "react";
import { useInView } from "react-intersection-observer";
import RestaurantCard from "./RestaurantCard";
import { SearchResultsContext } from "../context/SearchResultsContext";
import { nextPageSearch } from "../actions";

export default function RestaurantCardList() {
  const { ref: spinnerRef } = useInView({
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

  return (
    <div className="h-full w-full sm:w-[480px] bg-gray-200 overflow-y-auto no-scrollbar px-6 py-8 space-y-6">
      {!searchResults && (
        <div className="flex justify-center items-center">
          <span className="text-gray-400">Search for restaurants</span>
        </div>
      )}

      {!!searchResults &&
        searchResults?.status !== "OK" &&
        (searchResults?.status === "ZERO_RESULTS" ? (
          <div>Oops, we found no results for that search.</div>
        ) : (
          <div>Oops, something went wrong.</div>
        ))}

      {searchResults?.results.map((place) => (
        <RestaurantCard key={place.place_id} placeData={place} />
      ))}

      {searchResults?.results?.length && searchResults?.next_page_token && (
        <div className="h-20 flex justify-center items-center" ref={spinnerRef}>
          {/* Spinner tailwind classes taken from PrelineUI https://preline.co/docs/spinners.html */}
          <div
            className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-green-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            {/* span for screen reader only */}
            <span className="sr-only">Loading...</span>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
