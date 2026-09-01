import { OFFICIAL_QUALITY_AREAS } from "./officialStandards";

// Seed content for the RTO Standards 2025 Practice Guide.
// Content is written in plain, practitioner-facing language for vocational
// educators. The Standards themselves are paraphrased for the practice guide
// and grouped under the four Quality Areas of the 2025 framework.

export type SeedStrategyCategory =
  | "classroom"
  | "assessment"
  | "learner_support"
  | "workforce"
  | "governance"
  | "compliance"
  | "reflection";

export type SeedStrategyEffort = "quick_win" | "ongoing" | "deep_change";

export interface SeedStrategy {
  title: string;
  summary: string;
  steps: string[];
  category: SeedStrategyCategory;
  effort: SeedStrategyEffort;
  timeEstimate: string;
}

export interface SeedStandard {
  code: string;
  title: string;
  intent: string;
  whatItMeans: string;
  keyPractices: string[];
  evidenceExamples: string[];
  strategies: SeedStrategy[];
}

export interface SeedQualityArea {
  code: string;
  title: string;
  tagline: string;
  description: string;
  standards: SeedStandard[];
}

const PRACTICE_QUALITY_AREAS: SeedQualityArea[] = [
  {
    code: "QA1",
    title: "Training and Assessment",
    tagline: "What we teach, and how we know it stuck.",
    description:
      "The heart of vocational education: designing learning that mirrors real work, delivering it well, and assessing in ways that honestly show what someone can do on the job.",
    standards: [
      {
        code: "1.1",
        title: "Training meets the requirements of the training product",
        intent:
          "Every learner walks away with the full set of skills and knowledge described in their qualification, skill set or unit — not a watered-down version of it.",
        whatItMeans:
          "Your training plan, session plans and learning resources cover every performance criterion, performance evidence and knowledge evidence point in the unit. Nothing is skipped because it is hard, inconvenient or unfamiliar to the trainer.",
        keyPractices: [
          "Map every session and resource to the unit's elements, performance evidence and knowledge evidence",
          "Update your delivery plan when a training product is superseded",
          "Cross-check that learning, practice and feedback time is realistic for the AQF level",
        ],
        evidenceExamples: [
          "Unit-by-unit mapping document",
          "Session plans referencing specific performance criteria",
          "Version-controlled training and assessment strategy (TAS)",
        ],
        strategies: [
          {
            title: "Run a 30-minute mapping audit per unit",
            summary:
              "Open the unit alongside your session plan and tick off each performance criterion as you find it covered. Anything unticked is a gap.",
            steps: [
              "Print or split-screen the unit of competency",
              "Work through each session plan in delivery order",
              "Highlight any criterion not addressed and note where it will go",
              "Add a 'last reviewed' date on the session plan",
            ],
            category: "classroom",
            effort: "quick_win",
            timeEstimate: "30 min per unit",
          },
          {
            title: "Build a living unit map you actually use",
            summary:
              "Replace a one-off mapping document with a shared spreadsheet your team updates whenever a session changes.",
            steps: [
              "Create one row per performance criterion / evidence point",
              "Columns: session covered, activity, resource link, last reviewed",
              "Pin the link in your team channel and update it as you teach",
              "Review at the end of every cohort",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "2 hours setup, 10 min per change",
          },
          {
            title: "Pre-teach the awkward bits",
            summary:
              "Identify the criteria most often skipped and design a short, deliberate activity for each one before delivery starts.",
            steps: [
              "Ask your team which criteria they avoid or rush",
              "Design a focused 15-30 min activity for each",
              "Slot them in early in the unit, not as fillers at the end",
            ],
            category: "classroom",
            effort: "ongoing",
            timeEstimate: "1 hour per unit",
          },
        ],
      },
      {
        code: "1.2",
        title: "Training is engaging and reflects current industry practice",
        intent:
          "Learners are taught the way work is actually done today — using the tools, vocabulary and standards their future workplaces use right now.",
        whatItMeans:
          "Industry consultation is a real, ongoing conversation, not a one-page form on file. Your examples, equipment and language are current, and you adjust delivery when the industry moves.",
        keyPractices: [
          "Schedule industry conversations every 6-12 months",
          "Refresh case studies, scenarios and equipment lists annually",
          "Invite guest practitioners or workplace visits at least once per cohort",
        ],
        evidenceExamples: [
          "Notes from industry consultation meetings",
          "Photos of current-spec equipment in use",
          "Updated session plans with date-stamped scenarios",
        ],
        strategies: [
          {
            title: "Build an industry consultation rhythm",
            summary:
              "Replace ad-hoc 'forms in the drawer' with a calendar of short, structured industry chats.",
            steps: [
              "List 5-8 industry contacts per qualification",
              "Schedule a 30-minute call or visit each quarter",
              "Use 4 standing questions: what's changed, what's new in tools, what new errors do you see in juniors, what would you remove from training",
              "Log it as a dated, signed note",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "2 hours per quarter",
          },
          {
            title: "Run a 'current vs taught' workshop",
            summary:
              "Spend a team afternoon comparing what your delivery shows learners against how the work is done in industry today.",
            steps: [
              "Pull session plans onto the wall",
              "Have a recent industry guest review them",
              "Tag anything outdated red and anything missing yellow",
              "Pick the top 5 changes and assign owners",
            ],
            category: "classroom",
            effort: "deep_change",
            timeEstimate: "Half day team workshop",
          },
          {
            title: "Refresh one scenario per fortnight",
            summary:
              "Pick a single case study or scenario each fortnight and rewrite it to use a current workplace situation.",
            steps: [
              "Choose one scenario from upcoming delivery",
              "Use a recent project, news story or industry post for context",
              "Update names, tools, regulations and outcomes",
              "Date-stamp the resource",
            ],
            category: "classroom",
            effort: "quick_win",
            timeEstimate: "30 min fortnightly",
          },
        ],
      },
      {
        code: "1.3",
        title: "Assessment is fair, valid, reliable and flexible",
        intent:
          "Assessment evidence really proves competence — and it would do so consistently across different assessors, learners and days.",
        whatItMeans:
          "Tasks reflect real work, instructions are clear, the rules of evidence are met, and reasonable adjustments are offered without lowering the standard.",
        keyPractices: [
          "Use multiple assessment methods per unit",
          "Apply the principles of assessment and rules of evidence in every tool",
          "Offer reasonable adjustments and document them",
        ],
        evidenceExamples: [
          "Assessment tools with clear instructions and benchmarks",
          "Reasonable adjustment register",
          "Validated assessment plans",
        ],
        strategies: [
          {
            title: "Add a 'how I will be judged' page to every tool",
            summary:
              "A one-page learner-facing summary of what success looks like before they start the task.",
            steps: [
              "Write the task purpose in two sentences",
              "List observable behaviours that count as competent",
              "Show the format of evidence required",
              "Note the reasonable adjustment process",
            ],
            category: "assessment",
            effort: "quick_win",
            timeEstimate: "20 min per tool",
          },
          {
            title: "Pair-mark a sample to test reliability",
            summary:
              "Two assessors mark the same three submissions independently and compare decisions.",
            steps: [
              "Choose 3 recently submitted samples",
              "Both assessors mark blind",
              "Compare results in a 30-min conversation",
              "Capture any decision rules that emerge",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "1 hour per cycle",
          },
          {
            title: "Build a reasonable-adjustment menu",
            summary:
              "Pre-design a small set of common adjustments per unit so they are ready when needed.",
            steps: [
              "List adjustments your team has made before",
              "Confirm each preserves the unit requirements",
              "Document the adjustment, when to offer it, and how to record it",
              "Share with the team and learners",
            ],
            category: "learner_support",
            effort: "deep_change",
            timeEstimate: "Half day per qualification",
          },
        ],
      },
      {
        code: "1.4",
        title: "Assessment system is validated",
        intent:
          "The assessment system is reviewed often enough, and rigorously enough, that everyone can trust the decisions it produces.",
        whatItMeans:
          "Pre and post-assessment validation happens on a planned schedule, with the right people, and findings actually change the tools.",
        keyPractices: [
          "Plan validation across the full RTO scope on a five-year cycle",
          "Include a current industry expert in every validation",
          "Document changes made because of validation findings",
        ],
        evidenceExamples: [
          "Validation schedule",
          "Validation meeting minutes with action items",
          "Updated tools with version history",
        ],
        strategies: [
          {
            title: "Run a 90-minute focused validation",
            summary:
              "Pick one assessment tool and use a fixed agenda to validate it well, instead of trying to do everything at once.",
            steps: [
              "Pick one tool and three completed submissions",
              "Invite an assessor, a non-assessor SME and an industry rep",
              "Walk through tool design, evidence quality, decisions",
              "Capture 1-3 actions and assign owners",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "90 min per tool",
          },
          {
            title: "Map your five-year validation calendar",
            summary:
              "Replace random reviews with a scheduled cycle that covers your whole scope.",
            steps: [
              "List every unit on scope",
              "Spread units across 5 years using risk and volume",
              "Lock dates into a shared calendar",
              "Review the plan annually",
            ],
            category: "governance",
            effort: "deep_change",
            timeEstimate: "1 day to plan, ongoing to maintain",
          },
        ],
      },
      {
        code: "1.5",
        title: "Recognition of prior learning is genuinely available",
        intent:
          "Learners are not made to redo what they can already do — RPL is offered, easy to start and rigorous to complete.",
        whatItMeans:
          "Information about RPL is upfront, the process is supported, and decisions are based on the same evidence rules as standard assessment.",
        keyPractices: [
          "Promote RPL in pre-enrolment information",
          "Provide an RPL kit with worked examples",
          "Apply the same rules of evidence as standard assessment",
        ],
        evidenceExamples: [
          "RPL kits per qualification",
          "RPL applications with mapped evidence",
          "RPL outcome letters",
        ],
        strategies: [
          {
            title: "Write a one-page 'is RPL for me?' guide",
            summary:
              "A short plain-language guide that helps learners decide whether to apply, with examples of evidence that works.",
            steps: [
              "Use second-person plain language",
              "Show 3 example evidence types per unit",
              "Include time and cost estimates",
              "Link to the full RPL kit",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "2 hours per qualification",
          },
          {
            title: "Run an RPL conversation, not a paperwork exercise",
            summary:
              "Open every RPL with a 30-minute structured conversation that maps experience to units before any forms come out.",
            steps: [
              "Use a unit-by-unit prompt sheet",
              "Record the conversation with permission",
              "Identify gaps and likely evidence sources",
              "Agree on next steps in writing",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "30-45 min per learner",
          },
        ],
      },
      {
        code: "1.6",
        title: "Learners are supported when training products change",
        intent:
          "When a training product you deliver is updated or superseded, enrolled learners are transitioned fairly and without disadvantage.",
        whatItMeans:
          "When a training package, qualification or skill set on your scope is superseded, you must have a plan to transition enrolled learners. Options include completing under the current product within the allowable transition period, or moving to the new product with credit for already-completed units. Learners are informed promptly and supported through any change.",
        keyPractices: [
          "Monitor training.gov.au regularly for supersession notices on products you deliver",
          "Notify affected learners in writing as soon as a product is superseded",
          "Document a transition decision for each affected learner — complete under old, transition to new, or withdraw",
          "Complete or transition all learners before the transition period closes",
        ],
        evidenceExamples: [
          "Training product status monitoring log or alerts",
          "Learner transition notifications with dates",
          "Transition plan showing decision and rationale per affected learner",
          "Completion or enrolment records confirming learners were not disadvantaged",
        ],
        strategies: [
          {
            title: "Set a training.gov.au monitoring alert",
            summary:
              "Subscribe to notifications for every product on your scope so supersession news arrives automatically — not by accident.",
            steps: [
              "Log in to training.gov.au and locate each qualification and skill set on your scope",
              "Enable email alerts or set a recurring calendar reminder to check status monthly",
              "When a supersession notice arrives, record the date and transition deadline",
              "Brief your training manager the same day",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "1 hour setup, monthly check",
          },
          {
            title: "Build a learner transition plan template",
            summary:
              "A short pro-forma that captures, for each affected learner, which transition option was chosen and why — and by whom.",
            steps: [
              "List the fields: learner name, qualification, units completed, units remaining, transition option, rationale, date decided, communication sent",
              "Add a sign-off section for the training manager",
              "Test it on a past supersession if you have one",
              "Store completed forms on the learner's file",
            ],
            category: "governance",
            effort: "quick_win",
            timeEstimate: "2 hours to create",
          },
          {
            title: "Run a transition impact assessment when supersession is announced",
            summary:
              "The moment a supersession notice lands, run a structured check: how many learners are affected, how far through are they, and what is the best option for each?",
            steps: [
              "Pull enrolment data for the affected product",
              "Group learners by units completed and time remaining",
              "For each group, assess: can they complete? Should they transition?",
              "Communicate decisions individually within 5 working days",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "Half day per affected qualification",
          },
        ],
      },
      {
        code: "1.7",
        title: "Credit transfer is applied consistently and fairly",
        intent:
          "Learners who have already completed equivalent study get credit for it — automatically, fairly and without being made to prove it twice.",
        whatItMeans:
          "When a learner presents a statement of attainment or transcript showing a completed unit, you must grant credit transfer for identical unit codes. For non-identical units, you assess equivalence using a documented process. Every decision is recorded on the learner's file and communicated in writing.",
        keyPractices: [
          "Grant credit transfer automatically for identical unit codes — no further assessment required",
          "Maintain a documented equivalence process for non-identical but equivalent units",
          "Record all credit transfer decisions on the learner's enrolment file",
          "Communicate outcomes to learners in writing within a reasonable timeframe",
        ],
        evidenceExamples: [
          "Credit transfer policy and procedure",
          "Learner records showing granted credit and supporting documentation",
          "Equivalence assessment decisions with rationale for non-identical units",
          "Pre-enrolment information explaining how to apply for credit transfer",
        ],
        strategies: [
          {
            title: "Build a one-page credit transfer checklist",
            summary:
              "A simple checklist that staff follow every time a learner submits documents, so no decision is missed or inconsistent.",
            steps: [
              "List the documents you will accept (statement of attainment, transcript, certified copy)",
              "Add a step to check unit code and version against your scope",
              "Add a decision branch: identical code → grant; different code → equivalence review",
              "Include a file-note template for recording the outcome",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "2 hours to create",
          },
          {
            title: "Add credit transfer to pre-enrolment information",
            summary:
              "Tell learners about credit transfer before they enrol so they arrive with the right documents and realistic expectations.",
            steps: [
              "Add a credit transfer section to your enrolment pack or website",
              "Explain what documents are needed and how long it takes",
              "Include an example of an acceptable statement of attainment",
              "Link to your credit transfer policy",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "1 hour",
          },
          {
            title: "Conduct an annual credit transfer consistency audit",
            summary:
              "Review a sample of credit transfer decisions each year to check they are being applied consistently across staff.",
            steps: [
              "Pull 10–15 credit transfer records from the past year",
              "Check each against the policy decision rules",
              "Note any variation between staff decisions",
              "Update guidance or run a short calibration session to address gaps",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "2 hours annually",
          },
        ],
      },
      {
        code: "1.8",
        title: "Training facilities and resources are fit for purpose",
        intent:
          "Training is delivered in an environment — physical or simulated — that genuinely reflects the workplace and supports learners to develop real skills.",
        whatItMeans:
          "Your facilities, equipment and resources are appropriate for the units you deliver, maintained in good working order and actually used in training. Where real workplaces are not accessible, simulated environments are designed to replicate authentic conditions closely enough that learners can meet the evidence requirements.",
        keyPractices: [
          "Audit facilities and equipment against each unit's requirements at least annually",
          "Maintain an equipment register including servicing and calibration dates",
          "Design simulated environments to match real workplace conditions and hazards",
          "Ensure online or remote delivery platforms support the required learning activities",
        ],
        evidenceExamples: [
          "Facilities and equipment register with maintenance dates",
          "Site inspection reports or workplace health and safety checklists",
          "Photos showing equipment and environment used in delivery",
          "Learner feedback on resources, equipment and learning environment",
        ],
        strategies: [
          {
            title: "Map equipment to unit requirements",
            summary:
              "Create a simple table showing which equipment or facility each unit needs, then check what you have against what is required.",
            steps: [
              "List every unit on scope in a spreadsheet",
              "For each unit, note the equipment, tools or environment specified in the training package",
              "Mark each item: available / available but needs servicing / missing",
              "Create a maintenance or procurement action list from the gaps",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "Half day per qualification",
          },
          {
            title: "Run a quick learner environment survey",
            summary:
              "Ask learners two questions at the end of each cohort about whether the facilities and tools helped them learn.",
            steps: [
              "Add two questions to your existing learner survey: 'Did you have access to the equipment/tools you needed?' and 'Did the training environment reflect real workplace conditions?'",
              "Review responses after each cohort",
              "Log any 'no' responses and investigate the cause",
              "Report findings to management with a recommended action",
            ],
            category: "reflection",
            effort: "quick_win",
            timeEstimate: "30 min per cohort",
          },
          {
            title: "Build a simulated environment checklist per qualification",
            summary:
              "If you use simulated workplaces, document what conditions you replicate and verify them against the unit's performance evidence requirements.",
            steps: [
              "List the performance evidence points that require a workplace or simulated environment",
              "For each, describe how the simulation replicates the real condition",
              "Have an industry expert review and sign off the checklist",
              "Use it as a pre-delivery readiness check each cohort",
            ],
            category: "assessment",
            effort: "deep_change",
            timeEstimate: "1 day per qualification",
          },
        ],
      },
    ],
  },
  {
    code: "QA2",
    title: "VET Student Support",
    tagline: "Students who are informed, supported and treated fairly.",
    description:
      "Students are treated fairly and are properly informed, supported and protected throughout their training journey — from the first enquiry through to completion.",
    standards: [
      {
        code: "2.1",
        title: "Students have access to clear and accurate information concerning the RTO and their training product",
        intent:
          "Prospective and enrolled students can make informed decisions because all information the RTO provides is current, accurate and complete — before enrolment and throughout training.",
        whatItMeans:
          "Every piece of student-facing information — website, brochures, social media, information sessions, third-party marketing — is up to date and does not inadvertently mislead. Before any fees are paid, students receive written documentation covering the training to be provided, all fees and costs, and any obligations. Students are told promptly of any changes that affect them, including training product supersessions.",
        keyPractices: [
          "Audit all student-facing information sources annually for accuracy, currency and clarity",
          "Provide required pre-enrolment documentation in writing before fees are paid",
          "Notify students promptly of any changes affecting their training, including supersessions",
          "Ensure third-party marketing meets the same accuracy standards as your own materials",
        ],
        evidenceExamples: [
          "Version-controlled course information sheets and web pages",
          "Pre-enrolment documentation records with date provided to each student",
          "Change notification records with dates and acknowledgement",
          "Third-party marketing materials reviewed and approved by the RTO",
        ],
        strategies: [
          {
            title: "Student information audit",
            summary:
              "Systematically review all student-facing information sources to ensure they are current, accurate and complete.",
            steps: [
              "List every channel where student information appears — website, brochures, social media, third-party platforms",
              "Check each piece of information against current training product requirements, fees and compliance obligations",
              "Update or remove any inaccurate, outdated or misleading content",
              "Version-control all documents so you can prove what information students received at enrolment",
              "Schedule the next audit in your calendar before you finish this one",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "1–2 days per year",
          },
          {
            title: "Pre-enrolment documentation pack",
            summary:
              "Create a standardised written pack that gives every student everything they need before committing to enrol.",
            steps: [
              "Draft a pre-enrolment document covering training details, all fees and costs, and student obligations",
              "Include information on refund policies, any third-party arrangements, and how to access support",
              "Get the document reviewed by someone who has not seen it before to check for clarity and completeness",
              "Record the date and method you gave the document to each prospective student",
              "Review the pack whenever fees, training products or policies change",
            ],
            category: "compliance",
            effort: "deep_change",
            timeEstimate: "2–3 days to create, then maintain",
          },
          {
            title: "Change notification process",
            summary:
              "Build a reliable process for notifying students promptly whenever something changes that affects them.",
            steps: [
              "Map the types of changes that could affect students — supersessions, fee changes, delivery changes",
              "Draft template notifications for each change type in plain language",
              "Define the timeframe for notification (e.g. within 5 business days of knowing about a change)",
              "Assign responsibility for triggering notifications to a named role",
              "Log all notifications sent with dates and recipient confirmation",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "1 day to design",
          },
        ],
      },
      {
        code: "2.2",
        title: "Students receive advice on the suitability of the training product before they enrol",
        intent:
          "Every prospective student gets honest, individualised advice about whether the training product is right for them — before they commit.",
        whatItMeans:
          "The RTO assesses whether training is suitable given the student's skills, competencies and circumstances — including language, literacy and numeracy demands, work placement obligations, practical requirements and pre-requisites. Where the training product is not a good fit, the student is redirected — not enrolled. Advice given is documented.",
        keyPractices: [
          "Design a structured pre-enrolment screening process covering goals, prior learning, LLN demands, and practical requirements",
          "Provide students with honest written advice about suitability before fees are paid",
          "Document the advice given and the student response",
          "Refer unsuitable applicants to more appropriate options and record referrals",
        ],
        evidenceExamples: [
          "Pre-enrolment screening forms or conversation records for each student",
          "Written suitability advice provided to prospective students",
          "Documentation of referrals to alternative pathways",
          "Evidence of how suitability advice was communicated",
        ],
        strategies: [
          {
            title: "Pre-enrolment screening process",
            summary:
              "Design a structured conversation or screening process that genuinely assesses whether each student is suitable for the training product.",
            steps: [
              "Map the key requirements of each training product — LLN level, practical requirements, work placement obligations, pre-requisites",
              "Design a screening tool or conversation guide that checks each requirement against the student's skills and circumstances",
              "Train staff who conduct pre-enrolment conversations to give honest, student-centred advice",
              "Document the outcome of each screening conversation and the advice given",
              "Develop a list of alternative pathways to offer students who are not suitable",
            ],
            category: "learner_support",
            effort: "deep_change",
            timeEstimate: "2–3 days to design",
          },
          {
            title: "LLN assessment at enrolment",
            summary:
              "Use a language, literacy and numeracy assessment to identify whether students need support before they start training.",
            steps: [
              "Select an appropriate LLN assessment tool for the AQF level of your training product",
              "Administer the assessment to all prospective students before enrolment as standard practice",
              "Use results to advise students honestly about whether the training product is a good fit",
              "Where LLN support is needed, confirm what support you can provide before the student enrols",
              "Document the assessment outcome and the advice given to each student",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "1–2 days setup, then ongoing",
          },
          {
            title: "Suitability advice records",
            summary:
              "Maintain clear records of the suitability advice you provide to every prospective student.",
            steps: [
              "Create a simple suitability advice record form or template",
              "Capture: date, student name, training product, requirements discussed, advice given, and student response",
              "Store signed copies with the student enrolment file",
              "Review records quarterly to identify patterns — e.g. if many students are unsuitable for a particular product",
              "Use patterns to improve your pre-enrolment information or product offerings",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "Half day to design",
          },
        ],
      },
      {
        code: "2.3",
        title: "Students have access to support services, trainers and assessors throughout their training",
        intent:
          "Students can get help when they need it — from their trainer, from support staff, and from other services — throughout their training journey, not just at enrolment.",
        whatItMeans:
          "Support is available throughout training. Trainers respond to queries within a reasonable timeframe. Supplementary resources are accessible. Students know how to access additional help, and support is tailored to the characteristics of the student cohort and the delivery model.",
        keyPractices: [
          "Publish clear support pathways in learner materials at the start of training",
          "Ensure trainers are accessible between scheduled sessions and respond to queries promptly",
          "Identify students who are falling behind and proactively offer additional support",
          "Tailor support services to the specific needs of your student cohort",
        ],
        evidenceExamples: [
          "Support services information in learner handbooks and enrolment materials",
          "Records of additional support provided to individual students",
          "Trainer response time policy or service standard",
          "Evidence of tailored support for cohort-specific needs",
        ],
        strategies: [
          {
            title: "Support services map",
            summary:
              "Create a clear, accessible map of all support services available to students throughout their training.",
            steps: [
              "List all support services available — trainer access, learning support, wellbeing referrals, IT help, financial hardship processes",
              "Document how each service is accessed, who provides it, and what timeframe students can expect",
              "Include the support map in enrolment materials, learner handbooks and your student portal",
              "Review the map at least annually and update when services change",
              "Ask students whether they know how to access support as part of your feedback process",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "1 day to create",
          },
          {
            title: "At-risk student early intervention",
            summary:
              "Identify students who are struggling early and reach out proactively before they disengage.",
            steps: [
              "Define your indicators of at-risk students — absences, late submissions, failed assessments, low engagement",
              "Set up a monitoring process to flag at-risk students at regular intervals",
              "Assign a named person responsible for following up with flagged students",
              "Document all contact made and the support offered or provided",
              "Track whether intervention improved the student's progress and engagement",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "2–3 days to design",
          },
          {
            title: "Trainer response time standard",
            summary:
              "Set and communicate a clear standard for how quickly trainers and assessors respond to student queries.",
            steps: [
              "Agree on a response time standard for different query types (e.g. 1 business day for urgent, 3 days for general)",
              "Document the standard in trainer role descriptions and your student charter",
              "Communicate the standard to students so they know what to expect",
              "Monitor adherence through student feedback and spot checks",
              "Address any patterns of non-compliance through performance conversations",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "Half day to design",
          },
        ],
      },
      {
        code: "2.4",
        title: "Reasonable adjustments support students with disability to participate in training and assessment on an equal basis",
        intent:
          "Students with disability access and participate in training and assessment on the same basis as other students through reasonable, evidence-based adjustments.",
        whatItMeans:
          "RTOs have obligations under the Disability Standards for Education 2005. Students are supported to disclose disability if they choose, and the RTO engages collaboratively with them to identify needed adjustments. Adjustments modify how training and assessment is delivered — not the standard to which competency is assessed. Adjustments are documented, communicated to relevant staff, and reviewed for effectiveness.",
        keyPractices: [
          "Create a safe and confidential environment for disclosure at enrolment and throughout training",
          "Co-develop individual adjustment plans with students and document with student acknowledgement",
          "Brief assessors on the purpose and limits of each adjustment before assessment",
          "Review whether adjustments are working and update them as the student's needs change",
        ],
        evidenceExamples: [
          "Disability disclosure and adjustment policy",
          "Individual adjustment plans with student acknowledgement",
          "Assessor briefing records showing awareness of each student's adjustments",
          "Review records for students on adjustment plans",
        ],
        strategies: [
          {
            title: "Disability disclosure and adjustment process",
            summary:
              "Build a safe, structured process for students to disclose disability and collaboratively develop adjustment plans.",
            steps: [
              "Create a disability disclosure policy that explains the process, confidentiality protections, and student rights",
              "Provide disclosure opportunities at multiple points — application, enrolment, and throughout training",
              "Design an adjustment plan template capturing the disability, requested adjustments, agreed adjustments, and review date",
              "Train all staff who interact with students on the disclosure process and confidentiality obligations",
              "Review adjustment plans at key points in the training journey and after any assessment",
            ],
            category: "learner_support",
            effort: "deep_change",
            timeEstimate: "3–5 days to design",
          },
          {
            title: "Assessor briefing for adjustments",
            summary:
              "Ensure assessors understand and apply adjustments correctly before every assessment event.",
            steps: [
              "Review the student's adjustment plan with the assessing trainer before each assessment event",
              "Confirm the assessor understands the purpose and limits of the adjustment — modifying delivery, not the standard",
              "Document that the briefing occurred and what was discussed",
              "Check with the student after assessment that the adjustment was applied as agreed",
              "Use any discrepancies to improve your briefing process",
            ],
            category: "assessment",
            effort: "ongoing",
            timeEstimate: "Ongoing per assessment event",
          },
          {
            title: "Reasonable adjustments register",
            summary:
              "Maintain a register of all adjustment plans to ensure consistency, review and institutional memory.",
            steps: [
              "Create a register recording each student's name, training product, adjustments agreed, review dates, and outcomes",
              "Store signed adjustment plans with the student's enrolment file",
              "Schedule reviews in the register at agreed timeframes",
              "Use the register to identify patterns — e.g. types of adjustments most commonly needed",
              "Brief new staff on the register and how to use it",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "Half day to create",
          },
        ],
      },
      {
        code: "2.5",
        title: "Learning environment is safe, inclusive and fit for purpose",
        intent:
          "Learners can focus on learning because the physical and online environments they use are safe, well-maintained and designed to support the training being delivered.",
        whatItMeans:
          "Every space used for training — whether a classroom, workshop, simulated workplace or online platform — meets safety requirements, is accessible, and is set up to support the training product. Hazards are identified and managed. Online environments are secure and learner-friendly. Learners with disability or additional needs can participate fully.",
        keyPractices: [
          "Maintain a regular safety inspection schedule for all training venues and equipment",
          "Ensure online learning environments are accessible and technically reliable",
          "Document how training spaces meet the requirements of the training product",
          "Address learner-reported environment issues promptly and track to resolution",
        ],
        evidenceExamples: [
          "Venue safety inspection records and hazard logs",
          "Accessibility audit or assessment of training facilities",
          "Equipment maintenance and calibration records",
          "Records of any environment-related learner concerns and how they were resolved",
        ],
        strategies: [
          {
            title: "Run a termly environment walk-through",
            summary:
              "A short structured walk through every training space each term — checking safety, accessibility and fitness for purpose before learners arrive.",
            steps: [
              "Use a one-page checklist: lighting, ventilation, emergency exits, equipment condition, accessibility",
              "Assign a named person to conduct the walk-through",
              "Log findings and assign a fix owner for anything flagged",
              "Re-check before the next cohort starts",
            ],
            category: "compliance",
            effort: "quick_win",
            timeEstimate: "1 hour per term",
          },
          {
            title: "Run an online environment accessibility check",
            summary:
              "Before each cohort starts, verify the LMS and any online tools work across devices and meet basic accessibility standards.",
            steps: [
              "Test the LMS on desktop, tablet and mobile",
              "Check screen reader compatibility for key content",
              "Verify all videos have captions",
              "Log and fix any access barriers before learners enrol",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "2 hours per cohort",
          },
          {
            title: "Create a learner environment feedback prompt",
            summary:
              "Add a single question about the learning environment to your mid-course check-in so problems surface while you can still fix them.",
            steps: [
              "Add: 'Is there anything about the learning environment affecting your study?' to your mid-course survey",
              "Assign someone to read responses within 48 hours",
              "Action any physical or technical issues within one week",
              "Close the loop with the learner who flagged it",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "30 min to set up",
          },
        ],
      },
      {
        code: "2.6",
        title: "Learner wellbeing needs are identified and supported",
        intent:
          "The RTO actively looks out for learner wellbeing — not just academic progress — and connects learners to appropriate support when needed.",
        whatItMeans:
          "Trainers and staff recognise signs of distress or disengagement and know how to respond. Referral pathways to internal and external wellbeing support are clear and documented. Learners are made aware of available support before and during their training. The RTO does not need to be a counselling service — but it must know when and how to refer.",
        keyPractices: [
          "Brief all trainers on recognising and responding to wellbeing concerns",
          "Publish clear referral pathways to internal and external support services",
          "Include wellbeing support information in learner orientation",
          "Record and follow up wellbeing referrals appropriately",
        ],
        evidenceExamples: [
          "Trainer professional development records covering wellbeing awareness",
          "Wellbeing support information in learner handbooks or orientation materials",
          "Referral pathway documentation",
          "De-identified records of referrals and follow-up actions",
        ],
        strategies: [
          {
            title: "Brief trainers on recognising and responding to distress",
            summary:
              "A short annual session so every trainer knows the signs to watch for and the exact steps to take when a learner is struggling.",
            steps: [
              "Run a 60-min annual briefing: signs of distress, conversation starters, referral pathway",
              "Use a real (anonymised) scenario to practise",
              "Give every trainer a laminated one-page referral guide",
              "Review the pathway annually to check contacts are current",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "1 hour per year",
          },
          {
            title: "Include wellbeing support in learner orientation",
            summary:
              "Every learner hears about available support in week one — before they need it, not after.",
            steps: [
              "Add a 'support available to you' slide or page to your orientation",
              "Name internal contacts and at least two external services (e.g. Lifeline, headspace)",
              "Ask learners to note one person they could contact if struggling",
              "Repeat the information in the learner handbook",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "2 hours to build into orientation",
          },
          {
            title: "Keep a simple wellbeing referral log",
            summary:
              "A private record of referrals made — who, when, what service — so patterns can be spotted and follow-up doesn't fall through the cracks.",
            steps: [
              "Create a password-protected log: date, anonymised learner ID, concern type, referral made, follow-up date",
              "Review monthly for any open follow-ups",
              "Use aggregate data (not names) in your annual improvement review",
              "Ensure only authorised staff can access the log",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "15 min per entry",
          },
        ],
      },
      {
        code: "2.7",
        title: "Learner feedback informs improvement",
        intent:
          "The RTO actively seeks feedback from learners and uses it to improve training and assessment — not just to collect data.",
        whatItMeans:
          "Learner feedback is gathered at meaningful points — during and after training, not only on completion. It is analysed, acted on, and the loop is closed so learners know their voice made a difference. Feedback findings feed into the continuous improvement register and inform trainer development.",
        keyPractices: [
          "Gather feedback at mid-point and end of each training program",
          "Analyse feedback systematically and identify themes",
          "Document actions taken in response to feedback",
          "Communicate changes back to learners and staff",
        ],
        evidenceExamples: [
          "Learner feedback surveys and summary reports",
          "Improvement register entries linked to feedback themes",
          "Evidence of changes made in response to feedback",
          "Communication to learners about changes made",
        ],
        strategies: [
          {
            title: "Run a mid-course pulse check",
            summary:
              "A 5-question survey at the halfway point of every course — short enough that learners actually complete it, specific enough to be useful.",
            steps: [
              "Design 5 questions: pacing, support, resources, environment, one open question",
              "Send it at the midpoint of every qualification or short course",
              "Analyse results within one week",
              "Share a summary of themes and any planned changes with the cohort",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "1 hour to design, 30 min per cohort to run",
          },
          {
            title: "Close the feedback loop visibly",
            summary:
              "When learners give feedback that leads to a change, tell them. 'You said, we did' is one of the most powerful trust-builders an RTO has.",
            steps: [
              "Tag each piece of feedback with its improvement register entry",
              "Each term, draft a short 'you said, we did' summary",
              "Share it with current and recently completed learners",
              "Post it on your LMS or noticeboard",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "1 hour per term",
          },
          {
            title: "Review feedback trends at leadership level quarterly",
            summary:
              "Feedback data belongs in leadership conversations — not just in a folder. A quarterly review keeps it connected to real decisions.",
            steps: [
              "Prepare a one-page feedback summary: volume, themes, sentiment, actions taken",
              "Present at the quarterly leadership or quality meeting",
              "Link themes to the improvement register",
              "Assign any unactioned themes to an owner with a due date",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "2 hours per quarter",
          },
        ],
      },
      {
        code: "2.8",
        title: "Assessment appeals are managed fairly and transparently",
        intent:
          "Any learner who believes an assessment decision was wrong has a clear, fair and documented process to challenge it — without fear of disadvantage.",
        whatItMeans:
          "The appeals process is documented, published and explained to learners before or at assessment. Appeals are handled by someone independent of the original assessment decision. Outcomes are communicated in writing. The process distinguishes between an appeal (challenge to the decision) and a complaint (concern about conduct or process). Records are kept and patterns are reviewed.",
        keyPractices: [
          "Document and publish the assessment appeals process in plain language",
          "Ensure appeals are assessed independently of the original assessor",
          "Communicate all appeal outcomes in writing with reasons",
          "Review appeal patterns annually to identify systemic assessment issues",
        ],
        evidenceExamples: [
          "Assessment appeals policy and procedure",
          "Appeals register with lodgement dates, grounds, outcome and closure date",
          "Written outcome letters to appellants",
          "Annual review report identifying any patterns from appeals data",
        ],
        strategies: [
          {
            title: "Rewrite your appeals process in plain language",
            summary:
              "If a learner cannot understand how to appeal in under two minutes, rewrite it.",
            steps: [
              "Print your current appeals document",
              "Read it as a learner who just got a Not Yet Competent result",
              "Circle everything confusing",
              "Rewrite in plain language: what to do, who to contact, what happens next, how long it takes",
            ],
            category: "learner_support",
            effort: "quick_win",
            timeEstimate: "2 hours to rewrite",
          },
          {
            title: "Build an appeals register",
            summary:
              "A simple register that tracks every appeal from lodgement to outcome — so nothing is lost and patterns can be reviewed.",
            steps: [
              "Create a register: date lodged, standard/unit, grounds, assessor, outcome, date closed",
              "Update within 1 working day of any change",
              "Review annually for patterns — repeated appeals on the same unit may signal an assessment design problem",
              "Store outcome letters on file",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "30 min per appeal to maintain",
          },
          {
            title: "Explain the appeals process at every assessment briefing",
            summary:
              "Learners should know they have the right to appeal before the assessment — not only when they are upset about a result.",
            steps: [
              "Add appeals rights to your standard pre-assessment briefing script",
              "Include the one-page plain-language summary in every assessment task cover sheet",
              "Ask learners to sign that they have received and understood the process",
              "File signed copies with the assessment record",
            ],
            category: "assessment",
            effort: "quick_win",
            timeEstimate: "30 min to add to existing briefing",
          },
        ],
      },
    ],
  },
  {
    code: "QA3",
    title: "VET Workforce",
    tagline: "The right people, with the right skills, doing the right work.",
    description:
      "VET students are trained, assessed and supported by people who are qualified, skilled and committed to professional development. This area covers how the RTO plans, manages and develops its workforce.",
    standards: [
      {
        code: "3.1",
        title: "The workforce is effectively managed to ensure appropriate staffing to deliver services",
        intent:
          "The RTO has the right number and mix of qualified, skilled staff to deliver quality training, assessment and support at all times.",
        whatItMeans:
          "Workforce planning is ongoing — not reactive. The RTO projects staffing needs against enrolment, plans for peaks and unexpected absences, and supports all staff (not only trainers) to develop professionally. Third-party arrangements are factored into workforce planning.",
        keyPractices: [
          "Maintain a workforce plan that projects staffing needs against enrolment forecasts",
          "Document the skills, qualifications and experience required for each role and assess fit",
          "Provide access to professional development for all staff — administration, support and training staff",
          "Develop contingency plans for unexpected trainer or assessor unavailability",
        ],
        evidenceExamples: [
          "Workforce plan or staffing model with roles, required credentials, and forward projections",
          "Professional development records for all staff categories",
          "Contingency arrangements for unexpected staff unavailability",
          "Role descriptions specifying required qualifications, skills and experience",
        ],
        strategies: [
          {
            title: "Workforce plan",
            summary:
              "Develop a workforce plan that maps staffing needs against your training scope, enrolment projections, and operational requirements.",
            steps: [
              "List all roles required to deliver your scope — trainers, assessors, support staff, administration, management",
              "For each role, document required qualifications, industry experience, and T&A credentials",
              "Project staffing needs against enrolment forecasts for the next 12 months",
              "Identify gaps between current staffing and projected needs and document how gaps will be addressed",
              "Review the plan at least annually or whenever scope, enrolment or delivery model changes",
            ],
            category: "workforce",
            effort: "deep_change",
            timeEstimate: "1–2 weeks",
          },
          {
            title: "Professional development planning for all staff",
            summary:
              "Build a professional development process that covers all staff — not only trainers and assessors.",
            steps: [
              "Identify professional development needs for every role in the RTO — not just trainers",
              "Develop individual PD plans at each annual performance review",
              "Track completion of PD activities in a central register",
              "Include PD completion as a standing item in management meetings",
              "Review whether PD activities are improving staff capability and adjust the approach where needed",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "1–2 days per cycle",
          },
          {
            title: "Contingency staffing arrangements",
            summary:
              "Prepare for unexpected trainer or assessor unavailability so student delivery is never disrupted.",
            steps: [
              "Identify the scenarios most likely to cause staffing gaps — unexpected illness, resignation, sudden enrolment increase",
              "Document contingency arrangements for each scenario — e.g. casual pool, industry expert agreements, cross-training",
              "Test your contingency plan at least once per year",
              "Ensure third-party agreements include provisions for staffing contingencies",
              "Review and update contingency arrangements whenever the workforce plan changes",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "1 day",
          },
        ],
      },
      {
        code: "3.2",
        title: "Training and assessment is delivered by credentialled people with current skills and knowledge in training and assessment",
        intent:
          "Everyone who delivers training and assessment holds the credentials required by the Credential Policy and keeps their training and assessment practice current through ongoing professional development.",
        whatItMeans:
          "Trainers and assessors hold the TAE qualification (or approved equivalent) required by the Credential Policy. Professional development covers training and assessment methodology — not only the vocational subject area. Assessment validation activities involve persons who meet credential requirements. All credentials and professional development are recorded.",
        keyPractices: [
          "Verify trainer and assessor credentials against the Credential Policy before engagement and at each renewal",
          "Develop an annual professional development plan per trainer that includes T&A methodology, not only vocational currency",
          "Ensure validation activities involve persons with appropriate credentials as required by Standard 1.5",
          "Keep a credentials register that is regularly reviewed and kept current",
        ],
        evidenceExamples: [
          "Credentials register verified against Credential Policy with review dates",
          "Annual professional development plans for each trainer showing T&A-focused activities",
          "Validation participant records confirming credential requirements met",
          "Evidence of completed T&A professional development activities",
        ],
        strategies: [
          {
            title: "Credentials register",
            summary:
              "Maintain a live register of trainer and assessor credentials that is checked against the Credential Policy and reviewed regularly.",
            steps: [
              "List every trainer and assessor who delivers training and assessment for your RTO",
              "Record the credential held, issue date, expiry (where applicable), and Credential Policy requirements for their role",
              "Verify credentials against the current Credential Policy before engagement and at each renewal",
              "Flag credentials approaching expiry and initiate action at least 3 months in advance",
              "Audit the register against the Credential Policy each time the Policy is updated",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "1–2 days setup, then ongoing",
          },
          {
            title: "T&A professional development planning",
            summary:
              "Build a professional development plan for each trainer that includes training and assessment methodology — not only vocational currency.",
            steps: [
              "For each trainer, identify professional development needs in both vocational area and T&A methodology",
              "Include T&A-specific activities in the annual PD plan — e.g. moderation, feedback techniques, inclusive assessment design",
              "Track completion of T&A professional development separately from vocational currency",
              "Use validation findings to identify T&A gaps and feed them into PD plans",
              "Document how T&A professional development has changed practice",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "1 day per cycle",
          },
          {
            title: "Validation credential check",
            summary:
              "Confirm that all participants in validation activities meet credential requirements before they participate.",
            steps: [
              "Review the credential requirements for validation participants as stated in Standard 1.5 and the Credential Policy",
              "Before each validation activity, confirm that each participant meets requirements",
              "Document participant credentials in the validation record",
              "Where a participant does not meet requirements, do not allow them to participate in formal validation",
              "Maintain a log of validation activities with participant credential status",
            ],
            category: "assessment",
            effort: "quick_win",
            timeEstimate: "Ongoing",
          },
        ],
      },
      {
        code: "3.3",
        title: "Training and assessment is delivered by people with current industry skills and knowledge relevant to the training product",
        intent:
          "Trainers and assessors bring current, industry-relevant competency to their delivery — students receive training grounded in how the industry works today, not historical experience.",
        whatItMeans:
          "Industry currency goes beyond years of teaching experience. Trainers actively maintain connection to their industry through workplace visits, professional networks, industry projects, employer engagement and professional body membership. Currency is planned, documented and regularly refreshed — and is reflected in how training is designed and delivered.",
        keyPractices: [
          "Develop an annual industry currency plan per trainer specifying planned activities and methods",
          "Document currency activities with dated entries and reflections on how they informed teaching",
          "Use a mix of currency methods — workplace visits, industry networks, employer meetings, professional reading",
          "Ensure currency activities are relevant to the specific training products the trainer delivers",
        ],
        evidenceExamples: [
          "Annual industry currency plans per trainer",
          "Currency log with dated activities and reflections for each trainer",
          "Evidence of how industry engagement informed changes to training delivery",
          "Industry engagement records — workplace visits, network participation, professional body membership",
        ],
        strategies: [
          {
            title: "Annual industry currency plan",
            summary:
              "Develop an individual industry currency plan for each trainer and assessor that specifies how they will maintain current industry skills.",
            steps: [
              "For each trainer, identify the industry areas relevant to the training products they deliver",
              "Agree on currency activities for the year — workplace visits, industry network participation, employer meetings, professional reading, short courses",
              "Document each planned activity with an expected completion date",
              "Record completed activities with a brief reflection on how they informed teaching practice",
              "Review the plan mid-year and adjust if circumstances change",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "Half day per trainer per year",
          },
          {
            title: "Industry currency log",
            summary:
              "Maintain a currency log for each trainer that provides a timestamped record of all industry engagement activities.",
            steps: [
              "Create a log template capturing: date, activity type, industry area, what was observed or learned, and how it will inform training",
              "Ask trainers to update the log as activities occur — not retrospectively at review time",
              "Review logs in supervision conversations to check currency is genuine and current",
              "Use the log as evidence in validation and audits",
              "Archive logs for a minimum of 5 years",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "Ongoing",
          },
          {
            title: "Employer and industry engagement program",
            summary:
              "Build structured, regular relationships with employers and industry bodies to keep your training grounded in current practice.",
            steps: [
              "Identify key employers, industry bodies and professional associations relevant to your training products",
              "Schedule at least two structured engagement activities per year per training area — site visits, employer advisory meetings, industry forums",
              "Document the outcomes of each engagement — what was learned, any changes to training delivery identified",
              "Assign responsibility for employer engagement to named trainers or a coordinator",
              "Report on industry engagement outcomes at leadership and governance level annually",
            ],
            category: "workforce",
            effort: "deep_change",
            timeEstimate: "Ongoing",
          },
        ],
      },
    ],
  },
  {
    code: "QA4",
    title: "Governance",
    tagline: "Running the RTO with integrity, clarity and a commitment to improvement.",
    description:
      "Effective governance and a commitment to continuous improvement supports the quality and integrity of VET delivery. This area covers leadership, accountability, risk management and systematic improvement.",
    standards: [
      {
        code: "4.1",
        title: "The RTO operates with integrity and maintains accountability for the delivery of quality services",
        intent:
          "Governing persons lead with integrity, make informed decisions, and are accountable for the quality and compliance of the RTO's services.",
        whatItMeans:
          "Governing persons meet the Fit and Proper Person Requirements and actively monitor the RTO's performance. They lead a culture of integrity, fairness and transparency. Decisions are evidence-based and documented. The RTO can demonstrate how governance arrangements ensure compliance with the Standards.",
        keyPractices: [
          "Regularly review performance data (enrolment, completion, complaints, feedback) at governance level",
          "Ensure governing persons are briefed on Standards compliance and their obligations",
          "Document decision-making processes and the evidence that informed significant decisions",
          "Lead a culture of integrity, transparency and continuous improvement across the organisation",
        ],
        evidenceExamples: [
          "Governance meeting minutes showing evidence-based decisions",
          "Performance data reviewed by governing persons",
          "Fit and Proper Person records",
          "Documented governance policy and delegation arrangements",
        ],
        strategies: [
          {
            title: "Governance performance dashboard",
            summary:
              "Give governing persons a regular, simple view of how the RTO is performing against the Standards — not just financial results.",
            steps: [
              "Identify 6–10 key indicators that reflect quality and compliance across all four Quality Areas",
              "Build a one-page dashboard showing current status, trend and target for each indicator",
              "Present the dashboard at every governance meeting",
              "Assign follow-up actions when any indicator falls below threshold",
              "Review the indicators annually to confirm they remain the right measures",
            ],
            category: "governance",
            effort: "deep_change",
            timeEstimate: "1–2 days to design, then ongoing",
          },
          {
            title: "Fit and Proper Person self-assessment",
            summary:
              "Ensure governing persons regularly reassess their own suitability against the Fit and Proper Person Requirements.",
            steps: [
              "Schedule an annual self-assessment for all governing persons against the Fit and Proper Person Requirements",
              "Document the outcome of each self-assessment and store with governance records",
              "Brief governing persons on any changes to the Requirements when the instrument is updated",
              "Ensure new governing persons complete the self-assessment before taking up their role",
              "Flag any concerns arising from self-assessments to the appropriate body immediately",
            ],
            category: "compliance",
            effort: "ongoing",
            timeEstimate: "1 hour per person per year",
          },
          {
            title: "Culture and integrity review",
            summary:
              "Assess the RTO's culture against the integrity, fairness and transparency expectations of Standard 4.1.",
            steps: [
              "Survey staff on their experience of organisational culture — psychological safety, transparency, fairness",
              "Review any complaints or grievances from staff over the past year for culture signals",
              "Identify 3 specific culture improvements and assign owners",
              "Report culture findings and improvement plans to governing persons",
              "Repeat the review annually and track change over time",
            ],
            category: "reflection",
            effort: "ongoing",
            timeEstimate: "1–2 days per year",
          },
        ],
      },
      {
        code: "4.2",
        title: "Roles and responsibilities of RTO staff and third parties are clearly defined and understood",
        intent:
          "Everyone in the organisation — and any third parties — knows what they are responsible for, who they report to, and what authority they hold.",
        whatItMeans:
          "Organisational structures, reporting lines and delegations are documented and current. Staff in all roles understand their responsibilities, including those relating to quality and compliance with the Standards. Where third parties are involved in training delivery, their responsibilities are clearly allocated in written agreements and reviewed regularly.",
        keyPractices: [
          "Maintain a current organisation chart with clear reporting lines and delegation levels",
          "Ensure all staff receive, understand and sign role descriptions that reference quality and compliance responsibilities",
          "Include clearly allocated responsibilities in all third-party agreements",
          "Review structures and responsibilities after any significant change to leadership, scope or delivery model",
        ],
        evidenceExamples: [
          "Current organisation chart with reporting lines and delegations",
          "Signed role descriptions for all staff referencing quality responsibilities",
          "Third-party agreements with clearly allocated responsibilities",
          "Evidence of staff orientation covering roles and responsibilities",
        ],
        strategies: [
          {
            title: "Roles and responsibilities register",
            summary:
              "Create and maintain a register of all roles, their responsibilities, and delegations within the RTO.",
            steps: [
              "List every role in the RTO — governance, management, training staff, support staff, administration",
              "For each role, document key responsibilities including those relating to compliance and quality",
              "Record reporting lines and delegation levels — who can make what decisions on behalf of whom",
              "Ensure the register is updated within 10 business days of any role change",
              "Share the register with all staff as part of induction and when it is updated",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "1–2 days to create",
          },
          {
            title: "Third-party responsibility allocation",
            summary:
              "Ensure all third-party agreements clearly allocate responsibilities between the RTO and the third party for every function they perform.",
            steps: [
              "Review each third-party agreement against your Standards obligations — identify every function the third party performs",
              "For each function, document clearly: who is responsible, who monitors compliance, how issues are escalated",
              "Ensure the RTO retains responsibility for the quality of all training and assessment delivered by third parties",
              "Review agreements at least annually and update responsibility allocations when arrangements change",
              "Brief relevant RTO staff on third-party responsibilities and escalation processes",
            ],
            category: "compliance",
            effort: "deep_change",
            timeEstimate: "1–2 days per agreement",
          },
          {
            title: "Staff induction — roles and responsibilities",
            summary:
              "Build roles and responsibilities into your staff induction so every new employee understands their accountabilities from day one.",
            steps: [
              "Include a roles and responsibilities module in your standard induction program",
              "Provide each new staff member with their role description and the organisation chart on their first day",
              "Walk new staff through the delegation framework and who they report to",
              "Ask new staff to sign confirmation that they have read, understood and received their role description",
              "Schedule a 30-day check-in to address any questions about responsibilities",
            ],
            category: "workforce",
            effort: "ongoing",
            timeEstimate: "1 day to design",
          },
        ],
      },
      {
        code: "4.3",
        title: "Risks to students, staff and the organisation are identified and managed",
        intent:
          "The RTO proactively identifies and mitigates risks — to students, staff and the organisation — before they escalate.",
        whatItMeans:
          "A risk management approach is documented and active. Risks are identified, rated, owned and reviewed on a regular cycle. Risks to student outcomes are prioritised. The RTO uses audit findings, complaints, feedback and near-miss events as inputs to the risk register, and compliance risks are managed as part of the broader risk picture — not as a separate activity.",
        keyPractices: [
          "Maintain a live risk register with owners, risk ratings, mitigations, and scheduled review dates",
          "Treat student outcome risks as priority risk categories",
          "Brief leadership on risk at least quarterly using current risk register data",
          "Use complaints, feedback, validation findings and near-miss events to update the risk register",
        ],
        evidenceExamples: [
          "Risk register with owner, rating, mitigation action and review date for each risk",
          "Leadership risk briefing records (meeting minutes or reports)",
          "Evidence that risk register is updated in response to new information",
          "Internal audit or review reports linked to risk management actions",
        ],
        strategies: [
          {
            title: "Live risk register",
            summary:
              "Build and maintain a risk register that is updated as new information arrives — not only at annual review.",
            steps: [
              "Establish a risk register template covering: risk description, risk owner, likelihood, consequence, risk rating, current controls, additional mitigations, and next review date",
              "Populate the register with risks across all Quality Areas — prioritise student outcome risks",
              "Assign a named owner to each risk who is responsible for monitoring and updating it",
              "Review the full register at least quarterly at leadership level",
              "Update the register within 5 business days of any significant new risk information",
            ],
            category: "governance",
            effort: "deep_change",
            timeEstimate: "2–3 days setup, then ongoing",
          },
          {
            title: "Risk-based improvement input",
            summary:
              "Use complaints, feedback, validation findings and audits to continuously feed new risk information into the risk register.",
            steps: [
              "After each complaints resolution, check whether the complaint reveals a systemic risk not currently in the register",
              "After each validation cycle, identify any quality risks arising from the findings",
              "After any audit or review, create or update risk register entries based on findings",
              "Brief leadership on new or escalated risks at the next scheduled meeting",
              "Track whether risk mitigations have reduced the risk rating over time",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "Ongoing",
          },
          {
            title: "Student outcome risk monitoring",
            summary:
              "Identify and actively manage the risks that most directly affect student outcomes — completion, progress, engagement and assessment.",
            steps: [
              "Identify the top student outcome risks for your RTO — e.g. low completion rates, high at-risk cohort, trainer shortages",
              "Set monitoring indicators for each risk with threshold triggers",
              "Review indicators monthly and brief leadership when thresholds are breached",
              "Document the mitigations in the risk register and assign ownership",
              "Evaluate whether mitigations are reducing the risk on a quarterly basis",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "1–2 days to set up",
          },
        ],
      },
      {
        code: "4.4",
        title: "Systematic monitoring and evaluation of the organisation supports quality delivery and continuous improvement",
        intent:
          "The RTO continuously monitors its own performance and uses what it finds to improve — not to pass audits, but because it is committed to quality VET.",
        whatItMeans:
          "Monitoring is systematic and covers all Quality Areas. Evaluation draws on feedback, complaints, validation outcomes, audit results and student outcome data. Findings are documented, prioritised and acted on with named owners and target dates. The improvement cycle is visible to staff, students and governing persons, and the RTO follows through on implemented changes to verify they worked.",
        keyPractices: [
          "Maintain a single improvement register drawing on all monitoring activities across all Quality Areas",
          "Identify an owner, action and target date for every improvement item",
          "Present improvement progress to governing persons and leadership at least quarterly",
          "Close the loop with staff and students on changes made in response to their feedback",
        ],
        evidenceExamples: [
          "Improvement register with source, owner, action, target date and status for each item",
          "Quarterly leadership and governance reports on improvement progress",
          "Examples of implemented changes with before-and-after evidence",
          "Evidence of improvement cycle communicated to staff and students",
        ],
        strategies: [
          {
            title: "Improvement register",
            summary:
              "Maintain a single improvement register that draws on all monitoring activities and tracks every improvement item to completion.",
            steps: [
              "Create an improvement register recording: source (feedback, validation, audit, complaint), issue identified, improvement action, owner, target date, and status",
              "Feed every monitoring activity into the register — feedback surveys, complaints resolutions, validation findings, audit outcomes, student outcome data",
              "Assign a named owner and realistic target date to every item",
              "Review the register at leadership and governance level quarterly",
              "Close items only when the improvement has been implemented and verified as effective",
            ],
            category: "governance",
            effort: "ongoing",
            timeEstimate: "1–2 days setup, then ongoing",
          },
          {
            title: "Monitoring calendar",
            summary:
              "Schedule all monitoring and evaluation activities for the year in a calendar so nothing is missed.",
            steps: [
              "List all monitoring activities required across all Quality Areas — feedback surveys, validation cycles, audits, risk reviews, complaint analysis, outcome data reviews",
              "Assign each activity a frequency (monthly, quarterly, annually) and a responsible person",
              "Schedule all activities at the start of the year in a shared calendar",
              "Set reminders 2 weeks before each activity is due",
              "Review the calendar mid-year to adjust for any changes in priorities or capacity",
            ],
            category: "governance",
            effort: "quick_win",
            timeEstimate: "1 day to design",
          },
          {
            title: "Close the loop — communicating improvements",
            summary:
              "Tell staff and students what changed as a result of their feedback — this builds trust and encourages ongoing engagement.",
            steps: [
              "For each significant improvement implemented, draft a brief communication to relevant staff and students explaining what changed and why",
              "Use your student newsletter, portal, or induction materials to communicate improvements made in response to student feedback",
              "Brief all staff on improvement outcomes at team meetings or through a staff update",
              "Document when and how each improvement was communicated",
              "Ask stakeholders whether they are aware of and satisfied with improvements as part of your next feedback cycle",
            ],
            category: "learner_support",
            effort: "ongoing",
            timeEstimate: "Ongoing",
          },
        ],
      },
    ],
  },
];

// The companion Pocket Guide supplies the authoritative Outcome Standard names,
// purposes and performance indicators. The practice guide layers plain-language
// explanations and evidence prompts over that official source content.
const officialAreasByCode = new Map(
  OFFICIAL_QUALITY_AREAS.map((area) => [area.code, area])
);

export const SEED_QUALITY_AREAS: SeedQualityArea[] = PRACTICE_QUALITY_AREAS.map(
  (area) => {
    const officialArea = officialAreasByCode.get(area.code);

    if (!officialArea) {
      throw new Error(`Missing official content for ${area.code}`);
    }

    const officialStandardsByCode = new Map(
      officialArea.standards.map((standard) => [standard.code, standard])
    );

    return {
      ...area,
      title: officialArea.title,
      tagline: officialArea.outcome,
      description: officialArea.intent,
      standards: area.standards.map((standard) => {
        const officialStandard = officialStandardsByCode.get(standard.code);

        if (!officialStandard) {
          throw new Error(`Missing official content for Standard ${standard.code}`);
        }

        return {
          ...standard,
          title: officialStandard.title,
          intent: officialStandard.intent,
          keyPractices: officialStandard.performanceIndicators,
        };
      }),
    };
  }
);
