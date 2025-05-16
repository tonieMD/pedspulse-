// Converts "125" → "02:05"  |  "1:02:03" → "1:02:03"
export function formatDuration(raw: string | number) {
  const parts = String(raw).split(":").map(Number);
  const total =
    parts.length === 1 ? parts[0] : parts.reduce((s, p) => s * 60 + p, 0);

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
