"use client";

import React, { useRef } from "react";
import { AlertTriangle, PhoneCall, ShieldAlert, X, Zap } from "lucide-react";
import Link from "next/link";

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencySosModal({ isOpen, onClose }: EmergencySosModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="emergency-sos-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto z-50 p-0 rounded-2xl bg-slate-950 text-slate-100 border border-red-500/50 shadow-2xl max-w-xl w-[92vw] backdrop:bg-black/80"
    >
      <div className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-red-950/60">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </span>
            <div>
              <h2 id="emergency-sos-title" className="text-xl font-bold text-white flex items-center gap-2">
                24/7 Agro-Vet Emergency SOS
              </h2>
              <p className="text-xs text-red-300">
                Critical priority dispatch for rapid crop devastation or acute animal distress.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-5 h-5 text-red-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Emergency Toll-Free Hotline</h3>
                  <p className="text-xs text-slate-400">Available 24/7 across agricultural and veterinary zones</p>
                </div>
              </div>
              <a
                href="tel:18005557768"
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg"
              >
                Call: 1800-SROT-SOS
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <Zap className="w-4 h-4" /> Acute Crop Blight
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Sudden armyworm swarm, locust alert, or rapid field-wide wilting.
              </p>
              <Link
                href="/consult?category=agri&priority=emergency"
                onClick={onClose}
                className="inline-block w-full text-center px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
              >
                Fast-Track Crop Review &rarr;
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                <ShieldAlert className="w-4 h-4" /> Animal Critical Triage
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Bovine bloat, severe calf diarrhea, heat collapse, or pet poisoning.
              </p>
              <Link
                href="/consult?category=veterinary&priority=emergency"
                onClick={onClose}
                className="inline-block w-full text-center px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"
              >
                Instant Tele-Vet Call &rarr;
              </Link>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <strong className="text-slate-300">Notice:</strong> Emergency consultations are automatically routed to our on-duty senior on-call clinician queue with under 10-minute response guarantees.
          </div>
        </div>
      </div>
    </dialog>
  );
}
