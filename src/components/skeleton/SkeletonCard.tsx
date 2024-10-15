type SkeletonCardProps = {
  layout: "horizontal" | "vertical";
  width?: string;
  height: string;
};

export default function SkeletonCard({ layout, width = "150px", height = "150px" }: SkeletonCardProps) {
  return (
    <div className={`flex ${layout === "horizontal" ? "gap-6" : "flex-col items-center"}`}>
      <div className={`bg-gray-300 animate-pulse`} style={{ width, height }}></div>

      <div className={`flex ${layout === "horizontal" ? "flex-col gap-2" : "flex-col text-center mt-2"} w-full`}>
        <div className="bg-gray-300 animate-pulse h-6 w-3/4"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/4"></div>
      </div>
    </div>
  );
}
