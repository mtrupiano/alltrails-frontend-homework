import { useContext } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import PinResting from "@/assets/icons/pin-resting.svg";
import PinSelected from "@/assets/icons/pin-selected.svg";
import { SelectedRestaurantContext } from "@/app/context/SelectedRestaurantContext";
import RestaurantCard from "./RestaurantCard";

export default function MapMarker({
  placeData,
  fallbackZIndex,
}: {
  placeData: Place;
  fallbackZIndex: number;
}) {
  const { updateSelectedRestaurant, selectedRestaurant } = useContext(
    SelectedRestaurantContext,
  );

  const handleClick = () => {
    updateSelectedRestaurant(placeData);
  };

  const isSelected = selectedRestaurant?.place_id === placeData.place_id;

  return (
    <>
      <AdvancedMarker
        position={placeData.geometry?.location}
        zIndex={isSelected ? 9999 : fallbackZIndex} // somewhat hacky way to make sure the selected pin is showing 'above' overlapping pins
      >
        <div>
          {isSelected ? (
            <PinSelected className="cursor-pointer" onClick={handleClick} />
          ) : (
            <PinResting className="cursor-pointer" onClick={handleClick} />
          )}
          {isSelected && (
            <div className="w-[375px] absolute left-1/2 transform -translate-x-1/2 -translate-y-[150px]">
              <RestaurantCard placeData={placeData} isInMapView={true} />
            </div>
          )}
        </div>
      </AdvancedMarker>
    </>
  );
}
