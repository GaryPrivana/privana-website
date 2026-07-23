"use client";

import { useCallback, useEffect, useRef, useState, type MutableRefObject, type RefObject } from "react";
import {
  ASSIST_WAIT_MS,
  REDUCED_MOTION_WAIT_MS,
  TYPING_SPEED_MS,
  assistScenarios,
  type AssistScenario,
  type DemoPhase,
  type MemberInsight,
  type ScenarioId,
} from "./privana-assist-demo-data";

const ASSIST_SCROLL_PAUSE_MS = 400;
const DESKTOP_SCROLL_PAUSE_QUERY = "(min-width: 901px) and (pointer: fine)";
let assistScrollPauseUsedThisVisit = false;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useAssistScrollPause({
  targetRef,
  hasInteractedRef,
  reducedMotion,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
  hasInteractedRef: MutableRefObject<boolean>;
  reducedMotion: boolean;
}) {
  const pauseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || assistScrollPauseUsedThisVisit) return;

    const target = targetRef.current;
    if (!target) return;

    const desktopMedia = window.matchMedia(DESKTOP_SCROLL_PAUSE_QUERY);
    if (!desktopMedia.matches) return;

    let cleanupScrollCapture: (() => void) | null = null;
    const releasePause = () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
      cleanupScrollCapture?.();
      cleanupScrollCapture = null;
    };

    const startPause = () => {
      if (assistScrollPauseUsedThisVisit || hasInteractedRef.current || reducedMotion || !desktopMedia.matches) return;
      assistScrollPauseUsedThisVisit = true;

      let interceptedScroll = false;
      let touchStartY = 0;
      const releaseOnContinuedScroll = (event: WheelEvent | TouchEvent) => {
        if (!interceptedScroll) {
          interceptedScroll = true;
          event.preventDefault();
        }
        releasePause();
      };
      const rememberTouchStart = (event: TouchEvent) => {
        touchStartY = event.touches[0]?.clientY ?? 0;
      };
      const handleTouchMove = (event: TouchEvent) => {
        const touchY = event.touches[0]?.clientY ?? touchStartY;
        if (Math.abs(touchY - touchStartY) > 2) releaseOnContinuedScroll(event);
      };

      window.addEventListener("wheel", releaseOnContinuedScroll, { passive: false, capture: true });
      window.addEventListener("touchstart", rememberTouchStart, { passive: true, capture: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
      cleanupScrollCapture = () => {
        window.removeEventListener("wheel", releaseOnContinuedScroll, true);
        window.removeEventListener("touchstart", rememberTouchStart, true);
        window.removeEventListener("touchmove", handleTouchMove, true);
      };

      pauseTimerRef.current = window.setTimeout(releasePause, ASSIST_SCROLL_PAUSE_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 1) startPause();
      },
      { threshold: 1 },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      releasePause();
    };
  }, [hasInteractedRef, reducedMotion, targetRef]);
}

export function PrivanaAssistInteractiveDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId | null>(null);
  const [composerText, setComposerText] = useState("");
  const [submittedUserMessage, setSubmittedUserMessage] = useState("");
  const sequenceRef = useRef(0);
  const typingIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  const conversationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = null;
    timeoutRefs.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRefs.current = [];
  }, []);

  const queueTimeout = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timeoutRefs.current.push(timer);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [phase, submittedUserMessage, activeScenarioId, reducedMotion]);

  const submitScenario = useCallback(
    (scenario: AssistScenario, sequence: number) => {
      if (sequence !== sequenceRef.current) return;
      setSubmittedUserMessage(scenario.question);
      setComposerText("");
      setPhase("submitted");
      queueTimeout(() => {
        if (sequence !== sequenceRef.current) return;
        setPhase("waiting-for-assist");
        queueTimeout(() => {
          if (sequence !== sequenceRef.current) return;
          setPhase("complete");
        }, reducedMotion ? REDUCED_MOTION_WAIT_MS : ASSIST_WAIT_MS);
      }, reducedMotion ? 0 : 140);
    },
    [queueTimeout, reducedMotion],
  );

  const playScenario = useCallback(
    (scenario: AssistScenario) => {
      hasInteractedRef.current = true;
      clearTimers();
      const sequence = sequenceRef.current + 1;
      sequenceRef.current = sequence;
      setActiveScenarioId(scenario.id);
      setSubmittedUserMessage("");
      setComposerText("");
      setPhase("typing-question");

      if (reducedMotion) {
        setComposerText(scenario.question);
        submitScenario(scenario, sequence);
        return;
      }

      let index = 0;
      typingIntervalRef.current = window.setInterval(() => {
        if (sequence !== sequenceRef.current) return;
        index += 1;
        setComposerText(scenario.question.slice(0, index));
        if (index >= scenario.question.length) {
          if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          submitScenario(scenario, sequence);
        }
      }, TYPING_SPEED_MS);
    },
    [clearTimers, reducedMotion, submitScenario],
  );

  useAssistScrollPause({ targetRef: experienceRef, hasInteractedRef, reducedMotion });

  const activeScenario = assistScenarios.find((scenario) => scenario.id === activeScenarioId);
  const controlsLocked = phase === "typing-question" || phase === "submitted" || phase === "waiting-for-assist";

  return (
    <section
      id="privana-assist-demo"
      className="privana-assist-demo-section"
      aria-labelledby="privana-assist-demo-heading"
      onPointerDown={() => { hasInteractedRef.current = true; }}
      onKeyDown={() => { hasInteractedRef.current = true; }}
    >
      <div className="privana-assist-demo-intro container-shell">
        <div className="privana-assist-demo-heading">
          <p>TRY PRIVANA ASSIST</p>
          <h2 id="privana-assist-demo-heading">Ask your club anything.</h2>
          <span>See how Privana Assist turns live club information into clear answers, useful insight and ready-to-review action.</span>
        </div>
      </div>

      <div className="privana-assist-demo-experience container-shell">
        <div ref={experienceRef} className="assist-demo-experience-inner">
          <div className="assist-product-window">
            <div className="assist-window-header">
              <div className="assist-topbar">
                <div className="assist-title-lockup"><AssistMark /><strong>Privana Assist</strong></div>
                <button type="button" className="assist-history-button" aria-label="Show Privana Assist history" onClick={() => {}}>Show History</button>
              </div>
            </div>
            <div className="assist-tabs" aria-hidden="true"><span className="is-active">Assist</span><span>Explore</span></div>
            <div ref={conversationRef} className="assist-conversation" aria-live="polite">
              {!submittedUserMessage && phase === "idle" && <EmptyState />}
              {submittedUserMessage && <UserBubble text={submittedUserMessage} />}
              {(phase === "waiting-for-assist" || phase === "complete") && activeScenario && (
                <AssistBubble scenario={activeScenario} phase={phase} />
              )}
            </div>
            <div className="assist-composer-row">
              <div className="assist-composer" role="textbox" aria-label="Privana Assist demo composer" aria-readonly="true">
                <span>{composerText || "How can I help you today?"}</span>
                {phase === "typing-question" && <i aria-hidden="true" />}
              </div>
              <button type="button" className={`assist-send-button ${phase === "submitted" ? "is-sending" : ""}`} aria-label="Send selected demo question" disabled>
                ↑
              </button>
            </div>
          </div>

          <div className="assist-prompt-area" aria-label="Preset questions">
            <div><p>Choose a question</p></div>
            <div className="assist-prompt-grid">
              {assistScenarios.map((scenario) => (
                <button key={scenario.id} type="button" className="assist-prompt-button" onClick={() => playScenario(scenario)} disabled={controlsLocked}>
                  <span aria-hidden="true">{scenario.icon}</span>{scenario.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssistMark() { return <span className="assist-mark" aria-hidden="true">P</span>; }
function EmptyState() { return <div className="assist-empty"><AssistMark /><h3>Privana Assist</h3><p>Select a preset question to see how Assist turns connected club data into a useful answer.</p></div>; }
function UserBubble({ text }: { text: string }) { return <div className="assist-message assist-user-message"><p>{text}</p></div>; }

function AssistBubble({ scenario, phase }: { scenario: AssistScenario; phase: DemoPhase }) {
  return <div className="assist-message assist-assistant-message"><AssistMark /><div className="assist-response-card">{phase === "waiting-for-assist" ? <ThinkingIndicator /> : <ScenarioResponse scenario={scenario} />}</div></div>;
}
function ThinkingIndicator() { return <div className="assist-thinking"><span>Privana Assist is thinking</span><i/><i/><i/></div>; }
function ScenarioResponse({ scenario }: { scenario: AssistScenario }) { return <><p className="assist-response-intro">{scenario.intro}</p>{scenario.responseKind === "briefing" && <div className="assist-briefing-list">{scenario.briefingItems?.map((item) => <article key={item.title}><div><strong>{item.title}</strong><p>{item.detail}</p></div><span>{item.action}</span></article>)}</div>}{scenario.responseKind === "members" && <div className="assist-member-grid">{scenario.members?.map((member) => <MemberCard key={member.memberNo} member={member} />)}</div>}{scenario.responseKind === "email" && <EmailDraftAsset />}</>; }
function MemberCard({ member }: { member: MemberInsight }) { return <article className="assist-member-card"><div className="assist-member-avatar" aria-label={`${member.name} profile image`}>{member.initials}</div><h4>{member.name}</h4><dl><div><dt>Membership</dt><dd>{member.membership}</dd></div><div><dt>Member no</dt><dd>{member.memberNo}</dd></div><div><dt>Visits</dt><dd>{member.visits}</dd></div><div><dt>Last visit</dt><dd>{member.lastVisit}</dd></div></dl><p>{member.explanation}</p><span>{member.action}</span></article>; }
function EmailDraftAsset() { return <article className="assist-email-asset" aria-label="Email draft asset"><header><div><span aria-hidden="true">✉</span><p>EMAIL DRAFT</p></div><strong>Ready for review</strong></header><dl><div><dt>Subject</dt><dd>Final details for Saturday’s Founders Dinner</dd></div><div><dt>Recipients</dt><dd>Members registered for the Founders Dinner</dd></div></dl><div className="assist-email-body"><p>Dear Member,</p><p>We’re looking forward to welcoming you to the Founders Dinner this Saturday.</p><p>Arrival drinks will be served from 6:30pm, with dinner beginning promptly at 7:15pm. The dress code is black tie.</p><p>Please let us know by 3:00pm tomorrow if your dietary requirements have changed since booking.</p><p>We look forward to seeing you.</p><p>The Club Team</p></div><footer><span>Edit draft</span><span>Use this email</span></footer></article>; }
