import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useMap } from "@vis.gl/react-google-maps";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import StarIcon from "@/assets/icons/star.svg";
import BookmarkButton from "./BookmarkButton";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext";

const PHOTO_REF_URL = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY}&maxheight=72&photo_reference=`;

export default function RestaurantCard({ placeData }: { placeData: Place }) {
  const photoRef = placeData.photos?.[0].photo_reference;
  const { setSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const map = useMap();

  const handleSelectRestaurant = () => {
    setSelectedRestaurant(placeData);
    if (placeData.geometry?.location) {
      map?.setCenter(placeData.geometry.location);
    }
  };

  // Hacky implementation of bookmarking using localStorage
  // TODO: implement with a database instead
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    if (
      placeData.place_id &&
      localStorage.getItem(placeData.place_id) === "true"
    ) {
      setIsBookmarked(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleBookmark = () => {
    if (placeData.place_id) {
      if (localStorage.getItem(placeData.place_id) === "true") {
        localStorage.removeItem(placeData.place_id);
        setIsBookmarked(false);
      } else {
        localStorage.setItem(placeData.place_id, "true");
        setIsBookmarked(true);
      }
    }
  };

  return (
    <div
      onClick={handleSelectRestaurant}
      className="overflow-hidden cursor-pointer w-full h-[104px] rounded-[16px] bg-white shadow-lg p-4 focus:ring-2 focus:ring-green-house-900 transition ease-in-out duration-200 font-manrope"
      tabIndex={0}
    >
      <div className="flex justify-between">
        <div className="flex space-x-2">
          {photoRef ? (
            <Image
              src={PHOTO_REF_URL + photoRef}
              alt={placeData?.name + " thumbnail"}
              width={64}
              height={72}
              className="h-[72px] w-[64px] object-cover"
            />
          ) : (
            <Image
              src="/images/restaurant-photo-placeholder.png"
              alt="Restaurant list item placeholder"
              width={64}
              height={72}
              className="h-[72px] w-[64px]"
            />
          )}

          <div className="flex flex-col space-y-1 min-w-0">
            <div className="text-ellipsis overflow-hidden whitespace-nowrap">
              <span className="text-[16px] text-mallard font-bold">
                {placeData.name}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[13px] text-mallard">
              <StarIcon />
              <span>{placeData.rating}</span>
              <span>•</span>
              <span className="text-siam">
                ({placeData.user_ratings_total} reviews)
              </span>
            </div>
            <div className="text-siam text-[13px] text-ellipsis overflow-hidden whitespace-nowrap">
              {placeData.formatted_address}
            </div>
          </div>
        </div>
        {placeData?.place_id && (
          <div>
            <BookmarkButton enabled={isBookmarked} onClick={handleBookmark} />
          </div>
        )}
      </div>
    </div>
  );
}
