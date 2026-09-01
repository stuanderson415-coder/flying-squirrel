import { useState, useMemo, useRef } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  COMPLIANCE_STANDARDS,
  CREDENTIAL_POLICY,
} from "@/lib/reference-content";

/* ── Glossary data ──────────────────────────────────────────────────────── */
interface GlossaryTerm {
  term: string;
  abbr?: string;
  definition: string;
  category: "regulatory" | "assessment" | "delivery" | "workforce" | "student" | "governance";
}

const TERMS: GlossaryTerm[] = [
  {
    term: "Access and Equity",
    definition:
      "Policies and practices that ensure all eligible people can access and participate in VET, regardless of background, disability, language, or circumstance. RTOs must address barriers and provide reasonable adjustments.",
    category: "student",
  },
  {
    term: "AVETMISS",
    abbr: "Australian Vocational Education and Training Management Information Statistical Standard",
    definition:
      "The national data standard used to collect, validate, and report information about VET activity in Australia. RTOs must submit AVETMISS-compliant data to their state/territory registering body and the National Centre for Vocational Education Research (NCVER).",
    category: "regulatory",
  },
  {
    term: "AQF",
    abbr: "Australian Qualifications Framework",
    definition:
      "The national policy that sets ten qualification levels across all Australian education sectors — from Certificate I through to Doctoral Degree. Each level describes the complexity and depth of learning outcomes expected, and determines how qualifications relate to each other.",
    category: "regulatory",
  },
  {
    term: "ASQA",
    abbr: "Australian Skills Quality Authority",
    definition:
      "The national regulator for Australia's VET sector, responsible for registering RTOs, approving courses, monitoring compliance with the RTO Standards, and taking regulatory action where standards are not met.",
    category: "regulatory",
  },
  {
    term: "Assessment",
    definition:
      "The process of collecting evidence and making judgements about whether a learner has achieved the required competencies. Assessment must be valid, reliable, flexible, and fair. In VET, assessment is competency-based — learners are judged as 'competent' or 'not yet competent'.",
    category: "assessment",
  },
  {
    term: "Assessment Mapping",
    definition:
      "The documented process of demonstrating how each assessment task, question, or activity addresses the performance criteria, knowledge evidence, and performance evidence of a unit of competency.",
    category: "assessment",
  },
  {
    term: "Assessment System",
    definition:
      "All the policies, procedures, tools, and processes an RTO uses to design, develop, deliver, and review assessments. The assessment system must ensure assessments are valid, reliable, flexible, and fair across all contexts and delivery modes.",
    category: "assessment",
  },
  {
    term: "Assessment Validation",
    definition:
      "A quality review process to check that an RTO's assessment tools and judgements are valid, reliable, flexible, and fair. Validation involves checking that assessments address unit requirements, that judgements are consistent, and that tools are fit for purpose.",
    category: "assessment",
  },
  {
    term: "Audit",
    definition:
      "A formal review by a regulatory body (e.g. ASQA) to assess whether an RTO is complying with the RTO Standards, training package requirements, and other legislative obligations. Audits may be scheduled, triggered by complaints, or conducted as part of risk-based monitoring.",
    category: "regulatory",
  },
  {
    term: "Blended Learning",
    definition:
      "A delivery mode that combines face-to-face instruction with online or self-directed learning activities. Blended learning must still meet all training package requirements and provide learners with adequate support and access to trainers.",
    category: "delivery",
  },
  {
    term: "Certificate of Attainment",
    definition:
      "A nationally recognised qualification document issued to a learner who has successfully completed one or more units of competency but not the full requirements for a full qualification.",
    category: "regulatory",
  },
  {
    term: "Competency",
    definition:
      "The consistent application of knowledge and skill to the standard of performance required in the workplace. Competency includes the ability to perform tasks across different situations and environments, and encompasses technical skills, knowledge, attitudes, and values.",
    category: "assessment",
  },
  {
    term: "Competency-Based Training",
    abbr: "CBT",
    definition:
      "A training approach where learning and assessment focus on demonstrated outcomes — what a person can do — rather than time spent in training. Learners progress when they can demonstrate competency to the required standard.",
    category: "delivery",
  },
  {
    term: "Continuous Improvement",
    definition:
      "An ongoing cycle of monitoring, evaluating, and improving all aspects of an RTO's operations. The RTO Standards require RTOs to systematically collect feedback, identify improvement opportunities, implement changes, and verify their effectiveness.",
    category: "governance",
  },
  {
    term: "Credential Policy",
    definition:
      "The national policy that specifies the minimum qualifications trainers and assessors must hold to deliver training and assessment in VET. It sets out requirements for TAE qualifications, industry experience, and currency of skills.",
    category: "workforce",
  },
  {
    term: "Credit Transfer",
    definition:
      "The process of recognising a learner's prior formal learning — units or qualifications they have already completed — as satisfying requirements in their current enrolment. RTOs must apply credit transfer when there is an established equivalence between units.",
    category: "student",
  },
  {
    term: "DEWR",
    abbr: "Department of Employment and Workplace Relations",
    definition:
      "The Australian Government department responsible for VET policy and reform, including the development and maintenance of the national RTO Standards framework (Outcome Standards).",
    category: "regulatory",
  },
  {
    term: "Delivery Mode",
    definition:
      "The method by which training is delivered to learners — for example, face-to-face, online, blended, workplace-based, or distance. RTOs must ensure the chosen delivery mode is appropriate for the qualification and supports learner outcomes.",
    category: "delivery",
  },
  {
    term: "Distance Learning",
    definition:
      "A delivery mode where learners study predominantly away from the RTO campus, often through printed or digital materials, with limited face-to-face contact. RTOs must ensure distance learners have adequate access to support, trainers, and assessment.",
    category: "delivery",
  },
  {
    term: "Employability Skills",
    definition:
      "Generic skills that enable people to be effective in the workplace — including communication, teamwork, problem-solving, initiative and enterprise, planning and organising, self-management, learning, and use of technology. These skills are embedded across VET qualifications.",
    category: "delivery",
  },
  {
    term: "Enrolment",
    definition:
      "The formal process by which a learner is registered to undertake training with an RTO. The enrolment process must include provision of accurate pre-enrolment information, a pre-training review, and collection of required learner data.",
    category: "student",
  },
  {
    term: "Fit and Proper Person Requirements",
    definition:
      "A set of criteria in the RTO Standards that governing persons and key management personnel of an RTO must meet. These requirements assess character, criminal history, financial probity, and past conduct in the VET sector.",
    category: "governance",
  },
  {
    term: "Formative Assessment",
    definition:
      "Assessment designed to support learning by providing feedback during the training process rather than making a final competency judgement. Formative assessment helps learners identify gaps and guides the direction of further training.",
    category: "assessment",
  },
  {
    term: "Foundation Skills",
    definition:
      "Core skills in reading, writing, oral communication, numeracy, and digital literacy, as well as employability skills. Foundation skills underpin performance in all VET qualifications and must be addressed in training design and delivery.",
    category: "delivery",
  },
  {
    term: "Governance",
    definition:
      "The systems, processes, and structures through which an RTO is directed, controlled, and held accountable. Good governance includes clear delegation of authority, documented decision-making processes, management of risk, and commitment to integrity.",
    category: "governance",
  },
  {
    term: "Industry Currency",
    definition:
      "The requirement for trainers and assessors to maintain up-to-date knowledge and skills in the vocational area they teach, reflecting current industry practice. Currency is maintained through workplace visits, industry engagement, professional networks, and ongoing professional development.",
    category: "workforce",
  },
  {
    term: "Industry Engagement",
    definition:
      "Structured, ongoing relationships between RTOs and employers, industry associations, and professional bodies that inform training design, delivery, and assessment. Industry engagement supports industry currency for trainers and ensures training reflects current workplace requirements.",
    category: "workforce",
  },
  {
    term: "Learner",
    definition:
      "A person enrolled with an RTO to undertake training and/or assessment. The RTO Standards use 'learner' and 'student' interchangeably to refer to people in VET, and establish obligations around their support, information rights, and wellbeing.",
    category: "student",
  },
  {
    term: "LLN",
    abbr: "Language, Literacy and Numeracy",
    definition:
      "The foundational communication and mathematical skills required for effective participation in training and the workplace. RTOs must assess LLN needs as part of the pre-training review and provide appropriate support or refer learners to specialist services.",
    category: "student",
  },
  {
    term: "Moderation",
    definition:
      "A quality process in which assessors compare and align their assessment judgements to ensure consistency across different assessors, sites, and cohorts. Moderation is distinct from validation — it focuses on the consistency of judgements rather than the tools themselves.",
    category: "assessment",
  },
  {
    term: "Mode of Delivery",
    definition:
      "See Delivery Mode.",
    category: "delivery",
  },
  {
    term: "NCVER",
    abbr: "National Centre for Vocational Education Research",
    definition:
      "Australia's independent body for collecting, managing, analysing, and publishing national VET statistics and research. NCVER manages the national AVETMISS data collection and publishes annual Australian VET statistics.",
    category: "regulatory",
  },
  {
    term: "Outcome Standards",
    definition:
      "The 2025 RTO Standards framework published by DEWR, replacing the 2015 Standards for RTOs. The Outcome Standards are structured around four Quality Areas and focus on what RTOs must achieve for learners, rather than prescribing how they must operate.",
    category: "regulatory",
  },
  {
    term: "Performance Criteria",
    definition:
      "Specific statements within a unit of competency that describe the required performance for each element. Assessment must demonstrate that a learner can meet each performance criterion.",
    category: "assessment",
  },
  {
    term: "Performance Evidence",
    definition:
      "Evidence of a learner's ability to perform specific tasks or activities as specified in a unit of competency. Performance evidence must generally be demonstrated in a workplace or simulated workplace context.",
    category: "assessment",
  },
  {
    term: "Pre-enrolment Information",
    definition:
      "Accurate, current information provided to prospective learners before they enrol, covering course content, costs, modes, support, entry requirements, and expected outcomes. The RTO Standards require this information to be clear, honest, and sufficient to support informed decision-making.",
    category: "student",
  },
  {
    term: "Pre-training Review",
    definition:
      "An assessment conducted before or at enrolment to determine a learner's goals, prior learning, LLN needs, and support requirements. The outcomes of a pre-training review must genuinely inform enrolment decisions and the delivery plan for each learner.",
    category: "student",
  },
  {
    term: "Professional Development",
    abbr: "PD",
    definition:
      "Structured learning activities that keep trainers, assessors, and other staff current in their vocational areas and training and assessment practice. The RTO Standards require ongoing professional development for all staff — not only trainers.",
    category: "workforce",
  },
  {
    term: "Quality Area",
    definition:
      "One of four groupings of standards in the 2025 Outcome Standards framework: QA1 Training and Assessment, QA2 VET Student Support, QA3 VET Workforce, QA4 Governance. Each Quality Area contains related standards that together define what RTOs must achieve.",
    category: "regulatory",
  },
  {
    term: "Reasonable Adjustment",
    definition:
      "A modification to training delivery or assessment that enables a learner with disability or other specific needs to participate fully, without compromising the integrity or requirements of the training product. Adjustments must be documented and must not alter the unit's essential requirements.",
    category: "student",
  },
  {
    term: "Recognition of Prior Learning",
    abbr: "RPL",
    definition:
      "An assessment process that allows learners to gain formal recognition for skills and knowledge they already have, gained through work, life, or previous study. RPL must be a genuine assessment process — not a shortcut — and must result in a robust judgement of competency.",
    category: "assessment",
  },
  {
    term: "Risk Management",
    definition:
      "The systematic identification, assessment, and management of risks to an RTO's operations, compliance, and learner outcomes. The RTO Standards require RTOs to maintain a risk register and actively manage risks — particularly those affecting learner outcomes.",
    category: "governance",
  },
  {
    term: "RTO",
    abbr: "Registered Training Organisation",
    definition:
      "An organisation registered by a state, territory, or national authority to deliver nationally recognised VET qualifications and issue AQF credentials. RTOs must comply with the RTO Standards and any applicable state/territory requirements.",
    category: "regulatory",
  },
  {
    term: "Scope of Registration",
    definition:
      "The specific training products (qualifications, skill sets, and units of competency) and the states and territories in which an RTO is registered to deliver and assess. RTOs may only issue national qualifications for training products within their scope.",
    category: "regulatory",
  },
  {
    term: "Skill Set",
    definition:
      "A defined grouping of one or more units of competency that links to a defined industry need, licensing requirement, or job function. Completing a skill set results in a Statement of Attainment.",
    category: "regulatory",
  },
  {
    term: "Statement of Attainment",
    definition:
      "A nationally recognised credential issued to a learner who has completed one or more units of competency or a skill set, but not a full qualification.",
    category: "regulatory",
  },
  {
    term: "Student Wellbeing",
    definition:
      "The overall health, safety, and welfare of learners while they are engaged with an RTO. RTOs have obligations to identify learners with wellbeing needs and to connect them with appropriate support services.",
    category: "student",
  },
  {
    term: "Summative Assessment",
    definition:
      "Assessment designed to make a final judgement about whether a learner has achieved competency. Summative assessment results in a formal competency determination and is recorded as part of the learner's achievement.",
    category: "assessment",
  },
  {
    term: "TAE",
    abbr: "Training and Assessment",
    definition:
      "Refers to the TAE Training Package, which includes the qualifications trainers and assessors must hold (such as TAE40122 Certificate IV in Training and Assessment). It is also used informally to refer to training and assessment practice generally.",
    category: "workforce",
  },
  {
    term: "Third-Party Arrangements",
    definition:
      "Agreements where an RTO engages another organisation to deliver or assess training on its behalf. The RTO retains full responsibility for the quality and compliance of all training and assessment delivered through third parties.",
    category: "delivery",
  },
  {
    term: "Training Package",
    definition:
      "A set of nationally endorsed standards and qualifications developed by industry to meet the training needs of a specific industry sector. Training packages include units of competency, qualifications, skill sets, and credit arrangements.",
    category: "regulatory",
  },
  {
    term: "Training Plan",
    definition:
      "A documented plan for an individual learner that outlines the units to be completed, the delivery approach, assessment schedule, and any support arrangements. Training plans must reflect the outcomes of the pre-training review.",
    category: "delivery",
  },
  {
    term: "Unit of Competency",
    definition:
      "The smallest formally assessed component of a VET qualification. Each unit describes what a person must be able to do (elements and performance criteria), what they must know (knowledge evidence), and under what conditions (assessment conditions). Competency in a unit must be demonstrated holistically.",
    category: "assessment",
  },
  {
    term: "USI",
    abbr: "Unique Student Identifier",
    definition:
      "A nationally unique reference number that creates a life-long online record of an individual's nationally recognised VET training and qualifications. RTOs must verify or create a USI for each learner before issuing a qualification or statement of attainment.",
    category: "regulatory",
  },
  {
    term: "Validation",
    definition:
      "See Assessment Validation.",
    category: "assessment",
  },
  {
    term: "VET",
    abbr: "Vocational Education and Training",
    definition:
      "Education and training that provides individuals with occupational or work-related skills and knowledge. In Australia, VET includes certificate and diploma qualifications delivered by TAFEs, private providers, schools, and enterprise RTOs.",
    category: "regulatory",
  },
  {
    term: "VET Student Loans",
    abbr: "VSL",
    definition:
      "An income-contingent loan scheme that helps eligible students enrolled in approved higher-level VET courses pay their tuition fees. RTOs must meet specific eligibility requirements and obligations to access the VSL program.",
    category: "student",
  },
  {
    term: "Work Placement",
    definition:
      "A structured period of supervised practical training that takes place in a workplace. Required in many VET qualifications to ensure learners gain real industry experience. RTOs must ensure work placements are appropriately monitored and assessed.",
    category: "delivery",
  },
  {
    term: "Workforce Planning",
    definition:
      "The systematic process of identifying the staffing needs of an RTO — including the number, mix, qualifications, and experience of trainers, assessors, and support staff — and planning how to meet those needs over time.",
    category: "workforce",
  },
];

/* ── Category config ────────────────────────────────────────────────────── */
const CATEGORIES: Record<GlossaryTerm["category"], { label: string; color: string }> = {
  regulatory:  { label: "Regulatory",   color: "hsl(265,70%,65%)" },
  assessment:  { label: "Assessment",   color: "hsl(200,80%,60%)" },
  delivery:    { label: "Delivery",     color: "hsl(150,60%,50%)" },
  workforce:   { label: "Workforce",    color: "hsl(28,90%,62%)"  },
  student:     { label: "Student",      color: "hsl(340,70%,60%)" },
  governance:  { label: "Governance",   color: "hsl(220,60%,60%)" },
};

/* ── Helpers ────────────────────────────────────────────────────────────── */
function getAlphaKey(term: string) {
  return term[0].toUpperCase();
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* ── Component ──────────────────────────────────────────────────────────── */
export default function ReferencePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryTerm["category"] | "all">("all");
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TERMS.filter((t) => {
      const matchesQuery =
        !q ||
        t.term.toLowerCase().includes(q) ||
        (t.abbr ?? "").toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      const matchesCat = activeCategory === "all" || t.category === activeCategory;
      return matchesQuery && matchesCat;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, activeCategory]);

  const letters = useMemo(
    () => [...new Set(filtered.map((t) => getAlphaKey(t.term)))].sort(),
    [filtered]
  );

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const key = getAlphaKey(t.term);
      (map[key] ??= []).push(t);
    }
    return map;
  }, [filtered]);

  const scrollToLetter = (letter: string) => {
    letterRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Standards, credentials and terminology
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Reference
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Practical reference material for the Outcome Standards, educator credentials and VET terminology.
        </p>
      </div>

      <div
        role="note"
        className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      >
        Use this page alongside current official guidance, your RTO&apos;s policies
        and the direction of appropriately credentialled staff. It is a practical
        reference, not legal or compliance advice.
      </div>

      <details id="compliance-standards" className="rounded-2xl border border-orange-500/25 bg-card p-4 scroll-mt-6">
        <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
          <div className="mt-0.5 rounded-xl bg-orange-500/10 p-2 text-orange-500">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              Standards reference
            </p>
            <h2 id="compliance-heading" className="mt-0.5 text-xl font-bold text-foreground">
              Compliance Requirements
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Information, integrity and accountability requirements that sit alongside the Outcome Standards.
            </p>
          </div>
          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform" />
        </summary>

        <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
          {COMPLIANCE_STANDARDS.map((standard) => (
            <details
              key={standard.clause}
              className="group rounded-2xl border border-border/60 bg-card"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 shrink-0 rounded-md bg-orange-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-500">
                  {standard.clause}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug text-foreground">
                    {standard.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {standard.summary}
                  </span>
                  <span className="mt-2 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {standard.division}
                  </span>
                </span>
                <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border/60 px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Key requirements
                </p>
                <ul className="mt-3 space-y-2">
                  {standard.requirements.map((requirement) => (
                    <li key={requirement} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 text-orange-500">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </details>

      <details id="credential-policy" className="rounded-2xl border border-sky-500/25 bg-card p-4 scroll-mt-6">
        <summary className="flex cursor-pointer list-none items-start gap-3 [&::-webkit-details-marker]:hidden">
          <div className="mt-0.5 rounded-xl bg-sky-500/10 p-2 text-sky-500">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
              Standards reference
            </p>
            <h2 id="credential-heading" className="mt-0.5 text-xl font-bold text-foreground">
              Credential Policy
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Trainer, assessor, direction and validation requirements for VET educators.
            </p>
          </div>
          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform" />
        </summary>

        <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
          {(["Training and assessment", "TAE delivery", "Validation"] as const).map((group) => {
          const sections = CREDENTIAL_POLICY.filter((item) => item.group === group);
          return (
            <div key={group} className="space-y-3">
              <h3 className="border-b border-border/60 px-1 pb-2 text-sm font-semibold text-foreground">
                {group}
              </h3>
              {sections.map((policy) => (
                <details
                  key={policy.section}
                  className="group rounded-2xl border border-border/60 bg-card"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="mt-0.5 shrink-0 rounded-md bg-sky-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-500">
                      {policy.section}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug text-foreground">
                        {policy.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {policy.summary}
                      </span>
                    </span>
                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-border/60 px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Required credentials and conditions
                    </p>
                    <ul className="mt-3 space-y-2">
                      {policy.requirements.map((requirement) => (
                        <li key={requirement} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-0.5 text-sky-500">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    {policy.note && (
                      <p className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                        {policy.note}
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          );
          })}
        </div>
      </details>

      <section id="glossary" aria-labelledby="glossary-heading" className="space-y-5 scroll-mt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            VET terminology
          </p>
          <h2 id="glossary-heading" className="mt-0.5 text-xl font-bold text-foreground">
            Glossary
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key terms used in Vocational Education and Training in Australia.
          </p>
        </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms or definitions…"
          className="w-full rounded-xl bg-card border border-border pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {(Object.entries(CATEGORIES) as [GlossaryTerm["category"], typeof CATEGORIES[keyof typeof CATEGORIES]][]).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key === activeCategory ? "all" : key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeCategory === key
                ? "text-foreground border-transparent"
                : "bg-transparent text-muted-foreground border-border/60 hover:border-border"
            }`}
            style={
              activeCategory === key
                ? { backgroundColor: cat.color + "30", borderColor: cat.color + "60", color: cat.color }
                : {}
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Alphabet jump bar */}
      {!query && (
        <div className="flex flex-wrap gap-1">
          {ALPHABET.map((letter) => {
            const available = letters.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => available && scrollToLetter(letter)}
                disabled={!available}
                className={`w-7 h-7 text-[11px] font-semibold rounded-lg transition-all ${
                  available
                    ? "text-primary bg-primary/10 hover:bg-primary/20"
                    : "text-muted-foreground/25 cursor-default"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      {/* Results count */}
      {(query || activeCategory !== "all") && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} term{filtered.length !== 1 ? "s" : ""}
          {query ? ` matching "${query}"` : ""}
        </p>
      )}

      {/* Term groups */}
      {letters.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          No terms found.
        </div>
      ) : (
        <div className="space-y-8 pb-4">
          {letters.map((letter) => (
            <div
              key={letter}
              ref={(el) => { letterRefs.current[letter] = el; }}
            >
              {/* Letter heading */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: "hsl(28,90%,62%)" }}
                >
                  {letter}
                </span>
                <span className="flex-1 h-px bg-border/50" />
              </div>

              {/* Terms */}
              <div className="space-y-3">
                {grouped[letter].map((item) => {
                  const cat = CATEGORIES[item.category];
                  return (
                    <div
                      key={item.term}
                      className="rounded-2xl bg-card border border-border/60 p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground leading-snug">
                            {item.term}
                          </h3>
                          {item.abbr && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {item.abbr}
                            </p>
                          )}
                        </div>
                        <span
                          className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                          style={{
                            backgroundColor: cat.color + "20",
                            color: cat.color,
                          }}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      </section>
    </div>
  );
}
