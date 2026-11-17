"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type HostForm = {
  course_name: string;
  round_date: string;
  tee_time: string;
  playing_style: string;
  max_players: string;
};

const initial: HostForm = {
  course_name: "", round_date: "", tee_time: "", playing_style: "social", max_players: "4",
};

export default function HomeRoundHost() {
  const [form, setForm] = useState<HostForm>(initial);
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) { setToken(data.session?.access_token ?? null); setChecking(false); }
    }).catch(() => { if (mounted) setChecking(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) { setToken(session?.access_token ?? null); setChecking(false); }
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  function update<K extends keyof HostForm>(field: K, value: HostForm[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
    setNotice(""); setSuccess(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!token) {
      setNotice("Sign in to My Gallaspy to publish this round. A paid club membership is not required.");
      return;
    }
    if (form.round_date < new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())) {
      setNotice("Select a future date for your round.");
      return;
    }
    setBusy(true); setNotice(""); setSuccess(false);
    try {
      const response = await fetch("/api/mobile/foursomes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          course_name: form.course_name.trim(),
          round_date: form.round_date,
          tee_time: form.tee_time,
          playing_style: form.playing_style,
          max_players: Number(form.max_players),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to publish your round.");
      setSuccess(true); setNotice("Your round has been published. Golfers can now discover it and request a place.");
      setForm(initial);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to publish the round. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="g5-host" aria-labelledby="g5-host-title">
      <div className="g2-container g5-host-shell">
        <div className="g5-host-intro">
          <p className="g5-eyebrow"><span className="g5-spark"/> 03 / PLAY ON YOUR TERMS</p>
          <h2 id="g5-host-title">YOUR ROUND.<br /><em>YOUR CALL.</em></h2>
          <p>Pick a course. Choose a time. Bring golfers together. Host a game straight from the clubhouse—no paid membership required.</p>
          <div className="g5-host-meta"><span>OPEN TO ALL GOLFERS</span><span>2–4 PLAYERS</span><span>GREEN FEES PAID TO COURSE</span></div>
          <Link href="/host-a-round" className="g5-host-discover">Browse open rounds <span aria-hidden="true">→</span></Link>
        </div>
        <div className="g5-host-card">
          <div className="g5-host-card-head"><div><p>THE GALLASPY / GOLF PARTNERS</p><h3>Host a Round</h3></div><span className="g5-live-indicator">OPEN PLAY</span></div>
          <form onSubmit={submit} className="g5-host-form">
            <div className="g5-host-field g5-host-wide"><label htmlFor="g5-course">Golf course</label><input id="g5-course" name="course_name" value={form.course_name} onChange={e => update("course_name", e.target.value)} required minLength={2} maxLength={100} autoComplete="off" placeholder="Enter the course name" /></div>
            <div className="g5-host-field"><label htmlFor="g5-date">Round date</label><input id="g5-date" name="round_date" type="date" value={form.round_date} onChange={e => update("round_date", e.target.value)} required /></div>
            <div className="g5-host-field"><label htmlFor="g5-time">Tee time</label><input id="g5-time" name="tee_time" type="time" value={form.tee_time} onChange={e => update("tee_time", e.target.value)} required /></div>
            <div className="g5-host-field"><label htmlFor="g5-players">Total golfers (including you)</label><select id="g5-players" name="max_players" value={form.max_players} onChange={e => update("max_players", e.target.value)}><option value="2">2 players · 1 open place</option><option value="3">3 players · 2 open places</option><option value="4">4 players · 3 open places</option></select></div>
            <div className="g5-host-field"><label htmlFor="g5-style">Style of play</label><select id="g5-style" name="playing_style" value={form.playing_style} onChange={e => update("playing_style", e.target.value)}><option value="social">Social round</option><option value="beginner">Beginner friendly</option><option value="competitive">Competitive</option><option value="all">All skill levels</option></select></div>
            <div className="g5-host-bottom"><p>{checking ? "Checking your My Gallaspy session…" : token ? "Signed in · Ready to publish" : "A My Gallaspy account is needed to publish. No paid membership required."}</p><button disabled={busy || checking} type="submit" className="g5-host-submit">{busy ? "Publishing…" : "Publish my round"}<span aria-hidden="true">→</span></button></div>
          </form>
          {!token && !checking && <p className="g5-host-auth">Already have an account? <Link href="/my-gallaspy">Sign in to publish →</Link></p>}
          {notice && <p role="status" aria-live="polite" className={success ? "g5-host-notice g5-success" : "g5-host-notice"}>{notice}</p>}
        </div>
      </div>
    </section>
  );
}
