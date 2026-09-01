// Official Outcome Standards content extracted from the project's companion RTO Standards Pocket Guide.
// Source framework: Standards for NVR Registered Training Organisations 2025.

export interface OfficialStandard {
  code: string;
  title: string;
  intent: string;
  performanceIndicators: string[];
}

export interface OfficialQualityArea {
  code: string;
  title: string;
  outcome: string;
  intent: string;
  standards: OfficialStandard[];
}

export const OFFICIAL_QUALITY_AREAS: OfficialQualityArea[] = [
  {
    code: "QA1",
    title: "Training and Assessment",
    outcome:
      "Quality training and assessment engages VET students and enables them to attain nationally recognised, industry relevant competencies.",
    intent:
      "Quality Area 1 focuses on training and assessment. RTOs must ensure training is well-structured and engaging, that assessment is valid and fair, and that resources are fit-for-purpose. RTOs are expected to work closely with industry to keep training current and relevant.",
    standards: [
      {
        code: "1.1",
        title:
          "Training is engaging, well-structured and enables VET students to attain skills and knowledge consistent with the training product.",
        intent:
          "Training must be engaging and structured so students can actually attain the competencies described in the training product. RTOs are expected to design learning programs that are responsive to the needs of students and industry, use appropriate delivery modes and methods, and ensure trainers actively support student learning.",
        performanceIndicators: [
          "Training delivery is responsive to the needs of the student cohort and the relevant industry.",
          "Training programs are well-structured and sequenced appropriately.",
          "Training delivery mode/s are appropriate to the training product and the needs of students.",
          "Trainers use a range of delivery methods and learning resources that facilitate student learning.",
          "Trainers actively monitor student progress and intervene where students are at risk of not completing.",
        ],
      },
      {
        code: "1.2",
        title:
          "Engagement with industry, employer and community representatives effectively informs the industry relevance of training offered by the NVR registered training organisation.",
        intent:
          "RTOs must actively engage with industry to ensure training remains relevant and responsive to workforce needs. This means consulting with industry about training design, delivery and assessment — not merely ticking a compliance box.",
        performanceIndicators: [
          "The RTO has structured and regular engagement with industry, employer and/or community representatives relevant to the training products they deliver.",
          "Industry engagement informs the design and delivery of training programs.",
          "Industry feedback is documented and used to improve training and assessment.",
          "The RTO can demonstrate the impact of industry engagement on their training programs.",
        ],
      },
      {
        code: "1.3",
        title:
          "The assessment system is fit-for-purpose and consistent with the training product.",
        intent:
          "RTOs must have an assessment system that is clearly designed to assess the competencies set out in the training product. Assessment tools and methods must be appropriate to the training product, the student cohort and the delivery context.",
        performanceIndicators: [
          "Assessment tools are designed to assess the units of competency in the training product.",
          "Assessment methods and tools are appropriate to the delivery context and student cohort.",
          "Assessment tools are contextualised where appropriate.",
          "The assessment system is documented and can be explained to students and other stakeholders.",
        ],
      },
      {
        code: "1.4",
        title:
          "The assessment system ensures assessment is conducted in a way that is fair and appropriate and enables accurate assessment judgement of VET student competency.",
        intent:
          "Assessment must be conducted fairly, consistently and accurately. Assessors must make sound assessment judgements based on sufficient evidence. Students must understand what is expected of them and have opportunities to demonstrate competency.",
        performanceIndicators: [
          "Assessors collect sufficient evidence to make accurate assessment judgements.",
          "Assessment is flexible and responsive to the needs of individual students.",
          "Students are informed of assessment requirements and processes.",
          "Assessors apply the rules of evidence (valid, sufficient, authentic, current).",
          "Assessment judgements are consistent across assessors and over time.",
        ],
      },
      {
        code: "1.5",
        title:
          "Assessment system is quality assured by appropriately skilled and credentialled persons through a regular process of validating assessment practices and judgements.",
        intent:
          "Validation is a quality assurance mechanism. RTOs must have a regular, systematic validation process that checks whether assessment tools and judgements are valid, reliable, fair and consistent. Validation must be conducted by people with appropriate credentials and industry knowledge.",
        performanceIndicators: [
          "The RTO has a systematic validation schedule covering all training products.",
          "Validation is conducted by people with appropriate credentials as set out in the Credential Policy.",
          "Validation involves people with current industry knowledge relevant to the training product.",
          "Validation outcomes are documented and used to improve assessment practices.",
          "Validation findings inform continuous improvement of the assessment system.",
        ],
      },
      {
        code: "1.6",
        title:
          "VET students with prior skills, knowledge and competencies are supported to seek recognition of prior learning to progress through the relevant training product.",
        intent:
          "RTOs must actively support students to access Recognition of Prior Learning (RPL). This means having clear, accessible RPL processes, providing information and guidance to students, and assessing RPL applications fairly and consistently.",
        performanceIndicators: [
          "Students are informed about RPL and how to access it prior to and at enrolment.",
          "The RTO has a clear and documented RPL process.",
          "RPL assessors are appropriately qualified and have current industry knowledge.",
          "RPL assessments are conducted fairly and consistently.",
          "Students receive clear outcomes and feedback on their RPL applications.",
        ],
      },
      {
        code: "1.7",
        title:
          "VET students who have completed an equivalent training product are supported to obtain a credit transfer.",
        intent:
          "RTOs must have clear credit transfer processes so students who have previously completed equivalent units or qualifications can progress without unnecessary duplication of effort.",
        performanceIndicators: [
          "Students are informed about credit transfer prior to and at enrolment.",
          "The RTO has a clear and documented credit transfer process.",
          "Credit transfer decisions are made consistently and fairly.",
          "Records of credit transfers are maintained.",
        ],
      },
      {
        code: "1.8",
        title:
          "Facilities, resources and equipment for each training product are fit-for-purpose, safe, accessible and sufficient.",
        intent:
          "RTOs must ensure that the physical and digital resources used for training and assessment are appropriate, safe, and sufficient to enable students to attain the required competencies. Resources must reflect current industry practice.",
        performanceIndicators: [
          "Facilities, resources and equipment reflect current industry practice.",
          "Facilities are safe and accessible for all students, including those with disability.",
          "Resources are sufficient for the number of students enrolled.",
          "Facilities and equipment are regularly reviewed and maintained.",
          "Learning resources (including digital resources) are current, accurate and accessible.",
        ],
      },
    ],
  },
  {
    code: "QA2",
    title: "VET Student Support",
    outcome:
      "VET students are treated fairly and properly informed, supported and protected.",
    intent:
      "Quality Area 2 focuses on the experience of VET students. RTOs have a responsibility to provide students with clear information, appropriate support, an inclusive learning environment, and effective mechanisms for raising concerns. Student wellbeing and fair treatment are central.",
    standards: [
      {
        code: "2.1",
        title:
          "VET students have access to clear and accurate information concerning the organisation, the relevant training product, and students are made aware of any changes that may affect them.",
        intent:
          "Students must be able to make informed decisions about their training. RTOs must provide clear, accurate and up-to-date information about the organisation, the training product, and any changes that may affect students during their enrolment.",
        performanceIndicators: [
          "Information provided to students is clear, accurate and up-to-date.",
          "Information includes key details: duration, cost, delivery mode, assessments, and outcomes.",
          "Students are notified promptly of any changes that may affect their training.",
          "Information is accessible in formats suited to the student cohort.",
          "Marketing materials accurately represent the training product and the RTO.",
        ],
      },
      {
        code: "2.2",
        title:
          "VET students are advised, prior to enrolment, about the suitability of the training product for them, taking into account the student's skills and competencies.",
        intent:
          "RTOs must ensure students are enrolling in training that is suitable for their needs, goals and current capabilities. Pre-enrolment advice helps students make informed choices and reduces the risk of enrolment in unsuitable training.",
        performanceIndicators: [
          "Prospective students receive pre-enrolment advice on suitability of the training product.",
          "Pre-enrolment advice considers the student's goals, current skills, and LLN needs.",
          "Students are provided with information about entry requirements.",
          "Where training is not suitable, students are directed to more appropriate options.",
        ],
      },
      {
        code: "2.3",
        title:
          "VET students have access to support services, trainers and assessors and other staff to support their progress throughout the training product.",
        intent:
          "RTOs must provide ongoing support to students throughout their training. This includes access to trainers and assessors, additional learning support where needed, and other services that help students progress and complete their training.",
        performanceIndicators: [
          "Students have timely access to trainers and assessors throughout training.",
          "Support services are available and appropriate to the student cohort.",
          "Student progress is monitored and intervention provided where needed.",
          "Students are informed about available support services at enrolment and throughout training.",
        ],
      },
      {
        code: "2.4",
        title:
          "Reasonable adjustments are made to support VET students with disability to access and participate in training and assessment on an equal basis.",
        intent:
          "RTOs have obligations under the Disability Standards for Education 2005. Students with disability must be able to participate in training on an equal basis. RTOs must engage with students to identify adjustment needs and implement reasonable adjustments without compromising assessment integrity.",
        performanceIndicators: [
          "Students with disability are supported to disclose their disability and request adjustments.",
          "Reasonable adjustments are made to training and assessment for students with disability.",
          "Adjustments do not compromise the integrity of the assessment or the competency being assessed.",
          "Students with disability are not disadvantaged in their access to training.",
        ],
      },
      {
        code: "2.5",
        title:
          "The learning environment promotes and supports the diversity of VET students.",
        intent:
          "RTOs must create a learning environment where all students feel welcome, safe and supported, regardless of their background, culture or identity. Special attention is required to cultural safety, particularly for First Nations peoples.",
        performanceIndicators: [
          "The learning environment is safe, inclusive and respectful of all students.",
          "The RTO has strategies to support students from diverse backgrounds.",
          "Cultural safety is promoted, particularly for First Nations students.",
          "Staff are aware of and responsive to the diversity of the student cohort.",
          "Discrimination and harassment are actively addressed.",
        ],
      },
      {
        code: "2.6",
        title:
          "The wellbeing needs of the VET student cohort are identified and strategies are put in place to support these needs.",
        intent:
          "RTOs must proactively identify and respond to the wellbeing needs of their students. This does not require RTOs to be wellbeing service providers, but they must have strategies appropriate to their context and student cohort.",
        performanceIndicators: [
          "The RTO identifies the wellbeing needs of its student cohort.",
          "Strategies are in place to support student wellbeing appropriate to the delivery context.",
          "Students are provided with information about available wellbeing support.",
          "Staff are equipped to identify students in need and connect them to support.",
        ],
      },
      {
        code: "2.7",
        title:
          "Feedback and complaints management addresses concerns and informs continuous improvement of the NVR registered training organisation.",
        intent:
          "RTOs must have effective systems to collect feedback and manage complaints. Complaints should be handled fairly, promptly and transparently — and insights from complaints must feed into continuous improvement.",
        performanceIndicators: [
          "The RTO has a documented complaints management policy and procedure.",
          "Students, staff and others are informed of how to provide feedback and make complaints.",
          "Complaints are handled fairly, promptly and with confidentiality.",
          "Complaint data is analysed and used to drive continuous improvement.",
          "Students are not disadvantaged for making a complaint.",
        ],
      },
      {
        code: "2.8",
        title:
          "Effective appeal processes are available to VET students where decisions of the NVR registered training organisation or a third party adversely affect the student.",
        intent:
          "Students must have a fair and accessible way to appeal decisions that affect them — particularly enrolment and assessment decisions. Internal appeals should be at no cost; external review should be available at low or no cost.",
        performanceIndicators: [
          "The RTO has a documented appeals policy and procedure.",
          "Students are informed of appeal processes at enrolment and when decisions are made.",
          "Internal appeals are handled at no cost to the student.",
          "External review by an independent party is available at low or no cost.",
          "Appeals are handled promptly, fairly and without disadvantage to the student.",
        ],
      },
    ],
  },
  {
    code: "QA3",
    title: "VET Workforce",
    outcome:
      "VET students are trained, assessed and supported by people who are qualified, skilled and committed to professional development.",
    intent:
      "Quality Area 3 focuses on the people who deliver training and assessment. RTOs must ensure their workforce is appropriately credentialled, has current industry skills and knowledge, and is managed effectively to deliver quality services.",
    standards: [
      {
        code: "3.1",
        title:
          "The workforce is effectively managed to ensure appropriate staffing to deliver services.",
        intent:
          "RTOs must have sufficient, appropriately qualified staff to deliver all services. Workforce planning, development, and performance management must ensure ongoing delivery quality.",
        performanceIndicators: [
          "The RTO has sufficient staff to deliver the range and volume of training and assessment.",
          "Roles and responsibilities of staff are clearly defined.",
          "Staff are appropriately qualified and experienced for their roles.",
          "The RTO has systems to monitor and manage workforce performance.",
          "Professional development is planned and supported.",
          "Third party arrangements do not diminish the quality of services to students.",
        ],
      },
      {
        code: "3.2",
        title:
          "Training and assessment is delivered to VET students by credentialled people with current skills and knowledge in training and assessment.",
        intent:
          "All trainers and assessors must hold or be working towards the required training and assessment credentials as set out in the Credential Policy. RTOs must ensure currency of these credentials is maintained.",
        performanceIndicators: [
          "Trainers and assessors hold credentials as required by the Credential Policy.",
          "People working towards credentials are supervised as required.",
          "Credential currency is maintained and documented.",
          "TAE Training Package delivery meets additional credential requirements (Section 2 of Credential Policy).",
          "Validation is conducted by credentialled persons as required (Section 3 of Credential Policy).",
        ],
      },
      {
        code: "3.3",
        title:
          "Training and assessment is delivered by people with current industry skills and knowledge relevant to the training product.",
        intent:
          "Trainers and assessors must have genuine, current industry expertise in the areas they teach and assess. Currency must be maintained through ongoing industry engagement — not just formal professional development.",
        performanceIndicators: [
          "Trainers and assessors have current skills and knowledge relevant to each training product they deliver.",
          "Industry currency is maintained through regular industry engagement.",
          "Evidence of industry currency is documented.",
          "RTOs have processes to identify and address gaps in trainer/assessor industry currency.",
        ],
      },
    ],
  },
  {
    code: "QA4",
    title: "Governance",
    outcome:
      "Effective governance and a commitment to continuous improvement supports the quality and integrity of VET delivery.",
    intent:
      "Quality Area 4 focuses on the organisational systems and culture that underpin quality VET delivery. RTOs must operate with integrity, manage risk, clearly define responsibilities, and have a genuine commitment to continuous improvement.",
    standards: [
      {
        code: "4.1",
        title:
          "An NVR registered training organisation operates with integrity and maintains accountability for the delivery of quality services.",
        intent:
          "RTOs must operate with integrity at all times — including in how they use third parties and market their services. Governing persons are responsible for setting the direction and culture of the RTO and are accountable for its performance.",
        performanceIndicators: [
          "Governing persons are fit and proper persons as required by the Compliance Requirements.",
          "The RTO's culture promotes integrity and ethical behaviour.",
          "Governing persons actively oversee RTO performance and compliance.",
          "The RTO is transparent with students, staff and regulators.",
          "Third party arrangements are managed to ensure compliance and service quality.",
        ],
      },
      {
        code: "4.2",
        title:
          "Roles and responsibilities of NVR registered training organisation staff and third parties are clearly defined and understood.",
        intent:
          "RTOs must have clear organisational structures and documented roles and responsibilities. Where third parties are involved in service delivery, responsibilities must be clearly defined and communicated.",
        performanceIndicators: [
          "Organisational roles and responsibilities are clearly documented.",
          "Staff understand their roles and responsibilities.",
          "Third party responsibilities are clearly defined in written agreements.",
          "Systems are in place to monitor third party performance.",
        ],
      },
      {
        code: "4.3",
        title:
          "Any risks to VET students, staff and the organisation itself are identified and managed.",
        intent:
          "RTOs must proactively identify and manage risks that could affect students, staff or the quality of services. Risk management must be proportionate to the RTO's size, context and risk profile.",
        performanceIndicators: [
          "The RTO has a systematic approach to identifying and managing risk.",
          "Risks to students, staff and the organisation are regularly reviewed.",
          "Risk management is integrated into organisational decision-making.",
          "Governing persons are informed of significant risks.",
        ],
      },
      {
        code: "4.4",
        title:
          "An NVR registered training organisation undertakes systematic monitoring and evaluation of the organisation to support quality delivery and continuous improvement of services.",
        intent:
          "RTOs must have systems to monitor and evaluate their performance and use insights to improve. Continuous improvement should be genuine, systematic and embedded in the culture of the organisation — not a paper exercise.",
        performanceIndicators: [
          "The RTO has systematic processes to collect and analyse data on its performance.",
          "Data from complaints, feedback, outcomes and validation informs continuous improvement.",
          "Continuous improvement activities are documented and evaluated for effectiveness.",
          "Governing persons are engaged in continuous improvement.",
        ],
      },
    ],
  },
];