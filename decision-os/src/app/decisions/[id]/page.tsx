export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getDecision, deleteDecision } from "@/lib/actions";
import { DecisionReport } from "@/components/report/decision-report";
import { DeleteButton } from "./delete-button";
import { Pencil } from "lucide-react";

export default async function DecisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decision = await getDecision(id);

  if (!decision) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/decisions"
          className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/decisions/${id}/edit`}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
          <DeleteButton id={id} deleteAction={deleteDecision} />
        </div>
      </div>

      <DecisionReport decision={decision} />
    </div>
  );
}
