"use client";

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

import RestaurantCardList from "@/app/components/RestaurantCardList";
import Navbar from "@/app/components/Navbar";
import MapViewport from "@/app/components/MapViewport";
import ToggleMapListViewButton from "@/app/components/ToggleMapListViewButton";
import SelectedRestaurantContextProvider from "@/app/context/SelectedRestaurantContext";
import SearchResultsContextProvider from "@/app/context/SearchResultsContext";
import BookmarkedRestaurantsContextProvider from "@/app/context/BookmarkedRestaurantsContext";

export default function Home() {
  const [isShowingMap, setIsShowingMap] = useState(false);
  return (
    <div className="flex flex-col h-screen min-w-[375px]">
      <SearchResultsContextProvider>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Navbar />
          <BookmarkedRestaurantsContextProvider>
            <SelectedRestaurantContextProvider>
              <main className="flex flex-1 overflow-auto h-full" role="main">
                <div
                  className={`${
                    isShowingMap ? "hidden" : "block w-full"
                  } sm:block sm:w-[480px] h-full`}
                >
                  <RestaurantCardList />
                </div>
                <div
                  className={`${
                    isShowingMap ? "block flex-1" : "hidden"
                  } sm:block sm:flex-1 h-full`}
                >
                  <MapViewport />
                </div>

                <ToggleMapListViewButton
                  isShowingMap={isShowingMap}
                  handleClick={() => setIsShowingMap(!isShowingMap)}
                />
              </main>
            </SelectedRestaurantContextProvider>
          </BookmarkedRestaurantsContextProvider>
        </APIProvider>
      </SearchResultsContextProvider>
    </div>
  );
}
