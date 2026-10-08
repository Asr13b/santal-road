const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

// የአማርኛ ስህተት መልዕክቶች
const ERRORS = {
  network: "የኢንተርኔት ግንኙነት ችግር አለ። እባክዎ በኋላ ይሞክሩ።",
  fetch: "መረጃ ማውጣት አልተቻለም። እባክዎ በኋላ ይሞክሩ።",
  config: "የመረጃ ምንጭ አልተዘጋጀም። እባክዎ አስተዳዳሪውን ያግኙ።",
};

/**
 * አንድ ሉህ ከGoogle Sheets ማውጣት
 */
async function fetchSheet(sheetName) {
  if (!SHEET_ID || !API_KEY || SHEET_ID.includes("EXAMPLE")) {
    console.warn(
      `Google Sheets not configured, using fallback for ${sheetName}`,
    );
    return getFallbackData(sheetName);
  }

  try {
    const url = `${BASE_URL}/${SHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(ERRORS.fetch);
    }

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    // ውድቀት ካለ የተዘጋጀ መረጃ ተመልስ
    return getFallbackData(sheetName);
  }
}

/**
 * ረድፎችን ወደ ነገሮች (objects) መቀየር
 */
function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map((h) => String(h).trim());
  const result = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    const obj = {};
    let hasData = false;
    headers.forEach((header, index) => {
      const value = row[index] !== undefined ? String(row[index]).trim() : "";
      obj[header] = value;
      if (value) hasData = true;
    });
    if (hasData) result.push(obj);
  }
  return result;
}

/**
 * የተዘጋጀ መረጃ (Google Sheets ካልተዘጋጀ ወይም ስህተት ካለ)
 */
function getFallbackData(sheetName) {
  const fallback = {
    ProjectStats: [
      [
        "target",
        "paid",
        "remaining",
        "participantCount",
        "lastUpdated",
        "accountName",
        "accountNumber",
      ],
      [
        "500000",
        "47500",
        "452500",
        "125",
        "2025-01-15",
        "ሳንታል የመንገድ ልማት ኮሚቴ",
        "1000696007725",
      ],
    ],
    News: [
      ["id", "title", "date", "category", "summary", "content", "image"],
      [
        "1",
        "የመንገድ ስራ ተጀመረ",
        "2025-01-10",
        "ስራ",
        "የመጀመሪያ ደረጃ የመንገድ ስራ በይፋ ተጀመረ።",
        "የሳንታል ማህበረሰብ የመንገድ ልማት ፕሮጀክት የመጀመሪያ ደረጃ ስራ በይፋ ተጀመረ። በዚህ ደረጃ የመንገዱ መሰረት እና የውሃ ፍሳሽ ስራዎች ይከናወናሉ።",
        "",
      ],
      [
        "2",
        "የገንዘብ ሪፖርት ተለቀቀ",
        "2025-01-05",
        "ፋይናንስ",
        "የታህሳስ ወር የገንዘብ ሪፖርት ተለቀቀ።",
        "የታህሳስ ወር የገንዘብ ሪፖርት በኮሚቴው ተለቀቀ። በዚህ ወር ውስጥ ጠቅላላ 47,500 ብር ተሰብስቧል።",
        "",
      ],
      [
        "3",
        "የህዝብ ስብሰባ ተካሄደ",
        "2024-12-28",
        "ስብሰባ",
        "የማህበረሰቡ አባላት ስብሰባ ተካሄደ።",
        "የሳንታል ማህበረሰብ አባላት ስብሰባ ተካሂዶ ስለ ፕሮጀክቱ እድገት እና ቀጣይ እቅዶች ተወያይቷል።",
        "",
      ],
    ],
    Villages: [
      ["id", "name", "peopleCount", "coordinator", "description"],
      ["1", "ሳንታል መንደር", "450", "አበበ ከበደ", "የፕሮጀክቱ ዋና መንደር"],
      ["2", "ጎሮ መንደር", "320", "ተስፋዬ አለሙ", "የፕሮጀክቱ አጋር መንደር"],
      ["3", "ቦራ መንደር", "280", "ፍቅሬ ተስፋ", "የፕሮጀክቱ አጋር መንደር"],
    ],
    VillageMembers: [
      ["id", "villageId", "name", "pledged", "paid", "remaining", "status"],
      ["1", "1", "አበበ ከበደ", "5000", "3000", "2000", "በሂደት"],
      ["2", "1", "ተስፋዬ አለሙ", "10000", "7000", "3000", "በሂደት"],
      ["3", "1", "ፍቅሬ ተስፋ", "3000", "3000", "0", "ተጠናቋል"],
      ["4", "1", "ሰለሞን ገብሬ", "5000", "2000", "3000", "በሂደት"],
      ["5", "2", "ሙሉ አየለ", "4000", "4000", "0", "ተጠናቋል"],
      ["6", "2", "ዳዊት ሙሉ", "6000", "3000", "3000", "በሂደት"],
      ["7", "3", "ሳሙኤል ተስፋ", "8000", "5000", "3000", "በሂደት"],
    ],
    Committee: [
      ["id", "name", "role", "village", "photo"],
      ["1", "አበበ ከበደ", "ሰብሳቢ", "ሳንታል", ""],
      ["2", "ተስፋዬ አለሙ", "ምክትል ሰብሳቢ", "ሳንታል", ""],
      ["3", "ፍቅሬ ተስፋ", "ጸሐፊ", "ጎሮ", ""],
      ["4", "ሰለሞን ገብሬ", "ቃል ገንዘብ ያዥ", "ሳንታል", ""],
      ["5", "ሙሉ አየለ", "አባል", "ጎሮ", ""],
      ["6", "ዳዊት ሙሉ", "አባል", "ቦራ", ""],
    ],
    Contributors: [
      ["id", "name", "village", "pledged", "paid", "remaining", "status"],
      ["1", "አበበ ከበደ", "ሳንታል", "5000", "3000", "2000", "በሂደት"],
      ["2", "ተስፋዬ አለሙ", "ሳንታል", "10000", "7000", "3000", "በሂደት"],
      ["3", "ፍቅሬ ተስፋ", "ጎሮ", "3000", "3000", "0", "ተጠናቋል"],
      ["4", "ሰለሞን ገብሬ", "ሳንታል", "5000", "2000", "3000", "በሂደት"],
      ["5", "ሙሉ አየለ", "ጎሮ", "4000", "4000", "0", "ተጠናቋል"],
      ["6", "ዳዊት ሙሉ", "ቦራ", "6000", "3000", "3000", "በሂደት"],
      ["7", "ሳሙኤል ተስፋ", "ቦራ", "8000", "5000", "3000", "በሂደት"],
      ["8", "ሐና ተስፋ", "ሳንታል", "2000", "2000", "0", "ተጠናቋል"],
      ["9", "ዮሐንስ አለሙ", "ጎሮ", "5000", "1500", "3500", "በሂደት"],
      ["10", "ማርታ ገብሬ", "ቦራ", "3000", "1000", "2000", "በሂደት"],
    ],
    Gallery: [
      ["id", "title", "image", "date", "description"],
      ["1", "የመንገድ ስራ መጀመሪያ", "", "2025-01-10", "የመንገዱ የመጀመሪያ ደረጃ ስራ"],
      ["2", "የማህበረሰብ ስብሰባ", "", "2024-12-28", "የማህበረሰቡ አባላት ስብሰባ"],
      ["3", "የገንዘብ ማሰባሰቢያ", "", "2024-12-15", "የገንዘብ ማሰባሰቢያ ዝግጅት"],
    ],
    Reports: [
      ["id", "title", "date", "description", "fileurl"],
      ["1", "የጃንዋሪ ሪፖርት", "2025-01-31", "የጃንዋሪ ወር የገንዘብ እና የስራ ሪፖርት", "#"],
      ["2", "የታህሳስ ሪፖርት", "2024-12-31", "የታህሳስ ወር የገንዘብ እና የስራ ሪፖርት", "#"],
      ["3", "የሩብ ዓመት ሪፖርት", "2024-12-31", "የመጀመሪያ ሩብ ዓመት ሪፖርት", "#"],
    ],
  };
  return fallback[sheetName] || [];
}

// ============ ዋና ተግባራት ============

export async function getProjectStats() {
  const rows = await fetchSheet("ProjectStats");
  const data = rowsToObjects(rows);
  return (
    data[0] || {
      target: "0",
      paid: "0",
      remaining: "0",
      participantCount: "0",
      lastUpdated: "",
      accountName: "ሳንታል የመንገድ ልማት ኮሚቴ",
      accountNumber: "1000696007725",
    }
  );
}

export async function getNews() {
  const rows = await fetchSheet("News");
  return rowsToObjects(rows);
}

export async function getVillages() {
  const rows = await fetchSheet("Villages");
  return rowsToObjects(rows);
}

export async function getVillageMembers(villageId) {
  const rows = await fetchSheet("VillageMembers");
  const all = rowsToObjects(rows);
  if (!villageId) return all;
  return all.filter((m) => String(m.villageId) === String(villageId));
}

export async function getCommittee() {
  const rows = await fetchSheet("Committee");
  return rowsToObjects(rows);
}

export async function getContributors() {
  const rows = await fetchSheet("Contributors");
  return rowsToObjects(rows);
}

export async function getGallery() {
  const rows = await fetchSheet("Gallery");
  return rowsToObjects(rows);
}

export async function getReports() {
  const rows = await fetchSheet("Reports");
  return rowsToObjects(rows);
}

export { ERRORS };
