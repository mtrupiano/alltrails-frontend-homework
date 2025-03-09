export default function RestaurantCardSkeleton() {
  return (
    <div
      role="status"
      className="w-full h-[104px] rounded-[16px] bg-white shadow-lg p-4"
    >
      <div className="flex space-x-2">
        <div
          className="h-[72px] w-[64px] animate-pulse bg-gray-200 rounded-sm"
          role="status"
        />
        <div className="flex flex-col space-y-1">
          <div className="h-[24px] w-[200px] animate-pulse bg-gray-200 rounded-xs" />
          <div className="h-[18px] w-[175px] animate-pulse bg-gray-200 rounded-xs" />
          <div className="h-[18px] w-[250px] animate-pulse bg-gray-200 rounded-xs" />
        </div>
      </div>
    </div>
  );
}
