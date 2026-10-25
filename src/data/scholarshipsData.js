export const SCHOLARSHIPS_DATA = [
  // ==========================================
  // 1. CENTRAL GOVERNMENT (NSP SCHEMES)
  // ==========================================
  {
    id: "nsp-pm-usp-central-sector",
    name: "PM-USP Central Sector Scheme of Scholarship for College and University Students",
    provider: "Ministry of Education, Department of Higher Education (Govt of India)",
    badge: "Central Govt (NSP)",
    category: "Government Central",
    amount: "₹12,000 to ₹20,000 per annum",
    maxAmountNumeric: 20000,
    level: ["Undergraduate", "Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 450000,
    incomeCeilingText: "Less than ₹4.5 Lakh / year",
    minMarks: 80,
    deadline: "2026-11-30",
    status: "Open",
    daysLeft: 36,
    fullScope: "To provide financial assistance to meritorious students from low-income families to meet their day-to-day expenses while pursuing higher studies in colleges and universities. 82,000 fresh scholarships distributed annually across state boards in a 50:50 ratio between boys and girls.",
    benefits: [
      "₹12,000 per annum at Graduation level for first 3 years of College/University study",
      "₹20,000 per annum at Post-Graduation level (for 4th and 5th year)",
      "Direct Benefit Transfer (DBT) straight into the student's Aadhaar-seeded bank account",
      "Renewable every year up to post-graduate studies subject to 50% marks and 75% attendance"
    ],
    eligibilityCriteria: [
      "Above 80th percentile of successful candidates in the relevant stream from a recognized 10+2 State Board / CBSE / CISCE",
      "Pursuing regular (not correspondence or distance) degree course in recognized College/Institution",
      "Gross parental/family annual income not exceeding ₹4.5 Lakh per annum",
      "Student must not be receiving any other government scholarship or fee concession"
    ],
    requiredDocuments: [
      { name: "Class 12 Marksheet", description: "Official mark sheet showing 80th percentile cutoff clearance", mandatory: true },
      { name: "Family Income Certificate", description: "Issued by competent revenue authority (Tahsildar/SDM) for current FY", mandatory: true },
      { name: "Aadhaar Card", description: "Must be actively linked with student's mobile number and bank account", mandatory: true },
      { name: "College Bonafide / Enrollment Certificate", description: "Signed & stamped by Principal/Dean with AISHE code", mandatory: true },
      { name: "Fee Receipt of Current Year", description: "Valid admission fee receipt showing admission to 1st year degree course", mandatory: true },
      { name: "Bank Account Passbook", description: "Account must be in the student's name and seeded with NPCI / DBT", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register for NSP OTR (One Time Registration)", description: "Visit scholarships.gov.in and complete OTR using Aadhaar Face Auth or mobile OTP.", tip: "Keep your Aadhaar-linked phone handy for instant OTP." },
      { stepNumber: 2, title: "Complete Profile & Scheme Matching", description: "Enter 12th Board roll number, AISHE code of your admitted college, and family income details.", tip: "Make sure board roll number exactly matches your admit card." },
      { stepNumber: 3, title: "Upload Certificates & Review", description: "Upload scanned copies of Income Certificate, Bonafide, and Fee Receipt in PDF under 200KB.", tip: "Ensure documents are clear and self-attested." },
      { stepNumber: 4, title: "Final Submit & Download Acknowledgement", description: "Submit application and print the final acknowledgement slip.", tip: "Keep the Application Reference Number safely." },
      { stepNumber: 5, title: "Institute Nodal Officer (INO) Verification", description: "Submit hard copies of documents to your college scholarship cell for electronic verification.", tip: "Follow up with your college nodal officer before their cutoff date." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    helpline: "0120-6619540 | helpdesk@nsp.gov.in",
    faqs: [
      { q: "Can engineering (B.Tech) or medical (MBBS) students get this?", a: "Yes, for 5-year professional courses like B.Tech/MBBS, ₹12,000 is given for 1st-3rd year and ₹20,000 for 4th and 5th year." },
      { q: "What if my marks are in CGPA?", a: "Your state board will release the official percentile score cutoff list on NSP." }
    ],
    featured: true,
    tags: ["Central Govt", "NSP", "Degree", "Undergraduate", "Merit-cum-Means"]
  },
  {
    id: "post-matric-sc-st-obc",
    name: "Centrally Sponsored Post-Matric Scholarship for SC / ST / OBC / EBC Students",
    provider: "Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs",
    badge: "Central & State Co-sponsored",
    category: "Government Central",
    amount: "100% Non-refundable Tuition Fee + Maintenance up to ₹13,500/yr",
    maxAmountNumeric: 75000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate", "PhD"],
    applicableStates: "All India",
    casteEligibility: ["SC", "ST", "OBC", "EWS"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "Less than ₹2.5 Lakh / year",
    minMarks: 40,
    deadline: "2026-12-15",
    status: "Open",
    daysLeft: 51,
    fullScope: "Flagship social welfare scheme providing complete financial security to Scheduled Caste, Scheduled Tribe, and Other Backward Class students from Class 11 all the way to PhD. Covers full approved institutional non-refundable tuition fees, exam fees, book allowances, study tour charges, and monthly maintenance allowance.",
    benefits: [
      "100% reimbursement of compulsory non-refundable fees (tuition, lab, library, sports, exam fees)",
      "Hosteller Maintenance Allowance: up to ₹13,500 per annum depending on course group",
      "Day Scholar Maintenance Allowance: up to ₹7,000 per annum",
      "Additional disability allowance of up to ₹4,000/yr for differently-abled scholars"
    ],
    eligibilityCriteria: [
      "Student must belong to Scheduled Caste (SC), Scheduled Tribe (ST), or recognized OBC/EBC category",
      "Pursuing post-matriculation or post-secondary courses in a recognized school/college/university",
      "Annual family income from all sources must not exceed ₹2,50,000 (₹2.5 Lakh)",
      "Studying in regular mode; candidates studying parallel degree cannot claim double benefits"
    ],
    requiredDocuments: [
      { name: "Caste Certificate", description: "Permanent digital caste certificate with QR code issued by Revenue Dept", mandatory: true },
      { name: "Valid Income Certificate", description: "Recent certificate issued by Tahsildar / Revenue Inspector", mandatory: true },
      { name: "Previous Year Passed Marksheet", description: "Class 10th/12th/Semester marksheet without active backlogs", mandatory: true },
      { name: "College Fee Structure & Admission Receipt", description: "Breakdown of non-refundable tuition and institutional fees", mandatory: true },
      { name: "Hostel Warden Certificate (if Hosteller)", description: "Signed declaration by government/college hostel warden", mandatory: false },
      { name: "Aadhaar Card (NPCI Seeded)", description: "Aadhaar seeded bank account passbook copy", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Check State Portal vs NSP", description: "Certain states (like Karnataka via SSP, Maharashtra via MahaDBT, UP via Scholarship portal) manage this directly, while other states use NSP.", tip: "Check our State Portal Map below to find your designated portal." },
      { stepNumber: 2, title: "Aadhaar KYC & Demographic Match", description: "Ensure your name in Aadhaar, 10th Marksheet, and Caste certificate match letter-for-letter.", tip: "Name mismatch is the #1 cause of rejection." },
      { stepNumber: 3, title: "Fill Institutional & Hostel Details", description: "Select your college and current year course code accurately.", tip: "Cross-verify whether you are classified as Hosteller or Day Scholar." },
      { stepNumber: 4, title: "Submit Application & Handover to Institute", description: "Submit online and provide signed hardcopy along with enclosures to college clerk.", tip: "Get an acknowledgment receipt from college desk." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP / Respective State e-Pass Portals",
    helpline: "1800-11-2001 | helpdesk-postmatric@gov.in",
    faqs: [
      { q: "Does the fee reimbursement go to the college or the student?", a: "In most states, the tuition fee component goes directly to the college via DBT/PFMS, while the maintenance allowance is transferred to the student's personal Aadhaar-linked bank account." }
    ],
    featured: true,
    tags: ["SC", "ST", "OBC", "Tuition Reimbursement", "Maintenance Allowance", "NSP"]
  },
  {
    id: "national-means-cum-merit-nmms",
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    provider: "Department of School Education & Literacy, Govt of India",
    badge: "Central Govt (School)",
    category: "School Education",
    amount: "₹12,000 per annum (₹1,000 per month)",
    maxAmountNumeric: 12000,
    level: ["School"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 350000,
    incomeCeilingText: "Less than ₹3.5 Lakh / year",
    minMarks: 55,
    deadline: "2026-11-15",
    status: "Closing Soon",
    daysLeft: 21,
    fullScope: "To award scholarships to meritorious students of economically weaker sections to arrest their drop-out at class VIII and encourage them to continue study at secondary stage (Class 9 to Class 12). 1,00,000 scholarships are sanctioned every year across all states.",
    benefits: [
      "₹12,000 per year (₹1,000 per month) for 4 years from Class 9 to Class 12",
      "Total ₹48,000 financial support to complete schooling",
      "Direct Benefit Transfer into student's personal bank account via SBI / Public Sector banks"
    ],
    eligibilityCriteria: [
      "Studying as regular student in Class 8 in a Government, Local Body or Government-aided school",
      "Minimum 55% marks or equivalent grade in Class 7 annual exam (50% for SC/ST)",
      "Parental income from all sources not exceeding ₹3,50,000 per annum",
      "Must qualify the State-level NMMS Examination consisting of Mental Ability Test (MAT) & Scholastic Aptitude Test (SAT)"
    ],
    requiredDocuments: [
      { name: "Class 7 Pass Marksheet", description: "Showing minimum 55% marks", mandatory: true },
      { name: "Parental Income Certificate", description: "Issued by Tehsildar", mandatory: true },
      { name: "NMMS Selection Merit Card", description: "Proof of passing the exam", mandatory: true },
      { name: "Aadhaar Linked Bank Passbook", description: "Student's bank account", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Appear for State NMMS Exam in Class 8", description: "Register through school headmaster.", tip: "Practice MAT & SAT papers." },
      { stepNumber: 2, title: "Register on NSP in Class 9", description: "Submit your NMMS credentials on scholarships.gov.in.", tip: "Select National Means-cum-Merit scheme." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP / SCERT State Portals",
    helpline: "011-23381662 | nmms-mhrd@gov.in",
    faqs: [
      { q: "Can private school students apply?", a: "No, students of private un-aided schools or central residential schools (like JNV/KVS) are not eligible." }
    ],
    featured: false,
    tags: ["School", "Class 9 to 12", "NMMSS", "Merit-cum-Means"]
  },
  {
    id: "pre-matric-sc-scheme",
    name: "Centrally Sponsored Pre-Matric Scholarship for SC & Vulnerable Groups",
    provider: "Ministry of Social Justice & Empowerment, Govt of India",
    badge: "Central Govt (School)",
    category: "School Education",
    amount: "₹3,500 (Day Scholar) to ₹7,000/yr (Hosteller) + Ad-hoc Grant",
    maxAmountNumeric: 7000,
    level: ["School"],
    applicableStates: "All India",
    casteEligibility: ["SC"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "Less than ₹2.5 Lakh / year",
    minMarks: 40,
    deadline: "2026-11-25",
    status: "Open",
    daysLeft: 31,
    fullScope: "To support parents of SC children for education of their wards studying in classes 9 and 10 so that the incidence of drop-out, especially in the transition from elementary to secondary stage, is minimized.",
    benefits: [
      "Day Scholars: ₹3,500 per annum + ₹750 ad-hoc book grant",
      "Hostellers: ₹7,000 per annum + ₹1,000 ad-hoc grant",
      "Additional disability allowance of ₹240/month for students with disabilities"
    ],
    eligibilityCriteria: [
      "Student must belong to Scheduled Caste (SC)",
      "Studying in Class 9 or Class 10 in a Government or recognized private school",
      "Parental annual income from all sources not exceeding ₹2,50,000"
    ],
    requiredDocuments: [
      { name: "Caste Certificate", description: "SC certificate with digital verification code", mandatory: true },
      { name: "Income Certificate", description: "Current financial year income certificate", mandatory: true },
      { name: "Class 8 Pass Marksheet", description: "Showing admission to Class 9", mandatory: true },
      { name: "Bank Passbook with Aadhaar Seeding", description: "In student's own name", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on NSP or State e-Pass Portal", description: "Complete OTR and select Pre-Matric SC Scheme.", tip: "Submit school DISE code." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP / State Social Welfare",
    helpline: "0120-6619540",
    faqs: [{ q: "Is this for Class 1 to 8?", a: "Under latest norms, Pre-Matric is provided for Class 9 and 10." }],
    featured: false,
    tags: ["School", "SC", "Pre-Matric", "Class 9-10"]
  },
  {
    id: "begum-hazrat-mahal-minority-girls",
    name: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    provider: "Maulana Azad Education Foundation, Ministry of Minority Affairs",
    badge: "Minority Affairs (Central)",
    category: "Minority",
    amount: "₹10,000 to ₹12,000 per annum",
    maxAmountNumeric: 12000,
    level: ["School", "10+2"],
    applicableStates: "All India",
    casteEligibility: ["Minority"],
    gender: "Female",
    incomeCeiling: 200000,
    incomeCeilingText: "Less than ₹2.0 Lakh / year",
    minMarks: 50,
    deadline: "2026-11-30",
    status: "Open",
    daysLeft: 36,
    fullScope: "Specifically crafted to assist meritorious girl students belonging to six notified minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis) studying in Class 9, 10, 11, and 12.",
    benefits: [
      "Class 9 & 10: ₹10,000 per annum in two installments",
      "Class 11 & 12: ₹12,000 per annum in two installments",
      "Direct DBT transfer to girl student's Aadhaar-linked bank account"
    ],
    eligibilityCriteria: [
      "Only for girl students belonging to notified minority communities",
      "Studying in Class 9 to Class 12 in recognized schools/institutions",
      "Secured minimum 50% marks in previous annual exam",
      "Annual family income not exceeding ₹2,00,000"
    ],
    requiredDocuments: [
      { name: "School Verification Form", description: "Signed & stamped by school Principal", mandatory: true },
      { name: "Self-declaration of Minority Community", description: "Notarized or parent signed declaration", mandatory: true },
      { name: "Income Certificate", description: "Tehsildar issued certificate", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on NSP", description: "Apply online at scholarships.gov.in under Ministry of Minority Affairs.", tip: "Keep minority declaration ready." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    helpline: "011-23583788 | scholarship-maef@nic.in",
    faqs: [{ q: "Can two sisters apply?", a: "Yes, up to two girls from the same family can avail this." }],
    featured: false,
    tags: ["Minority", "Girls Only", "School", "Class 9-12"]
  },

  // ==========================================
  // 2. AICTE TECHNICAL SCHEMES
  // ==========================================
  {
    id: "aicte-pragati-girls",
    name: "AICTE Pragati Scholarship Scheme for Girl Students (Degree & Diploma)",
    provider: "All India Council for Technical Education (AICTE)",
    badge: "AICTE Technical",
    category: "Girls Only",
    amount: "₹50,000 per annum + Laptop / Study Grant",
    maxAmountNumeric: 50000,
    level: ["Undergraduate", "Diploma/ITI"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "Female",
    incomeCeiling: 800000,
    incomeCeilingText: "Less than ₹8.0 Lakh / year",
    minMarks: 50,
    deadline: "2026-11-15",
    status: "Closing Soon",
    daysLeft: 21,
    fullScope: "A landmark initiative aimed at empowering female students to pursue technical education. AICTE awards 10,000 scholarships each year (5,000 for Degree and 5,000 for Diploma) covering college tuition fees, purchase of laptop/computer, software, books, and competitive exam fees.",
    benefits: [
      "₹50,000 lump sum per annum for every year of study (up to 4 years for Degree, 3 years for Diploma)",
      "Can be utilized towards tuition fee payment, laptop purchase, books, or hostel expenses",
      "No separate tuition fee receipt is required to claim the lump sum ₹50,000",
      "Reserved specifically for girl students with maximum 2 girls per family"
    ],
    eligibilityCriteria: [
      "Female student admitted to 1st year of Degree/Diploma course or 2nd year through lateral entry in an AICTE approved institution",
      "Maximum two girls per family eligible",
      "Total family annual income must not exceed ₹8 Lakh from all sources",
      "Selection based purely on merit in the qualifying examination"
    ],
    requiredDocuments: [
      { name: "10th & 12th/Diploma Marksheet", description: "Proof of qualifying exam merit", mandatory: true },
      { name: "Family Income Certificate", description: "Issued by Tehsildar or authorized executive magistrate", mandatory: true },
      { name: "AICTE Institute Admission Letter", description: "Proving seat allotment through centralized counselling", mandatory: true },
      { name: "Family Declaration (Max 2 Girls)", description: "Affidavit / declaration stating not more than 2 daughters", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on National Scholarship Portal", description: "Use your OTR ID on scholarships.gov.in under AICTE schemes.", tip: "Select 'AICTE Pragati Scheme for Girls'." },
      { stepNumber: 2, title: "Upload Family Declaration & Income Certificate", description: "Attach the signed family declaration form.", tip: "Income certificate must be valid for the current FY." }
    ],
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    portalName: "AICTE Official Portal / NSP",
    helpline: "011-29581000 | pragati@aicte-india.org",
    faqs: [
      { q: "Is this scholarship renewed every year?", a: "Yes, it is renewed up to completion of the course provided the candidate passes all semester exams without backlogs." }
    ],
    featured: true,
    tags: ["Girls Only", "AICTE", "Engineering", "Technical", "Diploma", "Degree"]
  },
  {
    id: "aicte-saksham-differently-abled",
    name: "AICTE Saksham Scholarship Scheme for Specially-Abled Students",
    provider: "All India Council for Technical Education (AICTE)",
    badge: "AICTE Specially-Abled",
    category: "Differently Abled",
    amount: "₹50,000 per annum + Assistive Tech Support",
    maxAmountNumeric: 50000,
    level: ["Undergraduate", "Diploma/ITI"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 800000,
    incomeCeilingText: "Less than ₹8.0 Lakh / year",
    minMarks: 40,
    deadline: "2026-11-25",
    status: "Open",
    daysLeft: 31,
    fullScope: "Dedicated to encouraging and supporting differently-abled students to achieve technical education. AICTE offers all eligible specially-abled students with disability not less than 40% a direct financial assistance of ₹50,000 every year of their degree or diploma.",
    benefits: [
      "₹50,000 per annum for every year of technical degree/diploma program",
      "Can be used for purchase of screen-readers, braille devices, wheelchairs, hearing aids, laptops, and college fees",
      "All eligible applicants meeting minimum criteria are sanctioned (no cap on numbers)"
    ],
    eligibilityCriteria: [
      "Specially-abled student having disability of not less than 40%",
      "Admitted to 1st year of Degree/Diploma course in an AICTE approved institution (or 2nd year through lateral entry)",
      "Family income from all sources should not exceed ₹8 Lakh per annum"
    ],
    requiredDocuments: [
      { name: "Unique Disability ID (UDID) / Disability Certificate", description: "Issued by competent medical board showing >= 40% disability", mandatory: true },
      { name: "AICTE Admission Proof", description: "Allotment letter through centralized admission process", mandatory: true },
      { name: "Income Certificate", description: "Issued by Revenue Officer not below Tehsildar rank", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Create OTR on NSP", description: "Select AICTE Saksham Scheme.", tip: "Ensure your UDID card is verified." }
    ],
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Saksham",
    portalName: "NSP / AICTE Portal",
    helpline: "011-29581000 | saksham@aicte-india.org",
    faqs: [{ q: "Is there a merit cutoff?", a: "No, all eligible applicants with valid admission and >=40% disability are awarded." }],
    featured: false,
    tags: ["PwD", "Differently Abled", "AICTE", "Engineering", "Diploma"]
  },
  {
    id: "aicte-swanath-scheme",
    name: "AICTE Swanath Scholarship Scheme (Orphans, Wards of Martyrs & COVID-Affected)",
    provider: "All India Council for Technical Education (AICTE)",
    badge: "AICTE Swanath",
    category: "Government Central",
    amount: "₹50,000 per annum",
    maxAmountNumeric: 50000,
    level: ["Undergraduate", "Diploma/ITI"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 800000,
    incomeCeilingText: "Less than ₹8.0 Lakh / year (No income limit for Orphans)",
    minMarks: 40,
    deadline: "2026-11-30",
    status: "Open",
    daysLeft: 36,
    fullScope: "To provide financial support to orphaned children, children of parents who died due to COVID-19, and wards of Armed Forces and Central Paramilitary Forces personnel martyred in action.",
    benefits: [
      "₹50,000 per annum lump sum for all years of Degree (4 years) or Diploma (3 years)",
      "Zero competition cutoff: 2,000 scholarships awarded annually on direct verification",
      "Direct Benefit Transfer to student's verified bank account"
    ],
    eligibilityCriteria: [
      "Student must be an Orphan, OR child of both parents deceased due to COVID-19, OR ward of Armed Forces/Police Martyrs",
      "Admitted to regular Degree/Diploma course in an AICTE recognized institution",
      "Family income not exceeding ₹8 Lakh per annum (waived for total orphans)"
    ],
    requiredDocuments: [
      { name: "Death Certificate of Parents / Orphan Certificate", description: "Issued by Tehsildar or SDM", mandatory: true },
      { name: "Armed Forces Martyr Certificate (if applicable)", description: "Issued by competent defense authority", mandatory: false },
      { name: "College Admission Letter", description: "Proving AICTE enrollment", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on NSP Portal", description: "Choose AICTE Swanath Scheme and upload verification certificates.", tip: "Submit hard copy to college INO." }
    ],
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Swanath",
    portalName: "NSP / AICTE Portal",
    helpline: "011-29581000",
    faqs: [{ q: "Can diploma students apply?", a: "Yes, both Degree and Diploma students are eligible." }],
    featured: false,
    tags: ["Orphans", "Martyrs Wards", "COVID Support", "AICTE", "Engineering"]
  },

  // ==========================================
  // 3. DEFENSE & POLICE WARDS
  // ==========================================
  {
    id: "pmss-warb-capfs-assam-rifles",
    name: "Prime Minister's Scholarship Scheme (PMSS) for CAPFs & Assam Rifles",
    provider: "Welfare & Rehabilitation Board (WARB), Ministry of Home Affairs",
    badge: "MHA Defense Welfare",
    category: "Government Central",
    amount: "₹3,000/month (Girls) & ₹2,500/month (Boys)",
    maxAmountNumeric: 36000,
    level: ["Undergraduate", "Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No income bar (Order of Merit & Martyr Category Priority)",
    minMarks: 60,
    deadline: "2026-12-10",
    status: "Open",
    daysLeft: 46,
    fullScope: "To encourage higher technical and professional education for dependent wards and widows of Central Armed Police Forces (BSF, CRPF, CISF, ITBP, SSB) & Assam Rifles personnel martyred or disabled in the line of duty.",
    benefits: [
      "Girls: ₹36,000 per annum (₹3,000 per month)",
      "Boys: ₹30,000 per annum (₹2,500 per month)",
      "Paid for the entire course duration (up to 5 years for MBBS/B.Tech)",
      "Direct credit through PFMS into student's personal bank account"
    ],
    eligibilityCriteria: [
      "Dependent ward or widow of serving/retired/martyred CAPF & Assam Rifles personnel",
      "Pursuing first professional degree (B.Tech, MBBS, BDS, B.Pharm, B.Sc Nursing, BBA, BCA, MCA)",
      "Minimum 60% marks in Class 12 / Diploma / Graduation for entry"
    ],
    requiredDocuments: [
      { name: "Serving / Discharge Certificate of Parent", description: "Issued by Head of Office / Battalion Commandant", mandatory: true },
      { name: "PPO Copy / Gallantry Award Certificate (if applicable)", description: "Priority category proof", mandatory: false },
      { name: "Class 12 / Degree Marksheet", description: "Minimum 60% marks", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on NSP under WARB schemes", description: "Select Prime Minister Scholarship Scheme for Central Armed Police Forces.", tip: "Enter parent's Force PPO/Force Number." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal / WARB",
    helpline: "011-23063111 | warb-mha@nic.in",
    faqs: [{ q: "Are distance learning degrees eligible?", a: "No, only regular recognized full-time professional degrees are eligible." }],
    featured: true,
    tags: ["Defense", "Police", "CRPF", "BSF", "ITBP", "CISF", "Martyrs Wards"]
  },

  // ==========================================
  // 4. PRESTIGIOUS CSR & PRIVATE FOUNDATIONS
  // ==========================================
  {
    id: "reliance-foundation-ug-pg",
    name: "Reliance Foundation Undergraduate & Postgraduate Scholarships",
    provider: "Reliance Foundation (CSR Initiative)",
    badge: "CSR & Private Trust",
    category: "Corporate & CSR",
    amount: "Up to ₹2,00,000 (UG) / ₹6,00,000 (PG)",
    maxAmountNumeric: 200000,
    level: ["Undergraduate", "Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 1500000,
    incomeCeilingText: "Preference to income < ₹2.5L; Max ₹15L",
    minMarks: 60,
    deadline: "2026-10-31",
    status: "Closing Soon",
    daysLeft: 6,
    fullScope: "India's largest private scholarship programme supporting 5,000 undergraduate and 100 postgraduate students annually across all streams of study. Beyond direct grant money, scholars gain access to leadership workshops, mentorship by industry pioneers, and an exclusive alumni community.",
    benefits: [
      "Undergraduate: Up to ₹2 Lakh over the duration of the degree program",
      "Postgraduate: Up to ₹6 Lakh over the duration of the degree in select fields",
      "Alumni mentorship network, professional development sessions, and global expert webinars",
      "Direct fund disbursement without any lock-in or employment bond"
    ],
    eligibilityCriteria: [
      "First-year full-time undergraduate students in ANY regular degree stream from a recognized Indian institute",
      "Passed Class 12 with minimum 60% aggregate marks",
      "Household income between ₹2.5 Lakh to ₹15 Lakh (preference given to lower income bands < ₹2.5L)",
      "Mandatory online aptitude test conducted by Reliance Foundation"
    ],
    requiredDocuments: [
      { name: "Class 10 & 12 Board Marksheets", description: "Official marksheets showing subjects and scores", mandatory: true },
      { name: "Current College Identity Card / Admission Letter", description: "Proof of enrollment in 1st year degree", mandatory: true },
      { name: "Family Income Proof (ITR / Salary Slip / Income Certificate)", description: "Issued by Govt authority or Form 16 / ITR of parents", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Online Application Registration", description: "Apply directly at scholarships.reliancefoundation.org with basic academic and family details.", tip: "Double-check your email ID." },
      { stepNumber: 2, title: "Online Aptitude Test (60 mins)", description: "Take the mandatory proctored online test covering General Mental Ability and Verbal reasoning.", tip: "Practice logical puzzles in advance." }
    ],
    officialPortalUrl: "https://www.scholarships.reliancefoundation.org",
    portalName: "Reliance Foundation Scholarships Portal",
    helpline: "022-79672000 | rf.scholarships@reliancefoundation.org",
    faqs: [{ q: "Is this limited to STEM degrees?", a: "For Undergraduates, ALL degree streams (BA, B.Com, B.Sc, BBA, B.Tech, etc.) are eligible." }],
    featured: true,
    tags: ["Reliance", "Private", "Undergraduate", "All Streams", "Mentorship"]
  },
  {
    id: "kotak-kanya-scholarship",
    name: "Kotak Kanya Scholarship for Meritorious Girls in Professional Degrees",
    provider: "Kotak Education Foundation & Kotak Mahindra Group (CSR)",
    badge: "CSR - Kotak Foundation",
    category: "Girls Only",
    amount: "₹1,50,000 per annum",
    maxAmountNumeric: 150000,
    level: ["Undergraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "Female",
    incomeCeiling: 600000,
    incomeCeilingText: "Less than ₹6.0 Lakh / year",
    minMarks: 75,
    deadline: "2026-11-20",
    status: "Open",
    daysLeft: 26,
    fullScope: "Financial assistance for meritorious girl students from disadvantaged backgrounds to pursue professional graduation degree courses (Engineering, MBBS, Architecture, Design, Integrated LLB). Covers tuition, hostel, academic materials, and laptops.",
    benefits: [
      "₹1,50,000 per year until the completion of professional graduation course (up to 4 to 5 years)",
      "Total grant up to ₹6 Lakh to ₹7.5 Lakh per girl scholar",
      "Mentorship, life skills training, English communication enhancement, and career guidance"
    ],
    eligibilityCriteria: [
      "Meritorious girl students who have secured admission to 1st year of professional graduation courses",
      "Scored 75% or above marks in Class 12 Board examinations",
      "Annual family income must not exceed ₹6,00,000 from all sources"
    ],
    requiredDocuments: [
      { name: "Class 12 Marksheet", description: "Showing minimum 75% marks", mandatory: true },
      { name: "Entrance Exam Scorecard & Allotment Letter", description: "JEE, NEET, CLAT, CET allotment letter", mandatory: true },
      { name: "College Fee Structure", description: "Official college quotation or receipt of 1st year fees", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Kotak CSR Portal", description: "Fill application on the designated scholarship portal.", tip: "Provide active email." }
    ],
    officialPortalUrl: "https://kotakeducation.org/kotak-kanya-scholarship",
    portalName: "Kotak Education Foundation",
    helpline: "011-43092248 | kotakkanya@buddy4study.com",
    faqs: [{ q: "What courses are considered professional?", a: "B.Tech, B.E, MBBS, BDS, B.Arch, Integrated 5-year B.A. LL.B, B.Pharm, etc." }],
    featured: true,
    tags: ["Girls Only", "Professional Courses", "B.Tech", "MBBS", "Law", "Kotak"]
  },
  {
    id: "tata-trusts-medical-engineering",
    name: "Tata Trusts Medical and Healthcare Scholarship",
    provider: "Tata Trusts (Jamsetji Tata Trust & Allied Trusts)",
    badge: "Trust & Philanthropy",
    category: "Corporate & CSR",
    amount: "30% to 80% Tuition Fee Grant (Up to ₹1,00,000/yr)",
    maxAmountNumeric: 100000,
    level: ["Undergraduate", "Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 600000,
    incomeCeilingText: "Less than ₹6.0 Lakh / year",
    minMarks: 65,
    deadline: "2026-11-10",
    status: "Open",
    daysLeft: 16,
    fullScope: "Offered by the legendary Tata Trusts to relieve the heavy tuition burden of students pursuing MBBS, BDS, Nursing, Pharmacy, Physiotherapy, and allied healthcare professional degrees across India.",
    benefits: [
      "Direct tuition fee waiver ranging from 30% to 80% of approved college fees",
      "Award amount up to ₹1,00,000 per academic year directly paid to college or student",
      "Special consideration for students from rural districts and low-income families"
    ],
    eligibilityCriteria: [
      "Undergraduate and Postgraduate students pursuing recognized healthcare/medical degrees",
      "Minimum 65% marks in qualifying academic examination",
      "Total family annual income strictly below ₹6 Lakh"
    ],
    requiredDocuments: [
      { name: "Academic Marksheets of Previous Years", description: "Attested marksheets of all semesters", mandatory: true },
      { name: "Original College Fee Receipt", description: "Paid receipt for the current academic session", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Tata Trusts Grants Portal", description: "Visit igp.tatatrusts.org.", tip: "Keep NEET scorecard ready." }
    ],
    officialPortalUrl: "https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants",
    portalName: "Tata Trusts Individual Grants",
    helpline: "022-66658282 | igp@tatatrusts.org",
    faqs: [{ q: "Are dental and ayurvedic students eligible?", a: "Yes, BDS, BAMS, BHMS, and Physiotherapy students are eligible." }],
    featured: false,
    tags: ["Tata Trusts", "Medical", "MBBS", "Nursing", "Healthcare"]
  },
  {
    id: "siemens-scholarship-program",
    name: "Siemens Scholarship Program for Engineering Students",
    provider: "Siemens India Corporate Social Responsibility",
    badge: "German Engineering CSR",
    category: "Corporate & CSR",
    amount: "100% Tuition Fees + Laptop + Books + Paid Internship",
    maxAmountNumeric: 120000,
    level: ["Undergraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 200000,
    incomeCeilingText: "Less than ₹2.0 Lakh / year (Exclusively for underprivileged)",
    minMarks: 60,
    deadline: "2026-11-20",
    status: "Open",
    daysLeft: 26,
    fullScope: "A prestigious 4-year holistic development program for 1st year engineering students from government engineering colleges across India. Covers full college tuition, allowances, cutting-edge soft-skills training, and potential placement in Siemens.",
    benefits: [
      "100% tuition and institutional fee reimbursement for 4 years of B.Tech / B.E.",
      "Annual allowance for purchase of books, stationery, and hostel expenses",
      "Free brand-new laptop for engineering projects and coding",
      "Internship opportunities at Siemens factories and R&D centers across India"
    ],
    eligibilityCriteria: [
      "1st year students enrolled in Government Engineering Colleges in Mechanical, Electrical, Electronics, Instrumentation, IT, or Computer Science",
      "Passed Class 10 with >= 60% and Class 12 with >= 50% aggregate (with 60% in PCM)",
      "Annual family income strictly below ₹2,00,000",
      "Age not more than 20 years at the time of admission"
    ],
    requiredDocuments: [
      { name: "Government College Admission Letter", description: "Proving admission in Govt Engineering College", mandatory: true },
      { name: "Parent Income Certificate", description: "Income under ₹2 Lakh per annum", mandatory: true },
      { name: "Class 10 & 12 Marksheets", description: "PCM marks verification", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Siemens CSR Portal", description: "Visit siemens.co.in/scholarship and fill basic engineering details.", tip: "Only Government college students qualify." }
    ],
    officialPortalUrl: "https://www.siemens.co.in/en/home/company/sustainability/corporate-citizenship/siemens-scholarship-program.html",
    portalName: "Siemens India CSR Portal",
    helpline: "022-39677000 | scholarship.in@siemens.com",
    faqs: [{ q: "Are private college students eligible?", a: "No, this program is exclusively designed for students in Government Engineering Colleges." }],
    featured: true,
    tags: ["Engineering", "Siemens", "Full Fee Waiver", "Laptop Included", "B.Tech"]
  },
  {
    id: "hdfc-badhte-kadam",
    name: "HDFC Bank Parivartan's Badhte Kadam Scholarship",
    provider: "HDFC Bank (CSR Parivartan)",
    badge: "CSR - HDFC Bank",
    category: "Corporate & CSR",
    amount: "₹18,000 to ₹1,00,000 per annum",
    maxAmountNumeric: 100000,
    level: ["School", "10+2", "Undergraduate", "Postgraduate", "Diploma/ITI"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 600000,
    incomeCeilingText: "Less than ₹6.0 Lakh / year (Special priority to COVID/crisis affected)",
    minMarks: 60,
    deadline: "2026-11-05",
    status: "Closing Soon",
    daysLeft: 11,
    fullScope: "Supports students going through severe personal or financial crises (such as loss of breadwinning parent or critical illness). Enables students from Class 11 up to Post-graduation to continue education without dropping out.",
    benefits: [
      "School (Class 11 & 12): ₹18,000 per year",
      "General Undergraduate Degree: ₹30,000 per year",
      "Professional Degree (Engineering, Medical, Law): ₹1,00,000 per year"
    ],
    eligibilityCriteria: [
      "Open for Indian students pursuing Class 11, 12, Diploma, ITI, Undergraduate, or Postgraduate degrees",
      "Must have scored at least 60% marks in previous qualifying exam",
      "Annual family income must not exceed ₹6,00,000 from all sources"
    ],
    requiredDocuments: [
      { name: "Previous Academic Marksheet", description: "Class 10/12/Semester marksheet", mandatory: true },
      { name: "Proof of Admission & Fee Receipt", description: "Current year proof", mandatory: true },
      { name: "Proof of Family Income / Crisis", description: "Income Certificate or death certificate of parent", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Apply Online via HDFC Parivartan Desk", description: "Fill application on the designated scholarship portal.", tip: "Mention any hardship clearly." }
    ],
    officialPortalUrl: "https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan",
    portalName: "HDFC Parivartan / Partner Portal",
    helpline: "011-43092248 | badhtekadam@buddy4study.com",
    faqs: [{ q: "Are general category students eligible?", a: "Yes, open to students of all castes based on merit and financial need." }],
    featured: false,
    tags: ["HDFC Bank", "Parivartan", "Crisis Support", "All Streams"]
  },
  {
    id: "lic-golden-jubilee-scholarship",
    name: "LIC Golden Jubilee Scholarship Scheme",
    provider: "Life Insurance Corporation of India (LIC Golden Jubilee Foundation)",
    badge: "PSU Foundation",
    category: "Corporate & CSR",
    amount: "₹20,000 to ₹40,000 per annum",
    maxAmountNumeric: 40000,
    level: ["10+2", "Diploma/ITI", "Undergraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "Less than ₹2.5 Lakh / year",
    minMarks: 60,
    deadline: "2026-11-22",
    status: "Open",
    daysLeft: 28,
    fullScope: "To provide scholarships to economically weaker students to enable them to pursue higher studies in medicine, engineering, graduation in any discipline, diploma courses, and vocational courses through ITI.",
    benefits: [
      "Medical Students: ₹40,000 per annum (in 3 installments)",
      "Engineering Students: ₹30,000 per annum",
      "General Graduation / Diploma: ₹20,000 per annum",
      "Special Girls Scholarship: ₹15,000 per annum for 10+2"
    ],
    eligibilityCriteria: [
      "Passed Class 10 or 12 examination with at least 60% marks",
      "Enrolled in 1st year of Medical, Engineering, Degree, Diploma, or ITI course",
      "Annual family income not exceeding ₹2,50,000 per annum"
    ],
    requiredDocuments: [
      { name: "Class 10 / 12 Marksheet", description: "Minimum 60% marks", mandatory: true },
      { name: "Income Certificate of Parents", description: "Issued by revenue department", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Online Application on LIC India Portal", description: "Navigate to licindia.in and select Golden Jubilee Scholarship.", tip: "Choose nearest LIC Division." }
    ],
    officialPortalUrl: "https://licindia.in/web/guest/golden-jubilee-scholarship-scheme",
    portalName: "LIC Official Portal",
    helpline: "022-68276827 | co_gjf@licindia.com",
    faqs: [{ q: "Can ITI students apply?", a: "Yes, students pursuing 2-year ITI courses after Class 10 are eligible." }],
    featured: false,
    tags: ["LIC", "PSU", "Medical", "Engineering", "Diploma", "ITI"]
  },
  {
    id: "vidyadhan-scholarship-sdf",
    name: "Vidyadhan Scholarship Program (Sarojini Damodaran Foundation)",
    provider: "Sarojini Damodaran Foundation (Infosys Co-founder Initiative)",
    badge: "Foundation Grant",
    category: "Corporate & CSR",
    amount: "₹10,000 to ₹60,000 per annum (10+2 through Degree)",
    maxAmountNumeric: 60000,
    level: ["10+2", "Undergraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 200000,
    incomeCeilingText: "Less than ₹2.0 Lakh / year",
    minMarks: 90,
    deadline: "2026-11-28",
    status: "Open",
    daysLeft: 34,
    fullScope: "Sponsored by Shibulal (Co-founder Infosys) & Kumari Shibulal. Supports students from underprivileged families who scored 90%+ in Class 10. Once selected, scholars are sponsored for 2 years of 10+2 (₹10,000/yr) and then continuously through their entire degree (up to ₹60,000/yr).",
    benefits: [
      "₹10,000 per year for Class 11 and Class 12",
      "₹15,000 to ₹60,000 per year for Undergraduate degree (Medical, Engg, Degree)",
      "Mentorship and leadership development programs conducted by industry mentors"
    ],
    eligibilityCriteria: [
      "Passed Class 10 (SSLC/CBSE/ICSE) with at least 90% marks (75% for PwD)",
      "Annual family income strictly less than ₹2 Lakh per annum",
      "Selection involves online test and in-person/video interview"
    ],
    requiredDocuments: [
      { name: "10th Marksheet", description: "Showing 90%+ marks", mandatory: true },
      { name: "Income Certificate", description: "From Tahsildar / Revenue Authority", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on vidyadhan.org", description: "Submit application with 10th score and income proof.", tip: "State selection opens in phased windows." }
    ],
    officialPortalUrl: "https://www.vidyadhan.org",
    portalName: "Vidyadhan Foundation Portal",
    helpline: "080-26610055 | vidyadhan.helpdesk@sdfoundationindia.com",
    faqs: [{ q: "Does this continue for engineering or MBBS?", a: "Yes, selected students get continued degree sponsorship." }],
    featured: false,
    tags: ["Vidyadhan", "Infosys", "10+2", "Degree", "Undergraduate"]
  },

  // ==========================================
  // 5. STATE GOVERNMENT FLAGSHIP SCHEMES
  // ==========================================
  {
    id: "karnataka-ssp-post-matric",
    name: "Karnataka State Scholarship Portal (SSP) Post-Matric Scheme & Vidyasiri",
    provider: "Social Welfare / Backward Classes Welfare Dept, Govt of Karnataka",
    badge: "State Govt (Karnataka)",
    category: "State Government",
    amount: "100% Fee Reimbursement + Vidyasiri ₹1,500/month",
    maxAmountNumeric: 60000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate"],
    applicableStates: "Karnataka",
    casteEligibility: ["SC", "ST", "OBC", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "SC/ST: < ₹2.5L; OBC/Minority: < ₹1.0L to ₹2.5L",
    minMarks: 40,
    deadline: "2026-11-28",
    status: "Open",
    daysLeft: 34,
    fullScope: "Karnataka's unified portal providing fee reimbursement, Vidyasiri food and accommodation scheme, and maintenance allowance to all eligible students residing in Karnataka and pursuing PU, Diploma, Degree, Engineering, or PG courses.",
    benefits: [
      "Complete tuition fee waiver directly disbursed to colleges under state regulatory fees",
      "Vidyasiri monthly stipend of ₹1,500/month for food and accommodation for non-hostellers",
      "Automated e-Attestation system eliminates physical queueing at government offices"
    ],
    eligibilityCriteria: [
      "Domicile of Karnataka State with valid RD certificate number",
      "Belonging to SC, ST, OBC (Category 1, 2A, 2B, 3A, 3B), or Minority communities",
      "Annual income within limits (SC/ST: up to ₹2.5L; OBC Cat-1: ₹2.5L; 2A/2B/3A/3B: ₹1L)"
    ],
    requiredDocuments: [
      { name: "Caste & Income RD Number (15-digit)", description: "Obtained from Nadakacheri portal", mandatory: true },
      { name: "Student Aadhaar & Ration Card Number", description: "Food & Civil Supplies verified card", mandatory: true },
      { name: "Fee Receipt with E-Attestation Number", description: "Uploaded to e-Attestation portal", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Create SSP Student Account", description: "Register on ssp.postmatric.karnataka.gov.in using Aadhaar.", tip: "Ensure mobile receives OTP." },
      { stepNumber: 2, title: "Fetch Caste & Income using RD Number", description: "Enter 15-digit RD number for auto-fetch.", tip: "Name on RD must match Aadhaar." }
    ],
    officialPortalUrl: "https://ssp.postmatric.karnataka.gov.in",
    portalName: "Karnataka SSP Portal",
    helpline: "080-35254757 | ssp.helpdesk@karnataka.gov.in",
    faqs: [{ q: "What is e-Attestation in Karnataka SSP?", a: "Online system where designated taluk officers verify your fee receipt and bonafide before final submission." }],
    featured: true,
    tags: ["Karnataka", "SSP", "Vidyasiri", "Fee Reimbursement", "State Portal"]
  },
  {
    id: "karnataka-cm-raita-vidyanidhi",
    name: "Karnataka CM Raita Vidyanidhi Scholarship for Farmers' Children",
    provider: "Department of Agriculture, Govt of Karnataka",
    badge: "State Govt (Karnataka)",
    category: "State Government",
    amount: "₹2,000 to ₹11,000 per annum",
    maxAmountNumeric: 11000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate"],
    applicableStates: "Karnataka",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No income bar (Parent must possess Farmer FID / RTC land record)",
    minMarks: 40,
    deadline: "2026-12-31",
    status: "Upcoming",
    daysLeft: 67,
    fullScope: "First-of-its-kind scheme by Govt of Karnataka to encourage the children of farmers to pursue higher education. Deposited directly to students via DBT through SSP portal based on the parent's Farmer Identification (FID) number in FRUITS portal.",
    benefits: [
      "Boys (PU/ITI/Diploma): ₹2,500/yr | Girls: ₹3,000/yr",
      "Boys (BA/B.Sc/B.Com/BBA): ₹5,000/yr | Girls: ₹5,500/yr",
      "Boys (LLB/B.Ed/Paramedical): ₹7,500/yr | Girls: ₹8,000/yr",
      "Boys (MBBS/B.Tech/PG): ₹10,000/yr | Girls: ₹11,000/yr"
    ],
    eligibilityCriteria: [
      "Permanent resident of Karnataka",
      "Father or Mother must be an agricultural landholder with valid Farmer ID (FID) in FRUITS database",
      "Student admitted to recognized post-matric course in Karnataka"
    ],
    requiredDocuments: [
      { name: "Parent Farmer ID (FID)", description: "Registered on Karnataka FRUITS portal", mandatory: true },
      { name: "Student Aadhaar & College Admission ID", description: "Enrolled in SSP portal", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Apply via Karnataka SSP Portal", description: "Check the 'Raita Vidyanidhi' box and provide parent's FID number.", tip: "Automatically cross-verified with Revenue RTC." }
    ],
    officialPortalUrl: "https://ssp.postmatric.karnataka.gov.in",
    portalName: "Karnataka SSP / FRUITS Portal",
    helpline: "080-35254757",
    faqs: [{ q: "Is this open to general category farmers?", a: "Yes, open to all farmers regardless of caste or income." }],
    featured: false,
    tags: ["Karnataka", "Farmers Children", "Raita Vidyanidhi", "Agriculture", "SSP"]
  },
  {
    id: "mahadbt-rajarshi-shahu-ebc",
    name: "MahaDBT Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna",
    provider: "Directorate of Higher Education / Technical Education, Govt of Maharashtra",
    badge: "State Govt (Maharashtra)",
    category: "State Government",
    amount: "50% to 100% Tuition & Exam Fee Reimbursement",
    maxAmountNumeric: 80000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate"],
    applicableStates: "Maharashtra",
    casteEligibility: ["General", "EWS", "OBC"],
    gender: "All",
    incomeCeiling: 800000,
    incomeCeilingText: "Less than ₹8.0 Lakh / year (General / EBC category)",
    minMarks: 40,
    deadline: "2026-12-10",
    status: "Open",
    daysLeft: 46,
    fullScope: "Flagship Maharashtra scheme offering 50% tuition and examination fee waiver for students from General/Open/Economically Backward Class (EBC) admitted to professional courses (Engineering, Medical, MBA, Pharmacy, Architecture) and non-professional degree courses.",
    benefits: [
      "50% reimbursement of approved tuition fees in Government & Private Unaided colleges",
      "100% exam fee reimbursement",
      "Hostel maintenance allowance under Dr. Panjabrao Deshmukh scheme for rural students",
      "Disbursed straight to student or college through MahaDBT"
    ],
    eligibilityCriteria: [
      "Domicile of Maharashtra state with valid Domicile Certificate",
      "Admitted through Centralized Admission Process (CAP) in approved degree/diploma course",
      "Annual family income strictly not exceeding ₹8,00,000 from all sources",
      "Maximum 2 children of the family can take benefit of this scheme"
    ],
    requiredDocuments: [
      { name: "Maharashtra Domicile Certificate", description: "Issued by Tahsildar / MahaOnline", mandatory: true },
      { name: "Income Certificate (Tehsildar)", description: "Certified family income for previous FY", mandatory: true },
      { name: "CAP Seat Allotment Letter", description: "Proving CAP round admission", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on mahadbt.maharashtra.gov.in", description: "Create user account with Aadhaar authentication.", tip: "Profile completion must be 100%." }
    ],
    officialPortalUrl: "https://mahadbt.maharashtra.gov.in",
    portalName: "MahaDBT Portal",
    helpline: "022-49150800 | support.mahadbt@gov.in",
    faqs: [{ q: "Is this for General category students?", a: "Yes, this scheme is specifically designed for Open/General category students with family income < ₹8L." }],
    featured: false,
    tags: ["Maharashtra", "MahaDBT", "Rajarshi Shahu", "EBC", "General Category"]
  },
  {
    id: "up-scholarship-post-matric",
    name: "Uttar Pradesh (UP) Post-Matric & Dashmottar Scholarship Scheme",
    provider: "Social Welfare / Backward Classes / Minority Welfare Dept, Govt of Uttar Pradesh",
    badge: "State Govt (UP)",
    category: "State Government",
    amount: "100% Tuition Fee Reimbursement + Annual Maintenance",
    maxAmountNumeric: 70000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate"],
    applicableStates: "Uttar Pradesh",
    casteEligibility: ["General", "OBC", "SC", "ST", "Minority"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "General/OBC/Minority: < ₹2.0L; SC/ST: < ₹2.5L",
    minMarks: 50,
    deadline: "2026-11-25",
    status: "Open",
    daysLeft: 31,
    fullScope: "Uttar Pradesh's state scheme covering students pursuing Class 11, 12, BA, B.Sc, B.Com, B.Tech, MBBS, Polytechnic, and ITI across UP institutions. Completely waives government non-refundable fees.",
    benefits: [
      "Complete reimbursement of non-refundable college fees (up to ₹50,000+ for professional courses)",
      "Monthly scholarship allowance credited via DBT",
      "Direct Aadhaar authentication linked to PFMS"
    ],
    eligibilityCriteria: [
      "Domicile of Uttar Pradesh",
      "Enrolled in a recognized institution registered with UP Scholarship Master Data",
      "Family income within prescribed limits (SC/ST: up to ₹2.5L; General/OBC/Minority: up to ₹2.0L)"
    ],
    requiredDocuments: [
      { name: "UP Domicile / Niwas Praman Patra", description: "Issued by UP Revenue e-District portal", mandatory: true },
      { name: "Caste & Income Certificate with Application & Certificate No", description: "Digitally verifiable on edistrict.up.gov.in", mandatory: true },
      { name: "College Fee Receipt & Roll No", description: "Current academic session receipt", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on scholarship.up.gov.in", description: "Choose 'Student Registration' -> Dashmottar Scheme.", tip: "Verify Aadhaar with DigiLocker." }
    ],
    officialPortalUrl: "https://scholarship.up.gov.in",
    portalName: "UP Scholarship Portal",
    helpline: "1800-180-5131 | Toll Free Helpdesk UP",
    faqs: [{ q: "Can UP students studying outside UP apply?", a: "Yes, under the 'Post Matric Other State' category for recognized outside universities." }],
    featured: false,
    tags: ["Uttar Pradesh", "UP Scholarship", "Dashmottar", "State Portal"]
  },
  {
    id: "svmcm-west-bengal",
    name: "Swami Vivekananda Merit-cum-Means Scholarship (SVMCM)",
    provider: "Higher Education Department, Government of West Bengal",
    badge: "State Govt (West Bengal)",
    category: "State Government",
    amount: "₹12,000 to ₹60,000 per annum",
    maxAmountNumeric: 60000,
    level: ["10+2", "Undergraduate", "Postgraduate", "PhD"],
    applicableStates: "West Bengal",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "Less than ₹2.5 Lakh / year",
    minMarks: 60,
    deadline: "2026-12-31",
    status: "Upcoming",
    daysLeft: 67,
    fullScope: "West Bengal's premier scholarship for meritorious and economically disadvantaged students pursuing Higher Secondary (10+2), Undergraduate Degree (Arts, Science, Commerce, Engineering, Medical), Post-graduation, and M.Phil/PhD.",
    benefits: [
      "Higher Secondary (10+2): ₹1,000/month (₹12,000/year)",
      "Undergraduate (General): ₹1,000 to ₹1,500/month",
      "Undergraduate (Engineering): ₹5,000/month (₹60,000/year)",
      "Undergraduate (Medical MBBS): ₹5,000/month (₹60,000/year)",
      "Postgraduate: ₹2,000 to ₹2,500/month"
    ],
    eligibilityCriteria: [
      "Resident of West Bengal and passed qualifying exam from West Bengal board/council/university",
      "Class 10 Madhyamik passed with >= 60% for 10+2 entry",
      "Higher Secondary passed with >= 60% for Undergraduate entry",
      "Annual family income not exceeding ₹2,50,000"
    ],
    requiredDocuments: [
      { name: "WB Domicile Proof (Ration Card / Voter ID / Aadhaar)", description: "Proving permanent residence in West Bengal", mandatory: true },
      { name: "Mark Sheet of Last Examination", description: "Showing minimum 60% marks", mandatory: true },
      { name: "Income Certificate from BDO / SDO / Joint BDO", description: "Competent administrative officer", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on svmcm.wbhed.gov.in", description: "Submit application with Banglar Shiksha ID.", tip: "Ensure marksheet copy is clear." }
    ],
    officialPortalUrl: "https://svmcm.wbhed.gov.in",
    portalName: "SVMCM West Bengal Portal",
    helpline: "1800-102-8014 | helpdesk.svmcm-wb@gov.in",
    faqs: [{ q: "What is the Kanyashree K3 scheme?", a: "Kanyashree K2 recipients pursuing PG with 45% marks receive direct SVMCM ₹2,000-₹2,500/mo." }],
    featured: false,
    tags: ["West Bengal", "SVMCM", "Higher Secondary", "Engineering", "Medical"]
  },
  {
    id: "tn-pudhumai-penn-scheme",
    name: "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)",
    provider: "Social Welfare and Women Empowerment Dept, Govt of Tamil Nadu",
    badge: "State Govt (Tamil Nadu)",
    category: "Girls Only",
    amount: "₹1,000 per month (₹12,000 per annum direct to girl's account)",
    maxAmountNumeric: 12000,
    level: ["Undergraduate", "Diploma/ITI"],
    applicableStates: "Tamil Nadu",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "Female",
    incomeCeiling: null,
    incomeCeilingText: "No income limit (Must have studied in TN Govt Schools from Class 6 to 12)",
    minMarks: 40,
    deadline: "2026-11-30",
    status: "Open",
    daysLeft: 36,
    fullScope: "Revolutionary initiative by Government of Tamil Nadu providing ₹1,000 every month directly to female students who completed their schooling from Class 6 to 12 in Tamil Nadu Government schools and enrolled in higher education degrees or diplomas.",
    benefits: [
      "₹1,000 monthly stipend transferred directly into the girl student's bank account every month until graduation",
      "Can be availed alongside other government scholarships and fee concessions without deduction",
      "Encourages female students from rural government schools to complete higher education"
    ],
    eligibilityCriteria: [
      "Female student who studied continuously in Tamil Nadu Government schools from Class 6 to Class 12",
      "Enrolled in 1st, 2nd, 3rd, 4th, or 5th year of any recognized Undergraduate Degree, Diploma, or ITI in Tamil Nadu",
      "No family income ceiling or caste restriction"
    ],
    requiredDocuments: [
      { name: "Government School Study Certificate (Class 6 to 12)", description: "Certified by school headmaster or EMIS database", mandatory: true },
      { name: "College Student Identity Card", description: "Enrolled in higher education", mandatory: true },
      { name: "Aadhaar Card & Bank Passbook", description: "In girl's own name", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Pudhumai Penn Portal / Penkalvi", description: "Visit pudhumaipenn.tn.gov.in through your college nodal desk.", tip: "EMIS number auto-fetches school records." }
    ],
    officialPortalUrl: "https://www.penkalvi.tn.gov.in",
    portalName: "Tamil Nadu Pudhumai Penn Portal",
    helpline: "044-25670868 | penkalvi@tn.gov.in",
    faqs: [{ q: "Can I receive this if I have another scholarship?", a: "Yes, Pudhumai Penn can be received concurrently with any other central or state scholarship." }],
    featured: true,
    tags: ["Tamil Nadu", "Pudhumai Penn", "Girls Only", "Govt School Scholars", "Monthly Stipend"]
  },
  {
    id: "gujarat-mysy-scholarship",
    name: "Mukhyamantri Yuva Swavalamban Yojana (MYSY Gujarat)",
    provider: "Education Department, Government of Gujarat",
    badge: "State Govt (Gujarat)",
    category: "State Government",
    amount: "50% Tuition Fee (Up to ₹2,00,000/yr) + Hostel & Book Grant",
    maxAmountNumeric: 200000,
    level: ["Undergraduate", "Diploma/ITI"],
    applicableStates: "Gujarat",
    casteEligibility: ["General", "EWS", "OBC", "SC", "ST"],
    gender: "All",
    incomeCeiling: 600000,
    incomeCeilingText: "Less than ₹6.0 Lakh / year",
    minMarks: 80,
    deadline: "2026-12-15",
    status: "Open",
    daysLeft: 51,
    fullScope: "Gujarat's premier welfare scheme to support meritorious students of all categories whose family income is below ₹6 Lakh. Reimburses 50% tuition fees for Medical (MBBS up to ₹2 Lakh/yr), Engineering (up to ₹50,000/yr), Diploma, and Degree programs.",
    benefits: [
      "Medical/Dental (MBBS/BDS): 50% tuition fee up to ₹2,00,000 per year",
      "Professional Courses (Engineering/Pharmacy/Architecture): 50% fee up to ₹50,000 per year",
      "Hostel Grant: ₹1,200 per month (₹12,000/year) for students studying outside their taluka",
      "Book Grant: ₹10,000 for Medical, ₹5,000 for Engineering, ₹3,000 for Diploma"
    ],
    eligibilityCriteria: [
      "Passed Class 10 or 12 from Gujarat Board with minimum 80 percentile or above",
      "Admitted to 1st year of Diploma or Degree program in recognized Gujarat college",
      "Family annual income strictly not exceeding ₹6,00,000"
    ],
    requiredDocuments: [
      { name: "Gujarat Board Marksheet with Percentile Rank", description: "Showing >= 80 percentile", mandatory: true },
      { name: "Income Certificate (Mamlatdar / TDO)", description: "Issued by revenue department", mandatory: true },
      { name: "Admission Receipt & College Fee Breakdown", description: "Paid receipt copy", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on mysy.guj.nic.in", description: "Enter 10th/12th board seat number and password.", tip: "Take printout to nearest Help Centre for physical verification." }
    ],
    officialPortalUrl: "https://mysy.guj.nic.in",
    portalName: "Gujarat MYSY Portal",
    helpline: "079-26566000 | mysygu自主@gmail.com",
    faqs: [{ q: "What is the percentile cutoff?", a: "Candidate must secure minimum 80 percentile in 10th (for Diploma) or 12th (for Degree)." }],
    featured: false,
    tags: ["Gujarat", "MYSY", "MBBS", "Engineering", "Tuition Waiver", "Hostel Grant"]
  },

  // ==========================================
  // 6. HIGHER EDUCATION & STUDY ABROAD
  // ==========================================
  {
    id: "fulbright-nehru-masters",
    name: "Fulbright-Nehru Master's Fellowships (Study in USA)",
    provider: "United States-India Educational Foundation (USIEF)",
    badge: "Global Study Abroad",
    category: "Study Abroad",
    amount: "Full Tuition + Living Stipend + Roundtrip Airfare + Health Insurance (approx. $60,000/yr)",
    maxAmountNumeric: 5000000,
    level: ["Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No income ceiling (Merit & Leadership based)",
    minMarks: 55,
    deadline: "2026-05-15",
    status: "Upcoming",
    daysLeft: 202,
    fullScope: "One of the most prestigious fellowships in the world, designed for highly motivated Indian graduates and early-career professionals to pursue a full master's degree at premier universities in the United States. Covers tuition, roundtrip airfare, monthly living stipend, and visa sponsorship.",
    benefits: [
      "100% J-1 visa sponsorship and full university tuition waiver in top US universities",
      "Monthly living allowance covering accommodation, food, and local transit",
      "Roundtrip economy air travel from hometown to host institution in the USA",
      "Accident and sickness coverage per US Government guidelines"
    ],
    eligibilityCriteria: [
      "Completed an equivalent of a U.S. bachelor's degree with minimum 55% marks",
      "At least three years of full-time professional work experience in the relevant field",
      "Demonstrated leadership qualities and commitment to return to India upon completion"
    ],
    requiredDocuments: [
      { name: "Academic Transcripts & Degree Certificates", description: "Attested transcripts", mandatory: true },
      { name: "Three Letters of Recommendation (LoR)", description: "From supervisors/professors", mandatory: true },
      { name: "Statement of Purpose & Personal Essay", description: "Leadership journey & goals", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on USIEF Online Portal", description: "Create your Fulbright-Nehru profile at usief.org.in.", tip: "Draft essay early." }
    ],
    officialPortalUrl: "https://www.usief.org.in/Fulbright-Nehru-Master-Fellowships.aspx",
    portalName: "USIEF Official Portal",
    helpline: "011-42090909 | ip@usief.org.in",
    faqs: [{ q: "Is GRE required at application?", a: "No, test fee vouchers are provided by USIEF to shortlisted candidates." }],
    featured: false,
    tags: ["Abroad", "USA", "Master's", "Full Ride", "USIEF", "Fellowship"]
  },
  {
    id: "chevening-scholarship-uk",
    name: "Chevening Scholarships (Study 1-Year Master's in the United Kingdom)",
    provider: "Foreign, Commonwealth & Development Office (UK Government)",
    badge: "UK Government Fellowship",
    category: "Study Abroad",
    amount: "Full Tuition Fees + Monthly Stipend + UK Flights + Visa (approx. £35,000)",
    maxAmountNumeric: 3800000,
    level: ["Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No income bar; based on global leadership potential",
    minMarks: 60,
    deadline: "2026-11-05",
    status: "Closing Soon",
    daysLeft: 11,
    fullScope: "The UK government's global scholarship programme, funded by the Foreign, Commonwealth and Development Office (FCDO). Enables outstanding emerging leaders from India to pursue a one-year master's degree in any subject at any top-tier UK university.",
    benefits: [
      "Full university tuition fees paid directly to chosen UK university",
      "Monthly living stipend covering accommodation, food, and transport",
      "Economy class return flights from India to the UK",
      "Free student visa and arrival allowances"
    ],
    eligibilityCriteria: [
      "Citizen of India committed to return to India for minimum two years after degree",
      "Completed undergraduate degree with equivalent of upper second-class 2:1 honours",
      "Minimum 2 years of work experience (equivalent to 2,800 hours)",
      "Apply to 3 different eligible UK university courses"
    ],
    requiredDocuments: [
      { name: "Undergraduate Degree Transcript", description: "Minimum 60% aggregate", mandatory: true },
      { name: "Two References / Recommendation Letters", description: "In prescribed format", mandatory: true },
      { name: "Four 500-word Essays", description: "Leadership, Networking, Studying in UK, Career Plan", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Apply at chevening.org/apply", description: "Submit essays and academic history.", tip: "Draft concrete examples of how you led a project." }
    ],
    officialPortalUrl: "https://www.chevening.org/scholarship/india",
    portalName: "UK Government Chevening Portal",
    helpline: "chevening.org/contact-us",
    faqs: [{ q: "Can I stay in the UK after completing the degree?", a: "Chevening fellows must return to their home country for at least two years after completing their course." }],
    featured: true,
    tags: ["Abroad", "UK", "Master's", "Full Ride", "Chevening", "Leadership"]
  },
  {
    id: "narotam-sekhsaria-scholarship",
    name: "Narotam Sekhsaria Post-Graduate Loan Scholarship",
    provider: "Narotam Sekhsaria Foundation",
    badge: "Elite PG Scholarship",
    category: "Study Abroad",
    amount: "Interest-free Loan Scholarship up to ₹20,00,000",
    maxAmountNumeric: 2000000,
    level: ["Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No income bar; based on intellectual excellence and ambition",
    minMarks: 70,
    deadline: "2026-03-15",
    status: "Upcoming",
    daysLeft: 141,
    fullScope: "Designed to help brilliant Indian graduates pursue post-graduate studies at prestigious global and Indian universities (e.g. Harvard, Stanford, Oxford, Cambridge, IIMs, IISc). Completely interest-free with repayment starting only 1 year after graduation.",
    benefits: [
      "Interest-free loan scholarship up to ₹20 Lakh depending on candidate need and course fees",
      "Zero interest charged throughout the course duration and 1-year grace period",
      "Flexible repayment schedule spread over 2 to 4 years post graduation"
    ],
    eligibilityCriteria: [
      "Indian nationals residing in India",
      "Graduates from an accredited Indian university with consistently high academic record",
      "Under 30 years of age as of application deadline"
    ],
    requiredDocuments: [
      { name: "Undergraduate Marksheets & Degree", description: "Complete transcript", mandatory: true },
      { name: "University Admission Offer Letter", description: "Offer letter from target university", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on nsfoundation.co.in", description: "Submit initial application in January.", tip: "Highlight original research." }
    ],
    officialPortalUrl: "https://pg.nsfoundation.co.in",
    portalName: "Narotam Sekhsaria Foundation",
    helpline: "022-61326200 | pgfellowship@nsfoundation.co.in",
    faqs: [{ q: "Is collateral required?", a: "A guarantor signs the agreement; no property mortgage is needed." }],
    featured: false,
    tags: ["Abroad", "Master's", "PhD", "Ivy League", "Interest-free"]
  }
];

export const SCHOLARSHIP_CATEGORIES = [
  "All",
  "Government Central",
  "State Government",
  "Corporate & CSR",
  "Girls Only",
  "Merit-cum-Means",
  "Minority",
  "Differently Abled",
  "School Education",
  "Study Abroad"
];

export const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi NCR",
  "Jammu & Kashmir",
  "Ladakh"
];

export const EDUCATION_LEVELS = [
  "School (Class 1-10)",
  "Higher Secondary (10+2 / Intermediate)",
  "Diploma / Polytechnic / ITI",
  "Undergraduate (Degree / B.Tech / MBBS / B.Sc / BA)",
  "Postgraduate (M.Tech / M.Sc / MA / MBA)",
  "PhD / Doctoral Research",
  "Study Abroad (Global Masters / PhD)"
];
