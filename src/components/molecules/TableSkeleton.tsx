import LinearSkeleton from "../ui/linear-skeleton";

const HeaderSkeleton = () => {
  return <LinearSkeleton className="h-[14px] w-[147px] rounded-lg" />;
};

const FirtsColumnSkeleton = () => {
  // Random width:  max 174px min 100px
  const getRandomWidth = () => {
    return Math.floor(Math.random() * (174 - 100 + 1)) + 100;
  };

  return (
    <LinearSkeleton
      className="h-3 rounded-lg"
      style={{ width: `${getRandomWidth()}px` }}
    />
  );
};

const TableActionSkeleton = () => {
  return (
    <div className="flex items-center gap-5">
      <LinearSkeleton className="h-6 w-6 rounded-full" />
      <LinearSkeleton className="h-6 w-1 rounded-md" />
    </div>
  );
};

const TablePageSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <LinearSkeleton className="h-2 w-16 rounded-md" />
      <LinearSkeleton className="h-3 w-2 rounded-md" />
      <LinearSkeleton className="h-1 w-2 rounded-md" />
    </div>
  );
};

const TablePaginationSkeleton = () => {
  return <LinearSkeleton className="h-9 w-52 rounded-md" />;
};

export {
  HeaderSkeleton,
  FirtsColumnSkeleton,
  TableActionSkeleton,
  TablePageSkeleton,
  TablePaginationSkeleton,
};
