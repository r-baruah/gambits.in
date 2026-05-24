import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NE India Advisory — Regional M&A Advisory",
  description:
    "Specialist advisory focused on the Northeast India asset market. Ground-level intelligence, off-market deal sourcing, success-fee model. Based in Morigaon, Assam.",
};

export default function AdvisoryPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 md:p-12">
      <div className="max-w-lg w-full">
        <div className="border border-zinc-800 rounded-lg p-8 md:p-12 bg-zinc-950/50">
          <h1 className="text-2xl font-semibold text-white mb-6 tracking-tight">
            NE India Advisory
          </h1>

          <p className="text-zinc-400 leading-relaxed mb-8 text-[0.9rem]">
            Specialist advisory focused exclusively on the Northeast India asset
            market. We track early distress signals, ownership transitions, and
            off-market sale activity across the Assam tea belt — sourced through
            ground-level regional intelligence, not metro desk research. Based
            in Morigaon, Assam. Success-fee only.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-zinc-600 min-w-[70px]">Location</span>
              <span className="text-zinc-300">Morigaon, Assam</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-zinc-600 min-w-[70px]">Contact</span>
              <a
                href="mailto:advisory@gambits.in"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                advisory@gambits.in
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800">
            <Link
              href="/"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              ← gambits.in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
