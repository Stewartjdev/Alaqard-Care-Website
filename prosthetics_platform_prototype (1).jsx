import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Briefcase,
  ChevronDown,
  ClipboardList,
  Footprints,
  Hand,
  HeartHandshake,
  Home,
  LifeBuoy,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "alaqard-resource-profile-v1";

const USER_TYPES = [
  {
    id: "amputee",
    title: "Amputee",
    description: "I need a clear starting point into prosthetic care.",
    icon: Hand,
  },
  {
    id: "parent",
    title: "Parent",
    description: "My child has a newborn limb difference and I need guidance.",
    icon: Baby,
  },
  { 
    id: "caregiver",
    title: "Caregiver",
    description: "I help someone navigate appointments, decisions, and next steps.",
    icon: HeartHandshake,
  },
];

const LIMB_TYPES = [
  { id: "upper", label: "Upper limb" },
  { id: "lower", label: "Lower limb" },
];

const AMPUTATION_LEVELS = {
  upper: ["Partial hand", "Wrist disarticulation", "Transradial", "Elbow disarticulation", "Transhumeral", "Shoulder disarticulation"],
  lower: ["Partial foot", "Ankle disarticulation", "Transtibial", "Knee disarticulation", "Transfemoral", "Hip disarticulation"],
};

const LIFESTYLES = ["Daily living", "Active", "Work-focused", "Sport-focused"];

const PROCESS_STEPS = [
  {
    id: "referral",
    title: "Referral",
    what: "A physician, surgeon, pediatric specialist, or care team points you toward prosthetic care services.",
    who: "Physician, surgeon, discharge planner, pediatric specialist, family support",
    prepare: "Bring medical records, discharge notes, and questions about next steps.",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    what: "Your condition, goals, physical status, and readiness are reviewed to determine what path makes sense.",
    who: "Prosthetist, physician, PT, OT, family or caregiver",
    prepare: "Know daily needs, pain issues, transportation limits, and activity goals.",
  },
  {
    id: "measurement",
    title: "Measurement",
    what: "Residual limb shape, size, skin condition, and fit requirements are documented.",
    who: "Prosthetist, technician, sometimes therapist",
    prepare: "Wear comfortable clothing, note skin issues, and be ready for multiple measurements.",
  },
  {
    id: "fitting",
    title: "Fitting",
    what: "A prosthetic device or test socket is fitted, adjusted, and checked for comfort and function.",
    who: "Prosthetist, technician, sometimes physician or therapist",
    prepare: "Report pressure points, discomfort, instability, or control issues clearly.",
  },
  {
    id: "training",
    title: "Training",
    what: "You learn how to use the device safely and effectively in daily life or specialized activities.",
    who: "PT, OT, prosthetist, family or caregiver",
    prepare: "List tasks you need most: walking, dressing, work tasks, grip control, sports movement.",
  },
  {
    id: "follow-up",
    title: "Follow-Up",
    what: "Adjustments, repairs, skin checks, comfort checks, and performance reviews happen over time.",
    who: "Prosthetist, physician, therapist, patient support system",
    prepare: "Track fit problems, wear schedule, skin changes, and functional improvements.",
  },
];

const RESOURCE_LIBRARY = [
  {
    id: "understanding",
    title: "Understanding Limb Loss",
    items: [
      {
        title: "What changes first",
        body: [
          "Physical healing and emotional adjustment often happen at the same time.",
          "Early confusion usually comes from not knowing the order of care steps.",
          "Your first goal is not choosing the final device. It is understanding your care path.",
        ],
      },
      {
        title: "Questions to answer early",
        body: [
          "What limb level am I dealing with?",
          "What do I need to do daily?",
          "Who is leading this process right now?",
        ],
      },
    ],
  },
  {
    id: "prosthetic-types",
    title: "Types of Prosthetics",
    items: [
      {
        title: "Different devices serve different goals",
        body: [
          "Some devices prioritize comfort and daily use.",
          "Some prioritize strength, control, or activity return.",
          "A good match depends on limb level, body condition, goals, and training needs.",
        ],
      },
      {
        title: "How to think about choice",
        body: [
          "Do not ask only: what prosthetic exists?",
          "Ask: what function do I need first, what can my body support, and what training will be required?",
        ],
      },
    ],
  },
  {
    id: "expect",
    title: "What to Expect",
    items: [
      {
        title: "The process is staged",
        body: [
          "Referral usually comes before device discussion.",
          "Evaluation and measurement usually happen before fitting.",
          "Training and follow-up continue after the first device is received.",
        ],
      },
      {
        title: "What slows people down",
        body: [
          "Missing paperwork",
          "Unclear goals",
          "Insurance uncertainty",
          "Repeated intake across providers",
        ],
      },
    ],
  },
  {
    id: "appointment",
    title: "First Appointment Preparation",
    items: [
      {
        title: "Bring structure into the visit",
        body: [
          "Know your limb level and healing status.",
          "Write down the top tasks you need help with.",
          "Bring records, insurance information, and questions.",
        ],
      },
      {
        title: "What to ask",
        body: [
          "What is the immediate next step after this appointment?",
          "What information is still missing?",
          "What kind of follow-up timeline should I expect?",
        ],
      },
    ],
  },
  {
    id: "financial",
    title: "Financial / Insurance Basics",
    items: [
      {
        title: "Start with the basics",
        body: [
          "Verify what plan is active.",
          "Ask what documentation is required for prosthetic approval.",
          "Track every provider and insurer request in one place.",
        ],
      },
      {
        title: "What creates delays",
        body: [
          "Missing authorizations",
          "Incomplete supporting records",
          "Not knowing who is responsible for the next submission",
        ],
      },
    ],
  },
  {
    id: "pediatric",
    title: "Pediatric / Newborn Pathway",
    items: [
      {
        title: "Parent emphasis",
        body: [
          "The early goal is understanding development, function, and support options, not rushing a device decision.",
          "Questions often center on milestones, adaptation, family education, and long-term planning.",
          "You need a pathway that explains specialists, timing, and realistic next steps.",
        ],
      },
      {
        title: "Who may be involved",
        body: [
          "Pediatric physician",
          "Prosthetist",
          "OT or PT",
          "Family support system",
        ],
      },
    ],
  },
];

function useStoredProfile() {
  const [profile, setProfile] = useState({
    userType: "",
    limbType: "",
    amputationLevel: "",
    lifestyle: "",
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
}

function AppNavigation({ activeView, setActiveView, profileCompletion }) {
  const items = [
    { id: "gateway", label: "Gateway", icon: Home },
    { id: "pathway", label: "Condition Pathway", icon: ClipboardList },
    { id: "resources", label: "Resource Library", icon: LifeBuoy },
    { id: "process", label: "Process Flow", icon: Footprints },
  ];

  return (
    <Card className="rounded-3xl border-0 shadow-lg">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-tight">Alaqard Care Guide</div>
          <div className="text-sm text-slate-500">Structured starting point for amputees, families, and caregivers entering prosthetic care.</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  activeView === item.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="min-w-[180px]">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>Profile completion</span>
            <span>{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

function EntryGateway({ profile, setProfile, onContinue }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="rounded-3xl border-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 text-white shadow-2xl">
        <CardContent className="p-8">
          <Badge className="mb-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/10">Entry Gateway</Badge>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">Start with the right pathway, not a pile of information.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            This system is built to reduce confusion at the start of prosthetic care. It identifies who you are, what condition path you are entering, and what action should come next.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-slate-300">Purpose</div>
              <div className="mt-1 text-lg font-semibold">Guide decisions</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-slate-300">Avoid</div>
              <div className="mt-1 text-lg font-semibold">Information overload</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-slate-300">Next move</div>
              <div className="mt-1 text-lg font-semibold">Build your profile</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Who are you?</CardTitle>
          <CardDescription>Choose the starting route that matches your situation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {USER_TYPES.map((option) => {
            const Icon = option.icon;
            const active = profile.userType === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setProfile((prev) => ({ ...prev, userType: option.id }))}
                className={`w-full rounded-2xl border p-4 text-left transition ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-2xl p-2 ${active ? "bg-white/10" : "bg-slate-100"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{option.title}</div>
                    <div className={`mt-1 text-sm ${active ? "text-slate-300" : "text-slate-500"}`}>{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}

          <Button onClick={onContinue} className="w-full rounded-2xl" disabled={!profile.userType}>
            Continue to condition pathway
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ConditionPathway({ profile, setProfile, onContinue }) {
  const levels = profile.limbType ? AMPUTATION_LEVELS[profile.limbType] : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Condition pathway</CardTitle>
          <CardDescription>Build the core profile that personalizes guidance and filters what the user sees next.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Limb classification</label>
            <Select
              value={profile.limbType}
              onValueChange={(value) => setProfile((prev) => ({ ...prev, limbType: value, amputationLevel: "" }))}
            >
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="Select limb classification" />
              </SelectTrigger>
              <SelectContent>
                {LIMB_TYPES.map((item) => (
                  <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amputation level</label>
            <Select
              value={profile.amputationLevel}
              onValueChange={(value) => setProfile((prev) => ({ ...prev, amputationLevel: value }))}
              disabled={!profile.limbType}
            >
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="Select amputation level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Lifestyle priority</label>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {LIFESTYLES.map((item) => {
                const active = profile.lifestyle === item;
                return (
                  <button
                    key={item}
                    onClick={() => setProfile((prev) => ({ ...prev, lifestyle: item }))}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2 flex gap-3">
            <Button className="rounded-2xl" onClick={onContinue} disabled={!profile.userType || !profile.limbType || !profile.amputationLevel || !profile.lifestyle}>
              Continue to resources
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setProfile((prev) => ({ ...prev, limbType: "", amputationLevel: "", lifestyle: "" }))}
            >
              Reset selections
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight">Profile summary</CardTitle>
          <CardDescription>This state powers personalization and resource filtering.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">User type</div>
            <div className="mt-1 font-semibold capitalize">{profile.userType || "Not selected"}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Limb classification</div>
            <div className="mt-1 font-semibold">{profile.limbType ? LIMB_TYPES.find((item) => item.id === profile.limbType)?.label : "Not selected"}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Amputation level</div>
            <div className="mt-1 font-semibold">{profile.amputationLevel || "Not selected"}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Lifestyle</div>
            <div className="mt-1 font-semibold">{profile.lifestyle || "Not selected"}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResourceAccordion({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="rounded-3xl border-0 shadow-lg">
      <button onClick={() => setOpen((prev) => !prev)} className="w-full text-left">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl tracking-tight">{section.title}</CardTitle>
            <CardDescription>Short, structured modules. No information dump.</CardDescription>
          </div>
          <div className={`rounded-2xl bg-slate-100 p-2 transition ${open ? "rotate-180" : ""}`}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-4">
          {section.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="font-semibold">{item.title}</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {item.body.map((line) => (
                  <div key={line} className="rounded-xl bg-slate-50 px-3 py-2">{line}</div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

function ResourceSections({ profile, onAction }) {
  const filteredSections = useMemo(() => {
    return RESOURCE_LIBRARY.filter((section) => {
      if (section.id === "pediatric") return profile.userType === "parent";
      return true;
    });
  }, [profile.userType]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">Resource library</CardTitle>
            <CardDescription>Content is filtered to reduce noise and move the user toward a next action.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">{profile.userType || "No user type"}</Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1">{profile.limbType || "No limb type"}</Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1">{profile.amputationLevel || "No level"}</Badge>
            <Badge variant="secondary" className="rounded-full px-3 py-1">{profile.lifestyle || "No lifestyle"}</Badge>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl tracking-tight">Action layer</CardTitle>
            <CardDescription>The system should never leave the user at a dead end.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full rounded-2xl" onClick={() => onAction("intake")}>Start Intake</Button>
            <Button variant="outline" className="w-full rounded-2xl" onClick={() => onAction("providers")}>Find Providers</Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredSections.map((section, index) => (
          <ResourceAccordion key={section.id} section={section} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
}

function ProcessFlow({ onAction }) {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const currentStep = PROCESS_STEPS.find((step) => step.id === activeStep) || PROCESS_STEPS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Process visualization</CardTitle>
          <CardDescription>Clickable pathway showing what happens, who is involved, and what the user should prepare.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {PROCESS_STEPS.map((step, index) => {
              const active = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-white/10" : "bg-slate-100 text-slate-700"}`}>
                    {index + 1}
                  </div>
                  <div className="font-semibold">{step.title}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight">{currentStep.title}</CardTitle>
          <CardDescription>Use this to understand the step before it becomes a source of confusion.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">What happens</div>
            <div>{currentStep.what}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Who is involved</div>
            <div>{currentStep.who}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">What to prepare</div>
            <div>{currentStep.prepare}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button className="rounded-2xl" onClick={() => onAction("intake")}>Start Intake</Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => onAction("providers")}>Find Providers</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionModal({ action, onClose }) {
  if (!action) return null;

  const content =
    action === "intake"
      ? {
          title: "Start Intake",
          body: "This links into the existing intake system. In production, this route would move the user into the structured case intake flow.",
        }
      : {
          title: "Find Providers",
          body: "This links into the existing matching system. In production, this route would move the user into provider matching based on the stored profile.",
        };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <Card className="w-full max-w-lg rounded-3xl border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">{content.title}</CardTitle>
          <CardDescription>Placeholder route for the existing system connection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{content.body}</div>
          <div className="flex gap-3">
            <Button className="rounded-2xl" onClick={onClose}>Close</Button>
            <Button variant="outline" className="rounded-2xl" onClick={onClose}>Return to guide</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProstheticsResourceSystem() {
  const [profile, setProfile] = useStoredProfile();
  const [activeView, setActiveView] = useState("gateway");
  const [actionModal, setActionModal] = useState("");

  const profileCompletion = useMemo(() => {
    const values = [profile.userType, profile.limbType, profile.amputationLevel, profile.lifestyle];
    const filled = values.filter(Boolean).length;
    return Math.round((filled / values.length) * 100);
  }, [profile]);

  useEffect(() => {
    if (profile.userType && !profile.limbType) setActiveView("pathway");
  }, [profile.userType, profile.limbType]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <AppNavigation activeView={activeView} setActiveView={setActiveView} profileCompletion={profileCompletion} />
        </motion.div>

        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="hidden" />

          <TabsContent value="gateway" className="m-0">
            <EntryGateway profile={profile} setProfile={setProfile} onContinue={() => setActiveView("pathway")} />
          </TabsContent>

          <TabsContent value="pathway" className="m-0">
            <ConditionPathway profile={profile} setProfile={setProfile} onContinue={() => setActiveView("resources")} />
          </TabsContent>

          <TabsContent value="resources" className="m-0">
            <ResourceSections profile={profile} onAction={setActionModal} />
          </TabsContent>

          <TabsContent value="process" className="m-0">
            <ProcessFlow onAction={setActionModal} />
          </TabsContent>
        </Tabs>
      </div>

      <ActionModal action={actionModal} onClose={() => setActionModal("")} />
    </div>
  );
}
