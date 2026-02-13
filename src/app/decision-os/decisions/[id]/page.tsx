"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDecision, deleteDecision } from "../../_lib/actions";
import type { Decision } from "../../_lib/storage";
import { DecisionReport } from "../../_components/report/decision-report";
import { DeleteButton } from "./delete-button";
import { Pencil } from "lucide-react";

export default function DecisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const d = getDecision(id);
    setDecision(d);
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="text-center py-12 text-stone-400">Loading...</div>;
  }

  if (!decision) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/decision-os/decisions"
          className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/decision-os/decisions/${id}/edit`}
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
