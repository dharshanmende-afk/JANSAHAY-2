export const SCHOLARSHIPS_DATA = [
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
    fullScope: "To provide financial assistance to meritorious students from low-income families to meet their day-to-day expenses while pursuing higher studies in colleges and universities. Allocated on a 50:50 ratio between boys and girls, with 82,000 fresh scholarships distributed annually across state boards.",
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
    id: "aicte-pragati-girls",
    name: "AICTE Pragati Scholarship Scheme for Girl Students",
    provider: "All India Council for Technical Education (AICTE)",
    badge: "AICTE Technical",
    category: "Girls Only",
    amount: "₹50,000 per annum + Contingency",
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
      "Selection based purely on merit in the qualifying examination (10+2 / ITI / 10th)"
    ],
    requiredDocuments: [
      { name: "10th & 12th/Diploma Marksheet", description: "Proof of qualifying exam merit", mandatory: true },
      { name: "Family Income Certificate", description: "Issued by Tehsildar or authorized executive magistrate", mandatory: true },
      { name: "AICTE Institute Admission Letter", description: "Proving seat allotment through centralized counselling", mandatory: true },
      { name: "Study / Bonafide Certificate", description: "From AICTE approved Head of Institute on prescribed format", mandatory: true },
      { name: "Family Declaration (Max 2 Girls)", description: "Affidavit / declaration stating not more than 2 daughters", mandatory: true },
      { name: "Aadhaar Card & Bank Passbook", description: "Direct Bank Transfer linked account in student's name", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on National Scholarship Portal", description: "Use your OTR ID on scholarships.gov.in under AICTE schemes.", tip: "Select 'AICTE Pragati Scheme for Girls (Degree or Diploma)'." },
      { stepNumber: 2, title: "Select AICTE Institution & Roll No", description: "Ensure your college is AICTE recognized and matches the database list.", tip: "Confirm your AICTE permanent institute ID from the college office." },
      { stepNumber: 3, title: "Upload Family Declaration & Income Certificate", description: "Attach the signed family declaration form.", tip: "Income certificate must be valid for the current financial year." },
      { stepNumber: 4, title: "Submit & Track Institute Verification", description: "Submit online and hand over documents to your college AICTE coordinator.", tip: "AICTE verification has strict deadlines; check weekly." }
    ],
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    portalName: "AICTE Official Portal / NSP",
    helpline: "011-29581000 | pragati@aicte-india.org",
    faqs: [
      { q: "Is this scholarship renewed every year?", a: "Yes, it is renewed up to completion of the course provided the candidate passes all semester exams without backlogs." },
      { q: "Can I apply if I joined via lateral entry?", a: "Yes, students admitted into 2nd year of Degree through lateral entry are eligible." }
    ],
    featured: true,
    tags: ["Girls Only", "AICTE", "Engineering", "Technical", "Diploma", "Degree"]
  },
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
      { name: "Family Income Proof (ITR / Salary Slip / Income Certificate)", description: "Issued by Govt authority or Form 16 / ITR of parents", mandatory: true },
      { name: "Passport-size Photograph", description: "Clear recent photograph in JPG format", mandatory: true },
      { name: "Disability Certificate (If applicable)", description: "From recognized government medical authority", mandatory: false }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Online Application Registration", description: "Apply directly at scholarships.reliancefoundation.org with basic academic and family details.", tip: "Double-check your email ID and mobile number." },
      { stepNumber: 2, title: "Online Aptitude Test (60 mins)", description: "Take the mandatory proctored online test covering General Mental Ability, Numerical Ability, and Verbal Ability.", tip: "Practice logical reasoning puzzles in advance; no negative marking." },
      { stepNumber: 3, title: "Document Verification", description: "Shortlisted candidates are invited to upload scanned verification documents.", tip: "Keep original copies handy for virtual spot verification." },
      { stepNumber: 4, title: "Scholarship Announcement & Award", description: "Results declared in December; funds transferred in instalments directly to your bank account.", tip: "Maintain regular attendance and passing grade to renew." }
    ],
    officialPortalUrl: "https://www.scholarships.reliancefoundation.org",
    portalName: "Reliance Foundation Scholarships Portal",
    helpline: "022-79672000 | rf.scholarships@reliancefoundation.org",
    faqs: [
      { q: "Is this limited to STEM degrees?", a: "For Undergraduates, ALL degree streams (BA, B.Com, B.Sc, BBA, B.Tech, etc.) are eligible. For PG, specific cutting-edge technology areas are prioritized." },
      { q: "Does this require a repayment or bond?", a: "No! It is a 100% grant, no repayment and no bond required." }
    ],
    featured: true,
    tags: ["Reliance", "Private", "Undergraduate", "All Streams", "Mentorship"]
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
      { q: "Does the fee reimbursement go to the college or the student?", a: "In most states, the tuition fee component goes directly to the college via DBT/PFMS, while the maintenance allowance is transferred to the student's personal Aadhaar-linked bank account." },
      { q: "Can I apply if I failed a year?", a: "Scholarship is generally not paid for repeating the same class/year twice." }
    ],
    featured: true,
    tags: ["SC", "ST", "OBC", "Tuition Reimbursement", "Maintenance Allowance", "NSP"]
  },
  {
    id: "kotak-kanya-scholarship",
    name: "Kotak Kanya Scholarship for Meritorious Girls",
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
    fullScope: "Financial assistance for meritorious girl students from disadvantaged backgrounds to pursue professional graduation degree courses from recognized institutes (such as Engineering, MBBS, Architecture, Design, Integrated LLB). Covers tuition, hostel, academic materials, and laptops.",
    benefits: [
      "₹1,50,000 per year until the completion of professional graduation course (up to 4 to 5 years)",
      "Total grant up to ₹6 Lakh to ₹7.5 Lakh per girl scholar",
      "Mentorship, life skills training, English communication enhancement, and career guidance",
      "Holistic development support from Kotak Education Foundation"
    ],
    eligibilityCriteria: [
      "Meritorious girl students who have secured admission to 1st year of professional graduation courses (Engineering, Medical, Law, Architecture)",
      "Scored 75% or above marks in Class 12 Board examinations",
      "Annual family income must not exceed ₹6,00,000 from all sources",
      "Children of employees of Kotak Mahindra Group & Buddy4Study are not eligible"
    ],
    requiredDocuments: [
      { name: "Class 12 Marksheet", description: "Showing minimum 75% marks", mandatory: true },
      { name: "Entrance Exam Scorecard & Allotment Letter", description: "JEE, NEET, CLAT, CET allotment letter", mandatory: true },
      { name: "College Fee Structure", description: "Official college quotation or receipt of 1st year fees", mandatory: true },
      { name: "Income Certificate / ITR / BPL Card", description: "Issued by Tehsildar or Form 16 / ITR", mandatory: true },
      { name: "Aadhaar Card", description: "Front and back clear copy", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Kotak CSR Portal / Buddy4Study", description: "Create student login and choose Kotak Kanya Scholarship application form.", tip: "Provide an active email that you check daily." },
      { stepNumber: 2, title: "Upload Admission Documents & Proof of Fees", description: "Upload Class 12 marksheet, entrance rank card, and admission receipt.", tip: "Make sure all PDFs are legible." },
      { stepNumber: 3, title: "Telephone & Video Interview", description: "Shortlisted candidates undergo a brief virtual interview assessing drive and financial need.", tip: "Speak honestly about your academic goals and family background." },
      { stepNumber: 4, title: "Final Selection & Fund Release", description: "Funds disbursed directly to the college or student account for academic fees.", tip: "Renewal requires minimum 6.0 CGPA each semester." }
    ],
    officialPortalUrl: "https://kotakeducation.org/kotak-kanya-scholarship",
    portalName: "Kotak Education Foundation",
    helpline: "011-43092248 | kotakkanya@buddy4study.com",
    faqs: [
      { q: "Is this scholarship only for girls?", a: "Yes, this program is exclusively designed to empower young women pursuing professional higher education." },
      { q: "What courses are considered professional?", a: "B.Tech, B.E, MBBS, BDS, B.Arch, Integrated 5-year B.A. LL.B / B.B.A. LL.B, B.Pharm, etc." }
    ],
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
      "Special consideration for students from rural districts and low-income families",
      "Prestigious recognition as a Tata Scholar"
    ],
    eligibilityCriteria: [
      "Undergraduate and Postgraduate students pursuing recognized healthcare/medical degrees (MBBS, BDS, B.Sc Nursing, B.Pharm, etc.)",
      "Minimum 65% marks in qualifying academic examination",
      "Enrolled in 2nd year onwards (some 1st year seats open based on NEET rank)",
      "Total family annual income strictly below ₹6 Lakh"
    ],
    requiredDocuments: [
      { name: "Academic Marksheets of Previous Years", description: "Attested marksheets of all passed university semesters/years", mandatory: true },
      { name: "Original College Fee Receipt", description: "Paid receipt for the current academic session", mandatory: true },
      { name: "Income Certificate of Parents", description: "ITR or Tahsildar issued certificate", mandatory: true },
      { name: "Statement of Purpose (SoP)", description: "300-word essay on why you chose healthcare and financial need", mandatory: true },
      { name: "Bank Account Details & Cancelled Cheque", description: "Showing student's IFSC and account number", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on Tata Trusts Grants Portal", description: "Visit igp.tatatrusts.org and fill out the applicant profile.", tip: "Keep your NEET scorecard and semester marksheets ready." },
      { stepNumber: 2, title: "Upload Course & Fee Documents", description: "Submit verified fee break-up from your medical college finance office.", tip: "Ensure the hostel fee is segregated from the tuition fee." },
      { stepNumber: 3, title: "Review & Telephonic Verification", description: "Tata Trusts review panel conducts document verification and background check.", tip: "Answer phone calls from Tata Trusts representatives promptly." },
      { stepNumber: 4, title: "Sanction Letter & Disbursement", description: "Sanction letter emailed and grant credited directly via RTGS/NEFT.", tip: "Send receipt acknowledgment back to Tata Trusts." }
    ],
    officialPortalUrl: "https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants",
    portalName: "Tata Trusts Individual Grants",
    helpline: "022-66658282 | igp@tatatrusts.org",
    faqs: [
      { q: "Is this an open grant or loan?", a: "This is a non-repayable gift grant, not a loan scholarship." },
      { q: "Are dental and ayurvedic students eligible?", a: "Yes, BDS, BAMS, BHMS, and Physiotherapy students are eligible." }
    ],
    featured: false,
    tags: ["Tata Trusts", "Medical", "MBBS", "Nursing", "Healthcare", "Undergraduate"]
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
      "All eligible applicants meeting minimum criteria are sanctioned (no cap on numbers)",
      "Disbursed straight to student via Direct Benefit Transfer"
    ],
    eligibilityCriteria: [
      "Specially-abled student having disability of not less than 40%",
      "Admitted to 1st year of Degree/Diploma course in an AICTE approved institution (or 2nd year through lateral entry)",
      "Family income from all sources should not exceed ₹8 Lakh per annum"
    ],
    requiredDocuments: [
      { name: "Unique Disability ID (UDID) / Disability Certificate", description: "Issued by competent medical board showing >= 40% disability", mandatory: true },
      { name: "AICTE Admission Proof", description: "Allotment letter through centralized admission process", mandatory: true },
      { name: "Income Certificate", description: "Issued by Revenue Officer not below Tehsildar rank", mandatory: true },
      { name: "10th / 12th Board Marksheet", description: "Pass certificate of qualifying examination", mandatory: true },
      { name: "Bank Passbook & Aadhaar Card", description: "Seeded for Direct Benefit Transfer", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Create OTR on National Scholarship Portal", description: "Select AICTE Saksham Scheme for Specially Abled Students.", tip: "Ensure your UDID number is verified on Swavlamban portal." },
      { stepNumber: 2, title: "Upload UDID Card & Disability Certificate", description: "Attach clear scan of UDID card or district hospital certificate.", tip: "Disability percentage must be clearly legible." },
      { stepNumber: 3, title: "Institute Verification", description: "Inform your college scholarship nodal officer to verify on NSP portal.", tip: "Follow up regularly with college administration." }
    ],
    officialPortalUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Saksham",
    portalName: "NSP / AICTE Portal",
    helpline: "011-29581000 | saksham@aicte-india.org",
    faqs: [
      { q: "Is there a merit cutoff?", a: "No, all eligible applicants with valid admission and >=40% disability who meet the income criteria are awarded." }
    ],
    featured: false,
    tags: ["PwD", "Differently Abled", "AICTE", "Engineering", "Diploma"]
  },
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
      "Accident and sickness coverage per US Government guidelines",
      "Prestigious global alumni network and leadership seminars across the US"
    ],
    eligibilityCriteria: [
      "Completed an equivalent of a U.S. bachelor's degree (either 4-year degree or a master's degree) with minimum 55% marks",
      "At least three years of full-time professional work experience in the relevant field by application deadline",
      "Demonstrated leadership qualities and commitment to return to India upon completion",
      "Must not have completed a prior degree from a US university"
    ],
    requiredDocuments: [
      { name: "Academic Transcripts & Degree Certificates", description: "Attested transcripts of all undergraduate and post-graduate studies", mandatory: true },
      { name: "Three Letters of Recommendation (LoR)", description: "From academic supervisors or professional managers", mandatory: true },
      { name: "Statement of Purpose & Personal Essay", description: "Explaining academic goals, leadership journey, and plan to impact India", mandatory: true },
      { name: "Curriculum Vitae (CV / Resume)", description: "Detailed 2-page academic and professional experience CV", mandatory: true },
      { name: "Work Experience Certificates", description: "Proof of 3 years full-time experience", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on USIEF Online Portal", description: "Create your Fulbright-Nehru profile at usief.org.in during the open window.", tip: "Start drafting your Statement of Purpose 2 months before deadline." },
      { stepNumber: 2, title: "Request Letters of Recommendation", description: "Invite 3 recommenders through the online portal system.", tip: "Choose mentors who can speak concretely about your leadership skills." },
      { stepNumber: 3, title: "National Selection Interview", description: "Shortlisted candidates are invited for in-person or video panel interview in New Delhi.", tip: "Demonstrate strong cultural ambassadorship and clarity of goals." },
      { stepNumber: 4, title: "University Placement & Pre-departure", description: "USIEF assists selected fellows with university admission, GRE/TOEFL waivers, and J-1 visa.", tip: "Fellows must return to India for minimum 2 years after completion." }
    ],
    officialPortalUrl: "https://www.usief.org.in/Fulbright-Nehru-Master-Fellowships.aspx",
    portalName: "USIEF Official Portal",
    helpline: "011-42090909 | ip@usief.org.in",
    faqs: [
      { q: "Is GRE or TOEFL required at the time of application?", a: "No, USIEF provides test fee vouchers to shortlisted candidates for required standardized tests." },
      { q: "Can I stay back in the US to work?", a: "Fulbright J-1 visa has a mandatory 2-year home country physical presence requirement." }
    ],
    featured: false,
    tags: ["Abroad", "USA", "Master's", "Full Ride", "USIEF", "Fellowship"]
  },
  {
    id: "karnataka-ssp-post-matric",
    name: "Karnataka State Scholarship Portal (SSP) Post-Matric Scheme",
    provider: "Social Welfare / Tribal Welfare / Backward Classes Welfare Dept, Govt of Karnataka",
    badge: "State Govt (Karnataka)",
    category: "State Government",
    amount: "100% Fee Reimbursement + Monthly Maintenance (Up to ₹60,000/yr)",
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
    fullScope: "Karnataka's state-of-the-art unified portal providing fee reimbursement, Vidyasiri food and accommodation scheme, and maintenance allowance to all eligible students residing in Karnataka and pursuing PU, Diploma, Degree, Engineering, or PG courses.",
    benefits: [
      "Complete tuition fee waiver directly disbursed to colleges under state regulatory fees",
      "Vidyasiri monthly stipend of ₹1,500/month for food and accommodation for non-hostellers",
      "Automated e-Attestation system eliminates physical queueing at government offices",
      "Direct DBT transfer via Aadhaar payment bridge to verified bank accounts"
    ],
    eligibilityCriteria: [
      "Domicile of Karnataka State with valid RD certificate number",
      "Belonging to SC, ST, OBC (Category 1, 2A, 2B, 3A, 3B), or Minority communities",
      "Annual income within limits (SC/ST: up to ₹2.5L; OBC Cat-1: ₹2.5L; 2A/2B/3A/3B: ₹1L)",
      "Passed previous qualifying exam and admitted to recognized Karnataka institution"
    ],
    requiredDocuments: [
      { name: "Caste & Income RD Number (15-digit)", description: "Obtained from Nadakacheri portal with digital certificate", mandatory: true },
      { name: "Student Aadhaar & Ration Card Number", description: "Food & Civil Supplies department verified family ration card", mandatory: true },
      { name: "College Registration Number / USN", description: "University Seat Number or College Roll Number", mandatory: true },
      { name: "Fee Receipt with E-Attestation Number", description: "Uploaded and e-attested by designated district verification officer", mandatory: true },
      { name: "Disability Certificate (If PwD)", description: "UDID number issued by Karnataka Health Dept", mandatory: false }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Create SSP Student Account", description: "Register on ssp.postmatric.karnataka.gov.in using Aadhaar authentication.", tip: "Ensure your mobile number is active to receive OTP." },
      { stepNumber: 2, title: "Fetch Caste & Income using RD Number", description: "Enter 15-digit RD number; the portal auto-fetches name and category.", tip: "Name on RD certificate must match Aadhaar." },
      { stepNumber: 3, title: "Submit E-Attestation Documents", description: "Upload study certificate and fee receipt to the e-Attestation portal for officer approval.", tip: "Contact your college nodal officer to approve the attestation." },
      { stepNumber: 4, title: "Final Application Submission", description: "Enter approved e-Attestation numbers into SSP portal and click Final Submit.", tip: "Check payment status on SSP Dashboard." }
    ],
    officialPortalUrl: "https://ssp.postmatric.karnataka.gov.in",
    portalName: "Karnataka SSP Portal",
    helpline: "080-35254757 | ssp.helpdesk@karnataka.gov.in",
    faqs: [
      { q: "What is e-Attestation in Karnataka SSP?", a: "It is an online system where designated taluk officers verify your fee receipt and bonafide before you can submit on SSP." },
      { q: "What is the Vidyasiri scheme under SSP?", a: "It provides ₹15,000/year to rural students who do not get hostel admission to cover rent and meals in cities." }
    ],
    featured: false,
    tags: ["Karnataka", "SSP", "Vidyasiri", "Fee Reimbursement", "State Portal"]
  },
  {
    id: "mahadbt-post-matric-maharashtra",
    name: "MahaDBT Post-Matric Scholarship Scheme (Maharashtra)",
    provider: "Social Justice and Special Assistance Dept, Govt of Maharashtra",
    badge: "State Govt (Maharashtra)",
    category: "State Government",
    amount: "100% Tuition & Exam Fee Reimbursement + Maintenance Allowance",
    maxAmountNumeric: 85000,
    level: ["10+2", "Diploma/ITI", "Undergraduate", "Postgraduate"],
    applicableStates: "Maharashtra",
    casteEligibility: ["SC", "ST", "OBC", "EWS"],
    gender: "All",
    incomeCeiling: 250000,
    incomeCeilingText: "SC/ST: < ₹2.5L; VJNT/OBC: < ₹1.5L; EBC (Rajarshi Shahu): < ₹8.0L",
    minMarks: 40,
    deadline: "2026-12-10",
    status: "Open",
    daysLeft: 46,
    fullScope: "Maharashtra's comprehensive portal for Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna, Post-Matric SC/ST/OBC schemes, and Dr. Panjabrao Deshmukh Hostel Maintenance Allowance. Offers full or partial tuition reimbursement depending on course and income tier.",
    benefits: [
      "100% tuition and exam fee waiver for SC/ST students in government & private unaided institutes",
      "50% fee reimbursement for EBC / Open category students under Rajarshi Shahu scheme",
      "Hostel maintenance allowance up to ₹30,000 per year for students from rural areas",
      "Direct Aadhaar enabled payment to bank account without middle agents"
    ],
    eligibilityCriteria: [
      "Domicile of Maharashtra state with valid Domicile Certificate",
      "Passed Class 10/12 from Maharashtra and pursuing post-matric studies",
      "Annual family income within limits set for specific caste/category sub-schemes",
      "Only 2 children of the same parent eligible under general rules"
    ],
    requiredDocuments: [
      { name: "Maharashtra Domicile Certificate", description: "Issued by Tahsildar / MahaOnline CSC", mandatory: true },
      { name: "Caste & Caste Validity Certificate", description: "Mandatory for SC/ST/VJNT/OBC students pursuing professional courses", mandatory: true },
      { name: "Income Certificate (Tehsildar)", description: "Certified family income for previous financial year", mandatory: true },
      { name: "CAP Seat Allotment Letter", description: "Proving admission through Centralized Allotment Process", mandatory: true },
      { name: "Fee Receipt & Previous Year Marksheets", description: "All semester marksheets and valid fee receipt", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on MahaDBT Portal", description: "Log on to mahadbt.maharashtra.gov.in using Aadhaar biometrics or mobile OTP.", tip: "Make sure Aadhaar name matches 10th marksheet." },
      { stepNumber: 2, title: "Create Complete Profile", description: "Fill Personal, Address, Caste, Income, and Past Qualification sections accurately.", tip: "100% profile completion is required to unlock schemes." },
      { stepNumber: 3, title: "Select Department & Applicable Scheme", description: "E.g., Social Justice Dept for SC, Tribal Development for ST, or DTE for EBC.", tip: "Check whether your family income qualifies for full or 50% waiver." },
      { stepNumber: 4, title: "Institute Scrutiny & Approval", description: "Application goes to college clerk -> college principal -> district social welfare officer.", tip: "Check portal weekly for any 'Defective' flag and correct within 7 days." }
    ],
    officialPortalUrl: "https://mahadbt.maharashtra.gov.in",
    portalName: "MahaDBT Portal",
    helpline: "022-49150800 | support.mahadbt@gov.in",
    faqs: [
      { q: "Is Caste Validity compulsory for engineering and medical?", a: "Yes, Caste Validity Certificate is mandatory for reserved category students admitted to professional colleges in Maharashtra." },
      { q: "What is the Rajarshi Shahu Maharaj Scheme?", a: "It provides 50% tuition and exam fee reimbursement to general/EBC students with family income under ₹8 Lakh." }
    ],
    featured: false,
    tags: ["Maharashtra", "MahaDBT", "Rajarshi Shahu", "State Portal", "Fee Waiver"]
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
    fullScope: "A flagship CSR program by HDFC Bank to support students who are going through severe personal or financial crises (such as loss of breadwinning parent, critical illness in family, or severe financial distress). Enables students from Class 11 up to Post-graduation to continue their education without dropping out.",
    benefits: [
      "School (Class 11 & 12): ₹18,000 per year",
      "General Undergraduate Degree: ₹30,000 per year",
      "Professional Degree (Engineering, Medical, Law): ₹1,00,000 per year",
      "Special psychosocial counseling and career mentoring for students facing family crisis"
    ],
    eligibilityCriteria: [
      "Open for Indian students pursuing Class 11, 12, Diploma, ITI, Undergraduate, or Postgraduate degrees",
      "Must have scored at least 60% marks in previous qualifying exam",
      "Annual family income must not exceed ₹6,00,000 from all sources",
      "Priority given to students who lost a parent, have critically ill parents, or faced job loss in family"
    ],
    requiredDocuments: [
      { name: "Previous Academic Marksheet", description: "Class 10/12/Semester marksheet with >= 60%", mandatory: true },
      { name: "Proof of Admission", description: "College ID, Admission letter, or current year fee receipt", mandatory: true },
      { name: "Government Identity Proof", description: "Aadhaar card / Voter ID / Passport", mandatory: true },
      { name: "Proof of Family Income / Crisis", description: "Income Certificate / Salary Slip / Death certificate of parent (if applicable)", mandatory: true },
      { name: "Applicant Bank Account Details", description: "Passbook copy or cancelled cheque", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Apply Online via HDFC Parivartan Desk", description: "Fill application on the designated scholarship portal with personal and academic details.", tip: "Mention any personal or financial crisis clearly in the hardship section." },
      { stepNumber: 2, title: "Document Upload & Review", description: "Upload scanned copies of marksheet, fee receipt, and crisis evidence.", tip: "Keep files under 1MB each in PDF or JPG." },
      { stepNumber: 3, title: "Telephonic Need Assessment", description: "The foundation team calls to verify financial distress and career aspirations.", tip: "Keep your parents or guardians nearby during the phone interview." },
      { stepNumber: 4, title: "Grant Award & Direct Transfer", description: "Shortlisted scholars receive email confirmation and grant is credited straight to account.", tip: "Receipt must be submitted to claim next year's installment." }
    ],
    officialPortalUrl: "https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan",
    portalName: "HDFC Parivartan / Partner Portal",
    helpline: "011-43092248 | badhtekadam@buddy4study.com",
    faqs: [
      { q: "Can students from private colleges apply?", a: "Yes, students from both government and private recognized colleges across India are eligible." },
      { q: "Are general category students eligible?", a: "Yes, this scholarship is open to students of all castes based on merit and financial need." }
    ],
    featured: false,
    tags: ["HDFC Bank", "Parivartan", "Crisis Support", "All Streams", "Undergraduate"]
  },
  {
    id: "inspire-she-fellowship",
    name: "INSPIRE Scholarship for Higher Education (SHE)",
    provider: "Department of Science and Technology (DST), Govt of India",
    badge: "DST Science Fellowship",
    category: "Government Central",
    amount: "₹80,000 per annum (₹60k cash + ₹20k summer project)",
    maxAmountNumeric: 80000,
    level: ["Undergraduate", "Postgraduate"],
    applicableStates: "All India",
    casteEligibility: ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    gender: "All",
    incomeCeiling: null,
    incomeCeilingText: "No Income Bar (Pure Merit in Natural/Basic Sciences)",
    minMarks: 95,
    deadline: "2026-12-31",
    status: "Upcoming",
    daysLeft: 67,
    fullScope: "A prestigious central fellowship designed to attract talent to the study of basic and natural sciences at an early stage. Offers 10,000 scholarships annually to students pursuing B.Sc, B.S., and Int. M.Sc courses in Physics, Chemistry, Mathematics, Biology, Astronomy, etc.",
    benefits: [
      "Total value ₹80,000 per candidate per year for up to 5 years (B.Sc through M.Sc)",
      "₹60,000 annual scholarship deposited directly into SBI bank account (₹5,000 per month)",
      "₹20,000 mentorship grant per year for undertaking research projects in premier labs like IISc, IITs, IISERs",
      "Continued support for 5 years subject to maintaining 60% marks in degree examinations"
    ],
    eligibilityCriteria: [
      "Top 1% of successful students in Class 12 Board examination (State or Central boards)",
      "Enrolled in regular courses in Natural and Basic Sciences at B.Sc, B.S., or 5-year Integrated M.Sc level",
      "Rank holders in JEE (Main) / JEE (Advanced) within top 10,000 or NEET top 10,000 who opt for basic sciences",
      "KVPY Fellows, NTSE Scholars, and International Olympiad medalists are also eligible"
    ],
    requiredDocuments: [
      { name: "Class 12 Board Marksheet & Advisory Note", description: "Showing candidate falls in top 1% cutoff of that board", mandatory: true },
      { name: "Endorsement Certificate from College Principal", description: "Signed in prescribed DST format verifying B.Sc enrollment", mandatory: true },
      { name: "Class 10 Certificate / Date of Birth Proof", description: "Official 10th pass certificate", mandatory: true },
      { name: "SBI Savings Bank Account Passbook", description: "Only State Bank of India account in student's name is accepted by DST", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on INSPIRE Online Portal", description: "Visit online-inspire.gov.in and create user credentials.", tip: "Only basic science subjects (Physics, Chem, Math, Bio, Earth Sci) are eligible." },
      { stepNumber: 2, title: "Upload Endorsement Certificate & Marksheets", description: "Download official Endorsement Form, get it stamped by your College Principal, and upload.", tip: "Ensure the college AISHE code is correctly filled." },
      { stepNumber: 3, title: "Submit SBI Account Details", description: "Open a regular savings account in State Bank of India and submit details for DBT.", tip: "DST strictly disburses only through SBI accounts." },
      { stepNumber: 4, title: "Summer Research Project Submission", description: "Every summer, submit a research project report supervised by an approved mentor to unlock the ₹20,000 bonus grant.", tip: "Connect with research labs early in your 1st year." }
    ],
    officialPortalUrl: "https://online-inspire.gov.in",
    portalName: "DST INSPIRE Portal",
    helpline: "0120-4676260 | inspire.prog-dst@nic.in",
    faqs: [
      { q: "Are engineering (B.Tech) or medical (MBBS) students eligible?", a: "No, INSPIRE SHE is strictly for Basic and Natural Sciences (B.Sc / Int M.Sc)." },
      { q: "Is there any family income limit?", a: "No, there is zero income restriction; it is 100% based on academic merit." }
    ],
    featured: true,
    tags: ["Science", "DST", "INSPIRE", "Research", "B.Sc", "M.Sc", "Pure Merit"]
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
    fullScope: "To provide scholarships to economically weaker students to enable them to pursue higher studies in medicine, engineering, graduation in any discipline, diploma courses, and vocational courses through ITI. Special dedicated quota for girl child pursuing 10+2.",
    benefits: [
      "Medical Students: ₹40,000 per annum (paid in 3 installments)",
      "Engineering Students: ₹30,000 per annum",
      "General Graduation / Diploma: ₹20,000 per annum",
      "Special Girls Scholarship: ₹15,000 per annum for 10+2 higher secondary studies",
      "Direct NEFT credit into student's personal bank account"
    ],
    eligibilityCriteria: [
      "Passed Class 10 or 12 examination in current academic year with at least 60% marks",
      "Enrolled in 1st year of Medical, Engineering, Degree, Diploma, or ITI course",
      "Annual family income of parents from all sources not exceeding ₹2,50,000 per annum",
      "Students who have received financial aid from other PSUs or corporates may have restrictions"
    ],
    requiredDocuments: [
      { name: "Class 10 / 12 Passing Marksheet", description: "Showing minimum 60% aggregate marks", mandatory: true },
      { name: "Admission Fee Receipt / College ID", description: "Proof of enrollment in recognized higher education", mandatory: true },
      { name: "Income Certificate of Parents", description: "Issued by revenue department or employer salary slip", mandatory: true },
      { name: "Bank Account Passbook / Cancelled Cheque", description: "Student's bank account with IFSC code", mandatory: true },
      { name: "Aadhaar Card copy", description: "Identity and address proof", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Online Application on LIC India Portal", description: "Navigate to licindia.in and click on 'Golden Jubilee Scholarship' link.", tip: "No application fee is charged by LIC." },
      { stepNumber: 2, title: "Select Nearest LIC Divisional Office", description: "Choose the LIC Division that covers your home district.", tip: "Selection is handled by the local Divisional Office committee." },
      { stepNumber: 3, title: "Physical Document Verification", description: "Shortlisted students receive an intimation letter to submit original certificates at the LIC branch.", tip: "Keep original marksheets ready for verification." },
      { stepNumber: 4, title: "Direct Transfer & Renewal", description: "Scholarship is credited in three regular installments per year upon showing passing results.", tip: "Submit semester marksheets promptly for continuous payment." }
    ],
    officialPortalUrl: "https://licindia.in/web/guest/golden-jubilee-scholarship-scheme",
    portalName: "LIC Official Portal",
    helpline: "022-68276827 | co_gjf@licindia.com",
    faqs: [
      { q: "Can ITI students apply?", a: "Yes, students pursuing 2-year ITI courses after Class 10 with 60% marks are eligible for ₹20,000/yr." }
    ],
    featured: false,
    tags: ["LIC", "PSU", "Medical", "Engineering", "Diploma", "ITI"]
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
    fullScope: "Designed to help brilliant Indian graduates pursue post-graduate studies at prestigious global and Indian universities (e.g. Harvard, Stanford, Oxford, Cambridge, IIMs, IISc). Offers completely interest-free loan scholarships with a generous repayment schedule starting only 1 year after course completion.",
    benefits: [
      "Interest-free loan scholarship up to ₹20 Lakh depending on candidate need and course fees",
      "Zero interest charged throughout the course duration and during the 1-year grace period",
      "Flexible repayment schedule spread over 2 to 4 years post graduation",
      "Access to the Sekhsaria Scholar Alumni network and senior industry leaders"
    ],
    eligibilityCriteria: [
      "Indian nationals residing in India",
      "Graduates from an accredited Indian university with consistently high academic record",
      "Applying for or holding admission in top-ranked Master's or PhD programs in India or abroad",
      "Under 30 years of age as of application deadline"
    ],
    requiredDocuments: [
      { name: "Undergraduate Marksheets & Degree", description: "Complete transcript of all semesters", mandatory: true },
      { name: "University Admission Offer Letter", description: "Conditional or confirmed offer letter from target university", mandatory: true },
      { name: "GRE / GMAT / IELTS / TOEFL Scorecard", description: "Official test report form", mandatory: true },
      { name: "Two Recommendation Letters", description: "From professors or research supervisors", mandatory: true },
      { name: "Detailed Statement of Purpose & Financial Plan", description: "How you plan to finance total tuition and living costs", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on nsfoundation.co.in", description: "Submit initial application and pay nominal registration fee.", tip: "Applications open in January every year." },
      { stepNumber: 2, title: "Document Upload & Essay Submission", description: "Upload academic credentials and statement of purpose.", tip: "Highlight your original research, patents, or unique community contributions." },
      { stepNumber: 3, title: "In-Person Panel Interview in Mumbai", description: "Shortlisted candidates are invited for rigorous interview with eminent academicians.", tip: "Foundation reimburses travel expenses for interviewees." },
      { stepNumber: 4, title: "Loan Scholarship Sanction & Agreement", description: "Legal deed executed and funds transferred prior to university fee deadline.", tip: "Repayment begins 12 months after course completion." }
    ],
    officialPortalUrl: "https://pg.nsfoundation.co.in",
    portalName: "Narotam Sekhsaria Foundation",
    helpline: "022-61326200 | pgfellowship@nsfoundation.co.in",
    faqs: [
      { q: "Is collateral required for this loan scholarship?", a: "A guarantor (parent or family member) signs the agreement; no property mortgage is required." }
    ],
    featured: false,
    tags: ["Abroad", "Master's", "PhD", "Ivy League", "Interest-free", "Postgraduate"]
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
      "Direct Benefit Transfer into student's personal bank account via SBI / Public Sector banks",
      "Prevents student dropouts in government and local body schools"
    ],
    eligibilityCriteria: [
      "Studying as regular student in Class 8 in a Government, Local Body or Government-aided school",
      "Minimum 55% marks or equivalent grade in Class 7 annual exam (50% for SC/ST)",
      "Parental income from all sources not exceeding ₹3,50,000 per annum",
      "Must qualify the State-level NMMS Examination consisting of Mental Ability Test (MAT) & Scholastic Aptitude Test (SAT)",
      "Students of Kendriya Vidyalayas, Jawahar Navodaya Vidyalayas, and residential schools are not eligible"
    ],
    requiredDocuments: [
      { name: "Class 7 Pass Marksheet", description: "Showing minimum 55% marks (50% for SC/ST)", mandatory: true },
      { name: "Parental Income Certificate", description: "Issued by Tehsildar / designated government officer", mandatory: true },
      { name: "Caste / PwD Certificate (If applicable)", description: "For reservation benefit", mandatory: false },
      { name: "NMMS Selection Merit Card / Roll Number", description: "Proof of passing the state NMMS competitive exam", mandatory: true },
      { name: "Aadhaar Linked Bank Passbook", description: "Account in student's name in any commercial bank", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Appear for State NMMS Exam in Class 8", description: "Register through your school headmaster for the annual NMMS examination conducted by SCERT.", tip: "Practice previous 5 years MAT and SAT question papers." },
      { stepNumber: 2, title: "Check District Merit List", description: "SCERT publishes the list of qualifying students based on district quota.", tip: "Obtain your NMMS qualifying roll number." },
      { stepNumber: 3, title: "Register on NSP in Class 9", description: "Once enrolled in Class 9, register on scholarships.gov.in using your NMMS credentials.", tip: "Select 'National Means Cum Merit Scholarship Scheme'." },
      { stepNumber: 4, title: "School Headmaster Verification & DBT", description: "School verifies your admission on NSP; payment is credited every quarter via DBT.", tip: "Submit renewal on NSP each year in Class 10, 11, and 12 with 55% passing marks." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP / SCERT State Portals",
    helpline: "011-23381662 | nmms-mhrd@gov.in",
    faqs: [
      { q: "Can private school students apply?", a: "No, students of private un-aided schools or central residential schools (like JNV/KVS) are not eligible." }
    ],
    featured: false,
    tags: ["School", "Class 9 to 12", "NMMSS", "Merit-cum-Means", "Drop-out Prevention"]
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
    fullScope: "Specifically crafted to assist meritorious girl students belonging to six notified minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis) studying in Class 9, 10, 11, and 12. Aims to stop dropouts and promote higher education among minority girls.",
    benefits: [
      "Class 9 & 10: ₹10,000 per annum (in two installments)",
      "Class 11 & 12: ₹12,000 per annum (in two installments)",
      "Disbursed directly into girl student's Aadhaar-linked bank account",
      "No fees or charges for online submission"
    ],
    eligibilityCriteria: [
      "Only for girl students belonging to notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)",
      "Studying in Class 9 to Class 12 in recognized schools/institutions",
      "Secured minimum 50% marks in aggregate in previous class",
      "Annual family income of parents/guardian from all sources not exceeding ₹2.0 Lakh"
    ],
    requiredDocuments: [
      { name: "School Verification Form", description: "Duly signed and stamped by school Principal", mandatory: true },
      { name: "Self-declaration of Minority Community", description: "Affidavit or community declaration format", mandatory: true },
      { name: "Income Certificate", description: "Issued by Tehsildar / SDM / authorized revenue officer", mandatory: true },
      { name: "Marksheet of Previous Class", description: "Showing at least 50% marks", mandatory: true },
      { name: "Aadhaar Card of Student", description: "Proof of identity and address", mandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: "Register on National Scholarship Portal", description: "Apply online at scholarships.gov.in under Ministry of Minority Affairs.", tip: "Make sure the minority community matches your declaration." },
      { stepNumber: 2, title: "Download School Verification Certificate", description: "Print the generated school verification form and get it signed by your school principal.", tip: "Upload the signed school certificate in PDF format." },
      { stepNumber: 3, title: "Final Submit & School Verification", description: "Submit application; school nodal officer confirms enrollment on portal.", tip: "No hard copies need to be sent to New Delhi MAEF office." }
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    helpline: "011-23583788 | scholarship-maef@nic.in",
    faqs: [
      { q: "Can two sisters from the same family apply?", a: "Yes, up to two girl children from one family can avail this scholarship." }
    ],
    featured: false,
    tags: ["Minority", "Girls Only", "School", "Class 9-12", "Muslim", "Christian", "Sikh", "Jain"]
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
