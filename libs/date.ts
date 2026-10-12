export function getAgoIndex(dateString: string): [number, string] {
    const date = new Date(dateString);
    const today = new Date()
    today.setHours(today.getHours() + 4);

    let diff = (today.getTime() - date.getTime()) / 1000;

    if (diff < 0) return [0, 'sec'];

    if (diff < 60) return [Math.round(diff), 'sec'];
    diff /= 60;
    if (diff < 60) return [Math.round(diff), 'min'];
    diff /= 60;
    if (diff < 24) return [Math.round(diff), 'hour'];
    diff /= 24;
    if (diff < 30) return [Math.round(diff), 'day'];
    diff /= 30;
    if (diff < 12) return [Math.round(diff), 'month'];
    diff /= 12;
    return [Math.round(diff), 'year'];
}

export function isLegalAge(birthdateStr?: string) {
    if (!birthdateStr) return false
    const birth = new Date(birthdateStr);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear() -
        (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
    return age >= 18;
};

export function formatInterval(start?: Date, end?: Date) {
    if(!(start&&end)) return ""
    const startStr = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`
    const endStr = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`
    return `${startStr} - ${endStr}`
}

export function formatUtc(dateStr?: string) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';

  const dd  = String(d.getUTCDate()).padStart(2, '0');
  const mm  = String(d.getUTCMonth() + 1).padStart(2, '0'); // AY RƏQƏMLƏ
  const yyyy = d.getUTCFullYear();
  const hh  = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');

  return `${dd}.${mm}.${yyyy}, ${hh}:${min}`;
}
