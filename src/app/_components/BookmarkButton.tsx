import BookmarkSavedSvg from "@/assets/icons/bookmark-saved.svg";
import BookmarkRestingSvg from "@/assets/icons/bookmark-resting.svg";

export default function BookmarkButton({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-gray-100 active:bg-gray-100 transition-all duration-200 cursor-pointer p-2 rounded-full"
    >
      {enabled ? <BookmarkSavedSvg /> : <BookmarkRestingSvg />}
    </button>
  );
}
