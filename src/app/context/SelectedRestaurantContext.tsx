import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";

export const SelectedRestaurantContext = createContext<{
  selectedRestaurant: Place;
  setSelectedRestaurant: Dispatch<SetStateAction<Place>>;
}>();

export default function SelectedRestaurantContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Place>(null);

  return (
    <SelectedRestaurantContext.Provider
      value={{ selectedRestaurant, setSelectedRestaurant }}
    >
      {children}
    </SelectedRestaurantContext.Provider>
  );
}
