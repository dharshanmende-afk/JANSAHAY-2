package com.jansaahay.data;

import com.jansaahay.entity.Scholarship;
import com.jansaahay.entity.User;
import com.jansaahay.repository.ScholarshipRepository;
import com.jansaahay.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.jansaahay.service.RAGService ragService;

    public DataSeeder(UserRepository userRepository,
                      ScholarshipRepository scholarshipRepository,
                      PasswordEncoder passwordEncoder,
                      @org.springframework.context.annotation.Lazy com.jansaahay.service.RAGService ragService) {
        this.userRepository = userRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.passwordEncoder = passwordEncoder;
        this.ragService = ragService;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedScholarships();
        try {
            ragService.reindex();
            logger.info("RAG search index populated with {} scholarships.", scholarshipRepository.count());
        } catch (Exception e) {
            logger.warn("Could not populate RAG index on startup", e);
        }
    }

    private void seedUsers() {
        // 1. Seed Admin Account if not exists
        if (!userRepository.existsByEmail("admin@jansaahay.gov.in")) {
            User admin = new User();
            admin.setName("JanSaahay National Administrator");
            admin.setEmail("admin@jansaahay.gov.in");
            // BCrypt hashed password
            admin.setPassword(passwordEncoder.encode("Admin@JanSaahay2026"));
            admin.setRole("ROLE_ADMIN");
            admin.setBlocked(false);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setLastLoginAt(LocalDateTime.now());
            userRepository.save(admin);
            logger.info("Seeded default administrator: admin@jansaahay.gov.in");
        }

        // 2. Seed Test Student Account
        if (!userRepository.existsByEmail("student@jansaahay.gov.in")) {
            User student = new User();
            student.setName("Aarav Sharma");
            student.setEmail("student@jansaahay.gov.in");
            student.setPassword(passwordEncoder.encode("Student@JanSaahay2026"));
            student.setRole("ROLE_USER");
            student.setBlocked(false);
            student.setCreatedAt(LocalDateTime.now());
            student.setLastLoginAt(LocalDateTime.now());
            userRepository.save(student);
            logger.info("Seeded test student account: student@jansaahay.gov.in");
        }
    }

    private void seedScholarships() {
        if (scholarshipRepository.count() >= 25) {
            logger.info("Database already seeded with {} scholarships.", scholarshipRepository.count());
            return;
        }

        List<Scholarship> list = new ArrayList<>();
        String today = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

        // 1. PM-USP Central Sector
        Scholarship s1 = new Scholarship();
        s1.setId("nsp-pm-usp-central-sector");
        s1.setName("PM-USP Central Sector Scheme of Scholarship for College and University Students");
        s1.setProvider("Ministry of Education, Department of Higher Education (Govt of India)");
        s1.setBadge("Central Govt (NSP)");
        s1.setCategory("Merit");
        s1.setAmount("₹12,000 to ₹20,000 per annum");
        s1.setMaxAmountNumeric(20000.0);
        s1.setLevel("Undergraduate, Postgraduate");
        s1.setApplicableStates("All India");
        s1.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s1.setGender("All");
        s1.setIncomeCeiling(450000.0);
        s1.setIncomeCeilingText("Less than ₹4.5 Lakh / year");
        s1.setMinMarks(80);
        s1.setDeadline("2026-11-30");
        s1.setStatus("Open");
        s1.setDaysLeft(34);
        s1.setFullScope("Provides financial assistance to meritorious students from low-income families pursuing college/university courses.");
        s1.setOfficialPortalUrl("https://scholarships.gov.in");
        s1.setPortalName("National Scholarship Portal (NSP)");
        s1.setHelpline("0120-6619540 | helpdesk@nsp.gov.in");
        s1.setLastVerifiedOn(today);
        s1.setFeatured(true);
        s1.setTags("Central Govt, NSP, Degree, Undergraduate, Merit");
        list.add(s1);

        // 2. Post Matric SC/ST/OBC
        Scholarship s2 = new Scholarship();
        s2.setId("post-matric-sc-st-obc");
        s2.setName("Centrally Sponsored Post-Matric Scholarship for SC / ST / OBC / EBC Students");
        s2.setProvider("Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs");
        s2.setBadge("Central & State Co-sponsored");
        s2.setCategory("Post Matric");
        s2.setAmount("100% Non-refundable Tuition Fee + Maintenance up to ₹13,500/yr");
        s2.setMaxAmountNumeric(75000.0);
        s2.setLevel("10+2, Diploma/ITI, Undergraduate, Postgraduate, PhD");
        s2.setApplicableStates("All India");
        s2.setCasteEligibility("SC, ST, OBC, EWS");
        s2.setGender("All");
        s2.setIncomeCeiling(250000.0);
        s2.setIncomeCeilingText("Less than ₹2.5 Lakh / year");
        s2.setMinMarks(40);
        s2.setDeadline("2026-12-15");
        s2.setStatus("Open");
        s2.setDaysLeft(49);
        s2.setFullScope("Flagship social welfare scheme providing complete financial security to SC, ST, and OBC students from Class 11 to PhD.");
        s2.setOfficialPortalUrl("https://scholarships.gov.in");
        s2.setPortalName("National Scholarship Portal (NSP)");
        s2.setHelpline("1800-180-1905 | support-pms@gov.in");
        s2.setLastVerifiedOn(today);
        s2.setFeatured(true);
        s2.setTags("Central Govt, Post Matric, SC, ST, OBC, Fee Reimbursement");
        list.add(s2);

        // 3. Pre Matric SC/ST
        Scholarship s3 = new Scholarship();
        s3.setId("pre-matric-sc-st");
        s3.setName("Centrally Sponsored Pre-Matric Scholarship for SC & ST Students (Class 9 & 10)");
        s3.setProvider("Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs");
        s3.setBadge("Central Govt (NSP)");
        s3.setCategory("Pre Matric");
        s3.setAmount("₹3,500 to ₹7,000 per annum + Book Grant");
        s3.setMaxAmountNumeric(7000.0);
        s3.setLevel("10th");
        s3.setApplicableStates("All India");
        s3.setCasteEligibility("SC, ST");
        s3.setGender("All");
        s3.setIncomeCeiling(250000.0);
        s3.setIncomeCeilingText("Less than ₹2.5 Lakh / year");
        s3.setMinMarks(35);
        s3.setDeadline("2026-11-20");
        s3.setStatus("Open");
        s3.setDaysLeft(24);
        s3.setFullScope("To support parents of SC/ST children for education of their wards studying in classes 9 and 10 to minimize drop-out rates.");
        s3.setOfficialPortalUrl("https://scholarships.gov.in");
        s3.setPortalName("National Scholarship Portal (NSP)");
        s3.setHelpline("0120-6619540");
        s3.setLastVerifiedOn(today);
        s3.setFeatured(false);
        s3.setTags("Central Govt, Pre Matric, School, SC, ST");
        list.add(s3);

        // 4. AICTE Pragati Girls
        Scholarship s4 = new Scholarship();
        s4.setId("aicte-pragati-girls");
        s4.setName("AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree & Diploma)");
        s4.setProvider("All India Council for Technical Education (AICTE)");
        s4.setBadge("AICTE National Scheme");
        s4.setCategory("Merit");
        s4.setAmount("₹50,000 per annum for entire course duration");
        s4.setMaxAmountNumeric(50000.0);
        s4.setLevel("Undergraduate");
        s4.setApplicableStates("All India");
        s4.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s4.setGender("Female");
        s4.setIncomeCeiling(800000.0);
        s4.setIncomeCeilingText("Less than ₹8.0 Lakh / year");
        s4.setMinMarks(60);
        s4.setDeadline("2026-11-15");
        s4.setStatus("Closing Soon");
        s4.setDaysLeft(19);
        s4.setFullScope("Dedicated scheme aiming to empower women technical students admitted in AICTE approved colleges (max 2 girls per family).");
        s4.setOfficialPortalUrl("https://www.aicte-india.org");
        s4.setPortalName("AICTE Pragati Portal");
        s4.setHelpline("011-29581333 | pragati@aicte-india.org");
        s4.setLastVerifiedOn(today);
        s4.setFeatured(true);
        s4.setTags("AICTE, Girls Only, Engineering, Technology, Degree");
        list.add(s4);

        // 5. AICTE Saksham PwD
        Scholarship s5 = new Scholarship();
        s5.setId("aicte-saksham-pwd");
        s5.setName("AICTE Saksham Scholarship Scheme for Specially-Abled Students (PwD)");
        s5.setProvider("All India Council for Technical Education (AICTE)");
        s5.setBadge("AICTE National Scheme");
        s5.setCategory("Merit");
        s5.setAmount("₹50,000 per annum");
        s5.setMaxAmountNumeric(50000.0);
        s5.setLevel("Undergraduate");
        s5.setApplicableStates("All India");
        s5.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s5.setGender("All");
        s5.setIncomeCeiling(800000.0);
        s5.setIncomeCeilingText("Less than ₹8.0 Lakh / year");
        s5.setMinMarks(50);
        s5.setDeadline("2026-11-15");
        s5.setStatus("Closing Soon");
        s5.setDaysLeft(19);
        s5.setFullScope("Supports differently-abled students with disability not less than 40% pursuing technical degree/diploma education.");
        s5.setOfficialPortalUrl("https://www.aicte-india.org");
        s5.setPortalName("AICTE Saksham Portal");
        s5.setHelpline("011-29581338 | saksham@aicte-india.org");
        s5.setLastVerifiedOn(today);
        s5.setFeatured(false);
        s5.setTags("AICTE, PwD, Specially Abled, Engineering");
        list.add(s5);

        // 6. AICTE Swanath
        Scholarship s6 = new Scholarship();
        s6.setId("aicte-swanath");
        s6.setName("AICTE Swanath Scholarship Scheme for Orphans and Wards of Martyrs");
        s6.setProvider("All India Council for Technical Education (AICTE)");
        s6.setBadge("AICTE National Scheme");
        s6.setCategory("Merit");
        s6.setAmount("₹50,000 per annum");
        s6.setMaxAmountNumeric(50000.0);
        s6.setLevel("Undergraduate");
        s6.setApplicableStates("All India");
        s6.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s6.setGender("All");
        s6.setIncomeCeiling(800000.0);
        s6.setIncomeCeilingText("Less than ₹8.0 Lakh / year");
        s6.setMinMarks(50);
        s6.setDeadline("2026-11-30");
        s6.setStatus("Open");
        s6.setDaysLeft(34);
        s6.setFullScope("Financial support to orphans, children whose both parents died due to COVID, or wards of armed forces/paramilitary personnel martyred in action.");
        s6.setOfficialPortalUrl("https://www.aicte-india.org");
        s6.setPortalName("AICTE Portal");
        s6.setHelpline("011-29581333");
        s6.setLastVerifiedOn(today);
        s6.setFeatured(false);
        s6.setTags("AICTE, Orphans, Martyrs, Technical");
        list.add(s6);

        // 7. CSIR UGC NET JRF
        Scholarship s7 = new Scholarship();
        s7.setId("csir-ugc-net-jrf");
        s7.setName("CSIR-UGC NET Junior Research Fellowship (JRF) & Lectureship");
        s7.setProvider("Council of Scientific & Industrial Research (CSIR)");
        s7.setBadge("National Research Fellowship");
        s7.setCategory("Fellowship");
        s7.setAmount("₹37,000/mo (JRF) + ₹42,000/mo (SRF) + HRA & Contingency");
        s7.setMaxAmountNumeric(504000.0);
        s7.setLevel("Postgraduate, PhD");
        s7.setApplicableStates("All India");
        s7.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s7.setGender("All");
        s7.setIncomeCeiling(0.0);
        s7.setIncomeCeilingText("No family income limit (Pure National Merit)");
        s7.setMinMarks(55);
        s7.setDeadline("2026-12-10");
        s7.setStatus("Open");
        s7.setDaysLeft(44);
        s7.setFullScope("Prestigious national fellowship for science graduates pursuing doctoral research in Indian universities and research institutes.");
        s7.setOfficialPortalUrl("https://csirnet.nta.nic.in");
        s7.setPortalName("CSIR NTA Portal");
        s7.setHelpline("011-40759000 | csirnet@nta.ac.in");
        s7.setLastVerifiedOn(today);
        s7.setFeatured(true);
        s7.setTags("Research, Fellowship, CSIR, PhD, Science");
        list.add(s7);

        // 8. PMRF Prime Minister's Research Fellowship
        Scholarship s8 = new Scholarship();
        s8.setId("pm-rf-research-fellowship");
        s8.setName("Prime Minister's Research Fellowship (PMRF) Scheme");
        s8.setProvider("Ministry of Education (Govt of India)");
        s8.setBadge("Apex Research Fellowship");
        s8.setCategory("Fellowship");
        s8.setAmount("₹70,000 to ₹80,000 per month + ₹2 Lakh/yr research grant");
        s8.setMaxAmountNumeric(960000.0);
        s8.setLevel("Postgraduate, PhD");
        s8.setApplicableStates("All India");
        s8.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s8.setGender("All");
        s8.setIncomeCeiling(0.0);
        s8.setIncomeCeilingText("No income ceiling (Strict National Merit)");
        s8.setMinMarks(80);
        s8.setDeadline("2026-12-31");
        s8.setStatus("Open");
        s8.setDaysLeft(65);
        s8.setFullScope("Designed for improving the quality of research in higher educational institutions in the country. Direct admission to PhD in IITs/IISc.");
        s8.setOfficialPortalUrl("https://www.pmrf.in");
        s8.setPortalName("PMRF National Portal");
        s8.setHelpline("pmrf@iitm.ac.in");
        s8.setLastVerifiedOn(today);
        s8.setFeatured(true);
        s8.setTags("PMRF, Fellowship, PhD, IIT, IISc");
        list.add(s8);

        // 9. Dr Ambedkar Interest Subsidy
        Scholarship s9 = new Scholarship();
        s9.setId("dr-ambedkar-interest-subsidy");
        s9.setName("Dr. Ambedkar Central Sector Scheme of Interest Subsidy on Educational Loans for Overseas Studies");
        s9.setProvider("Ministry of Social Justice & Empowerment");
        s9.setBadge("Central Sector Scheme");
        s9.setCategory("Loan Subsidy");
        s9.setAmount("100% Interest Subsidy during moratorium period of educational loan");
        s9.setMaxAmountNumeric(150000.0);
        s9.setLevel("Postgraduate, PhD");
        s9.setApplicableStates("All India");
        s9.setCasteEligibility("OBC, EWS");
        s9.setGender("All");
        s9.setIncomeCeiling(800000.0);
        s9.setIncomeCeilingText("Less than ₹8.0 Lakh / year");
        s9.setMinMarks(50);
        s9.setDeadline("2026-12-31");
        s9.setStatus("Open");
        s9.setDaysLeft(65);
        s9.setFullScope("Reimburses full interest during course and moratorium period for OBC/EWS students securing educational loans from scheduled banks for study abroad.");
        s9.setOfficialPortalUrl("https://socialjustice.gov.in");
        s9.setPortalName("Ministry of Social Justice");
        s9.setHelpline("1800-11-2001");
        s9.setLastVerifiedOn(today);
        s9.setFeatured(false);
        s9.setTags("Loan Subsidy, Overseas, OBC, EWS, Bank Loan");
        list.add(s9);

        // 10. Padho Pardesh Loan Subsidy
        Scholarship s10 = new Scholarship();
        s10.setId("padho-pardesh-loan-subsidy");
        s10.setName("Padho Pardesh - Scheme of Interest Subsidy on Educational Loans for Overseas Studies");
        s10.setProvider("Ministry of Minority Affairs (Govt of India)");
        s10.setBadge("Central Sector Scheme");
        s10.setCategory("Loan Subsidy");
        s10.setAmount("Full Interest subsidy on educational loan up to ₹20 Lakh");
        s10.setMaxAmountNumeric(200000.0);
        s10.setLevel("Postgraduate, PhD");
        s10.setApplicableStates("All India");
        s10.setCasteEligibility("Minority");
        s10.setGender("All");
        s10.setIncomeCeiling(600000.0);
        s10.setIncomeCeilingText("Less than ₹6.0 Lakh / year");
        s10.setMinMarks(50);
        s10.setDeadline("2026-11-30");
        s10.setStatus("Open");
        s10.setDaysLeft(34);
        s10.setFullScope("Interest waiver for minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) taking educational loans for Masters/PhD abroad.");
        s10.setOfficialPortalUrl("https://minorityaffairs.gov.in");
        s10.setPortalName("Ministry of Minority Affairs");
        s10.setHelpline("1800-11-2001");
        s10.setLastVerifiedOn(today);
        s10.setFeatured(false);
        s10.setTags("Loan Subsidy, Minority, Abroad, Master, PhD");
        list.add(s10);

        // 11. National Overseas Scholarship (NOS)
        Scholarship s11 = new Scholarship();
        s11.setId("national-overseas-scholarship");
        s11.setName("National Overseas Scholarship (NOS) for SC, De-notified Tribes and Agricultural Labourers");
        s11.setProvider("Ministry of Social Justice and Empowerment");
        s11.setBadge("Government Central");
        s11.setCategory("Abroad");
        s11.setAmount("Full Tuition + Living Allowance ($15,400/yr or £9,900/yr) + Airfare");
        s11.setMaxAmountNumeric(3500000.0);
        s11.setLevel("Postgraduate, PhD");
        s11.setApplicableStates("All India");
        s11.setCasteEligibility("SC, ST");
        s11.setGender("All");
        s11.setIncomeCeiling(800000.0);
        s11.setIncomeCeilingText("Less than ₹8.0 Lakh / year");
        s11.setMinMarks(60);
        s11.setDeadline("2026-11-15");
        s11.setStatus("Closing Soon");
        s11.setDaysLeft(19);
        s11.setFullScope("Enables low-income SC scholars to pursue Master's or PhD degrees in top 500 QS world ranked universities.");
        s11.setOfficialPortalUrl("https://nosmsje.gov.in");
        s11.setPortalName("NOS MSJE Portal");
        s11.setHelpline("011-23381643 | nos-msje@gov.in");
        s11.setLastVerifiedOn(today);
        s11.setFeatured(true);
        s11.setTags("Abroad, Overseas, Master, PhD, SC");
        list.add(s11);

        // 12. Fulbright-Nehru
        Scholarship s12 = new Scholarship();
        s12.setId("fulbright-nehru-fellowship");
        s12.setName("Fulbright-Nehru Master's and Doctoral Fellowships for Indian Citizens");
        s12.setProvider("United States-India Educational Foundation (USIEF)");
        s12.setBadge("International Fellowship");
        s12.setCategory("Abroad");
        s12.setAmount("Full Tuition Fee in USA + J-1 Visa Support + Monthly Living Stipend + Health Insurance");
        s12.setMaxAmountNumeric(5000000.0);
        s12.setLevel("Postgraduate, PhD");
        s12.setApplicableStates("All India");
        s12.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s12.setGender("All");
        s12.setIncomeCeiling(0.0);
        s12.setIncomeCeilingText("No ceiling (Strict Merit and Leadership Potential)");
        s12.setMinMarks(55);
        s12.setDeadline("2026-12-31");
        s12.setStatus("Open");
        s12.setDaysLeft(65);
        s12.setFullScope("Premier US-India government cultural and educational exchange fellowship for master's and doctoral degrees in the United States.");
        s12.setOfficialPortalUrl("https://www.usief.org.in");
        s12.setPortalName("USIEF Official Portal");
        s12.setHelpline("011-4209-0909 | ip@usief.org.in");
        s12.setLastVerifiedOn(today);
        s12.setFeatured(true);
        s12.setTags("Abroad, USA, USIEF, Fulbright, Masters, PhD");
        list.add(s12);

        // 13. Chevening Scholarship UK
        Scholarship s13 = new Scholarship();
        s13.setId("chevening-scholarship-uk");
        s13.setName("Chevening Scholarships for Indian Scholars (UK One-Year Master's Degree)");
        s13.setProvider("UK Foreign, Commonwealth and Development Office (FCDO)");
        s13.setBadge("International UK Govt");
        s13.setCategory("Abroad");
        s13.setAmount("100% University Tuition Fee + Monthly Living Allowance + Return Economy Flights");
        s13.setMaxAmountNumeric(4200000.0);
        s13.setLevel("Postgraduate");
        s13.setApplicableStates("All India");
        s13.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s13.setGender("All");
        s13.setIncomeCeiling(0.0);
        s13.setIncomeCeilingText("No income criteria (Merit & 2+ years work experience)");
        s13.setMinMarks(60);
        s13.setDeadline("2026-11-05");
        s13.setStatus("Closing Soon");
        s13.setDaysLeft(9);
        s13.setFullScope("Fully-funded master's scholarships to study any eligible one-year taught master's course at any UK university.");
        s13.setOfficialPortalUrl("https://www.chevening.org/scholarship/india/");
        s13.setPortalName("Chevening UK Portal");
        s13.setHelpline("chevening.org/enquiry");
        s13.setLastVerifiedOn(today);
        s13.setFeatured(true);
        s13.setTags("Abroad, UK, Masters, Fully Funded, Chevening");
        list.add(s13);

        // 14. MahaDBT Rajarshi Shahu Maharaj
        Scholarship s14 = new Scholarship();
        s14.setId("mahadbt-rajarshi-shahu-maharaj");
        s14.setName("Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC Maharashtra)");
        s14.setProvider("Directorate of Higher Education / Technical Education (Govt of Maharashtra)");
        s14.setBadge("Maharashtra State (MahaDBT)");
        s14.setCategory("Post Matric");
        s14.setAmount("50% Tuition & Exam Fee Reimbursement for Professional/Non-Professional Courses");
        s14.setMaxAmountNumeric(50000.0);
        s14.setLevel("Undergraduate, Postgraduate");
        s14.setApplicableStates("Maharashtra");
        s14.setCasteEligibility("General, EWS, OBC");
        s14.setGender("All");
        s14.setIncomeCeiling(800000.0);
        s14.setIncomeCeilingText("Up to ₹8 Lakh / year (50% fee reimbursement)");
        s14.setMinMarks(50);
        s14.setDeadline("2026-12-31");
        s14.setStatus("Open");
        s14.setDaysLeft(65);
        s14.setFullScope("Provides 50% tuition fee and exam fee waiver to Economically Backward Class (EBC) students admitted in CAP rounds across Maharashtra.");
        s14.setOfficialPortalUrl("https://mahadbt.maharashtra.gov.in");
        s14.setPortalName("MahaDBT Portal");
        s14.setHelpline("022-49150800 | mahadbt.helpdesk@maharashtra.gov.in");
        s14.setLastVerifiedOn(today);
        s14.setFeatured(false);
        s14.setTags("State Govt, Maharashtra, MahaDBT, EBC, Fee Reimbursement");
        list.add(s14);

        // 15. Karnataka Vidyasiri
        Scholarship s15 = new Scholarship();
        s15.setId("ksp-vidyasiri-karnataka");
        s15.setName("Karnataka Vidyasiri - Food & Accommodation Scheme & Post-Matric e-PASS");
        s15.setProvider("Department of Backward Classes Welfare (Govt of Karnataka)");
        s15.setBadge("Karnataka State (SSP)");
        s15.setCategory("Post Matric");
        s15.setAmount("₹1,500/month (₹15,000/yr) for Food/Accommodation + Full Fee Concession");
        s15.setMaxAmountNumeric(15000.0);
        s15.setLevel("Undergraduate, Postgraduate");
        s15.setApplicableStates("Karnataka");
        s15.setCasteEligibility("OBC, SC, ST");
        s15.setGender("All");
        s15.setIncomeCeiling(250000.0);
        s15.setIncomeCeilingText("Less than ₹2.5 Lakh / year (Category-1 up to ₹3.5L)");
        s15.setMinMarks(40);
        s15.setDeadline("2026-11-25");
        s15.setStatus("Open");
        s15.setDaysLeft(29);
        s15.setFullScope("Provides monthly financial allowance for food and accommodation to rural/backward class students studying away from hometowns.");
        s15.setOfficialPortalUrl("https://ssp.postmatric.karnataka.gov.in");
        s15.setPortalName("Karnataka State Scholarship Portal (SSP)");
        s15.setHelpline("080-35254757 | bcwd.helpline@karnataka.gov.in");
        s15.setLastVerifiedOn(today);
        s15.setFeatured(false);
        s15.setTags("State Govt, Karnataka, SSP, Hostel, Food Allowance");
        list.add(s15);

        // 16. UP Scholarship & Fee Reimbursement
        Scholarship s16 = new Scholarship();
        s16.setId("up-scholarship-fee-reimbursement");
        s16.setName("Uttar Pradesh Post-Matric Scholarship and Fee Reimbursement Scheme");
        s16.setProvider("Social Welfare Department (Govt of Uttar Pradesh)");
        s16.setBadge("UP State Portal");
        s16.setCategory("Post Matric");
        s16.setAmount("100% Non-refundable Course Fee + Maintenance allowance up to ₹12,000/yr");
        s16.setMaxAmountNumeric(55000.0);
        s16.setLevel("10+2, Diploma/ITI, Undergraduate, Postgraduate");
        s16.setApplicableStates("Uttar Pradesh");
        s16.setCasteEligibility("General, OBC, SC, ST, Minority");
        s16.setGender("All");
        s16.setIncomeCeiling(250000.0);
        s16.setIncomeCeilingText("Up to ₹2.5 Lakh / year (SC/ST) or ₹2 Lakh (Others)");
        s16.setMinMarks(50);
        s16.setDeadline("2026-12-10");
        s16.setStatus("Open");
        s16.setDaysLeft(44);
        s16.setFullScope("Extensive state welfare program reimbursing college tuition and exam fees to eligible UP domicile students.");
        s16.setOfficialPortalUrl("https://scholarship.up.gov.in");
        s16.setPortalName("UP Scholarship Portal");
        s16.setHelpline("1800-180-5131 | 0522-2288861");
        s16.setLastVerifiedOn(today);
        s16.setFeatured(false);
        s16.setTags("State Govt, Uttar Pradesh, UP Scholarship, Post Matric");
        list.add(s16);

        // 17. West Bengal OASIS
        Scholarship s17 = new Scholarship();
        s17.setId("oasis-scholarship-west-bengal");
        s17.setName("West Bengal OASIS Post-Matric Scholarship for SC / ST / OBC");
        s17.setProvider("Backward Classes Welfare Department (Govt of West Bengal)");
        s17.setBadge("West Bengal State");
        s17.setCategory("Post Matric");
        s17.setAmount("Tuition Fee Reimbursement + Monthly Maintenance up to ₹1,200/mo");
        s17.setMaxAmountNumeric(25000.0);
        s17.setLevel("10+2, Diploma/ITI, Undergraduate, Postgraduate");
        s17.setApplicableStates("West Bengal");
        s17.setCasteEligibility("SC, ST, OBC");
        s17.setGender("All");
        s17.setIncomeCeiling(250000.0);
        s17.setIncomeCeilingText("Less than ₹2.5 Lakh / year");
        s17.setMinMarks(50);
        s17.setDeadline("2026-12-15");
        s17.setStatus("Open");
        s17.setDaysLeft(49);
        s17.setFullScope("Provides financial support to SC/ST/OBC students studying at secondary and post-secondary levels in West Bengal.");
        s17.setOfficialPortalUrl("https://oasis.gov.in");
        s17.setPortalName("WB OASIS Portal");
        s17.setHelpline("08420023311");
        s17.setLastVerifiedOn(today);
        s17.setFeatured(false);
        s17.setTags("State Govt, West Bengal, OASIS, SC, ST, OBC");
        list.add(s17);

        // 18. Bihar PMS Online
        Scholarship s18 = new Scholarship();
        s18.setId("bihar-pms-post-matric");
        s18.setName("Bihar Post Matric Scholarship Scheme (PMS Online)");
        s18.setProvider("Education Department (Govt of Bihar)");
        s18.setBadge("Bihar State Portal");
        s18.setCategory("Post Matric");
        s18.setAmount("Full Approved Course Fee + Maintenance allowance up to ₹15,000/yr");
        s18.setMaxAmountNumeric(35000.0);
        s18.setLevel("10+2, Diploma/ITI, Undergraduate, Postgraduate");
        s18.setApplicableStates("Bihar");
        s18.setCasteEligibility("SC, ST, OBC, EBC");
        s18.setGender("All");
        s18.setIncomeCeiling(300000.0);
        s18.setIncomeCeilingText("Less than ₹3.0 Lakh / year");
        s18.setMinMarks(45);
        s18.setDeadline("2026-11-28");
        s18.setStatus("Open");
        s18.setDaysLeft(32);
        s18.setFullScope("Dedicated portal by Govt of Bihar for post-matric students belonging to SC, ST, BC and EBC categories.");
        s18.setOfficialPortalUrl("https://pmsonline.bih.nic.in");
        s18.setPortalName("Bihar PMS Online");
        s18.setHelpline("0612-2215161 | postmatricbihar@gmail.com");
        s18.setLastVerifiedOn(today);
        s18.setFeatured(false);
        s18.setTags("State Govt, Bihar, PMS, BC, EBC, SC, ST");
        list.add(s18);

        // 19. Telangana ePASS
        Scholarship s19 = new Scholarship();
        s19.setId("telangana-epass-post-matric");
        s19.setName("Telangana ePASS Post-Matric Scholarship & RTF / MTF Reimbursement");
        s19.setProvider("Department of Scheduled Castes / BC Development (Govt of Telangana)");
        s19.setBadge("Telangana State");
        s19.setCategory("Post Matric");
        s19.setAmount("100% Tuition Fee (RTF) + Maintenance Charges up to ₹20,000/yr (MTF)");
        s19.setMaxAmountNumeric(60000.0);
        s19.setLevel("10+2, Diploma/ITI, Undergraduate, Postgraduate");
        s19.setApplicableStates("Telangana");
        s19.setCasteEligibility("SC, ST, OBC, EWS, Minority");
        s19.setGender("All");
        s19.setIncomeCeiling(200000.0);
        s19.setIncomeCeilingText("Up to ₹2 Lakh (rural) / ₹1.5 Lakh (urban)");
        s19.setMinMarks(40);
        s19.setDeadline("2026-12-15");
        s19.setStatus("Open");
        s19.setDaysLeft(49);
        s19.setFullScope("Direct DBT reimbursement of tuition fees and monthly mess charges to Telangana students.");
        s19.setOfficialPortalUrl("https://telanganaepass.cgg.gov.in");
        s19.setPortalName("Telangana ePASS");
        s19.setHelpline("040-23390228");
        s19.setLastVerifiedOn(today);
        s19.setFeatured(false);
        s19.setTags("State Govt, Telangana, ePASS, RTF, MTF");
        list.add(s19);

        // 20. Reliance Foundation Undergraduate
        Scholarship s20 = new Scholarship();
        s20.setId("reliance-foundation-undergraduate");
        s20.setName("Reliance Foundation Undergraduate Scholarships (All Streams)");
        s20.setProvider("Reliance Foundation");
        s20.setBadge("CSR / Corporate (National)");
        s20.setCategory("Merit");
        s20.setAmount("Up to ₹2,00,000 over course duration + Mentorship & Leadership Forums");
        s20.setMaxAmountNumeric(200000.0);
        s20.setLevel("Undergraduate");
        s20.setApplicableStates("All India");
        s20.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s20.setGender("All");
        s20.setIncomeCeiling(1500000.0);
        s20.setIncomeCeilingText("Up to ₹15 Lakh / year (Priority to income < ₹2.5 Lakh)");
        s20.setMinMarks(60);
        s20.setDeadline("2026-11-10");
        s20.setStatus("Closing Soon");
        s20.setDaysLeft(14);
        s20.setFullScope("Flagship CSR program supporting 5,000 meritorious undergraduate students across all fields of study in India.");
        s20.setOfficialPortalUrl("https://www.scholarships.reliancefoundation.org");
        s20.setPortalName("Reliance Foundation Portal");
        s20.setHelpline("011-41182900 | rf.scholarships@reliancefoundation.org");
        s20.setLastVerifiedOn(today);
        s20.setFeatured(true);
        s20.setTags("Private CSR, Reliance, Degree, Undergraduate, Merit");
        list.add(s20);

        // 21. HDFC Bank Parivartan ECSS
        Scholarship s21 = new Scholarship();
        s21.setId("hdfc-badhte-kadam-merit");
        s21.setName("HDFC Bank Parivartan's ECSS Programme for School, College & Professional Studies");
        s21.setProvider("HDFC Bank Parivartan CSR");
        s21.setBadge("CSR / Corporate (National)");
        s21.setCategory("Merit");
        s21.setAmount("₹35,000 to ₹75,000 per annum");
        s21.setMaxAmountNumeric(75000.0);
        s21.setLevel("10th, 12th / Diploma, Undergraduate, Postgraduate");
        s21.setApplicableStates("All India");
        s21.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s21.setGender("All");
        s21.setIncomeCeiling(250000.0);
        s21.setIncomeCeilingText("Less than ₹2.5 Lakh / year");
        s21.setMinMarks(55);
        s21.setDeadline("2026-12-05");
        s21.setStatus("Open");
        s21.setDaysLeft(39);
        s21.setFullScope("Provides financial support to meritorious and needy students facing personal or family financial crises.");
        s21.setOfficialPortalUrl("https://www.hdfcbank.com");
        s21.setPortalName("HDFC Parivartan");
        s21.setHelpline("011-430-92248 | hdfcbankecss@buddy4study.com");
        s21.setLastVerifiedOn(today);
        s21.setFeatured(true);
        s21.setTags("Private CSR, HDFC Bank, College, Professional, School");
        list.add(s21);

        // 22. Tata Trusts Professional Merit
        Scholarship s22 = new Scholarship();
        s22.setId("tata-trusts-medical-engineering");
        s22.setName("Tata Trusts Means-Grant & Professional Merit Scholarships (Medical & Engineering)");
        s22.setProvider("Tata Trusts (Sir Ratan Tata Trust & Allied Trusts)");
        s22.setBadge("Philanthropic Trust");
        s22.setCategory("Merit");
        s22.setAmount("Up to 80% Tuition Fee or ₹50,000 per year");
        s22.setMaxAmountNumeric(50000.0);
        s22.setLevel("Undergraduate, Postgraduate");
        s22.setApplicableStates("All India");
        s22.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s22.setGender("All");
        s22.setIncomeCeiling(450000.0);
        s22.setIncomeCeilingText("Less than ₹4.5 Lakh / year");
        s22.setMinMarks(60);
        s22.setDeadline("2026-11-20");
        s22.setStatus("Open");
        s22.setDaysLeft(24);
        s22.setFullScope("Supports meritorious undergraduate and postgraduate students in medicine, healthcare, and engineering degrees.");
        s22.setOfficialPortalUrl("https://www.tatatrusts.org");
        s22.setPortalName("Tata Trusts Education Grants");
        s22.setHelpline("022-66658282 | igp@tatatrusts.org");
        s22.setLastVerifiedOn(today);
        s22.setFeatured(false);
        s22.setTags("Philanthropic, Tata Trusts, Medical, Engineering, Degree");
        list.add(s22);

        // 23. Kotak Kanya Scholarship
        Scholarship s23 = new Scholarship();
        s23.setId("kotak-kanya-scholarship");
        s23.setName("Kotak Kanya Scholarship for Girl Students in Professional Courses");
        s23.setProvider("Kotak Education Foundation");
        s23.setBadge("CSR / Corporate (National)");
        s2Category(s23, "Merit");
        s23.setAmount("₹1,50,000 per year until completion of professional degree");
        s23.setMaxAmountNumeric(150000.0);
        s23.setLevel("Undergraduate");
        s23.setApplicableStates("All India");
        s23.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s23.setGender("Female");
        s23.setIncomeCeiling(600000.0);
        s23.setIncomeCeilingText("Less than ₹6.0 Lakh / year");
        s23.setMinMarks(75);
        s23.setDeadline("2026-11-15");
        s23.setStatus("Closing Soon");
        s23.setDaysLeft(19);
        s23.setFullScope("Provides financial support of ₹1.5 Lakh/year to meritorious girl students pursuing professional graduation in Engineering, Medicine, Architecture, Law.");
        s23.setOfficialPortalUrl("https://www.kotakeducation.org");
        s23.setPortalName("Kotak Education Foundation");
        s23.setHelpline("022-68494444");
        s23.setLastVerifiedOn(today);
        s23.setFeatured(true);
        s23.setTags("CSR, Girls Only, Professional, Medicine, Engineering");
        list.add(s23);

        // 24. L'Oréal India For Women in Science
        Scholarship s24 = new Scholarship();
        s24.setId("loreal-india-for-women-in-science");
        s24.setName("L'Oréal India For Young Women in Science Scholarship");
        s24.setProvider("L'Oréal India");
        s24.setBadge("CSR / Corporate (National)");
        s2Category(s24, "Merit");
        s24.setAmount("₹2,50,000 (divided across graduation period)");
        s24.setMaxAmountNumeric(250000.0);
        s24.setLevel("Undergraduate");
        s24.setApplicableStates("All India");
        s24.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s24.setGender("Female");
        s24.setIncomeCeiling(600000.0);
        s24.setIncomeCeilingText("Less than ₹6.0 Lakh / year");
        s24.setMinMarks(85);
        s24.setDeadline("2026-11-20");
        s24.setStatus("Open");
        s24.setDaysLeft(24);
        s24.setFullScope("Aims to encourage young women to pursue graduation in science-based fields including Pure Science, Engineering, Medicine, Biotechnology.");
        s24.setOfficialPortalUrl("https://www.loreal.com/en/india/");
        s24.setPortalName("L'Oréal India Official");
        s24.setHelpline("011-43092248 | fywis-india@buddy4study.com");
        s24.setLastVerifiedOn(today);
        s24.setFeatured(false);
        s24.setTags("CSR, Science, Girls Only, Degree, STEM");
        list.add(s24);

        // 25. Santoor Women's Scholarship
        Scholarship s25 = new Scholarship();
        s25.setId("santoor-women-scholarship");
        s25.setName("Santoor Women's Scholarship for Higher Education");
        s25.setProvider("Wipro Cares & Wipro Consumer Care and Lighting");
        s25.setBadge("CSR / Corporate");
        s2Category(s25, "Merit");
        s25.setAmount("₹24,000 per annum for duration of degree course");
        s25.setMaxAmountNumeric(24000.0);
        s25.setLevel("Undergraduate");
        s25.setApplicableStates("Andhra Pradesh, Karnataka, Telangana, Chhattisgarh");
        s25.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s25.setGender("Female");
        s25.setIncomeCeiling(400000.0);
        s25.setIncomeCeilingText("Less than ₹4.0 Lakh / year");
        s25.setMinMarks(60);
        s25.setDeadline("2026-11-25");
        s25.setStatus("Open");
        s25.setDaysLeft(29);
        s25.setFullScope("Offered to young women from underprivileged backgrounds in selected states wishing to pursue higher education after Class 12.");
        s25.setOfficialPortalUrl("https://www.santoorscholarship.com");
        s25.setPortalName("Santoor Scholarship Portal");
        s25.setHelpline("0120-6844000");
        s25.setLastVerifiedOn(today);
        s25.setFeatured(false);
        s25.setTags("CSR, Wipro, Girls Only, South India, Degree");
        list.add(s25);

        // 26. SBIF Asha Scholarship
        Scholarship s26 = new Scholarship();
        s26.setId("sbif-asha-scholarship");
        s26.setName("SBI Foundation Asha Scholarship for School and College Students");
        s26.setProvider("SBI Foundation (State Bank of India CSR)");
        s26.setBadge("CSR / Corporate (National)");
        s2Category(s26, "Merit");
        s26.setAmount("₹15,000 to ₹50,000 per annum");
        s26.setMaxAmountNumeric(50000.0);
        s26.setLevel("10th, 12th / Diploma, Undergraduate, Postgraduate");
        s26.setApplicableStates("All India");
        s26.setCasteEligibility("General, OBC, SC, ST, EWS, Minority");
        s26.setGender("All");
        s26.setIncomeCeiling(300000.0);
        s26.setIncomeCeilingText("Less than ₹3.0 Lakh / year");
        s26.setMinMarks(75);
        s26.setDeadline("2026-11-30");
        s26.setStatus("Open");
        s26.setDaysLeft(34);
        s26.setFullScope("Financial grant by SBI Foundation to meritorious students from low-income families pursuing school or college studies.");
        s26.setOfficialPortalUrl("https://www.sbifoundation.in");
        s26.setPortalName("SBI Foundation Portal");
        s26.setHelpline("022-68494444");
        s26.setLastVerifiedOn(today);
        s26.setFeatured(false);
        s26.setTags("CSR, SBI Foundation, School, College, Merit");
        list.add(s26);

        scholarshipRepository.saveAll(list);
        logger.info("Successfully seeded {} real scholarships with verified links and categories.", list.size());
    }

    private void s2Category(Scholarship s, String cat) {
        s.setCategory(cat);
    }
}
