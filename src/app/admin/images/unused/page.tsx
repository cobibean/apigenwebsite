import Link from "next/link";
import UnusedImagesClient from "./ui/UnusedImagesClient";

export default function UnusedImagesPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary font-sans">Unused Images</h1>
          <p className="mt-2 text-sm text-secondary font-body">
            Images that are not currently used by any carousel. You can permanently delete them.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-secondary hover:text-foreground">
          ← Back
        </Link>
      </div>

      <div className="mt-8">
        <UnusedImagesClient />
      </div>
    </div>
  );
}

