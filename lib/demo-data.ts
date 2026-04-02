export interface MonthlyPnL {
  month: string
  // Revenue
  patientServices: number
  ancillaryRevenue: number
  otherIncome: number
  revenue: number
  // COGS
  providerComp: number
  nursingStaff: number
  medicalSupplies: number
  labDiagnostic: number
  pharmacy: number
  facilityCosts: number
  equipmentLease: number
  totalCogs: number
  grossProfit: number
  // OpEx
  adminStaff: number
  billingCollections: number
  itSystems: number
  malpracticeInsurance: number
  generalInsurance: number
  marketing: number
  rent: number
  utilities: number
  depreciation: number
  professionalFees: number
  officeSupplies: number
  staffTraining: number
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

// Chart palette derived from the site's navy/slate theme
// Primary hue ~265 (navy), secondary accents in the same family
export const COLORS = {
  // Semantic
  revenue: "#1e293b",     // slate-800 — the site's primary/foreground
  profit: "#475569",      // slate-600 — lighter navy for positive subtotals
  cost: "#94a3b8",        // slate-400 — muted for costs
  neutral: "#cbd5e1",     // slate-300
  ebitda: "#334155",      // slate-700 — EBITDA when alongside revenue

  // COGS line items — navy scale, darkest to lightest
  providerComp: "#0f172a",  // slate-900
  nursingStaff: "#1e293b",  // slate-800
  medicalSupplies: "#334155", // slate-700
  labDiagnostic: "#475569", // slate-600
  pharmacy: "#64748b",      // slate-500
  facilityCosts: "#94a3b8", // slate-400
  equipmentLease: "#cbd5e1", // slate-300

  // OpEx line items — same scale
  adminStaff: "#0f172a",
  billingIT: "#334155",
  marketing: "#64748b",

  // Location bars — stepped navy tones
  locations: [
    "#0f172a", // slate-900
    "#1e293b", // slate-800
    "#334155", // slate-700
    "#475569", // slate-600
    "#64748b", // slate-500
    "#94a3b8", // slate-400
  ],

  // Donut chart — full navy gradient for many slices
  donut: [
    "#0f172a", "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8",
    "#cbd5e1", "#1a2332", "#2d3d50", "#3f526b", "#526885", "#6b809e",
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
    patientServices: s("patientServices"),
    ancillaryRevenue: s("ancillaryRevenue"),
    otherIncome: s("otherIncome"),
    revenue: s("revenue"),
    providerComp: s("providerComp"),
    nursingStaff: s("nursingStaff"),
    medicalSupplies: s("medicalSupplies"),
    labDiagnostic: s("labDiagnostic"),
    pharmacy: s("pharmacy"),
    facilityCosts: s("facilityCosts"),
    equipmentLease: s("equipmentLease"),
    totalCogs: s("totalCogs"),
    grossProfit: s("grossProfit"),
    adminStaff: s("adminStaff"),
    billingCollections: s("billingCollections"),
    itSystems: s("itSystems"),
    malpracticeInsurance: s("malpracticeInsurance"),
    generalInsurance: s("generalInsurance"),
    marketing: s("marketing"),
    rent: s("rent"),
    utilities: s("utilities"),
    depreciation: s("depreciation"),
    professionalFees: s("professionalFees"),
    officeSupplies: s("officeSupplies"),
    staffTraining: s("staffTraining"),
    totalOpex: s("totalOpex"),
    ebitda: s("ebitda"),
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
    patientServices: 2_518_000, ancillaryRevenue: 287_000, otherIncome: 42_000, revenue: 2_847_000,
    providerComp: 798_000, nursingStaff: 284_000, medicalSupplies: 256_000, labDiagnostic: 114_000, pharmacy: 42_000, facilityCosts: 168_000, equipmentLease: 100_000,
    totalCogs: 1_762_000, grossProfit: 1_085_000,
    adminStaff: 218_000, billingCollections: 85_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 42_000, rent: 0, utilities: 19_000, depreciation: 28_000, professionalFees: 12_000, officeSupplies: 4_000, staffTraining: 0,
    totalOpex: 551_000, ebitda: 534_000,
  },
  {
    month: "Feb",
    patientServices: 2_098_000, ancillaryRevenue: 271_000, otherIncome: 44_000, revenue: 2_413_000,
    providerComp: 762_000, nursingStaff: 282_000, medicalSupplies: 198_000, labDiagnostic: 98_000, pharmacy: 38_000, facilityCosts: 168_000, equipmentLease: 64_000,
    totalCogs: 1_610_000, grossProfit: 803_000,
    adminStaff: 218_000, billingCollections: 85_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 48_000, rent: 0, utilities: 21_000, depreciation: 28_000, professionalFees: 8_000, officeSupplies: 6_000, staffTraining: 0,
    totalOpex: 557_000, ebitda: 246_000,
  },
  {
    month: "Mar",
    patientServices: 2_561_000, ancillaryRevenue: 298_000, otherIncome: 32_000, revenue: 2_891_000,
    providerComp: 812_000, nursingStaff: 286_000, medicalSupplies: 241_000, labDiagnostic: 118_000, pharmacy: 44_000, facilityCosts: 168_000, equipmentLease: 58_000,
    totalCogs: 1_727_000, grossProfit: 1_164_000,
    adminStaff: 222_000, billingCollections: 85_000, itSystems: 77_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 71_000, rent: 0, utilities: 18_000, depreciation: 28_000, professionalFees: 9_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 588_000, ebitda: 576_000,
  },
  {
    month: "Apr",
    patientServices: 2_341_000, ancillaryRevenue: 278_000, otherIncome: 35_000, revenue: 2_654_000,
    providerComp: 774_000, nursingStaff: 261_000, medicalSupplies: 222_000, labDiagnostic: 108_000, pharmacy: 40_000, facilityCosts: 168_000, equipmentLease: 62_000,
    totalCogs: 1_635_000, grossProfit: 1_019_000,
    adminStaff: 225_000, billingCollections: 82_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 63_000, rent: 0, utilities: 17_000, depreciation: 28_000, professionalFees: 14_000, officeSupplies: 4_000, staffTraining: 0,
    totalOpex: 576_000, ebitda: 443_000,
  },
  {
    month: "May",
    patientServices: 2_198_000, ancillaryRevenue: 262_000, otherIncome: 42_000, revenue: 2_502_000,
    providerComp: 741_000, nursingStaff: 260_000, medicalSupplies: 213_000, labDiagnostic: 102_000, pharmacy: 36_000, facilityCosts: 168_000, equipmentLease: 62_000,
    totalCogs: 1_582_000, grossProfit: 920_000,
    adminStaff: 225_000, billingCollections: 82_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 55_000, rent: 0, utilities: 17_000, depreciation: 28_000, professionalFees: 10_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 568_000, ebitda: 352_000,
  },
  {
    month: "Jun",
    patientServices: 2_018_000, ancillaryRevenue: 248_000, otherIncome: 52_000, revenue: 2_318_000,
    providerComp: 728_000, nursingStaff: 257_000, medicalSupplies: 178_000, labDiagnostic: 88_000, pharmacy: 32_000, facilityCosts: 168_000, equipmentLease: 80_000,
    totalCogs: 1_531_000, grossProfit: 787_000,
    adminStaff: 209_000, billingCollections: 82_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 38_000, rent: 0, utilities: 18_000, depreciation: 28_000, professionalFees: 9_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 535_000, ebitda: 252_000,
  },
  {
    month: "Jul",
    patientServices: 1_892_000, ancillaryRevenue: 241_000, otherIncome: 56_000, revenue: 2_189_000,
    providerComp: 688_000, nursingStaff: 253_000, medicalSupplies: 159_000, labDiagnostic: 82_000, pharmacy: 30_000, facilityCosts: 212_000, equipmentLease: 88_000,
    totalCogs: 1_512_000, grossProfit: 677_000,
    adminStaff: 209_000, billingCollections: 82_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 35_000, rent: 0, utilities: 19_000, depreciation: 28_000, professionalFees: 8_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 532_000, ebitda: 145_000,
  },
  {
    month: "Aug",
    patientServices: 2_178_000, ancillaryRevenue: 258_000, otherIncome: 42_000, revenue: 2_478_000,
    providerComp: 738_000, nursingStaff: 254_000, medicalSupplies: 272_000, labDiagnostic: 96_000, pharmacy: 38_000, facilityCosts: 212_000, equipmentLease: 66_000,
    totalCogs: 1_676_000, grossProfit: 802_000,
    adminStaff: 232_000, billingCollections: 82_000, itSystems: 73_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 52_000, rent: 0, utilities: 19_000, depreciation: 28_000, professionalFees: 8_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 572_000, ebitda: 230_000,
  },
  {
    month: "Sep",
    patientServices: 2_448_000, ancillaryRevenue: 274_000, otherIncome: 34_000, revenue: 2_756_000,
    providerComp: 782_000, nursingStaff: 265_000, medicalSupplies: 248_000, labDiagnostic: 112_000, pharmacy: 42_000, facilityCosts: 212_000, equipmentLease: 56_000,
    totalCogs: 1_717_000, grossProfit: 1_039_000,
    adminStaff: 219_000, billingCollections: 82_000, itSystems: 80_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 89_000, rent: 0, utilities: 18_000, depreciation: 28_000, professionalFees: 9_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 603_000, ebitda: 436_000,
  },
  {
    month: "Oct",
    patientServices: 2_612_000, ancillaryRevenue: 281_000, otherIncome: 30_000, revenue: 2_923_000,
    providerComp: 824_000, nursingStaff: 286_000, medicalSupplies: 268_000, labDiagnostic: 122_000, pharmacy: 46_000, facilityCosts: 212_000, equipmentLease: 44_000,
    totalCogs: 1_802_000, grossProfit: 1_121_000,
    adminStaff: 219_000, billingCollections: 82_000, itSystems: 86_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 58_000, rent: 0, utilities: 18_000, depreciation: 28_000, professionalFees: 9_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 578_000, ebitda: 543_000,
  },
  {
    month: "Nov",
    patientServices: 2_378_000, ancillaryRevenue: 271_000, otherIncome: 38_000, revenue: 2_687_000,
    providerComp: 788_000, nursingStaff: 273_000, medicalSupplies: 235_000, labDiagnostic: 108_000, pharmacy: 40_000, facilityCosts: 212_000, equipmentLease: 52_000,
    totalCogs: 1_708_000, grossProfit: 979_000,
    adminStaff: 219_000, billingCollections: 82_000, itSystems: 131_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 44_000, rent: 0, utilities: 19_000, depreciation: 28_000, professionalFees: 8_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 609_000, ebitda: 370_000,
  },
  {
    month: "Dec",
    patientServices: 2_082_000, ancillaryRevenue: 264_000, otherIncome: 52_000, revenue: 2_398_000,
    providerComp: 768_000, nursingStaff: 254_000, medicalSupplies: 187_000, labDiagnostic: 94_000, pharmacy: 34_000, facilityCosts: 212_000, equipmentLease: 72_000,
    totalCogs: 1_621_000, grossProfit: 777_000,
    adminStaff: 235_000, billingCollections: 82_000, itSystems: 80_000, malpracticeInsurance: 48_000, generalInsurance: 22_000, marketing: 72_000, rent: 0, utilities: 19_000, depreciation: 28_000, professionalFees: 8_000, officeSupplies: 4_000, staffTraining: 4_000,
    totalOpex: 602_000, ebitda: 175_000,
  },
]

export const LOCATION_DATA: LocationData[] = [
  { name: "Downtown Primary Care", type: "Primary Care", revenue: 7_240_000, ebitda: 1_158_000, margin: 16.0, headcount: 34 },
  { name: "Westside Urgent Care", type: "Urgent Care", revenue: 5_830_000, ebitda: 641_000, margin: 11.0, headcount: 28 },
  { name: "Lakewood Specialty Clinic", type: "Specialty", revenue: 4_710_000, ebitda: 801_000, margin: 17.0, headcount: 18 },
  { name: "Northgate Family Medicine", type: "Primary Care", revenue: 4_180_000, ebitda: 293_000, margin: 7.0, headcount: 22 },
  { name: "Southpark Orthopedics", type: "Specialty", revenue: 5_420_000, ebitda: 867_000, margin: 16.0, headcount: 21 },
  { name: "Riverside Imaging Center", type: "Ancillary", revenue: 3_680_000, ebitda: 542_000, margin: 14.7, headcount: 12 },
]

function sum(arr: MonthlyPnL[], key: keyof MonthlyPnL): number {
  return arr.reduce((acc, row) => acc + (row[key] as number), 0)
}

export const ANNUAL_TOTALS = computeTotals(MONTHLY_DATA)

export const ANNUAL_METRICS = computeMetrics(ANNUAL_TOTALS)
