import { useState } from "react";
import BookmarkSavedSvg from "@/assets/icons/bookmark-saved.svg";
import BookmarkRestingSvg from "@/assets/icons/bookmark-resting.svg";

export default function BookmarkButton({ enabled }: { enabled: boolean }) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
    event.stopPropagation();
    setIsEnabled(!isEnabled);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-gray-100 transition-bg duration-200 cursor-pointer p-2 rounded-full"
    >
      {isEnabled ? <BookmarkSavedSvg /> : <BookmarkRestingSvg />}
    </button>
  );
}
