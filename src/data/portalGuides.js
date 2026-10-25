export const PORTAL_GUIDES = [
  {
    id: "nsp-otr",
    title: "NSP One-Time Registration (OTR) Complete Roadmap",
    subtitle: "Mandatory for all Central Government Scholarships from 2024 onwards",
    icon: "KeyRound",
    steps: [
      {
        step: 1,
        title: "Download Aadhaar FaceRD & NSP OTR App or use Web",
        desc: "Go to scholarships.gov.in/otr or install the official 'NSP OTR App' from Google Play Store along with 'Aadhaar FaceRD' app by UIDAI.",
        alert: "Ensure your mobile number is actively linked to your Aadhaar card to receive the UIDAI OTP."
      },
      {
        step: 2,
        title: "Biometric or Face Authentication",
        desc: "Open the app, enter your 12-digit Aadhaar number, give camera consent, and blink when the green circle appears for Face Auth verification.",
        alert: "If FaceRD fails, choose Aadhaar OTP mode sent to your registered mobile phone."
      },
      {
        step: 3,
        title: "Generate 14-digit OTR Reference Number",
        desc: "Upon successful demographic verification, your permanent 14-digit OTR ID and temporary password will be sent via SMS.",
        alert: "This OTR ID remains valid for your ENTIRE academic career (school to post-graduation). Do NOT create duplicate accounts."
      },
      {
        step: 4,
        title: "Login and Link your Institute (AISHE Code)",
        desc: "Login to NSP using your OTR ID. Search your university or college using State, District, and Institute AISHE / DISE code.",
        alert: "Double check your college name. If your college is not listed, request your college principal to register on AISHE immediately."
      }
    ]
  },
  {
    id: "npci-dbt",
    title: "Aadhaar NPCI Bank Seeding & DBT Activation",
    subtitle: "90% of scholarship fund failures happen due to unseeded bank accounts",
    icon: "CreditCard",
    steps: [
      {
        step: 1,
        title: "Understand the Difference: Linking vs NPCI Seeding",
        desc: "Simply having your Aadhaar card 'linked' to a bank account is NOT sufficient. Your account must be 'Seeded with NPCI (National Payments Corporation of India)' to receive Direct Benefit Transfer (DBT) funds from the Government treasury.",
        alert: "Only ONE bank account can be actively seeded with NPCI at any given time."
      },
      {
        step: 2,
        title: "Check Live Seeding Status on UIDAI Portal",
        desc: "Visit resident.uidai.gov.in/bank-mapper or login to the myAadhaar portal. Click on 'Bank Seeding Status' and enter your Aadhaar + OTP.",
        alert: "Status must show 'Active' along with your Bank Name. If it shows 'Inactive' or blank, take immediate action."
      },
      {
        step: 3,
        title: "Submit Aadhaar Mandate (DBT Form) to Bank Branch",
        desc: "Visit your bank branch with your passbook, Aadhaar copy, and submit the 'Application for Linking / Seeding Aadhaar Number and Receiving DBT Benefits into NPCI mapper'.",
        alert: "Ask the bank branch clerk specifically: 'Please map my account to NPCI mapper for DBT scholarship credit'."
      },
      {
        step: 4,
        title: "Re-verify after 48-72 Hours",
        desc: "Recheck the UIDAI portal after 3 business days to confirm the status is updated to Active.",
        alert: "Maintain an active balance and make at least one transaction every 3 months to avoid your account going dormant."
      }
    ]
  },
  {
    id: "rejection-traps",
    title: "Top 5 Scholarship Rejection Traps & How to Fix Them",
    subtitle: "Verified tips from State Welfare Officers and National Nodal Desks",
    icon: "AlertTriangle",
    steps: [
      {
        step: 1,
        title: "Trap #1: Name & DOB Mismatch",
        desc: "If your name on Aadhaar is 'Dharshan M' but on your 10th marksheet it is 'Mende Dharshan', the automated NSP PFMS bridge will reject your payment.",
        alert: "Correction: Update your Aadhaar card at the nearest Aadhaar Seva Kendra so the spelling and initials match your Class 10 certificate."
      },
      {
        step: 2,
        title: "Trap #2: Expired Income Certificate",
        desc: "Most state revenue departments issue income certificates with a validity of 1 year or 3 years. Submitting an expired certificate leads to immediate rejection during district scrutiny.",
        alert: "Correction: Obtain a fresh certificate for the current financial year from MeeSeva / CSC / Nadakacheri / Tahsildar."
      },
      {
        step: 3,
        title: "Trap #3: Choosing Renewal instead of Fresh (or vice versa)",
        desc: "Applying as 'Renewal' when entering a new course (e.g. after Class 12 starting B.Tech) is a critical error. Course change requires a 'Fresh' application.",
        alert: "Correction: Only apply for Renewal when you are progressing to the 2nd, 3rd, or 4th year of the SAME ongoing degree program."
      },
      {
        step: 4,
        title: "Trap #4: Missing College Nodal Officer Cutoff",
        desc: "Submitting your application online is only 50% of the job! Your college must electronically verify your application before the official state/central cutoff date.",
        alert: "Correction: Hand over your printed application and document xerox copies to your college scholarship officer at least 10 days before the closing date."
      },
      {
        step: 5,
        title: "Trap #5: Multiple Government Scholarship Claims",
        desc: "Rules strictly forbid receiving two central or state government maintenance scholarships simultaneously for the same academic year.",
        alert: "Correction: You CAN pair a Government scholarship with a Private/CSR scholarship (like Reliance or Kotak) provided the private trust allows it, but never two Govt schemes."
      }
    ]
  }
];

export const STATE_PORTALS_MAP = [
  { state: "Karnataka", portalName: "State Scholarship Portal (SSP)", url: "https://ssp.postmatric.karnataka.gov.in", dept: "Social Welfare & Backward Classes" },
  { state: "Maharashtra", portalName: "MahaDBT", url: "https://mahadbt.maharashtra.gov.in", dept: "Social Justice & Special Assistance" },
  { state: "Uttar Pradesh", portalName: "UP Scholarship Portal", url: "https://scholarship.up.gov.in", dept: "Social Welfare Dept UP" },
  { state: "West Bengal", portalName: "SVMCM & Oasis Portal", url: "https://svmcm.wbhed.gov.in", dept: "Higher Education Dept WB" },
  { state: "Bihar", portalName: "Post Matric Scholarship Portal (PMS)", url: "https://pmsonline.bih.nic.in", dept: "Education Dept Bihar" },
  { state: "Jharkhand", portalName: "e-Kalyan Jharkhand", url: "https://ekalyan.cgg.gov.in", dept: "Scheduled Tribe, SC, Minority & BC Welfare" },
  { state: "Gujarat", portalName: "Digital Gujarat Portal", url: "https://www.digitalgujarat.gov.in", dept: "Social Justice & Empowerment" },
  { state: "Odisha", portalName: "Odisha State Scholarship Portal", url: "https://scholarship.odisha.gov.in", dept: "Higher Education & ST/SC Development" },
  { state: "Andhra Pradesh", portalName: "Jnanabhumi Portal", url: "https://jnanabhumi.ap.gov.in", dept: "Social Welfare Dept AP" },
  { state: "Telangana", portalName: "Telangana ePASS", url: "https://telanganaepass.cgg.gov.in", dept: "Electronic Payment and Application System" },
  { state: "Rajasthan", portalName: "Uttar Matric / SSO Portal", url: "https://sso.rajasthan.gov.in", dept: "Social Justice and Empowerment Dept" },
  { state: "Madhya Pradesh", portalName: "MP Scholarship Portal 2.0", url: "http://scholarshipportal.mp.nic.in", dept: "Tribal Affairs & Scheduled Caste Welfare" }
];
