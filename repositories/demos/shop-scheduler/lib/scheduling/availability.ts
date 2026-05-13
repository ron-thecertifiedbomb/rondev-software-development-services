export type Slot = { start: Date; end: Date };

export function generateSlots(
  day: Date,
  openTime: string, // "09:00:00"
  closeTime: string, // "18:00:00"
  durationMinutes: number
): Slot[] {
  const [oh, om] = openTime.split(":").map(Number);
  const [ch, cm] = closeTime.split(":").map(Number);

  const start = new Date(day);
  start.setHours(oh, om, 0, 0);

  const endBoundary = new Date(day);
  endBoundary.setHours(ch, cm, 0, 0);

  const slots: Slot[] = [];
  for (let t = new Date(start); t.getTime() + durationMinutes * 60_000 <= endBoundary.getTime();) {
    const s = new Date(t);
    const e = new Date(t.getTime() + durationMinutes * 60_000);
    slots.push({ start: s, end: e });
    t = new Date(t.getTime() + durationMinutes * 60_000);
  }
  return slots;
}

export function overlaps(a: Slot, b: Slot) {
  return a.start < b.end && b.start < a.end;
}
