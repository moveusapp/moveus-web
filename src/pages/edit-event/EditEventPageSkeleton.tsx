import PageHeader from "@/components/layout/PageHeader";

function EditEventPageSkeleton() {
  return (
    <div className="min-h-full shrink-0 flex flex-col">
      <PageHeader title="Edit Event">
        <div className="skeleton h-4 w-56 rounded mb-3" />
      </PageHeader>

      <div className="w-full mx-auto max-w-3xl p-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-6">
          <SkeletonField />
          <SkeletonField rows={3} />

          <div className="space-y-3">
            <div className="skeleton h-4 w-20 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <SkeletonInput />
              <SkeletonInput />
            </div>
          </div>

          <div className="space-y-3">
            <div className="skeleton h-4 w-28 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <SkeletonInput />
              <SkeletonInput />
            </div>
          </div>

          <SkeletonField />
        </div>

        <div className="flex gap-2 mt-4">
          <div className="skeleton h-12 flex-1 rounded-2xl" />
          <div className="skeleton h-12 flex-1 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function SkeletonField({ rows = 1 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="skeleton h-4 w-20 rounded" />
      <div
        className="skeleton w-full rounded-2xl"
        style={{ height: rows === 1 ? "3rem" : `${rows * 1.5 + 1.5}rem` }}
      />
    </div>
  );
}

function SkeletonInput() {
  return <div className="skeleton h-12 w-full rounded-2xl" />;
}

export default EditEventPageSkeleton;
