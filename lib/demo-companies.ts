import {
  type MonthlyPnL,
  type LocationData,
  MONTHLY_DATA,
  LOCATION_DATA,
} from "./demo-data"

export interface LabelMapping {
  key: keyof MonthlyPnL
  label: string
}

export interface CompanyConfig {
  id: string
  name: string
  fiscalYear: string
  industry: string
  monthlyData: MonthlyPnL[]
  locationData: LocationData[]
  revenueLabels: LabelMapping[]
  cogsLabels: LabelMapping[]
  opexLabels: LabelMapping[]
}

// ─── Healthcare: Meridian Health Partners ───
const healthcareCompany: CompanyConfig = {
  id: "healthcare",
  name: "Meridian Health Partners",
  fiscalYear: "FY 2025",
  industry: "Healthcare",
  monthlyData: MONTHLY_DATA,
  locationData: LOCATION_DATA,
  revenueLabels: [
    { key: "patientServices", label: "Patient Services" },
    { key: "ancillaryRevenue", label: "Ancillary Revenue" },
    { key: "otherIncome", label: "Other Income" },
  ],
  cogsLabels: [
    { key: "providerComp", label: "Provider Comp" },
    { key: "nursingStaff", label: "Nursing Staff" },
    { key: "medicalSupplies", label: "Medical Supplies" },
    { key: "labDiagnostic", label: "Lab & Diagnostic" },
    { key: "pharmacy", label: "Pharmacy" },
    { key: "facilityCosts", label: "Facility Costs" },
    { key: "equipmentLease", label: "Equipment Lease" },
  ],
  opexLabels: [
    { key: "adminStaff", label: "Admin Staff" },
    { key: "billingCollections", label: "Billing & Collections" },
    { key: "itSystems", label: "IT Systems" },
    { key: "malpracticeInsurance", label: "Malpractice Insurance" },
    { key: "generalInsurance", label: "General Insurance" },
    { key: "marketing", label: "Marketing" },
    { key: "utilities", label: "Utilities" },
    { key: "depreciation", label: "Depreciation" },
    { key: "professionalFees", label: "Professional Fees" },
    { key: "officeSupplies", label: "Office Supplies" },
    { key: "staffTraining", label: "Staff Training" },
  ],
}

// ─── Manufacturing: Summit Precision Manufacturing ───
const manufacturingMonthly: MonthlyPnL[] = [
  { month: "Jan", patientServices: 3_820_000, ancillaryRevenue: 1_340_000, otherIncome: 95_000, revenue: 5_255_000, providerComp: 1_210_000, nursingStaff: 890_000, medicalSupplies: 420_000, labDiagnostic: 185_000, pharmacy: 145_000, facilityCosts: 280_000, equipmentLease: 120_000, totalCogs: 3_250_000, grossProfit: 2_005_000, adminStaff: 380_000, billingCollections: 290_000, itSystems: 125_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 110_000, rent: 0, utilities: 38_000, depreciation: 165_000, professionalFees: 22_000, officeSupplies: 8_000, staffTraining: 12_000, totalOpex: 1_290_000, ebitda: 715_000 },
  { month: "Feb", patientServices: 3_540_000, ancillaryRevenue: 1_280_000, otherIncome: 82_000, revenue: 4_902_000, providerComp: 1_180_000, nursingStaff: 875_000, medicalSupplies: 385_000, labDiagnostic: 172_000, pharmacy: 138_000, facilityCosts: 275_000, equipmentLease: 118_000, totalCogs: 3_143_000, grossProfit: 1_759_000, adminStaff: 380_000, billingCollections: 285_000, itSystems: 125_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 98_000, rent: 0, utilities: 36_000, depreciation: 165_000, professionalFees: 18_000, officeSupplies: 7_000, staffTraining: 8_000, totalOpex: 1_262_000, ebitda: 497_000 },
  { month: "Mar", patientServices: 4_120_000, ancillaryRevenue: 1_410_000, otherIncome: 105_000, revenue: 5_635_000, providerComp: 1_280_000, nursingStaff: 910_000, medicalSupplies: 465_000, labDiagnostic: 198_000, pharmacy: 152_000, facilityCosts: 285_000, equipmentLease: 125_000, totalCogs: 3_415_000, grossProfit: 2_220_000, adminStaff: 385_000, billingCollections: 295_000, itSystems: 128_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 125_000, rent: 0, utilities: 39_000, depreciation: 165_000, professionalFees: 20_000, officeSupplies: 9_000, staffTraining: 15_000, totalOpex: 1_321_000, ebitda: 899_000 },
  { month: "Apr", patientServices: 4_280_000, ancillaryRevenue: 1_520_000, otherIncome: 98_000, revenue: 5_898_000, providerComp: 1_320_000, nursingStaff: 925_000, medicalSupplies: 490_000, labDiagnostic: 205_000, pharmacy: 158_000, facilityCosts: 290_000, equipmentLease: 128_000, totalCogs: 3_516_000, grossProfit: 2_382_000, adminStaff: 390_000, billingCollections: 298_000, itSystems: 130_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 135_000, rent: 0, utilities: 40_000, depreciation: 165_000, professionalFees: 25_000, officeSupplies: 8_000, staffTraining: 10_000, totalOpex: 1_341_000, ebitda: 1_041_000 },
  { month: "May", patientServices: 4_450_000, ancillaryRevenue: 1_580_000, otherIncome: 110_000, revenue: 6_140_000, providerComp: 1_350_000, nursingStaff: 940_000, medicalSupplies: 510_000, labDiagnostic: 215_000, pharmacy: 162_000, facilityCosts: 295_000, equipmentLease: 130_000, totalCogs: 3_602_000, grossProfit: 2_538_000, adminStaff: 395_000, billingCollections: 302_000, itSystems: 132_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 142_000, rent: 0, utilities: 42_000, depreciation: 165_000, professionalFees: 20_000, officeSupplies: 9_000, staffTraining: 12_000, totalOpex: 1_359_000, ebitda: 1_179_000 },
  { month: "Jun", patientServices: 4_180_000, ancillaryRevenue: 1_490_000, otherIncome: 88_000, revenue: 5_758_000, providerComp: 1_290_000, nursingStaff: 915_000, medicalSupplies: 475_000, labDiagnostic: 195_000, pharmacy: 155_000, facilityCosts: 288_000, equipmentLease: 125_000, totalCogs: 3_443_000, grossProfit: 2_315_000, adminStaff: 388_000, billingCollections: 295_000, itSystems: 128_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 120_000, rent: 0, utilities: 44_000, depreciation: 165_000, professionalFees: 18_000, officeSupplies: 8_000, staffTraining: 10_000, totalOpex: 1_316_000, ebitda: 999_000 },
  { month: "Jul", patientServices: 3_950_000, ancillaryRevenue: 1_380_000, otherIncome: 78_000, revenue: 5_408_000, providerComp: 1_240_000, nursingStaff: 895_000, medicalSupplies: 440_000, labDiagnostic: 188_000, pharmacy: 148_000, facilityCosts: 282_000, equipmentLease: 122_000, totalCogs: 3_315_000, grossProfit: 2_093_000, adminStaff: 382_000, billingCollections: 288_000, itSystems: 126_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 105_000, rent: 0, utilities: 46_000, depreciation: 165_000, professionalFees: 15_000, officeSupplies: 7_000, staffTraining: 8_000, totalOpex: 1_282_000, ebitda: 811_000 },
  { month: "Aug", patientServices: 4_580_000, ancillaryRevenue: 1_620_000, otherIncome: 115_000, revenue: 6_315_000, providerComp: 1_380_000, nursingStaff: 950_000, medicalSupplies: 525_000, labDiagnostic: 220_000, pharmacy: 165_000, facilityCosts: 298_000, equipmentLease: 132_000, totalCogs: 3_670_000, grossProfit: 2_645_000, adminStaff: 398_000, billingCollections: 305_000, itSystems: 135_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 148_000, rent: 0, utilities: 45_000, depreciation: 165_000, professionalFees: 22_000, officeSupplies: 9_000, staffTraining: 14_000, totalOpex: 1_381_000, ebitda: 1_264_000 },
  { month: "Sep", patientServices: 4_920_000, ancillaryRevenue: 1_710_000, otherIncome: 125_000, revenue: 6_755_000, providerComp: 1_420_000, nursingStaff: 968_000, medicalSupplies: 555_000, labDiagnostic: 232_000, pharmacy: 172_000, facilityCosts: 305_000, equipmentLease: 135_000, totalCogs: 3_787_000, grossProfit: 2_968_000, adminStaff: 405_000, billingCollections: 312_000, itSystems: 138_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 155_000, rent: 0, utilities: 43_000, depreciation: 165_000, professionalFees: 24_000, officeSupplies: 10_000, staffTraining: 15_000, totalOpex: 1_407_000, ebitda: 1_561_000 },
  { month: "Oct", patientServices: 5_180_000, ancillaryRevenue: 1_790_000, otherIncome: 135_000, revenue: 7_105_000, providerComp: 1_460_000, nursingStaff: 985_000, medicalSupplies: 580_000, labDiagnostic: 245_000, pharmacy: 178_000, facilityCosts: 310_000, equipmentLease: 138_000, totalCogs: 3_896_000, grossProfit: 3_209_000, adminStaff: 410_000, billingCollections: 318_000, itSystems: 142_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 162_000, rent: 0, utilities: 41_000, depreciation: 165_000, professionalFees: 25_000, officeSupplies: 10_000, staffTraining: 12_000, totalOpex: 1_425_000, ebitda: 1_784_000 },
  { month: "Nov", patientServices: 4_850_000, ancillaryRevenue: 1_680_000, otherIncome: 118_000, revenue: 6_648_000, providerComp: 1_395_000, nursingStaff: 958_000, medicalSupplies: 535_000, labDiagnostic: 225_000, pharmacy: 168_000, facilityCosts: 302_000, equipmentLease: 132_000, totalCogs: 3_715_000, grossProfit: 2_933_000, adminStaff: 402_000, billingCollections: 308_000, itSystems: 140_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 148_000, rent: 0, utilities: 40_000, depreciation: 165_000, professionalFees: 22_000, officeSupplies: 9_000, staffTraining: 10_000, totalOpex: 1_384_000, ebitda: 1_549_000 },
  { month: "Dec", patientServices: 4_380_000, ancillaryRevenue: 1_450_000, otherIncome: 92_000, revenue: 5_922_000, providerComp: 1_310_000, nursingStaff: 920_000, medicalSupplies: 480_000, labDiagnostic: 202_000, pharmacy: 155_000, facilityCosts: 295_000, equipmentLease: 128_000, totalCogs: 3_490_000, grossProfit: 2_432_000, adminStaff: 395_000, billingCollections: 298_000, itSystems: 135_000, malpracticeInsurance: 95_000, generalInsurance: 45_000, marketing: 118_000, rent: 0, utilities: 42_000, depreciation: 165_000, professionalFees: 20_000, officeSupplies: 8_000, staffTraining: 10_000, totalOpex: 1_331_000, ebitda: 1_101_000 },
]

const manufacturingLocations: LocationData[] = [
  { name: "Main Assembly Plant", type: "Assembly", revenue: 18_200_000, ebitda: 3_280_000, margin: 18.0, headcount: 85 },
  { name: "CNC Precision Shop", type: "Machining", revenue: 14_600_000, ebitda: 2_340_000, margin: 16.0, headcount: 42 },
  { name: "Sheet Metal Division", type: "Fabrication", revenue: 11_800_000, ebitda: 1_534_000, margin: 13.0, headcount: 38 },
  { name: "Southside Warehouse", type: "Distribution", revenue: 8_400_000, ebitda: 1_176_000, margin: 14.0, headcount: 22 },
  { name: "Paint & Finish Line", type: "Finishing", revenue: 9_200_000, ebitda: 736_000, margin: 8.0, headcount: 28 },
  { name: "Quality Control Lab", type: "QC", revenue: 5_500_000, ebitda: 385_000, margin: 7.0, headcount: 15 },
]

const manufacturingCompany: CompanyConfig = {
  id: "manufacturing",
  name: "Summit Precision Manufacturing",
  fiscalYear: "FY 2025",
  industry: "Manufacturing",
  monthlyData: manufacturingMonthly,
  locationData: manufacturingLocations,
  revenueLabels: [
    { key: "patientServices", label: "Product Sales" },
    { key: "ancillaryRevenue", label: "Contract Manufacturing" },
    { key: "otherIncome", label: "Scrap & Other" },
  ],
  cogsLabels: [
    { key: "providerComp", label: "Raw Materials" },
    { key: "nursingStaff", label: "Direct Labor" },
    { key: "medicalSupplies", label: "Machine Maintenance" },
    { key: "labDiagnostic", label: "Plant Utilities" },
    { key: "pharmacy", label: "Quality Control" },
    { key: "facilityCosts", label: "Packaging" },
    { key: "equipmentLease", label: "Freight & Shipping" },
  ],
  opexLabels: [
    { key: "adminStaff", label: "Admin & HR" },
    { key: "billingCollections", label: "Sales Team" },
    { key: "itSystems", label: "IT & ERP" },
    { key: "malpracticeInsurance", label: "Liability Insurance" },
    { key: "generalInsurance", label: "Property Insurance" },
    { key: "marketing", label: "Marketing" },
    { key: "utilities", label: "Office Utilities" },
    { key: "depreciation", label: "Depreciation" },
    { key: "professionalFees", label: "Professional Fees" },
    { key: "officeSupplies", label: "Office Supplies" },
    { key: "staffTraining", label: "Training & Safety" },
  ],
}

// ─── HVAC: ClearAir Mechanical Services ───
const hvacMonthly: MonthlyPnL[] = [
  { month: "Jan", patientServices: 1_480_000, ancillaryRevenue: 820_000, otherIncome: 340_000, revenue: 2_640_000, providerComp: 680_000, nursingStaff: 310_000, medicalSupplies: 185_000, labDiagnostic: 92_000, pharmacy: 48_000, facilityCosts: 72_000, equipmentLease: 55_000, totalCogs: 1_442_000, grossProfit: 1_198_000, adminStaff: 245_000, billingCollections: 165_000, itSystems: 78_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 85_000, rent: 0, utilities: 18_000, depreciation: 42_000, professionalFees: 12_000, officeSupplies: 5_000, staffTraining: 8_000, totalOpex: 738_000, ebitda: 460_000 },
  { month: "Feb", patientServices: 1_320_000, ancillaryRevenue: 780_000, otherIncome: 310_000, revenue: 2_410_000, providerComp: 645_000, nursingStaff: 298_000, medicalSupplies: 168_000, labDiagnostic: 85_000, pharmacy: 44_000, facilityCosts: 68_000, equipmentLease: 52_000, totalCogs: 1_360_000, grossProfit: 1_050_000, adminStaff: 242_000, billingCollections: 162_000, itSystems: 78_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 78_000, rent: 0, utilities: 17_000, depreciation: 42_000, professionalFees: 10_000, officeSupplies: 5_000, staffTraining: 6_000, totalOpex: 720_000, ebitda: 330_000 },
  { month: "Mar", patientServices: 1_580_000, ancillaryRevenue: 890_000, otherIncome: 380_000, revenue: 2_850_000, providerComp: 710_000, nursingStaff: 325_000, medicalSupplies: 198_000, labDiagnostic: 98_000, pharmacy: 52_000, facilityCosts: 75_000, equipmentLease: 58_000, totalCogs: 1_516_000, grossProfit: 1_334_000, adminStaff: 248_000, billingCollections: 168_000, itSystems: 80_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 95_000, rent: 0, utilities: 18_000, depreciation: 42_000, professionalFees: 14_000, officeSupplies: 6_000, staffTraining: 10_000, totalOpex: 761_000, ebitda: 573_000 },
  { month: "Apr", patientServices: 1_750_000, ancillaryRevenue: 1_020_000, otherIncome: 420_000, revenue: 3_190_000, providerComp: 765_000, nursingStaff: 348_000, medicalSupplies: 218_000, labDiagnostic: 108_000, pharmacy: 58_000, facilityCosts: 80_000, equipmentLease: 62_000, totalCogs: 1_639_000, grossProfit: 1_551_000, adminStaff: 255_000, billingCollections: 175_000, itSystems: 82_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 108_000, rent: 0, utilities: 19_000, depreciation: 42_000, professionalFees: 15_000, officeSupplies: 6_000, staffTraining: 10_000, totalOpex: 792_000, ebitda: 759_000 },
  { month: "May", patientServices: 2_080_000, ancillaryRevenue: 1_180_000, otherIncome: 520_000, revenue: 3_780_000, providerComp: 845_000, nursingStaff: 385_000, medicalSupplies: 255_000, labDiagnostic: 125_000, pharmacy: 68_000, facilityCosts: 88_000, equipmentLease: 68_000, totalCogs: 1_834_000, grossProfit: 1_946_000, adminStaff: 265_000, billingCollections: 185_000, itSystems: 85_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 125_000, rent: 0, utilities: 20_000, depreciation: 42_000, professionalFees: 18_000, officeSupplies: 7_000, staffTraining: 12_000, totalOpex: 839_000, ebitda: 1_107_000 },
  { month: "Jun", patientServices: 2_450_000, ancillaryRevenue: 1_350_000, otherIncome: 620_000, revenue: 4_420_000, providerComp: 935_000, nursingStaff: 425_000, medicalSupplies: 295_000, labDiagnostic: 142_000, pharmacy: 78_000, facilityCosts: 95_000, equipmentLease: 75_000, totalCogs: 2_045_000, grossProfit: 2_375_000, adminStaff: 278_000, billingCollections: 195_000, itSystems: 88_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 138_000, rent: 0, utilities: 22_000, depreciation: 42_000, professionalFees: 20_000, officeSupplies: 8_000, staffTraining: 14_000, totalOpex: 885_000, ebitda: 1_490_000 },
  { month: "Jul", patientServices: 2_680_000, ancillaryRevenue: 1_420_000, otherIncome: 680_000, revenue: 4_780_000, providerComp: 985_000, nursingStaff: 448_000, medicalSupplies: 315_000, labDiagnostic: 152_000, pharmacy: 85_000, facilityCosts: 98_000, equipmentLease: 78_000, totalCogs: 2_161_000, grossProfit: 2_619_000, adminStaff: 285_000, billingCollections: 202_000, itSystems: 90_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 145_000, rent: 0, utilities: 24_000, depreciation: 42_000, professionalFees: 22_000, officeSupplies: 8_000, staffTraining: 15_000, totalOpex: 913_000, ebitda: 1_706_000 },
  { month: "Aug", patientServices: 2_520_000, ancillaryRevenue: 1_380_000, otherIncome: 650_000, revenue: 4_550_000, providerComp: 958_000, nursingStaff: 435_000, medicalSupplies: 302_000, labDiagnostic: 148_000, pharmacy: 82_000, facilityCosts: 96_000, equipmentLease: 76_000, totalCogs: 2_097_000, grossProfit: 2_453_000, adminStaff: 282_000, billingCollections: 198_000, itSystems: 88_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 140_000, rent: 0, utilities: 23_000, depreciation: 42_000, professionalFees: 20_000, officeSupplies: 7_000, staffTraining: 12_000, totalOpex: 892_000, ebitda: 1_561_000 },
  { month: "Sep", patientServices: 1_980_000, ancillaryRevenue: 1_120_000, otherIncome: 480_000, revenue: 3_580_000, providerComp: 825_000, nursingStaff: 375_000, medicalSupplies: 245_000, labDiagnostic: 118_000, pharmacy: 65_000, facilityCosts: 85_000, equipmentLease: 66_000, totalCogs: 1_779_000, grossProfit: 1_801_000, adminStaff: 262_000, billingCollections: 182_000, itSystems: 85_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 118_000, rent: 0, utilities: 20_000, depreciation: 42_000, professionalFees: 16_000, officeSupplies: 6_000, staffTraining: 10_000, totalOpex: 821_000, ebitda: 980_000 },
  { month: "Oct", patientServices: 1_650_000, ancillaryRevenue: 940_000, otherIncome: 390_000, revenue: 2_980_000, providerComp: 735_000, nursingStaff: 335_000, medicalSupplies: 205_000, labDiagnostic: 102_000, pharmacy: 55_000, facilityCosts: 78_000, equipmentLease: 60_000, totalCogs: 1_570_000, grossProfit: 1_410_000, adminStaff: 252_000, billingCollections: 172_000, itSystems: 82_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 102_000, rent: 0, utilities: 19_000, depreciation: 42_000, professionalFees: 14_000, officeSupplies: 6_000, staffTraining: 8_000, totalOpex: 777_000, ebitda: 633_000 },
  { month: "Nov", patientServices: 1_420_000, ancillaryRevenue: 850_000, otherIncome: 350_000, revenue: 2_620_000, providerComp: 685_000, nursingStaff: 312_000, medicalSupplies: 188_000, labDiagnostic: 95_000, pharmacy: 50_000, facilityCosts: 74_000, equipmentLease: 56_000, totalCogs: 1_460_000, grossProfit: 1_160_000, adminStaff: 248_000, billingCollections: 168_000, itSystems: 80_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 92_000, rent: 0, utilities: 18_000, depreciation: 42_000, professionalFees: 12_000, officeSupplies: 5_000, staffTraining: 8_000, totalOpex: 753_000, ebitda: 407_000 },
  { month: "Dec", patientServices: 1_680_000, ancillaryRevenue: 920_000, otherIncome: 410_000, revenue: 3_010_000, providerComp: 745_000, nursingStaff: 340_000, medicalSupplies: 210_000, labDiagnostic: 105_000, pharmacy: 58_000, facilityCosts: 80_000, equipmentLease: 62_000, totalCogs: 1_600_000, grossProfit: 1_410_000, adminStaff: 255_000, billingCollections: 175_000, itSystems: 82_000, malpracticeInsurance: 52_000, generalInsurance: 28_000, marketing: 98_000, rent: 0, utilities: 20_000, depreciation: 42_000, professionalFees: 15_000, officeSupplies: 6_000, staffTraining: 10_000, totalOpex: 783_000, ebitda: 627_000 },
]

const hvacLocations: LocationData[] = [
  { name: "Downtown Service Hub", type: "Commercial", revenue: 9_850_000, ebitda: 1_675_000, margin: 17.0, headcount: 28 },
  { name: "Northside Branch", type: "Residential", revenue: 7_420_000, ebitda: 1_113_000, margin: 15.0, headcount: 22 },
  { name: "Westlake Territory", type: "Mixed", revenue: 6_180_000, ebitda: 803_000, margin: 13.0, headcount: 18 },
  { name: "Industrial Park Center", type: "Industrial", revenue: 8_900_000, ebitda: 1_513_000, margin: 17.0, headcount: 15 },
  { name: "Suburban East Office", type: "Residential", revenue: 5_200_000, ebitda: 416_000, margin: 8.0, headcount: 16 },
  { name: "Airport Corridor Unit", type: "Commercial", revenue: 4_800_000, ebitda: 336_000, margin: 7.0, headcount: 12 },
]

const hvacCompany: CompanyConfig = {
  id: "hvac",
  name: "ClearAir Mechanical Services",
  fiscalYear: "FY 2025",
  industry: "HVAC",
  monthlyData: hvacMonthly,
  locationData: hvacLocations,
  revenueLabels: [
    { key: "patientServices", label: "Service Contracts" },
    { key: "ancillaryRevenue", label: "Installations" },
    { key: "otherIncome", label: "Emergency Calls" },
  ],
  cogsLabels: [
    { key: "providerComp", label: "Technician Labor" },
    { key: "nursingStaff", label: "Parts & Equipment" },
    { key: "medicalSupplies", label: "Fleet & Vehicles" },
    { key: "labDiagnostic", label: "Subcontractors" },
    { key: "pharmacy", label: "Permits & Licensing" },
    { key: "facilityCosts", label: "Refrigerant & Materials" },
    { key: "equipmentLease", label: "Tool Replacement" },
  ],
  opexLabels: [
    { key: "adminStaff", label: "Dispatch & Admin" },
    { key: "billingCollections", label: "Sales" },
    { key: "itSystems", label: "IT & Scheduling Software" },
    { key: "malpracticeInsurance", label: "Liability Insurance" },
    { key: "generalInsurance", label: "Vehicle Insurance" },
    { key: "marketing", label: "Marketing" },
    { key: "utilities", label: "Office Utilities" },
    { key: "depreciation", label: "Depreciation" },
    { key: "professionalFees", label: "Professional Fees" },
    { key: "officeSupplies", label: "Office Supplies" },
    { key: "staffTraining", label: "Certifications & Training" },
  ],
}

// ─── Registry ───
export const COMPANIES: CompanyConfig[] = [
  healthcareCompany,
  manufacturingCompany,
  hvacCompany,
]

export const DEFAULT_COMPANY = healthcareCompany
