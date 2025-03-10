import { useContext } from "react";
import Image from "next/image";

import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import StarIcon from "@/assets/icons/star.svg";
import placeholderImage from "@/assets/images/restaurant-photo-placeholder.png";
import { BookmarkedRestaurantsContext } from "@/app/context/BookmarkedRestaurantsContext";
import BookmarkButton from "./BookmarkButton";

const PHOTO_REF_URL = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY}&maxheight=72&photo_reference=`;

export default function RestaurantCard({
  placeData,
  handleSelectRestaurant,
}: {
  placeData: Place;
  handleSelectRestaurant?: (place: Place) => void;
}) {
  const photoRef = placeData.photos?.[0].photo_reference;

  const { bookmarkedRestaurants, handleToggleBookmarkRestaurant } = useContext(
    BookmarkedRestaurantsContext,
  );

  const handleBookmark = () => {
    if (placeData?.place_id) {
      handleToggleBookmarkRestaurant(placeData.place_id);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (handleSelectRestaurant) {
      handleSelectRestaurant(placeData);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        handleSelectRestaurant && "cursor-pointer"
      } h-[104px] rounded-[16px] bg-white shadow-lg p-4 focus:ring-2 focus:ring-green-house-900 transition ease-in-out duration-200 font-manrope`}
      tabIndex={0}
    >
      <div className="flex justify-between">
        <div className="flex max-w-[calc(100%-40px)] space-x-2">
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
              src={placeholderImage}
              alt="Restaurant list item placeholder"
              width={64}
              height={72}
              className="h-[72px] w-[64px]"
            />
          )}

          <div className="flex-col space-y-1 overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
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
            <div className="text-siam text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">
              {placeData.formatted_address}
            </div>
          </div>
        </div>

        {placeData?.place_id && (
          <div>
            <BookmarkButton
              enabled={bookmarkedRestaurants[placeData.place_id]}
              handleClick={handleBookmark}
            />
          </div>
        )}
      </div>
    </div>
  );
}
