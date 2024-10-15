import SkeletonCard from "./SkeletonCard";

export default function SkeletonList({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4">
      {new Array(count).fill(0).map((_, idx) => (
        <SkeletonCard key={`skeleton-${idx}`} layout="horizontal" width="150px" height="150px" />
      ))}
    </div>
  );
}
