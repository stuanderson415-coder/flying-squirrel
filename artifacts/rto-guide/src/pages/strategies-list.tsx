import { useEffect } from "react";
import {
  PencilRuler,
  Target,
  Scale,
  RefreshCw,
  ClipboardCheck,
  FileCheck2,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const POA_COLOR = "hsl(28,90%,62%)";
const ROE_COLOR = "hsl(200,80%,65%)";

const POA_RULES = [
  {
    name: "Fair",
    desc: "The individual learner's needs are considered in the assessment process.",
  },
  {
    name: "Flexible",
    desc: "Assessment draws on a range of methods appropriate to the context and learner.",
  },
  {
    name: "Valid",
    desc: "Any assessment decision is justified, based on the evidence of performance.",
  },
  {
    name: "Reliable",
    desc: "Evidence is consistently interpreted and results are comparable irrespective of the assessor.",
  },
];

const ROE_RULES = [
  {
    name: "Valid",
    desc: "Assurance that the learner has the skills, knowledge and attributes as described in the unit.",
  },
  {
    name: "Sufficient",
    desc: "Quality, quantity and relevance of evidence enables a judgement of competency.",
  },
  {
    name: "Authentic",
    desc: "Assurance that the evidence presented for assessment is the learner's own work.",
  },
  {
    name: "Current",
    desc: "Assurance that the assessment evidence demonstrates current competency.",
  },
];

const LIFECYCLE_STAGES = [
  {
    id: "design",
    title: "Design & Development",
    icon: PencilRuler,
    description:
      "Creating assessment tools that meet industry requirements and training package rules.",
    tags: [
      { type: "poa", label: "Valid" },
      { type: "poa", label: "Reliable" },
      { type: "poa", label: "Flexible" },
    ],
    prompts: [
      "Does the tool cover all requirements of the unit of competency?",
      "Are instructions clear to both the assessor and the candidate?",
      "Can the assessment be adapted for reasonable adjustment without compromising integrity?",
      "Will the tool produce consistent outcomes regardless of who is assessing?",
    ],
  },
  {
    id: "prepare",
    title: "Prepare for Delivery",
    icon: ClipboardCheck,
    description:
      "Making sure assessors, learners, resources and reasonable adjustments are ready before assessment begins.",
    tags: [
      { type: "poa", label: "Fair" },
      { type: "poa", label: "Flexible" },
    ],
    prompts: [
      "Do learners understand the assessment requirements, process and support available to them?",
      "Are the required facilities, equipment and assessment materials fit for purpose?",
      "Have reasonable adjustments been considered without changing the competency outcome?",
      "Are assessors clear about the tool instructions and their role in the process?",
    ],
  },
  {
    id: "gather",
    title: "Conduct Assessment & Collect Evidence",
    icon: Target,
    description:
      "Collecting evidence of competency through observation, questioning, portfolios, and third-party reports.",
    tags: [
      { type: "roe", label: "Valid" },
      { type: "roe", label: "Sufficient" },
      { type: "roe", label: "Authentic" },
      { type: "roe", label: "Current" },
    ],
    prompts: [
      "Does the evidence directly relate to the unit requirements?",
      "Is there enough evidence to make a confident judgment of competency?",
      "Are you certain the work is the candidate's own?",
      "Does the evidence reflect the candidate's current skills and knowledge?",
    ],
  },
  {
    id: "decision",
    title: "Make & Record the Judgement",
    icon: Scale,
    description:
      "Evaluating the gathered evidence against the unit requirements to make a fair and consistent competency judgment.",
    tags: [
      { type: "poa", label: "Fair" },
      { type: "poa", label: "Reliable" },
    ],
    prompts: [
      "Has the candidate been informed of the assessment process and their right to appeal?",
      "Has the evidence been evaluated objectively against the standard?",
      "Is the decision consistent with what other assessors would decide?",
      "Has the assessment decision and supporting evidence been recorded clearly?",
    ],
  },
  {
    id: "feedback",
    title: "Give Feedback & Support Progress",
    icon: MessageSquare,
    description:
      "Communicating the outcome, feedback and next steps so learners understand their result and any available review options.",
    tags: [
      { type: "poa", label: "Fair" },
      { type: "poa", label: "Flexible" },
    ],
    prompts: [
      "Has clear, constructive feedback been provided to the candidate?",
      "Where a learner is not yet competent, are the next steps and support options clear?",
      "Does the learner know how to seek a review or appeal if they disagree with a decision?",
    ],
  },
  {
    id: "validation",
    title: "Moderate, Validate & Improve",
    icon: RefreshCw,
    description:
      "Reviewing the assessment process and tools to ensure ongoing compliance, reliability, and effectiveness.",
    tags: [
      { type: "poa", label: "All Principles" },
      { type: "roe", label: "All Rules" },
    ],
    prompts: [
      "Have assessment judgements been moderated to check consistency across assessors?",
      "Have the tools been reviewed before, during, and after use?",
      "Were industry experts consulted in the validation process?",
      "Have identified improvements been implemented into the tools?",
      "Is there a documented record of the validation outcomes?",
    ],
  },
];

export default function StrategiesList() {
  useEffect(() => {
    document.title = "Assessment Lifecycle | RTO Standards Companion";
  }, []);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
          Deep Dive
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          The Assessment Lifecycle
        </h1>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground leading-relaxed">
          A credible assessment system is built through six connected phases. At every
          stage, the <strong>Principles of Assessment</strong> and{" "}
          <strong>Rules of Evidence</strong> serve as the foundation for
          compliance and quality outcomes in Australian VET.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <section className="rounded-2xl bg-card/40 border border-border overflow-hidden hover:border-border/80 transition-colors">
          <div className="p-4 border-b border-border/50 bg-background/50 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "hsla(28,90%,62%, 0.15)" }}
            >
              <ClipboardCheck
                className="w-4 h-4"
                style={{ color: POA_COLOR }}
              />
            </div>
            <h2 className="font-semibold text-foreground">
              Principles of Assessment
            </h2>
          </div>
          <ul className="p-5 space-y-4">
            {POA_RULES.map((rule) => (
              <li key={rule.name} className="flex gap-4 items-start">
                <span
                  className="text-xs uppercase tracking-wider font-bold w-20 shrink-0 mt-0.5"
                  style={{ color: POA_COLOR }}
                >
                  {rule.name}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rule.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-card/40 border border-border overflow-hidden hover:border-border/80 transition-colors">
          <div className="p-4 border-b border-border/50 bg-background/50 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "hsla(200,80%,65%, 0.15)" }}
            >
              <FileCheck2
                className="w-4 h-4"
                style={{ color: ROE_COLOR }}
              />
            </div>
            <h2 className="font-semibold text-foreground">
              Rules of Evidence
            </h2>
          </div>
          <ul className="p-5 space-y-4">
            {ROE_RULES.map((rule) => (
              <li key={rule.name} className="flex gap-4 items-start">
                <span
                  className="text-xs uppercase tracking-wider font-bold w-20 shrink-0 mt-0.5"
                  style={{ color: ROE_COLOR }}
                >
                  {rule.name}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rule.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-16 relative">
        <div className="absolute top-8 bottom-8 left-8 w-px bg-border hidden sm:block" />

        <div className="space-y-8 sm:space-y-12">
          {LIFECYCLE_STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="relative z-10 flex flex-col sm:flex-row gap-5 sm:gap-8 group"
              >
                <div className="hidden sm:flex w-16 shrink-0 justify-center">
                  <div className="w-16 h-16 rounded-full bg-background border-[4px] border-card flex items-center justify-center relative z-10 ring-1 ring-border group-hover:ring-primary/40 group-hover:border-primary/10 transition-all duration-300">
                    <span className="text-lg font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full"
                        style={
                          tag.type === "poa"
                            ? {
                                background: "hsla(28,90%,62%, 0.15)",
                                color: POA_COLOR,
                              }
                            : {
                                background: "hsla(200,80%,65%, 0.15)",
                                color: ROE_COLOR,
                              }
                        }
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/70">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
                      Practical Checklist
                    </h4>
                    <ul className="space-y-3.5">
                      {stage.prompts.map((prompt) => (
                        <li key={prompt} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 opacity-70" />
                          <span className="text-sm text-foreground/90 leading-relaxed">
                            {prompt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
