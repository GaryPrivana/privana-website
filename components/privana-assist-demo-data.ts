export type DemoPhase =
  | "idle"
  | "typing-question"
  | "submitted"
  | "waiting-for-assist"
  | "complete";

export type ScenarioId = "daily-briefing" | "member-engagement" | "email-draft";

export type BriefingItem = { title: string; detail: string; action: string };
export type MemberInsight = {
  initials: string;
  name: string;
  membership: string;
  memberNo: string;
  visits: string;
  lastVisit: string;
  explanation: string;
  action: string;
};

export type AssistScenario = {
  id: ScenarioId;
  icon: string;
  question: string;
  responseKind: "briefing" | "members" | "email";
  intro: string;
  briefingItems?: BriefingItem[];
  members?: MemberInsight[];
};

export const TYPING_SPEED_MS = 22;
export const ASSIST_WAIT_MS = 1000;
export const REDUCED_MOTION_WAIT_MS = 250;

export const assistScenarios: AssistScenario[] = [
  {
    id: "daily-briefing",
    icon: "✦",
    question: "What should I know today?",
    responseKind: "briefing",
    intro: "Here are the items most likely to need your attention today.",
    briefingItems: [
      {
        title: "Member engagement",
        detail:
          "Three members have shown a meaningful drop in visits over the last 30 days.",
        action: "Review members",
      },
      {
        title: "Saturday’s Founders Dinner",
        detail:
          "The event is at 92% capacity. Final dietary numbers are due to the kitchen by 3:00pm.",
        action: "Open event",
      },
      {
        title: "Dining performance",
        detail:
          "Dinner revenue is 8.4% ahead of the same period last week, while food cost is running 2.1 points above target.",
        action: "View dining summary",
      },
      {
        title: "Finance",
        detail:
          "Seven member balances are more than 30 days overdue, with a combined value of £8,460.",
        action: "Review balances",
      },
    ],
  },
  {
    id: "member-engagement",
    icon: "◌",
    question: "Which members are becoming less engaged?",
    responseKind: "members",
    intro:
      "These members have the clearest decline in club engagement over the last 90 days.",
    members: [
      {
        initials: "EW",
        name: "Eleanor Whitmore",
        membership: "Full Golf",
        memberNo: "10428",
        visits: "Down 62%",
        lastVisit: "24 days ago",
        explanation:
          "Golf bookings and dining visits have both declined significantly compared with her usual pattern.",
        action: "Personal check-in",
      },
      {
        initials: "MB",
        name: "Marcus Bennett",
        membership: "Family",
        memberNo: "11803",
        visits: "Down 48%",
        lastVisit: "17 days ago",
        explanation:
          "Family dining activity has reduced and no fitness bookings have been made this month.",
        action: "Send activity update",
      },
      {
        initials: "SL",
        name: "Sophie Laurent",
        membership: "Racquet & Wellness",
        memberNo: "12176",
        visits: "Down 44%",
        lastVisit: "21 days ago",
        explanation:
          "Regular tennis sessions have stopped and her most recent spa booking was cancelled.",
        action: "Invite to upcoming event",
      },
    ],
  },
  {
    id: "email-draft",
    icon: "✉",
    question: "Draft an email to members about Saturday’s event.",
    responseKind: "email",
    intro: "I’ve prepared a draft for your review.",
  },
];
