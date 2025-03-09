"use client";

import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import RestaurantCardList from "@/app/_components/RestaurantCardList";
import Navbar from "@/app/_components/Navbar";
import MapViewport from "@/app/_components/MapViewport";
import SelectedRestaurantContextProvider from "./context/SelectedRestaurantContext";
import SearchResultsContextProvider from "./context/SearchResultsContext";
import MapIcon from "@/assets/icons/map.svg";
import ListIcon from "@/assets/icons/list.svg";

export default function Home() {
  const [smallScreenShowMap, setSmallScreenShowMap] = useState(false);
  return (
    <div className="flex flex-col h-screen min-w-[375px]">
      <SearchResultsContextProvider>
        {/* TODO: Error handling if environment variable isn't present */}
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Navbar />
          <SelectedRestaurantContextProvider>
            <main className="flex flex-1 overflow-auto h-full">
              <div
                className={`${
                  smallScreenShowMap ? "hidden" : "block w-full"
                } sm:block sm:w-[480px] h-full`}
              >
                <RestaurantCardList />
              </div>
              <div
                className={`${
                  smallScreenShowMap ? "block flex-1" : "hidden"
                } sm:block sm:flex-1 h-full`}
              >
                <MapViewport />
              </div>

              <button
                className="sm:hidden h-[48px] w-[117px] bg-green-house-900 hover:bg-green-house-950 transition duration-200 rounded-[24px] text-white cursor-pointer absolute left-1/2 bottom-[24px] transform -translate-x-1/2 -translate-y-1/2 focus:ring-2 focus:ring-gray-400"
                type="button"
                onClick={() => setSmallScreenShowMap(!smallScreenShowMap)}
              >
                <div className="flex justify-center space-x-2">
                  {smallScreenShowMap ? (
                    <>
                      <MapIcon fill="white" />
                      <span className="font-bold text-white">Map</span>
                    </>
                  ) : (
                    <>
                      <ListIcon fill="white" />
                      <span className="font-bold text-white">List</span>
                    </>
                  )}
                </div>
              </button>
            </main>
          </SelectedRestaurantContextProvider>
        </APIProvider>
      </SearchResultsContextProvider>
    </div>
  );
}
