export interface ComplianceStandard {
  clause: string;
  title: string;
  division: string;
  summary: string;
  requirements: string[];
}

export interface CredentialPolicySection {
  section: string;
  title: string;
  group: "Training and assessment" | "TAE delivery" | "Validation";
  summary: string;
  requirements: string[];
  note?: string;
}

export const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  {
    clause: "Clause 7",
    title: "Marketing and Advertising",
    division: "Information and transparency",
    summary: "Marketing and advertising must be accurate, include the RTO registration code and truthfully represent services and training products.",
    requirements: [
      "Include the organisation’s registration code or a link to the part of the National Register where it is located.",
      "Accurately represent services, including distinguishing training and assessment that leads to AQF certification documentation from other training and assessment.",
      "Include accurate information about financial support arrangements and do not imply a connection with another person without consent.",
      "Include the code and title of any training product as published on the National Register and accurately represent products on scope.",
      "Only refer to a training product that is no longer current while it remains on scope and new enrolments are permitted.",
      "Only represent that completing a training product leads to a licensed or regulated outcome where this is confirmed by the relevant industry regulator.",
      "Identify services delivered by an engaged expert or third party, including when recruiting prospective VET students or delivering training and assessment.",
    ],
  },
  {
    clause: "Clause 8",
    title: "Guarantees and Inducements",
    division: "Information and transparency",
    summary: "RTOs must not make false guarantees about employment outcomes or use inducements that discourage independent advice.",
    requirements: [
      "Do not guarantee that a VET student will successfully complete a training product.",
      "Do not guarantee that a VET student can complete a training product in a way that is inconsistent with an instrument made under section 185 of the Act.",
      "Do not guarantee a particular employment outcome where obtaining it is outside the organisation’s control.",
    ],
  },
  {
    clause: "Clause 9",
    title: "Issuance of AQF Certification Documentation",
    division: "Integrity of nationally recognised training",
    summary: "AQF certification may only be issued for training products on scope and in line with the AQF Qualifications Issuance Policy.",
    requirements: [
      "Do not issue AQF certification documentation unless the VET student has been assessed as meeting the requirements of the training product.",
      "Issue the documentation within 30 calendar days from completion of the assessment, provided the student has completed the qualification or relevant units and paid all agreed fees.",
    ],
  },
  {
    clause: "Clause 10",
    title: "Records of AQF Certification and Assessments",
    division: "Integrity of nationally recognised training",
    summary: "RTOs must maintain records of AQF qualifications issued and assessments submitted by students.",
    requirements: [
      "Maintain a register, in accordance with the AQF Qualifications Register Policy, of AQF qualifications the RTO is authorised to issue and AQF qualifications and statements of attainment issued to students.",
      "Retain records of AQF certification documentation for 30 years.",
      "Retain records of all assessments submitted by a student to the RTO or a third party for two years after the student completes the training product.",
      "Ensure current and previously enrolled students can access copies of retained AQF certification documentation.",
      "Provide a report of issued AQF qualifications and statements of attainment to the National VET Regulator on request.",
    ],
  },
  {
    clause: "Clause 11",
    title: "Issue of VET Qualifications and Statements of Attainment",
    division: "Integrity of nationally recognised training",
    summary: "VET qualifications and statements of attainment must meet the content requirements in the AQF Qualifications Issuance Policy.",
    requirements: [
      "Qualifications must include the organisation’s name, registration code and logo; AQF code and title; NRT logo; authorised signature; seal, corporate identifier or unique watermark; and the AQF recognition statement or authorised AQF logo.",
      "Include the industry descriptor and occupational or functional stream where listed, and the Australian Apprenticeship statement where applicable.",
      "Where any part of a qualification was delivered in another language, include the required language statement and identify the relevant units or modules.",
      "Statements of attainment must include the organisation’s name, registration code and logo; the full title and national code of each relevant unit or module; NRT logo; authorised signature; seal, corporate identifier or unique watermark; and the prescribed statement of attainment wording.",
      "Where units form part of a VET course or qualification, identify the course or qualification. Where units were attained while completing a VET course, include the prescribed course-completion wording.",
      "Where units or modules were delivered in another language, include the required language statement and identify those units or modules.",
    ],
  },
  {
    clause: "Clause 12",
    title: "Student Identifier Requirements",
    division: "Integrity of nationally recognised training",
    summary: "RTOs must meet the Student Identifiers Act 2014 requirements for Unique Student Identifiers (USIs).",
    requirements: [
      "Do not include an individual’s student identifier on a VET qualification or statement of attainment.",
      "Request the Registrar to verify that a student identifier belongs to the individual before using it for any purpose.",
      "Do not issue a VET qualification or statement of attainment unless the student has been assigned a student identifier, subject to the applicable exemptions.",
      "Where an exemption applies, inform the student before enrolment is completed or training and assessment commences that results will not be accessible through the Commonwealth or appear on an authenticated VET transcript.",
    ],
  },
  {
    clause: "Clause 13",
    title: "Nationally Recognised Training Logo",
    division: "Integrity of nationally recognised training",
    summary: "Use the NRT logo only in line with the NRT Logo Conditions of Use Policy.",
    requirements: [
      "Use the NRT logo on AQF certification documentation only for training products on scope.",
      "Do not use the NRT logo in advertising or promotional material for training that is not nationally recognised.",
      "Meet all conditions in Schedule 2 — NRT Logo Conditions of Use Policy.",
    ],
  },
  {
    clause: "Clause 14",
    title: "Transition of Training Products",
    division: "Integrity of nationally recognised training",
    summary: "When a training product is superseded, RTOs must transition students in line with regulatory requirements.",
    requirements: [
      "For a superseded training product, do not enrol new students from one year after the replacement product is added to the National Register, unless approved by the National VET Regulator.",
      "Ensure enrolled students complete the superseded product and receive AQF certification, or transfer to the replacement product in a timely manner.",
      "For a current qualification that is removed or deleted without being superseded, ensure enrolled students complete and receive certification within two years.",
      "For a skill set, unit, accredited short course or module that is removed or deleted without being superseded, ensure enrolled students complete and receive certification within one year.",
      "Do not allow individuals to commence training and assessment in a product that has expired, been removed or deleted from the National Register.",
    ],
  },
  {
    clause: "Clause 15",
    title: "Annual Declaration on Compliance",
    division: "Accountability",
    summary: "RTOs must submit an annual declaration confirming compliance with the Standards.",
    requirements: [
      "Submit an annual declaration on compliance with obligations under the Act for each annual reporting period in which the organisation is registered.",
      "Use the approved form published on the National Register by the National VET Regulator.",
    ],
  },
  {
    clause: "Clause 16",
    title: "Notification of Material Changes",
    division: "Accountability",
    summary: "RTOs must notify the Regulator of material operational changes within the required timeframes.",
    requirements: [
      "Notify the National VET Regulator within 10 business days when an event significantly affects the organisation’s ability to comply with its obligations.",
      "Notify prospective ownership changes as soon as practicable before they take effect.",
      "Notify prospective or actual governing-person changes within the required timeframe: within 10 business days if the change cannot be determined until it takes effect, or otherwise as soon as practicable before it takes effect.",
      "Give notices in writing or electronically and provide further information when requested.",
    ],
  },
  {
    clause: "Clause 17",
    title: "Third Party Arrangements",
    division: "Accountability",
    summary: "RTOs remain responsible for services delivered through third parties and must have written agreements in place.",
    requirements: [
      "Enter a written agreement before a third party delivers services. The agreement must require cooperation with audits and accurate responses to Regulator information requests.",
      "The agreement must prohibit the third party from using the NRT logo or the organisation’s branding, or issuing AQF certification documentation.",
      "Include the parties’ business or trading names, commencement and end dates, obligations for service delivery, and the organisation’s right to regularly monitor service quality.",
      "Notify the National VET Regulator of an agreement within 30 calendar days of entry or before its obligations take effect, whichever comes first, and within 30 calendar days of it ending.",
    ],
  },
  {
    clause: "Clause 18",
    title: "Prepaid Fee Protection Measures",
    division: "Accountability",
    summary: "RTOs must protect prepaid fees paid by students.",
    requirements: [
      "When prepaid fees exceed $1,500 for the same VET course, implement the applicable protection measures.",
      "Government entities and Australian universities must have a prepaid fee policy that provides an equivalent course at no extra cost or refunds fees for services not delivered above the threshold.",
      "Other RTOs must implement an unconditional financial guarantee, a current tuition assurance scheme membership, or another measure approved by the National VET Regulator.",
    ],
  },
  {
    clause: "Clause 19",
    title: "Public Liability Insurance",
    division: "Accountability",
    summary: "RTOs must hold current public liability insurance appropriate to the nature and scale of operations.",
    requirements: [
      "Hold public liability insurance covering all operations for the entire period of registration.",
    ],
  },
  {
    clause: "Clause 20",
    title: "Compliance with Laws",
    division: "Accountability",
    summary: "RTOs must comply with laws and legislative requirements relevant to their operations.",
    requirements: [
      "Comply with all applicable Commonwealth, State and Territory laws.",
      "Collect, use and disclose personal information in accordance with applicable privacy laws.",
      "Comply with applicable requirements under the Student Identifiers Act 2014.",
    ],
  },
];

export const CREDENTIAL_POLICY: CredentialPolicySection[] = [
  {
    section: "Section 1A",
    title: "Training and Assessment Credentials",
    group: "Training and assessment",
    summary: "To deliver training and assessment without direction, including making assessment judgements, the person must hold an eligible credential.",
    requirements: [
      "TAE40122 Certificate IV in Training and Assessment, or its successor.",
      "TAE40116 or TAE40110 Certificate IV in Training and Assessment.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
      "A secondary teaching qualification and TAESS00011, TAESS00019 or TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set, including its successor where applicable.",
    ],
  },
  {
    section: "Section 1B",
    title: "Assessment Only Credentials",
    group: "Training and assessment",
    summary: "To conduct assessment only, including making assessment judgements, the person must hold an eligible credential.",
    requirements: [
      "TAE40122, TAE40116 or TAE40110 Certificate IV in Training and Assessment.",
      "TAESS00019, TAESS00011 or TAESS00001 Assessor Skill Set.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
      "A secondary teaching qualification and TAESS00011, TAESS00019 or TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set, including its successor where applicable.",
    ],
  },
  {
    section: "Section 1C",
    title: "Actively Working Towards a Credential",
    group: "Training and assessment",
    summary: "A person actively working towards a training and assessment credential can deliver training and contribute to assessment under direction, but cannot make assessment judgements.",
    requirements: [
      "Be enrolled in and have commenced training towards TAE40122 Certificate IV in Training and Assessment, or its successor, or TAE50122 Diploma of Vocational Education and Training, or its successor.",
      "Make satisfactory progress so the credential can be completed within two years of commencement.",
    ],
    note: "The person must work under the direction of a trainer or assessor with a relevant Section 1E credential.",
  },
  {
    section: "Section 1D",
    title: "Training and Assessment Under Direction",
    group: "Training and assessment",
    summary: "A person with one of the credentials in this section can deliver training and contribute to assessment under direction, but cannot make assessment judgements.",
    requirements: [
      "TAESS00021 Facilitation Skill Set or its successor.",
      "TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set or its successor.",
      "TAESS00030 Volunteer Trainer Delivery and Assessment Contribution Skill Set or its successor.",
      "TAESS00029 Volunteer Trainer Delivery Skill Set or its successor.",
      "TAESS00020 Workplace Trainer Skill Set or its successor.",
      "TAESS00028 Work Skill Instructor Skill Set or its successor.",
      "TAESS00022 Young Learner Delivery Skill Set or its successor.",
      "TAESS00015 or TAESS00003 Enterprise Trainer and Assessor Skill Set.",
      "TAESS00008 or TAESS00013 Enterprise Trainer — Mentoring Skill Set.",
      "TAESS00007 or TAESS00014 Enterprise Trainer — Presenting Skill Set.",
      "A secondary teaching qualification.",
    ],
    note: "The RTO must be able to justify the relevance of the person’s credential to the VET student cohort and delivery context.",
  },
  {
    section: "Section 1E",
    title: "Providing Direction",
    group: "Training and assessment",
    summary: "A trainer or assessor providing direction is responsible for oversight, guidance and quality assurance for the person working under direction.",
    requirements: [
      "TAE40122 Certificate IV in Training and Assessment, or its successor.",
      "TAE40116 or TAE40110 Certificate IV in Training and Assessment.",
      "A secondary teaching qualification and TAESS00011, TAESS00019 or TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set, including its successor where applicable.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
    ],
  },
  {
    section: "Section 2A",
    title: "TAE Training Package — Delivery Credentials",
    group: "TAE delivery",
    summary: "To deliver training and assessment for a TAE Training Package qualification or skill set, the person must hold the qualification or skill set at least to the level being delivered.",
    requirements: [
      "For TAE40122 Certificate IV in Training and Assessment, its successor, or TAESS00019 Assessor Skill Set, its successor: TAE50122 Diploma of Vocational Education and Training, or its successor.",
      "TAE50116 or TAE50111 Diploma of Vocational Education and Training.",
      "TAE50216 or TAE50211 Diploma of Training Design and Development.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
      "For other TAE Training Package qualifications or skill sets, hold that qualification or skill set at least to the level being delivered.",
    ],
    note: "These requirements apply in addition to holding a Section 1A credential.",
  },
  {
    section: "Section 2B",
    title: "TAE Training Package — Under Direction",
    group: "TAE delivery",
    summary: "A person can deliver TAE40122, TAESS00019 or TAESS00024 training and assessment under direction, but cannot make assessment judgements.",
    requirements: [
      "TAE40122, TAE40116 or TAE40110 Certificate IV in Training and Assessment.",
      "A secondary teaching qualification and TAESS00011, TAESS00019 or TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set, including its successor where applicable.",
    ],
    note: "The person must work under the direction of a trainer or assessor with a relevant Diploma or higher-level qualification under Section 2C.",
  },
  {
    section: "Section 2C",
    title: "TAE Training Package — Providing Direction",
    group: "TAE delivery",
    summary: "The person providing direction for TAE delivery must provide oversight, guidance and quality assurance and meet the qualification requirements below.",
    requirements: [
      "TAE50122 Diploma of Vocational Education and Training, or its successor.",
      "TAE50116 or TAE50111 Diploma of Vocational Education and Training.",
      "TAE50216 or TAE50211 Diploma of Training Design and Development.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
    ],
    note: "The RTO determines the nature and extent of direction, any restrictions, and how quality remains consistent with the Outcome Standards.",
  },
  {
    section: "Section 3A",
    title: "Validation — Non-TAE Training Products",
    group: "Validation",
    summary: "For validation of a training product outside the TAE Training Package, at least one person conducting validation must hold an eligible credential.",
    requirements: [
      "TAE40122, TAE40116 or TAE40110 Certificate IV in Training and Assessment.",
      "A secondary teaching qualification and TAESS00024 VET Delivered to School Students Teacher Enhancement Skill Set, or its successor.",
      "TAESS00019, TAESS00011 or TAESS00001 Assessor Skill Set.",
      "A diploma or higher-level qualification in adult education or vocational education and training.",
    ],
  },
  {
    section: "Section 3B",
    title: "Validation — TAE Training Products",
    group: "Validation",
    summary: "For validation of TAE Training Package qualifications or skill sets, at least one validator must be qualified at or above the level being validated.",
    requirements: [
      "Hold an AQF qualification or skill set at least to the level being validated.",
      "For TAE40122, hold TAE40122 or higher.",
      "For a TAE Diploma, hold a TAE Diploma or higher.",
    ],
  },
];