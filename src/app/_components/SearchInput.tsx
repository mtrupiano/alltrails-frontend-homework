"use client";

import { FormEvent, useContext, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { searchAction } from "@/app/actions";
import SearchIcon from "@/assets/icons/search.svg";
import { SearchResultsContext } from "../context/SearchResultsContext";

export default function SearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const map = useMap();
  const { setSearchResults } = useContext(SearchResultsContext);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const searchText = formData.get("places-api-search");
    const searchResults = await searchAction(
      searchText,
      map?.getCenter()?.toJSON(), // ASSUMES THAT `map` HAS BEEN LOADED BY THE TIME USER HAS ENTERED AND SUBMITTED A SEARCH
    );
    setSearchResults(searchResults);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate={true}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
          <SearchIcon />
        </div>
        <input
          type="text"
          id="places-api-search"
          name="places-api-search"
          placeholder="Search restaurants"
          className="block w-[353px] sm:w-[327px] p-4 ps-10 h-[32px] text-[13px] bg-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-house-900 transition ease-in-out duration-150"
        />
      </div>
    </form>
  );
}
