export function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "0";
  const num = Number(String(value).replace(/,/g, ""));
  if (isNaN(num)) return String(value);
  return num.toLocaleString("en-US");
}

export function formatCurrency(value) {
  return `${formatNumber(value)} ብር`;
}

export function formatDate(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    const months = [
      "ጃንዋሪ",
      "ፌብሩዋሪ",
      "ማርች",
      "ኤፕሪል",
      "ሜይ",
      "ጁን",
      "ጁላይ",
      "ኦገስት",
      "ሴፕቴምበር",
      "ኦክቶበር",
      "ኖቬምበር",
      "ዲሴምበር",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch {
    return value;
  }
}

export function getInitials(name) {
  if (!name) return "?";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0);
  return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
}

export function getStatusColor(status) {
  const s = String(status || "").trim();
  if (s.includes("ተጠናቋል") || s.includes("ተጠናቅቋል")) {
    return "bg-emerald-100 text-emerald-700";
  }
  if (s.includes("በሂደት")) {
    return "bg-amber-100 text-amber-700";
  }
  if (s.includes("ያልተጀመረ")) {
    return "bg-gray-100 text-gray-600";
  }
  return "bg-blue-100 text-blue-700";
}
