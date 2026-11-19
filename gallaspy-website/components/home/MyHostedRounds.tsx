"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users, Share2 } from "lucide-react";

type Round = { id: string; course_name: string; round_date: string; tee_time: string; status: string; max_players: number; confirmed_players: number; requests: JoinRequest[] };
type JoinRequest = { id: string; status: string; member_name: string };
type Joined = { id: string; status: string; round: Pick<Round, "id" | "course_name" | "round_date" | "tee_time" | "status"> };
type Schedule = { hosting: Round[]; joined: Joined[] };

function dateLabel(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function statusLabel(status: string) {
  return ({ approved: "Confirmed", pending: "Awaiting approval", declined: "Declined", cancelled: "Cancelled", open: "Open", full: "Full" } as Record<string, string>)[status] ?? status;
}

export default function MyHostedRounds({ token, revision, onChange }: { token: string; revision: number; onChange: () => void }) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [acting, setActing] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    fetch("/api/mobile/foursomes/mine", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || "Unable to load your rounds.");
        if (!controller.signal.aborted) setSchedule({ hosting: Array.isArray(data.hosting) ? data.hosting : [], joined: Array.isArray(data.joined) ? data.joined : [] });
      }).catch(reason => { if (!controller.signal.aborted) { setSchedule(null); setError(reason instanceof Error ? reason.message : "Unable to load your rounds."); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token, revision, retry]);

  async function decide(id: string, decision: "approved" | "declined") {
    if (acting || loading) return;
    setActing(true); setNotice("");
    try {
      const response = await fetch("/api/mobile/foursomes/approve", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ request_id: id, decision }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to update request.");
      setNotice(decision === "approved" ? "Golfer approved." : "Request declined.");
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Unable to update request."); }
    finally { setLoading(true); setRetry(n => n + 1); onChange(); setActing(false); }
  }

  async function share(round: Round) {
    const link = new URL("/host-a-round", window.location.origin);
    link.searchParams.set("round", round.id); link.hash = "open-rounds";
    try {
      if (navigator.share) await navigator.share({ title: `Join my round at ${round.course_name}`, url: link.href });
      else { await navigator.clipboard.writeText(link.href); setNotice("Invitation link copied."); }
    } catch (reason) { if (!(reason instanceof Error && reason.name === "AbortError")) setNotice(link.href); }
  }

  return <section id="my-rounds" className="g3-open-rounds" aria-labelledby="my-rounds-heading">
    <div className="g3-rounds-heading"><div><p className="g2-eyebrow">YOUR GOLF CALENDAR</p><h2 id="my-rounds-heading">My rounds.</h2></div></div>
    <button className="g2-btn g2-btn-green" type="button" disabled={loading || acting} onClick={() => setRetry(n => n + 1)}>Refresh schedule</button>
    <p role="status" className="g2-feedback" style={{overflowWrap:"anywhere"}}>{notice || (loading ? "Updating your rounds…" : "")}</p>
    {error && <p role="alert">{error}</p>}
    {schedule && <div className="g3-management-grid" aria-busy={loading}>
      <div><h3>Hosting · {schedule.hosting.length}</h3><p>Earn 200 points after approved, verified completion.</p>
        {!schedule.hosting.length && <p>No upcoming hosted rounds. <a href="#host-round">Host a round</a>.</p>}
        {schedule.hosting.map(round => <article key={round.id} className="g3-management-card">
          <p className="g3-status">{statusLabel(round.status)}</p><h4>{round.course_name}</h4>
          <p><CalendarDays size={16} aria-hidden="true"/> {dateLabel(round.round_date)} · {round.tee_time.slice(0,5)}</p>
          <p><Users size={16} aria-hidden="true"/> {round.confirmed_players} / {round.max_players} confirmed · {Math.max(0, round.max_players - round.confirmed_players)} spots left</p>
          {round.status === "open" && <button type="button" className="g3-management-button" onClick={() => share(round)}><Share2 size={16} aria-hidden="true"/> Share invitation</button>}
          <h5>Join requests</h5>
          {!round.requests.length && <p>No requests yet.</p>}
          {round.requests.map(request => <div key={request.id} className="g3-request-row"><strong>{request.member_name}</strong><p>{statusLabel(request.status)}</p>{request.status === "pending" && round.status === "open" && <div className="g3-request-actions"><button type="button" disabled={acting || loading || round.confirmed_players >= round.max_players} onClick={() => decide(request.id, "approved")}>Approve</button><button type="button" disabled={acting || loading} onClick={() => decide(request.id, "declined")}>Decline</button></div>}</div>)}
        </article>)}
      </div>
      <div><h3>Joining · {schedule.joined.length}</h3><p>Track your requests and confirmed places.</p>
        {!schedule.joined.length && <p>No upcoming join requests. <a href="#open-rounds">Find a round</a>.</p>}
        {schedule.joined.map(item => <article key={item.id} className="g3-management-card"><p className="g3-status">{item.round.status === "cancelled" ? "Round cancelled" : statusLabel(item.status)}</p><h4>{item.round.course_name}</h4><p><CalendarDays size={16} aria-hidden="true"/> {dateLabel(item.round.round_date)} · {item.round.tee_time.slice(0,5)}</p></article>)}
      </div>
    </div>}
  </section>;
}
