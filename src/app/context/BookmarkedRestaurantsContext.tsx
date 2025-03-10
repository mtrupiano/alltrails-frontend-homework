import { createContext, useEffect, useState, useRef } from "react";

type BookmarkedRestaurantsContextType = {
  bookmarkedRestaurants: { [key: string]: boolean };
  handleToggleBookmarkRestaurant: (placeId: string) => void;
};

export const BookmarkedRestaurantsContext =
  createContext<BookmarkedRestaurantsContextType>(
    {} as BookmarkedRestaurantsContextType,
  );

export default function BookmarkedRestaurantsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState(
    {} as { [key: string]: boolean },
  );

  const handleToggleBookmarkRestaurant = (placeId: string) => {
    if (bookmarkedRestaurants[placeId]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [placeId]: toRemove, ...rest } = bookmarkedRestaurants;
      setBookmarkedRestaurants(rest);
    } else {
      setBookmarkedRestaurants((prev) => ({
        ...prev,
        [placeId]: true,
      }));
    }
  };

  useEffect(() => {
    const getFromStorage = localStorage.getItem("bookmarkedRestaurants");
    if (getFromStorage) {
      setBookmarkedRestaurants(JSON.parse(getFromStorage));
    }
  }, []);

  // debounce saving to localStorage to avoid repeated writes
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    clearTimeout(timeoutId.current as NodeJS.Timeout);
    timeoutId.current = setTimeout(() => {
      localStorage.setItem(
        "bookmarkedRestaurants",
        JSON.stringify(bookmarkedRestaurants),
      );
    }, 500);
  }, [bookmarkedRestaurants]);

  return (
    <BookmarkedRestaurantsContext.Provider
      value={{ bookmarkedRestaurants, handleToggleBookmarkRestaurant }}
    >
      {children}
    </BookmarkedRestaurantsContext.Provider>
  );
}
