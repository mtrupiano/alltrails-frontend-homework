import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PlacesTextSearchResponse } from "@/types/GooglePlacesLegacyApiTypes";

type SearchResultsContextType = {
  searchResults: PlacesTextSearchResponse;
  setSearchResults: Dispatch<SetStateAction<PlacesTextSearchResponse>>;
};
export const SearchResultsContext = createContext<SearchResultsContextType>(
  {} as SearchResultsContextType,
);

export default function SearchResultsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchResults, setSearchResults] = useState(
    {} as PlacesTextSearchResponse,
  );

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}
