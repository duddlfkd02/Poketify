type SkeletonCardProps = {
  layout: "horizontal" | "vertical";
  width?: string;
  height: string;
};

export default function SkeletonCard({ layout, width = "150px", height = "150px" }: SkeletonCardProps) {
  return (
    <div className={`flex ${layout === "horizontal" ? "gap-6 items-center" : "flex-col items-center"}`}>
      {/* 이미지 영역 */}
      <div
        className="bg-gray-300 animate-pulse"
        style={{ width, height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height }}
      ></div>

      {/* 텍스트 영역 */}
      <div className={`flex ${layout === "horizontal" ? "flex-col gap-2" : "flex-col text-center mt-2"} w-full`}>
        <div className="bg-gray-300 animate-pulse h-6 w-3/4 mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/2 mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/4"></div>
      </div>
    </div>
  );
}
