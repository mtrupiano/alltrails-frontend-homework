import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";

type SelectedRestaurantContextType = {
  selectedRestaurant: Place;
  setSelectedRestaurant: Dispatch<SetStateAction<Place>>;
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

  return (
    <SelectedRestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant }}
    >
      {children}
    </SelectedRestaurantContext.Provider>
  );
}
