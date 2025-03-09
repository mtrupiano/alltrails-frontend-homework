import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useContext } from "react";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import PinResting from "@/assets/icons/pin-resting.svg";
import PinSelected from "@/assets/icons/pin-selected.svg";
import RestaurantCard from "./RestaurantCard";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext";

export default function MapMarker({
  placeData,
  fallbackZIndex,
}: {
  placeData: Place;
  fallbackZIndex: number;
}) {
  const { setSelectedRestaurant, selectedRestaurant } = useContext(
    SelectedRestaurantContext,
  );

  const handleClick = () => {
    setSelectedRestaurant(placeData);
  };

  const isSelected = selectedRestaurant?.place_id === placeData.place_id;

  return (
    <AdvancedMarker
      position={placeData.geometry?.location}
      onClick={handleClick}
      zIndex={isSelected ? 9999 : fallbackZIndex}
    >
      <div>
        {isSelected ? <PinSelected /> : <PinResting />}
        {isSelected && (
          <div className="bg-gray-200 w-[375px] rounded-2xl absolute left-1/2 transform -translate-x-1/2 -translate-y-[150px]">
            <RestaurantCard placeData={placeData} />
          </div>
        )}
      </div>
    </AdvancedMarker>
  );
}
