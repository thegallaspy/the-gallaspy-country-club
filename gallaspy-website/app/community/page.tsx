"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Photo = { url: string; position: number };
type Post = { id: string; body: string; created_at: string; username?: string | null; photos?: Photo[] };
type Comment = { id: string; body: string; created_at: string; username?: string | null };
type Metrics = { count: number; comments: number; liked: boolean };
type EngagementRow = Record<string, unknown>;

function numeric(value: unknown): number { return typeof value === "number" && Number.isFinite(value) ? value : 0; }
function metricsFrom(row: EngagementRow): Metrics {
  return {
    count: numeric(row.like_count ?? row.likes_count ?? row.likes),
    comments: numeric(row.comment_count ?? row.comments_count ?? row.comments),
    liked: Boolean(row.liked_by_me ?? row.is_liked ?? row.user_liked ?? row.liked),
  };
}

export default function CommunityPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, Metrics>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [acting, setActing] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();
    supabase.auth.getSession().then(({data}) => {
      if (mounted) { setToken(data.session?.access_token ?? null); setReady(true); }
    }).catch(() => { if (mounted) setReady(true); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setToken(session?.access_token ?? null);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const api = useCallback(async (accessToken: string, path: string, payload?: Record<string, string>) => {
    const response = await fetch(path, {
      method: payload ? "POST" : "GET",
      headers: { Authorization: `Bearer ${accessToken}`, ...(payload ? {"Content-Type": "application/json"} : {}) },
      ...(payload ? {body: JSON.stringify(payload)} : {}),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || "Community request unavailable.");
    return data;
  }, []);

  const loadMetrics = useCallback(async (accessToken: string, records: Post[]) => {
    // Engagement endpoint deliberately limits batches to 20 identifiers.
    const all: Record<string, Metrics> = {};
    for (let i = 0; i < records.length; i += 20) {
      const ids = records.slice(i, i + 20).map(p => p.id);
      if (!ids.length) continue;
      const data = await api(accessToken, `/api/web/community/engagement?post_ids=${encodeURIComponent(ids.join(","))}`);
      const rows = Array.isArray(data.engagement) ? data.engagement as EngagementRow[] : [];
      for (const row of rows) {
        const id = row.post_id ?? row.id;
        if (typeof id === "string") all[id] = metricsFrom(row);
      }
    }
    setMetrics(all);
  }, [api]);

  const refresh = useCallback(async (accessToken: string) => {
    const data = await api(accessToken, "/api/web/community/posts");
    const records = Array.isArray(data.posts) ? data.posts as Post[] : [];
    setPosts(records);
    await loadMetrics(accessToken, records).catch(() => {});
  }, [api, loadMetrics]);

  useEffect(() => {
    if (!token) { setPosts([]); setMetrics({}); return; }
    let active = true;
    refresh(token).catch(error => { if (active) setStatus(error instanceof Error ? error.message : "Unable to load community feed."); });
    return () => { active = false; };
  }, [token, refresh]);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!token || busy || !body.trim()) return;
    setBusy(true); setStatus("");
    try {
      await api(token, "/api/web/community/posts", {body: body.trim()});
      setBody(""); setStatus("Your post is published."); await refresh(token);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to publish."); }
    finally { setBusy(false); }
  }

  async function toggleLike(post: Post) {
    if (!token || acting) return;
    setActing(post.id); setStatus("");
    const liked = Boolean(metrics[post.id]?.liked);
    try {
      await api(token, "/api/web/community/engagement", {action: liked ? "unlike" : "like", post_id: post.id});
      setMetrics(previous => ({...previous, [post.id]: {count: Math.max(0, (previous[post.id]?.count ?? 0) + (liked ? -1 : 1)), comments: previous[post.id]?.comments ?? 0, liked: !liked}}));
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to update like."); }
    finally { setActing(null); }
  }

  async function openComments(post: Post) {
    if (!token) return;
    if (expanded[post.id]) { setExpanded(previous => ({...previous, [post.id]:false})); return; }
    setExpanded(previous => ({...previous, [post.id]:true}));
    try {
      const data = await api(token, `/api/web/community/engagement?post_id=${encodeURIComponent(post.id)}`);
      setComments(previous => ({...previous, [post.id]: Array.isArray(data.comments) ? data.comments : []}));
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to load comments."); }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>, post: Post) {
    event.preventDefault(); if (!token || acting || !drafts[post.id]?.trim()) return;
    setActing(post.id); setStatus("");
    try {
      await api(token, "/api/web/community/engagement", {action:"comment", post_id:post.id, body:drafts[post.id].trim()});
      setDrafts(previous => ({...previous, [post.id]:""}));
      const data = await api(token, `/api/web/community/engagement?post_id=${encodeURIComponent(post.id)}`);
      setComments(previous => ({...previous, [post.id]:Array.isArray(data.comments) ? data.comments : []}));
      setMetrics(previous => ({...previous, [post.id]:{count:previous[post.id]?.count ?? 0, liked:previous[post.id]?.liked ?? false, comments:(previous[post.id]?.comments ?? 0) + 1}}));
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to comment."); }
    finally { setActing(null); }
  }

  return <main className="g616-interior g2-interior"><div className="g2-container">
    <header className="g2-interior-header"><p className="g2-eyebrow">MY GALLASPY / DIGITAL CLUBHOUSE</p><h1>THE COMMUNITY.</h1><p>Share your rounds. Join conversations. Connect through the game. An exclusive space for active Gallaspy Golf Club members to share, connect, and celebrate the game.</p></header>
    {!ready ? <p className="g2-auth-panel">Checking your account…</p> : !token ? <div className="g2-auth-panel"><p>Sign in with an active Gallaspy Golf Club membership to access the members-only community.</p><Link href="/my-gallaspy" className="g2-line-link">Enter My Gallaspy →</Link></div> :
    <div className="g2-feed-layout">
      <aside><p className="g2-eyebrow">SHARE WITH THE CLUB</p><form onSubmit={publish} className="g2-form-card" style={{marginTop:20}}><div className="g2-field"><label htmlFor="g2-post">Your post</label><textarea id="g2-post" rows={6} maxLength={3000} value={body} onChange={event=>setBody(event.target.value)} placeholder="A round worth sharing. A moment from the course." required /></div><button className="g2-btn g2-btn-green" style={{marginTop:22}} type="submit" disabled={busy || !body.trim()}>{busy ? "Publishing…" : "Publish post →"}</button></form><p className="g2-feedback" role="status" aria-live="polite">{status}</p><Link href="/my-gallaspy/home" className="g2-line-link">Back to My Gallaspy →</Link></aside>
      <section aria-label="Community posts"><p className="g2-eyebrow">FROM THE CLUBHOUSE</p><div style={{marginTop:20}}>{posts.length ? posts.map(post => <article className="g2-feed-post" key={post.id}>
        <strong>{post.username ? `@${post.username}` : "Gallaspy golfer"}</strong><time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</time><p>{post.body}</p>
        {post.photos?.length ? <div className="g2-feed-photos">{post.photos.map((photo,index)=><img key={`${post.id}-${index}`} src={photo.url} alt={`Photo shared with the Gallaspy community ${index + 1}`} loading="lazy" referrerPolicy="no-referrer" />)}</div> : null}
        <div className="g2-community-actions"><button type="button" onClick={()=>toggleLike(post)} disabled={acting===post.id} aria-pressed={metrics[post.id]?.liked ?? false}>{metrics[post.id]?.liked ? "♥ Liked" : "♡ Like"} {metrics[post.id]?.count ?? 0}</button><button type="button" onClick={()=>openComments(post)} aria-expanded={Boolean(expanded[post.id])}>Comments {metrics[post.id]?.comments ?? ""}</button></div>
        {expanded[post.id] && <div><div className="g2-comment-list">{(comments[post.id] ?? []).map(comment=><div className="g2-comment" key={comment.id}><strong>{comment.username ? `@${comment.username}` : "Gallaspy golfer"}</strong><p>{comment.body}</p></div>)}</div><form className="g2-comment-form" onSubmit={event=>submitComment(event,post)}><input aria-label="Write a comment" maxLength={1000} required placeholder="Write a comment…" value={drafts[post.id] ?? ""} onChange={event=>setDrafts(previous=>({...previous,[post.id]:event.target.value}))}/><button type="submit" disabled={acting===post.id || !drafts[post.id]?.trim()}>Post</button></form></div>}
      </article>) : <p>Community posts will appear here as golfers share.</p>}</div></section>
    </div>}
  </div></main>;
}
