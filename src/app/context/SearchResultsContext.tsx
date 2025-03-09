import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PlacesTextSearchResponse } from "@/types/GooglePlacesLegacyApiTypes";

export const SearchResultsContext = createContext<{
  searchResults: PlacesTextSearchResponse;
  setSearchResults: Dispatch<SetStateAction<PlacesTextSearchResponse>>;
}>();

export default function SearchResultsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchResults, setSearchResults] = useState();

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}
