import BookmarkSavedSvg from "@/assets/icons/bookmark-saved.svg";
import BookmarkRestingSvg from "@/assets/icons/bookmark-resting.svg";

export default function BookmarkButton({
  enabled,
  handleClick,
}: {
  enabled: boolean;
  handleClick: () => void;
}) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClick();
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-gray-100 active:bg-gray-100 transition-all duration-200 cursor-pointer p-2 rounded-full"
    >
      {enabled ? <BookmarkSavedSvg /> : <BookmarkRestingSvg />}
    </button>
  );
}
