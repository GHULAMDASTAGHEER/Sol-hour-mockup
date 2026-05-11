import type { Phase } from "@/lib/gathering";

/** Persists across navigation, tabs (same origin), and browser restarts */
export const AVATAR_STORAGE_KEY = "sol-hour-avatar-v1";

/** @deprecated use AVATAR_STORAGE_KEY */
export const AVATAR_SESSION_KEY = AVATAR_STORAGE_KEY;

export type StoredAvatarState = {
  photoDataUrl: string | null;
  propId: string;
  phase: Phase;
};

function readRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (!raw) {
      raw = sessionStorage.getItem(AVATAR_STORAGE_KEY);
      if (raw) {
        try {
          localStorage.setItem(AVATAR_STORAGE_KEY, raw);
        } catch {
          /* ignore */
        }
      }
    }
    return raw;
  } catch {
    return null;
  }
}

export function readAvatarSession(): StoredAvatarState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = readRaw();
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Record<string, unknown>;
    if (
      (o.photoDataUrl !== null && typeof o.photoDataUrl !== "string") ||
      typeof o.propId !== "string" ||
      !isPhase(o.phase)
    ) {
      return null;
    }
    return {
      photoDataUrl: o.photoDataUrl as string | null,
      propId: o.propId,
      phase: o.phase,
    };
  } catch {
    return null;
  }
}

export function writeAvatarSession(state: StoredAvatarState) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(state);
  try {
    localStorage.setItem(AVATAR_STORAGE_KEY, payload);
  } catch {
    try {
      sessionStorage.setItem(AVATAR_STORAGE_KEY, payload);
    } catch {
      /* quota exceeded — ignore for mockup */
    }
  }
}

function isPhase(v: unknown): v is Phase {
  return v === "warm-up" || v === "peak" || v === "wind-down";
}

export function fileToResizedJpegDataUrl(
  file: File,
  maxDim = 520,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      const scale = Math.min(1, maxDim / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas unsupported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image failed to load"));
    };
    img.src = objectUrl;
  });
}
