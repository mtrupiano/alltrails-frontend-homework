import { createContext, useState } from "react";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";

type SelectedRestaurantContextType = {
  selectedRestaurant: Place;
  updateSelectedRestaurant: (place: Place) => void;
};
export const SelectedRestaurantContext =
  createContext<SelectedRestaurantContextType>(
    {} as SelectedRestaurantContextType,
  );

export default function SelectedRestaurantContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Place>(
    {} as Place,
  );

  const updateSelectedRestaurant = (place: Place) => {
    if (place?.place_id === selectedRestaurant?.place_id) {
      setSelectedRestaurant({} as Place);
    } else {
      setSelectedRestaurant(place);
    }
  };

  return (
    <SelectedRestaurantContext.Provider
      value={{ selectedRestaurant, updateSelectedRestaurant }}
    >
      {children}
    </SelectedRestaurantContext.Provider>
  );
}
