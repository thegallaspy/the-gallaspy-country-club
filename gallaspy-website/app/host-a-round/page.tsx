"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
type Round = {
  id: string;
  course_name: string;
  round_date: string;
  tee_time: string;
  playing_style: string;
  max_players: number;
  spots_left?: number | null;
  status: string;
};
export default function HostRoundPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [notice, setNotice] = useState("");
  const [joinNotice, setJoinNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playerStatus, setPlayerStatus] = useState<
    "checking" | "ready" | "missing" | "error"
  >("checking");
  const [profileRetry, setProfileRetry] = useState(0);
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    fetch("/api/mobile/player", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error();
        if (!controller.signal.aborted)
          setPlayerStatus(data.player_found ? "ready" : "missing");
      })
      .catch(() => {
        if (!controller.signal.aborted) setPlayerStatus("error");
      });
    return () => controller.abort();
  }, [token, profileRetry]);

  async function setupPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/mobile/player", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await response.json();
      if (!response.ok || !data.player_found)
        throw new Error(data.error || "Unable to set up your player profile.");
      setPlayerStatus("ready");
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Unable to set up your player profile.",
      );
    } finally {
      setBusy(false);
    }
  }

  const hostForm = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = hostForm.current;
    if (!form) return;
    try {
      const draft = JSON.parse(
        sessionStorage.getItem("gallaspy:round-draft") || "{}",
      );
      for (const field of [
        "course_name",
        "round_date",
        "tee_time",
        "playing_style",
        "max_players",
      ]) {
        const input = form.elements.namedItem(field);
        if (
          (input instanceof HTMLInputElement ||
            input instanceof HTMLSelectElement) &&
          typeof draft[field] === "string"
        ) {
          input.value = draft[field];
        }
      }
    } catch {}
  }, [token, playerStatus]);
  const [loadError, setLoadError] = useState("");
  const [publishedRound, setPublishedRound] = useState<string | null>(null);
  const [requestedRounds, setRequestedRounds] = useState<string[]>([]);
  const [courseSearch, setCourseSearch] = useState("");
  const [styleFilter, setStyleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const styles: Record<string, string> = { social: "Social", beginner: "Beginner friendly", competitive: "Competitive", all: "All levels" };
  const visibleRounds = rounds.filter(round =>
    round.course_name.toLowerCase().includes(courseSearch.trim().toLowerCase()) &&
    (!styleFilter || round.playing_style === styleFilter) &&
    (!dateFilter || round.round_date === dateFilter));
  const load = () => {
    setLoading(true);
    setLoadError("");
    const roundId = new URLSearchParams(window.location.search).get("round");
    const endpoint = roundId
      ? "/api/web/rounds?round=" + encodeURIComponent(roundId)
      : "/api/web/rounds";
    fetch(endpoint, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.success)
          setRounds(Array.isArray(data.rounds) ? data.rounds : []);
        else setLoadError(data.error || "Unable to load hosted rounds.");
      })
      .catch(() => setLoadError("Unable to load open rounds."))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
    let alive = true;
    const db = createClient();
    db.auth
      .getSession()
      .then(({ data }) => {
        if (alive) {
          setToken(data.session?.access_token ?? null);
          setChecking(false);
        }
      })
      .catch(() => {
        if (alive) setChecking(false);
      });
    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      if (alive) setToken(session?.access_token ?? null);
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);
  async function requestSeat(id: string) {
    if (!token) {
      setJoinNotice("Sign in to My Gallaspy to request a place in this round.");
      return;
    }
    if (busy) return;
    setBusy(true);
    setJoinNotice("");
    try {
      const response = await fetch("/api/mobile/foursomes/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foursome_id: id }),
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.error || "Unable to request a place.");
      setRequestedRounds(previous => [...previous, id]);
      setJoinNotice(
        "Request sent to the round host. Your place is not confirmed until approved.",
      );
    } catch (e) {
      setJoinNotice(e instanceof Error ? e.message : "Unable to request a place.");
    } finally {
      setBusy(false);
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || busy) return;
    const form = event.currentTarget;
    const v = new FormData(form);
    setBusy(true);
    setNotice("");
    try {
      const r = await fetch("/api/mobile/foursomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_name: String(v.get("course_name") || "").trim(),
          round_date: String(v.get("round_date") || ""),
          tee_time: String(v.get("tee_time") || ""),
          playing_style: String(v.get("playing_style") || "social"),
          max_players: Number(v.get("max_players") || 4),
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.success)
        throw new Error(data.error || "Could not create your round.");
      setPublishedRound(data.foursome.id);
      setNotice("Your round is open for golfers to discover.");
      form.reset();
      try {
        sessionStorage.removeItem("gallaspy:round-draft");
      } catch {}
      load();
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Unable to host a round.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function shareRound() {
    if (!publishedRound) return;
    const url = new URL("/host-a-round", window.location.origin);
    url.searchParams.set("round", publishedRound);
    url.hash = "open-rounds";
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join my Gallaspy round",
          url: url.href,
        });
      } else {
        await navigator.clipboard.writeText(url.href);
        setNotice("Round link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setNotice(url.href);
    }
  }
  return (
    <main className="g616-interior g2-interior">
      <div className="g2-container">
        <header className="g2-interior-header">
          <p className="g2-eyebrow">PLAY / OPEN TO EVERY GOLFER</p>
          <h1>Host your own round.</h1>
          <p>
            Arrange a tee time with the course, then post it here and invite
            golfers to join. Green fees are paid directly to the course.
          </p>
          <p>
            <strong>+200 POINTS</strong> when your approved round is completed
            and verified.
          </p>
          <div className="g2-actions">
            <Link href="#host-round" className="g2-btn g2-btn-green">
              HOST YOUR OWN ROUND
            </Link>
            <Link href="#open-rounds" className="g2-line-link">
              Browse open rounds →
            </Link>
          </div>
        </header>
        <section className="g3-host-section" id="host-round">
          <h2>Plan your round</h2>
          {checking ? (
            <p className="g2-auth-panel">Checking account access…</p>
          ) : !token ? (
            <div className="g2-auth-panel">
              <p>
                A My Gallaspy account and a player profile are all you need to
                host. No paid club membership required.
              </p>
              <Link
                href="/my-gallaspy?mode=create&next=%2Fhost-a-round"
                className="g2-btn g2-btn-green"
              >
                CREATE AN ACCOUNT
              </Link>{" "}
              <Link
                href="/my-gallaspy?next=%2Fhost-a-round"
                className="g2-line-link"
              >
                Sign in to host →
              </Link>
            </div>
          ) : playerStatus === "checking" ? (
            <p role="status">Checking your player profile…</p>
          ) : playerStatus === "error" ? (
            <p role="alert">
              Couldn’t load your player profile.{" "}
              <button
                type="button"
                onClick={() => {
                  setPlayerStatus("checking");
                  setProfileRetry((value) => value + 1);
                }}
              >
                Try again
              </button>
            </p>
          ) : playerStatus === "missing" ? (
            <form className="g2-form-card" onSubmit={setupPlayer}>
              <p>
                Set up your player profile to host or request a spot in an open
                round.
              </p>
              <div className="g2-form-grid">
                <div className="g2-field">
                  <label htmlFor="player-first">First name</label>
                  <input
                    id="player-first"
                    name="first_name"
                    autoComplete="given-name"
                    maxLength={80}
                    required
                  />
                </div>
                <div className="g2-field">
                  <label htmlFor="player-last">Last name</label>
                  <input
                    id="player-last"
                    name="last_name"
                    autoComplete="family-name"
                    maxLength={80}
                    required
                  />
                </div>
              </div>
              <button
                className="g2-btn g2-btn-green"
                type="submit"
                disabled={busy}
              >
                {busy ? "Saving…" : "Set up my player profile"}
              </button>
            </form>
          ) : (
            <form
              ref={hostForm}
              onSubmit={submit}
              onChange={(event) => {
                try {
                  sessionStorage.setItem(
                    "gallaspy:round-draft",
                    JSON.stringify(
                      Object.fromEntries(new FormData(event.currentTarget)),
                    ),
                  );
                } catch {}
              }}
              className="g2-form-card"
            >
              <div className="g2-form-grid">
                <div className="g2-field wide">
                  <label htmlFor="g3-course">Golf course</label>
                  <input
                    required
                    id="g3-course"
                    name="course_name"
                    maxLength={100}
                    minLength={2}
                    placeholder="Where are we playing?"
                  />
                </div>
                <div className="g2-field">
                  <label htmlFor="g3-date">Date</label>
                  <input required id="g3-date" type="date" name="round_date" />
                </div>
                <div className="g2-field">
                  <label htmlFor="g3-time">Tee time</label>
                  <input required id="g3-time" type="time" name="tee_time" />
                </div>
                <div className="g2-field">
                  <label htmlFor="g3-style">Round style</label>
                  <select id="g3-style" name="playing_style">
                    <option value="social">Social</option>
                    <option value="beginner">Beginner friendly</option>
                    <option value="competitive">Competitive</option>
                    <option value="all">All levels</option>
                  </select>
                </div>
                <div className="g2-field">
                  <label htmlFor="g3-size">Group size</label>
                  <select id="g3-size" name="max_players" defaultValue="4">
                    <option value="2">2 golfers</option>
                    <option value="3">3 golfers</option>
                    <option value="4">4 golfers</option>
                  </select>
                </div>
              </div>
              <button
                disabled={busy}
                className="g2-btn g2-btn-green"
                type="submit"
                style={{ marginTop: 25 }}
              >
                {busy ? "Creating…" : "Publish my round →"}
              </button>
            </form>
          )}
          <p role="status" className="g2-feedback">
            {notice}
          </p>
          {publishedRound && (
            <div className="g2-actions">
              <button
                className="g2-btn g2-btn-green"
                type="button"
                onClick={shareRound}
              >
                Share round
              </button>
              <Link className="g2-line-link" href="/my-gallaspy/home">
                My Gallaspy →
              </Link>
            </div>
          )}
        </section>
        <section className="g3-open-rounds" id="open-rounds">
          {joinNotice && <p role="status">{joinNotice}</p>}
          <div className="g3-rounds-heading">
            <div>
              <p className="g2-eyebrow">GOLF PARTNERS</p>
              <h2>Open rounds.</h2>
            </div>
            <span>GOLFER-HOSTED</span>
          </div>
          <div className="g3-round-filters" aria-label="Filter open rounds">
            <label>Search by course<input type="search" placeholder="Enter a course name" value={courseSearch} onChange={event => setCourseSearch(event.target.value)} /></label>
            <label>Playing style<select value={styleFilter} onChange={event => setStyleFilter(event.target.value)}><option value="">Any style</option>{Object.entries(styles).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label>Round date<input type="date" value={dateFilter} onChange={event => setDateFilter(event.target.value)} /></label>
            <button type="button" onClick={() => { setCourseSearch(""); setStyleFilter(""); setDateFilter(""); }}>Clear filters</button>
          </div>
          {!loading && !loadError && <p role="status" className="g3-round-count">{visibleRounds.length} of {rounds.length} listed rounds</p>}
          {loading ? (
            <p>Loading open rounds…</p>
          ) : loadError ? (
            <p role="alert">
              {loadError}{" "}
              <button type="button" onClick={load}>
                Try again
              </button>
            </p>
          ) : visibleRounds.length ? (
            visibleRounds.map((round) => (
              <article className="g2-event" key={round.id}>
                <div className="g2-event-number">
                  <small>
                    {new Date(round.round_date + "T12:00:00")
                      .toLocaleDateString("en-US", { month: "short" })
                      .toUpperCase()}
                  </small>
                  <strong>
                    {new Date(round.round_date + "T12:00:00").getDate()}
                  </strong>
                </div>
                <div className="g2-event-info">
                  <h3>{round.course_name}</h3>
                  <p>
                    {round.tee_time.slice(0, 5)} · {styles[round.playing_style] ?? "Golf round"} · Up to{" "}
                    {round.max_players} players
                  </p>
                  <p className="g3-round-count">{typeof round.spots_left === "number" ? `${round.spots_left} ${round.spots_left === 1 ? "spot" : "spots"} available` : "Availability unavailable"}</p>
                </div>
                {round.spots_left === 0 ? <span className="g2-event-link">Full</span> : token && playerStatus !== "ready" ? (
                  <Link href="#host-round" className="g2-event-link">
                    Player profile →
                  </Link>
                ) : token ? (
                  <button
                    type="button"
                    disabled={busy || requestedRounds.includes(round.id)}
                    onClick={() => requestSeat(round.id)}
                    className="g2-event-link"
                  >
                    {requestedRounds.includes(round.id)
                      ? "Request sent"
                      : "Request to join →"}
                  </button>
                ) : (
                  <Link
                    href={`/my-gallaspy?next=${encodeURIComponent(`/host-a-round?round=${round.id}#open-rounds`)}`}
                    className="g2-event-link"
                  >
                    Sign in to join →
                  </Link>
                )}
              </article>
            ))
          ) : (
            <p>{rounds.length ? "No rounds match your filters. Try another course, style or date." : "New hosted rounds will appear here when golfers share them."}</p>
          )}
        </section>
      </div>
    </main>
  );
}
