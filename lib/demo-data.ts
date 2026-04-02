export interface MonthlyPnL {
  month: string
  revenue: number
  providerComp: number
  medicalSupplies: number
  facilityCosts: number
  totalCogs: number
  grossProfit: number
  adminStaff: number
  billingIT: number
  marketing: number
  totalOpex: number
  ebitda: number
}

export interface LocationData {
  name: string
  type: string
  revenue: number
  ebitda: number
  margin: number
  headcount: number
}

// Consistent color palette used across all dashboard charts
export const COLORS = {
  revenue: "#2563eb",     // blue — revenue, primary metrics
  profit: "#22c55e",      // green — gross profit, EBITDA, positive
  cost: "#ef4444",        // red — COGS, OpEx, negative
  neutral: "#64748b",     // slate — secondary
  ebitda: "#8b5cf6",      // violet — EBITDA when shown alongside revenue
  providerComp: "#2563eb",
  medicalSupplies: "#059669",
  facilityCosts: "#d97706",
  adminStaff: "#7c3aed",
  billingIT: "#0891b2",
  marketing: "#dc2626",
  locations: [
    "#2563eb", // blue
    "#059669", // emerald
    "#d97706", // amber
    "#7c3aed", // purple
    "#dc2626", // red
    "#0891b2", // cyan
  ],
} as const

export type DateRange = "full" | "Q1" | "Q2" | "Q3" | "Q4"

const QUARTER_MONTHS: Record<DateRange, string[]> = {
  full: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  Q1: ["Jan", "Feb", "Mar"],
  Q2: ["Apr", "May", "Jun"],
  Q3: ["Jul", "Aug", "Sep"],
  Q4: ["Oct", "Nov", "Dec"],
}

export function filterByDateRange(data: MonthlyPnL[], range: DateRange): MonthlyPnL[] {
  const months = QUARTER_MONTHS[range]
  return data.filter((d) => months.includes(d.month))
}

export function computeTotals(data: MonthlyPnL[]) {
  const s = (key: keyof MonthlyPnL) => data.reduce((acc, row) => acc + (row[key] as number), 0)
  return {
    revenue: s("revenue"),
    totalCogs: s("totalCogs"),
    grossProfit: s("grossProfit"),
    totalOpex: s("totalOpex"),
    ebitda: s("ebitda"),
    providerComp: s("providerComp"),
    medicalSupplies: s("medicalSupplies"),
    facilityCosts: s("facilityCosts"),
    adminStaff: s("adminStaff"),
    billingIT: s("billingIT"),
    marketing: s("marketing"),
  }
}

export function computeMetrics(totals: ReturnType<typeof computeTotals>) {
  return {
    grossMarginPct: totals.revenue > 0 ? (totals.grossProfit / totals.revenue) * 100 : 0,
    ebitdaMarginPct: totals.revenue > 0 ? (totals.ebitda / totals.revenue) * 100 : 0,
  }
}

export const COMPANY_NAME = "Meridian Health Partners"
export const FISCAL_YEAR = "FY 2025"

// Messy, realistic data — seasonal revenue dips, a bad supply month,
// facility cost jump from lease renewal in July, marketing spike in Sep,
// one-time IT project in Nov, etc.
export const MONTHLY_DATA: MonthlyPnL[] = [
  {
    month: "Jan",
    revenue: 2_847_000,   // post-holiday surge, flu season
    providerComp: 1_082_000,
    medicalSupplies: 412_000, // high — flu test kits, PPE restock
    facilityCosts: 268_000,
    totalCogs: 1_762_000,
    grossProfit: 1_085_000,
    adminStaff: 351_000,
    billingIT: 158_000,
    marketing: 42_000,     // low — Q4 budget hangover
    totalOpex: 551_000,
    ebitda: 534_000,
  },
  {
    month: "Feb",
    revenue: 2_413_000,   // short month, snowstorm cancellations
    providerComp: 1_044_000, // still paying providers, fewer visits
    medicalSupplies: 298_000,
    facilityCosts: 268_000,
    totalCogs: 1_610_000,
    grossProfit: 803_000,
    adminStaff: 351_000,
    billingIT: 158_000,
    marketing: 48_000,
    totalOpex: 557_000,
    ebitda: 246_000,       // ugly month
  },
  {
    month: "Mar",
    revenue: 2_891_000,   // rebound, spring allergy season starts
    providerComp: 1_098_000,
    medicalSupplies: 361_000,
    facilityCosts: 268_000,
    totalCogs: 1_727_000,
    grossProfit: 1_164_000,
    adminStaff: 355_000,
    billingIT: 162_000,
    marketing: 71_000,     // spring campaign launch
    totalOpex: 588_000,
    ebitda: 576_000,
  },
  {
    month: "Apr",
    revenue: 2_654_000,
    providerComp: 1_035_000,
    medicalSupplies: 332_000,
    facilityCosts: 268_000,
    totalCogs: 1_635_000,
    grossProfit: 1_019_000,
    adminStaff: 358_000,
    billingIT: 155_000,
    marketing: 63_000,
    totalOpex: 576_000,
    ebitda: 443_000,
  },
  {
    month: "May",
    revenue: 2_502_000,   // dip — people defer visits before summer
    providerComp: 1_001_000,
    medicalSupplies: 313_000,
    facilityCosts: 268_000,
    totalCogs: 1_582_000,
    grossProfit: 920_000,
    adminStaff: 358_000,
    billingIT: 155_000,
    marketing: 55_000,
    totalOpex: 568_000,
    ebitda: 352_000,
  },
  {
    month: "Jun",
    revenue: 2_318_000,   // summer trough begins
    providerComp: 985_000, // kept one locum on for vacation coverage
    medicalSupplies: 278_000,
    facilityCosts: 268_000,
    totalCogs: 1_531_000,
    grossProfit: 787_000,
    adminStaff: 342_000,   // one admin left, not yet replaced
    billingIT: 155_000,
    marketing: 38_000,     // pulled back spend
    totalOpex: 535_000,
    ebitda: 252_000,       // thin
  },
  {
    month: "Jul",
    revenue: 2_189_000,   // worst month — summer + provider vacations
    providerComp: 941_000,
    medicalSupplies: 259_000,
    facilityCosts: 312_000, // lease renewal kicked in — $44K jump
    totalCogs: 1_512_000,
    grossProfit: 677_000,
    adminStaff: 342_000,
    billingIT: 155_000,
    marketing: 35_000,
    totalOpex: 532_000,
    ebitda: 145_000,       // barely positive
  },
  {
    month: "Aug",
    revenue: 2_478_000,   // back-to-school physicals, recovery starts
    providerComp: 992_000,
    medicalSupplies: 372_000, // big restock after summer drawdown
    facilityCosts: 312_000,
    totalCogs: 1_676_000,
    grossProfit: 802_000,
    adminStaff: 365_000,   // new admin hire + overlap training
    billingIT: 155_000,
    marketing: 52_000,
    totalOpex: 572_000,
    ebitda: 230_000,
  },
  {
    month: "Sep",
    revenue: 2_756_000,   // strong rebound, flu shot season begins
    providerComp: 1_047_000,
    medicalSupplies: 358_000,
    facilityCosts: 312_000,
    totalCogs: 1_717_000,
    grossProfit: 1_039_000,
    adminStaff: 352_000,
    billingIT: 162_000,
    marketing: 89_000,     // big push — flu shot ads, open enrollment prep
    totalOpex: 603_000,
    ebitda: 436_000,
  },
  {
    month: "Oct",
    revenue: 2_923_000,   // peak — flu season + open enrollment
    providerComp: 1_110_000,
    medicalSupplies: 380_000,
    facilityCosts: 312_000,
    totalCogs: 1_802_000,
    grossProfit: 1_121_000,
    adminStaff: 352_000,
    billingIT: 168_000,
    marketing: 58_000,
    totalOpex: 578_000,
    ebitda: 543_000,       // best month
  },
  {
    month: "Nov",
    revenue: 2_687_000,
    providerComp: 1_061_000,
    medicalSupplies: 335_000,
    facilityCosts: 312_000,
    totalCogs: 1_708_000,
    grossProfit: 979_000,
    adminStaff: 352_000,
    billingIT: 213_000,    // one-time EHR migration project
    marketing: 44_000,
    totalOpex: 609_000,
    ebitda: 370_000,
  },
  {
    month: "Dec",
    revenue: 2_398_000,   // holiday slowdown, year-end
    providerComp: 1_022_000, // bonuses hit this month
    medicalSupplies: 287_000,
    facilityCosts: 312_000,
    totalCogs: 1_621_000,
    grossProfit: 777_000,
    adminStaff: 368_000,   // year-end bonuses
    billingIT: 162_000,
    marketing: 72_000,     // new year campaign prep
    totalOpex: 602_000,
    ebitda: 175_000,       // thin — bonus-heavy month
  },
]

// Locations with varied performance — some profitable, some struggling
export const LOCATION_DATA: LocationData[] = [
  { name: "Downtown Primary Care", type: "Primary Care", revenue: 7_240_000, ebitda: 1_158_000, margin: 16.0, headcount: 34 },
  { name: "Westside Urgent Care", type: "Urgent Care", revenue: 5_830_000, ebitda: 641_000, margin: 11.0, headcount: 28 },
  { name: "Lakewood Specialty Clinic", type: "Specialty", revenue: 4_710_000, ebitda: 801_000, margin: 17.0, headcount: 18 },
  { name: "Northgate Family Medicine", type: "Primary Care", revenue: 4_180_000, ebitda: 293_000, margin: 7.0, headcount: 22 },  // struggling
  { name: "Southpark Orthopedics", type: "Specialty", revenue: 5_420_000, ebitda: 867_000, margin: 16.0, headcount: 21 },
  { name: "Riverside Imaging Center", type: "Ancillary", revenue: 3_680_000, ebitda: 542_000, margin: 14.7, headcount: 12 },
]

function sum(arr: MonthlyPnL[], key: keyof MonthlyPnL): number {
  return arr.reduce((acc, row) => acc + (row[key] as number), 0)
}

export const ANNUAL_TOTALS = {
  revenue: sum(MONTHLY_DATA, "revenue"),
  totalCogs: sum(MONTHLY_DATA, "totalCogs"),
  grossProfit: sum(MONTHLY_DATA, "grossProfit"),
  totalOpex: sum(MONTHLY_DATA, "totalOpex"),
  ebitda: sum(MONTHLY_DATA, "ebitda"),
  providerComp: sum(MONTHLY_DATA, "providerComp"),
  medicalSupplies: sum(MONTHLY_DATA, "medicalSupplies"),
  facilityCosts: sum(MONTHLY_DATA, "facilityCosts"),
  adminStaff: sum(MONTHLY_DATA, "adminStaff"),
  billingIT: sum(MONTHLY_DATA, "billingIT"),
  marketing: sum(MONTHLY_DATA, "marketing"),
}

export const ANNUAL_METRICS = {
  grossMarginPct: (ANNUAL_TOTALS.grossProfit / ANNUAL_TOTALS.revenue) * 100,
  ebitdaMarginPct: (ANNUAL_TOTALS.ebitda / ANNUAL_TOTALS.revenue) * 100,
}
