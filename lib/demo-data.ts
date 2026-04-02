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
  revenue: number
  ebitda: number
  margin: number
}

// Consistent color palette used across all dashboard charts
export const COLORS = {
  revenue: "#2563eb",     // blue — revenue, primary metrics
  profit: "#22c55e",      // green — gross profit, EBITDA, positive
  cost: "#ef4444",        // red — COGS, OpEx, negative
  neutral: "#64748b",     // slate — secondary
  ebitda: "#8b5cf6",      // violet — EBITDA when shown alongside revenue
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

export const MONTHLY_DATA: MonthlyPnL[] = [
  {
    month: "Jan",
    revenue: 2_680_000,
    providerComp: 1_045_200,
    medicalSupplies: 348_400,
    facilityCosts: 268_000,
    totalCogs: 1_661_600,
    grossProfit: 1_018_400,
    adminStaff: 348_400,
    billingIT: 160_800,
    marketing: 53_600,
    totalOpex: 562_800,
    ebitda: 455_600,
  },
  {
    month: "Feb",
    revenue: 2_520_000,
    providerComp: 983_000,
    medicalSupplies: 327_600,
    facilityCosts: 264_600,
    totalCogs: 1_575_200,
    grossProfit: 944_800,
    adminStaff: 340_200,
    billingIT: 156_200,
    marketing: 50_400,
    totalOpex: 546_800,
    ebitda: 398_000,
  },
  {
    month: "Mar",
    revenue: 2_740_000,
    providerComp: 1_068_600,
    medicalSupplies: 356_200,
    facilityCosts: 271_300,
    totalCogs: 1_696_100,
    grossProfit: 1_043_900,
    adminStaff: 352_700,
    billingIT: 164_400,
    marketing: 57_500,
    totalOpex: 574_600,
    ebitda: 469_300,
  },
  {
    month: "Apr",
    revenue: 2_610_000,
    providerComp: 1_018_000,
    medicalSupplies: 339_300,
    facilityCosts: 265_600,
    totalCogs: 1_622_900,
    grossProfit: 987_100,
    adminStaff: 345_700,
    billingIT: 159_000,
    marketing: 52_200,
    totalOpex: 556_900,
    ebitda: 430_200,
  },
  {
    month: "May",
    revenue: 2_480_000,
    providerComp: 967_200,
    medicalSupplies: 322_400,
    facilityCosts: 260_400,
    totalCogs: 1_550_000,
    grossProfit: 930_000,
    adminStaff: 338_900,
    billingIT: 153_500,
    marketing: 49_600,
    totalOpex: 542_000,
    ebitda: 388_000,
  },
  {
    month: "Jun",
    revenue: 2_390_000,
    providerComp: 932_100,
    medicalSupplies: 310_700,
    facilityCosts: 255_200,
    totalCogs: 1_498_000,
    grossProfit: 892_000,
    adminStaff: 334_600,
    billingIT: 150_900,
    marketing: 47_800,
    totalOpex: 533_300,
    ebitda: 358_700,
  },
  {
    month: "Jul",
    revenue: 2_350_000,
    providerComp: 916_500,
    medicalSupplies: 305_500,
    facilityCosts: 252_800,
    totalCogs: 1_474_800,
    grossProfit: 875_200,
    adminStaff: 332_300,
    billingIT: 149_200,
    marketing: 47_000,
    totalOpex: 528_500,
    ebitda: 346_700,
  },
  {
    month: "Aug",
    revenue: 2_510_000,
    providerComp: 979_000,
    medicalSupplies: 326_300,
    facilityCosts: 261_000,
    totalCogs: 1_566_300,
    grossProfit: 943_700,
    adminStaff: 339_900,
    billingIT: 155_600,
    marketing: 50_200,
    totalOpex: 545_700,
    ebitda: 398_000,
  },
  {
    month: "Sep",
    revenue: 2_620_000,
    providerComp: 1_021_800,
    medicalSupplies: 340_600,
    facilityCosts: 267_200,
    totalCogs: 1_629_600,
    grossProfit: 990_400,
    adminStaff: 346_400,
    billingIT: 159_800,
    marketing: 52_400,
    totalOpex: 558_600,
    ebitda: 431_800,
  },
  {
    month: "Oct",
    revenue: 2_710_000,
    providerComp: 1_056_900,
    medicalSupplies: 352_300,
    facilityCosts: 273_700,
    totalCogs: 1_682_900,
    grossProfit: 1_027_100,
    adminStaff: 351_300,
    billingIT: 163_200,
    marketing: 54_200,
    totalOpex: 568_700,
    ebitda: 458_400,
  },
  {
    month: "Nov",
    revenue: 2_580_000,
    providerComp: 1_006_200,
    medicalSupplies: 335_400,
    facilityCosts: 264_400,
    totalCogs: 1_606_000,
    grossProfit: 974_000,
    adminStaff: 344_200,
    billingIT: 157_400,
    marketing: 51_600,
    totalOpex: 553_200,
    ebitda: 420_800,
  },
  {
    month: "Dec",
    revenue: 2_450_000,
    providerComp: 955_500,
    medicalSupplies: 318_500,
    facilityCosts: 257_300,
    totalCogs: 1_531_300,
    grossProfit: 918_700,
    adminStaff: 336_700,
    billingIT: 152_300,
    marketing: 49_000,
    totalOpex: 538_000,
    ebitda: 380_700,
  },
]

export const LOCATION_DATA: LocationData[] = [
  { name: "Downtown Primary Care", revenue: 6_820_000, ebitda: 1_023_000, margin: 15.0 },
  { name: "Westside Urgent Care", revenue: 5_410_000, ebitda: 703_300, margin: 13.0 },
  { name: "Lakewood Specialty Clinic", revenue: 4_950_000, ebitda: 742_500, margin: 15.0 },
  { name: "Northgate Family Medicine", revenue: 4_280_000, ebitda: 513_600, margin: 12.0 },
  { name: "Southpark Orthopedics", revenue: 5_130_000, ebitda: 718_200, margin: 14.0 },
  { name: "Riverside Imaging Center", revenue: 4_050_000, ebitda: 486_000, margin: 12.0 },
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
