"use client";

import { useState, useRef } from "react";
import { uploadConsentPhoto, removeConsentPhoto } from "@/app/actions/subrecords";
import { Upload, X, FileImage, Loader2 } from "lucide-react";

interface ConsentPhotoUploadProps {
  patientId: string;
  currentPhoto: string | null;
}

export default function ConsentPhotoUpload({ patientId, currentPhoto }: ConsentPhotoUploadProps) {
  const [photo, setPhoto] = useState<string | null>(currentPhoto);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("consentPhoto", file);
      const url = await uploadConsentPhoto(patientId, formData);
      if (url) {
        setPhoto(url);
        setPreview(null);
      }
    } catch {
      alert("Failed to upload photo.");
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!confirm("Remove the consent photo?")) return;
    setUploading(true);
    try {
      await removeConsentPhoto(patientId);
      setPhoto(null);
      setPreview(null);
    } catch {
      alert("Failed to remove photo.");
    } finally {
      setUploading(false);
    }
  };

  const displaySrc = preview || photo;

  return (
    <div className="mt-8">
      <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm border-b pb-2 flex items-center gap-2">
        <FileImage size={16} className="text-blue-600" />
        Consent to Care
      </h3>

      {displaySrc ? (
        <div className="relative group">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img
              src={displaySrc}
              alt="Consent to Care"
              className="w-full max-h-[600px] object-contain bg-slate-50"
            />
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <Loader2 size={32} className="text-blue-600 animate-spin" />
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors border border-blue-200">
              <Upload size={14} />
              Replace Photo
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-sm font-medium transition-colors border border-rose-200 disabled:opacity-50"
            >
              <X size={14} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className={`cursor-pointer flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-all ${
          uploading
            ? "border-blue-300 bg-blue-50/50"
            : "border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/30"
        }`}>
          {uploading ? (
            <Loader2 size={36} className="text-blue-500 animate-spin" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Upload size={24} className="text-blue-600" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              {uploading ? "Uploading..." : "Upload Consent to Care Photo"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click to select or take a photo of the signed consent form
            </p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
