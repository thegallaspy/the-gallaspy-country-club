"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Photo = { url: string; position: number };
type Post = { id: string; user_id: string; body: string; created_at: string; username?: string | null; avatar_url?: string | null; photos?: Photo[] };
type Comment = { id: string; body: string; created_at: string; username?: string | null };
type Metrics = { count: number; comments: number; liked: boolean };
type EngagementRow = Record<string, unknown>;
type GolferProfile = { user_id?: string; username: string; avatar_url?: string | null; username_updated_at?: string };
type GolferDetails = {bio:string;home_course:string;experience:string;playing_style:string;personal_highlight:string;share_details:boolean};
const emptyDetails: GolferDetails = {bio:"",home_course:"",experience:"",playing_style:"",personal_highlight:"",share_details:false};
type PreparedPhoto = {blob:Blob;preview:string};

async function preparePhoto(file:File):Promise<PreparedPhoto> {
  if (!/^image\/(jpeg|png|webp)$/i.test(file.type) || file.size > 12_000_000) throw new Error("Choose JPEG, PNG or WebP photos under 12 MB each.");
  const url=URL.createObjectURL(file);
  try {
    const image=new Image();
    await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error("This photo could not be opened."));image.src=url;});
    if(!image.naturalWidth || !image.naturalHeight || image.naturalWidth*image.naturalHeight>50_000_000)throw new Error("Photo resolution is too large.");
    const canvas=document.createElement("canvas");const context=canvas.getContext("2d");
    if(!context)throw new Error("Photo preparation unavailable.");
    for(const side of [1600,1280,960,640]) {
      const scale=Math.min(1,side/Math.max(image.naturalWidth,image.naturalHeight));
      canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
      context.fillStyle="#fff";context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
      const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/jpeg",0.8));
      if(blob && blob.size>=100 && blob.size<=850_000) {
        const preview=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error("Unable to preview photo."));reader.readAsDataURL(blob);});
        return {blob,preview};
      }
    }
    throw new Error("Unable to compress this photo. Choose a smaller image.");
  } finally {URL.revokeObjectURL(url);}
}

function numeric(value: unknown): number { return typeof value === "number" && Number.isFinite(value) ? value : 0; }
function metricsFrom(row: EngagementRow): Metrics {
  return {
    count: numeric(row.like_count ?? row.likes_count ?? row.likes),
    comments: numeric(row.comment_count ?? row.comments_count ?? row.comments),
    liked: Boolean(row.liked_by_me ?? row.is_liked ?? row.user_liked ?? row.liked),
  };
}

export default function CommunityPage() {
  const [session, setSession] = useState<{ token: string; userId: string } | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, value) => {
      setSession(value ? {token: value.access_token, userId: value.user.id} : null);
      setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <main className="g616-interior g2-interior g2-community"><div className="g2-container">
    <header className="g2-interior-header"><p className="g2-eyebrow">MY GALLASPY / DIGITAL CLUBHOUSE</p><h1>THE COMMUNITY.</h1><p>Good rounds. Great company. Share the moments that make the game yours.</p></header>
    {!ready ? <p className="g2-auth-panel" role="status">Checking your account…</p> : !session ? <div className="g2-auth-panel"><p>Sign in with an active Gallaspy Golf Club membership to enter the members-only community.</p><Link href="/my-gallaspy" className="g2-line-link">Enter My Gallaspy →</Link></div> : <Clubhouse key={`${session.userId}:${session.token}`} token={session.token} userId={session.userId}/>}
  </div></main>;
}

function Clubhouse({token, userId}: {token: string; userId: string}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, Metrics>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [acting, setActing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [filter, setFilter] = useState<"all" | "mine" | "photos" | "following">("all");
  const [report, setReport] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [ownProfile, setOwnProfile] = useState<GolferProfile | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [handle, setHandle] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);
  const [selectedGolfer, setSelectedGolfer] = useState<GolferProfile | null>(null);
  const [golferQuery, setGolferQuery] = useState("");
  const [connections, setConnections] = useState<{following:GolferProfile[];followers:GolferProfile[]} | null>(null);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [connectionBusy, setConnectionBusy] = useState(false);
  const connectionRequest = useRef(0);
  const [details,setDetails] = useState<GolferDetails>(emptyDetails);
  const [detailsReady,setDetailsReady] = useState(false);
  const [detailsBusy,setDetailsBusy] = useState(false);
  const [detailsStatus,setDetailsStatus] = useState("");
  const [viewedDetails,setViewedDetails] = useState<GolferDetails | null>(null);
  const [photos,setPhotos] = useState<PreparedPhoto[]>([]);
  const [preparingPhotos,setPreparingPhotos] = useState(false);
  const [photoStatus,setPhotoStatus] = useState("");

  const api = useCallback(async (accessToken: string, path: string, payload?: Record<string, unknown>) => {
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

  useEffect(() => {
    if (!allowed || !ownProfile) return;
    let active = true;
    api(token,"/api/web/community/golfer-details").then(data=>{
      if (active) {setDetails(data.details ?? emptyDetails);setDetailsReady(true);setDetailsStatus("");}
    }).catch(()=>{if(active){setDetailsReady(false);setDetailsStatus("Profile details are temporarily unavailable.");}});
    return ()=>{active=false;};
  },[allowed,ownProfile?.username,api,token]);

  useEffect(()=>{
    const id = selectedGolfer?.user_id;
    if (!allowed || !id) return;
    let active=true;
    api(token,`/api/web/community/golfer-details?user_id=${encodeURIComponent(id)}`).then(data=>{
      if(active)setViewedDetails(data.details ?? null);
    }).catch(()=>{if(active)setViewedDetails(null);});
    return ()=>{active=false;};
  },[allowed,selectedGolfer?.user_id,api,token]);

  async function saveDetails(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detailsReady || detailsBusy || !ownProfile) return;
    setDetailsBusy(true);setDetailsStatus("");
    try {
      const data=await api(token,"/api/web/community/golfer-details",details);
      setDetails(data.details);setDetailsStatus("Your golfer details are saved.");
    } catch(error){setDetailsStatus(error instanceof Error?error.message:"Unable to save profile.");}
    finally{setDetailsBusy(false);}
  }

  const loadConnections = useCallback(async () => {
    const generation = ++connectionRequest.current;
    try {
      const data = await api(token,"/api/web/community/connections");
      if (generation !== connectionRequest.current) return;
      setConnections({following:data.following,followers:data.followers});
      setConnectionMessage("");
    } catch { if (generation === connectionRequest.current) { setConnections(null); setConnectionMessage("Connections are temporarily unavailable."); } }
  }, [api,token]);

  useEffect(() => { if (allowed) void loadConnections(); }, [allowed,loadConnections]);

  async function changeFollow(golfer: GolferProfile) {
    if (!golfer.user_id || !connections || connectionBusy || acting || loading || busy || profileBusy) return;
    setConnectionBusy(true); setConnectionMessage("");
    const following = connections.following.some(item=>item.user_id===golfer.user_id);
    try {
      await api(token,"/api/web/community/connections",{action:following?"unfollow":"follow",user_id:golfer.user_id});
      await loadConnections();
    } catch (error) { setConnectionMessage(error instanceof Error ? error.message : "Unable to update connection."); }
    finally { setConnectionBusy(false); }
  }

  useEffect(() => {
    if (!allowed) return;
    let active = true;
    api(token, "/api/web/community/profile").then(data => {
      if (!active) return;
      setOwnProfile(data.profile ?? null);
      setHandle(data.profile?.username ?? "");
      setProfileReady(true);
    }).catch(error => { if (active) setProfileMessage(error.message); });
    return () => { active = false; };
  }, [allowed, api, token]);

  async function saveHandle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (profileBusy || !profileReady || !allowed) return;
    setProfileBusy(true); setProfileMessage("");
    try {
      const data = await api(token, "/api/web/community/profile", {username:handle.trim()});
      setOwnProfile(data.profile); setHandle(data.profile.username);
      setProfileMessage("Your clubhouse username is saved.");
      setPosts(previous=>previous.map(post=>post.user_id===userId ? {...post,username:data.profile.username} : post));
    } catch (error) { setProfileMessage(error instanceof Error ? error.message : "Unable to save your profile."); }
    finally { setProfileBusy(false); }
  }

  async function viewGolfer(id: string) {
    if (acting || loading || busy || profileBusy || connectionBusy) return;
    setProfileBusy(true); setProfileMessage(""); setSelectedGolfer(null); setViewedDetails(null);
    try {
      const data = await api(token, `/api/web/community/public-profile?user_id=${encodeURIComponent(id)}`);
      setSelectedGolfer(data.profile);
    } catch (error) { setProfileMessage(error instanceof Error ? error.message : "Golfer unavailable."); }
    finally { setProfileBusy(false); }
  }

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
    setLoading(true);
    try {
    const data = await api(accessToken, "/api/web/community/posts");
    const records = Array.isArray(data.posts) ? data.posts as Post[] : [];
    setPosts(records);
    setAllowed(true);
    await loadMetrics(accessToken, records).catch(() => {});
    } catch (error) { setAllowed(false); setPosts([]); setMetrics({}); throw error; }
    finally { setLoading(false); }
  }, [api, loadMetrics]);

  useEffect(() => {
    if (!token) { setPosts([]); setMetrics({}); return; }
    let active = true;
    refresh(token).catch(error => { if (active) setStatus(error instanceof Error ? error.message : "Unable to load community feed."); });
    return () => { active = false; };
  }, [token, refresh]);

  async function moderate(post: Post, action: "report" | "block") {
    if (acting || loading || busy || profileBusy || connectionBusy || post.user_id === userId) return;
    if (action === "report" && reason.trim().length < 5) { setStatus("Please include a reason of at least five characters."); return; }
    if (action === "block" && !window.confirm("Block this golfer and hide each other's posts?")) return;
    setActing(post.id); setStatus("");
    try {
      await api(token, "/api/web/community/engagement", action === "report" ? {action, post_id:post.id, reason:reason.trim()} : {action, user_id:post.user_id});
      setReport(null); setReason("");
      if (action === "block") {
        ++connectionRequest.current;
        setSelectedGolfer(null);
        setViewedDetails(null);
        setConnections(previous=>previous ? {following:previous.following.filter(item=>item.user_id!==post.user_id),followers:previous.followers.filter(item=>item.user_id!==post.user_id)} : null);
        void loadConnections();
        setPosts(previous => previous.filter(item => item.user_id !== post.user_id));
        setComments({}); setExpanded({}); setDrafts({});
        setStatus("Golfer blocked.");
      } else setStatus("Report submitted for review.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to complete request."); }
    finally { setActing(null); }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!token || busy || loading || acting || preparingPhotos || (!body.trim() && !photos.length)) return;
    setBusy(true); setStatus("");
    try {
      if (photos.length) {
        const form=new FormData();form.append("body",body.trim());
        photos.forEach((photo,index)=>form.append("photos",photo.blob,`golf-photo-${index+1}.jpg`));
        const response=await fetch("/api/web/community/photo-post",{method:"POST",headers:{Authorization:`Bearer ${token}`},body:form,cache:"no-store"});
        const data=await response.json();if(!response.ok || !data.success)throw new Error(data.error||"Unable to publish photos.");
      } else await api(token, "/api/web/community/posts", {body: body.trim()});
      setBody("");setPhotos([]);setPhotoStatus("");setFilter("all");setStatus("Your post is published.");
      await refresh(token).catch(()=>setStatus("Your post was published. Refresh the feed to see it."));
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to publish."); }
    finally { setBusy(false); }
  }

  async function choosePhotos(files:File[]) {
    if(busy||preparingPhotos||!files.length)return;
    if(files.length+photos.length>4){setPhotoStatus("Choose up to four photos in total.");return;}
    setPreparingPhotos(true);setPhotoStatus("Preparing photos…");
    try {const prepared:PreparedPhoto[]=[];for(const file of files)prepared.push(await preparePhoto(file));setPhotos(previous=>[...previous,...prepared]);setPhotoStatus("");}
    catch(error){setPhotoStatus(error instanceof Error?error.message:"Unable to prepare photos.");}
    finally{setPreparingPhotos(false);}
  }

  async function toggleLike(post: Post) {
    if (!token || acting || loading || busy || !metrics[post.id]) return;
    setActing(post.id); setStatus("");
    const liked = Boolean(metrics[post.id]?.liked);
    try {
      await api(token, "/api/web/community/engagement", {action: liked ? "unlike" : "like", post_id: post.id});
      setMetrics(previous => ({...previous, [post.id]: {count: Math.max(0, (previous[post.id]?.count ?? 0) + (liked ? -1 : 1)), comments: previous[post.id]?.comments ?? 0, liked: !liked}}));
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to update like."); }
    finally { setActing(null); }
  }

  async function openComments(post: Post) {
    if (!token || acting || loading || busy) return;
    if (expanded[post.id]) { setExpanded(previous => ({...previous, [post.id]:false})); return; }
    setExpanded(previous => ({...previous, [post.id]:true})); setActing(post.id);
    try {
      const data = await api(token, `/api/web/community/engagement?post_id=${encodeURIComponent(post.id)}`);
      setComments(previous => ({...previous, [post.id]: Array.isArray(data.comments) ? data.comments : []}));
    } catch (error) { setExpanded(previous=>({...previous,[post.id]:false})); setStatus(error instanceof Error ? error.message : "Unable to load comments."); }
    finally { setActing(null); }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>, post: Post) {
    event.preventDefault(); if (!token || acting || loading || busy || !drafts[post.id]?.trim()) return;
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

  const visible = posts.filter(post => filter === "all" || (filter === "mine" ? post.user_id === userId : filter === "following" ? connections?.following.some(item=>item.user_id===post.user_id) : Boolean(post.photos?.length)));
  const golfers = [...new Map(posts.filter(post=>post.user_id!==userId && post.username).map(post=>[post.user_id,post])).values()].filter(post=>post.username?.toLowerCase().includes(golferQuery.trim().toLowerCase()));
  const nextHandleChange = ownProfile?.username_updated_at ? new Date(new Date(ownProfile.username_updated_at).getTime()+30*86400000) : null;
  if (!allowed) return <div className="g2-auth-panel" role="status"><p>{loading ? "Opening the clubhouse…" : status || "Community unavailable."}</p>{!loading && <button className="g2-btn g2-btn-green" onClick={()=>refresh(token).catch(error=>setStatus(error.message))}>Try again</button>}</div>;
  return <div className="g2-feed-layout">
      <aside><p className="g2-eyebrow">SHARE WITH THE CLUB</p><form onSubmit={publish} className="g2-form-card" style={{marginTop:20}}><div className="g2-field"><label htmlFor="g2-post">Your post {photos.length?"(optional caption)":""}</label><textarea id="g2-post" rows={6} maxLength={3000} value={body} onChange={event=>setBody(event.target.value)} placeholder="A round worth sharing. A moment from the course." disabled={busy} required={!photos.length}/></div><div className="g2-field g2-photo-composer"><label htmlFor="clubhouse-photo">Add course photos · {photos.length}/4</label><input id="clubhouse-photo" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={busy||preparingPhotos||photos.length>=4} onChange={e=>{const files=Array.from(e.target.files||[]);e.target.value="";void choosePhotos(files);}}/><p>JPEG, PNG or WebP. Photos are optimized before upload.</p><div className="g2-photo-preview">{photos.map((photo,index)=><div key={index}><img src={photo.preview} alt={`Selected golf photo ${index+1}`}/><button type="button" disabled={busy||preparingPhotos} aria-label={`Remove photo ${index+1}`} onClick={()=>setPhotos(previous=>previous.filter((_,i)=>i!==index))}>Remove</button></div>)}</div><p role="status">{photoStatus}</p></div><button className="g2-btn g2-btn-green" style={{marginTop:22}} type="submit" disabled={busy || loading || Boolean(acting) || preparingPhotos || (!body.trim()&&!photos.length)}>{busy ? "Publishing…" : "Publish post →"}</button></form><p className="g2-feedback" role="status" aria-live="polite">{status}</p>
        <section className="g2-golfer-panel g2-social-network" aria-label="Your golfer details">
          <p className="g2-eyebrow">MY GOLF IDENTITY</p><h2>Your game. Your story.</h2>
          <p>Personalize your golf profile. These details are private unless you choose to share them with the clubhouse.</p>
          {!ownProfile ? <p>Create your clubhouse username first.</p> : <form className="g2-field" onSubmit={saveDetails}>
            <label htmlFor="golfer-bio">Biography</label><textarea id="golfer-bio" maxLength={300} rows={3} value={details.bio} onChange={e=>setDetails({...details,bio:e.target.value})} disabled={!detailsReady||detailsBusy}/>
            <label htmlFor="golfer-course">Home course (optional)</label><input id="golfer-course" maxLength={100} value={details.home_course} onChange={e=>setDetails({...details,home_course:e.target.value})} disabled={!detailsReady||detailsBusy}/>
            <label htmlFor="golfer-experience">Golf experience</label><select id="golfer-experience" value={details.experience} onChange={e=>setDetails({...details,experience:e.target.value})} disabled={!detailsReady||detailsBusy}><option value="">Not specified</option><option value="beginner">New to golf</option><option value="recreational">Recreational golfer</option><option value="competitive">Competitive golfer</option></select>
            <label htmlFor="golfer-style">Preferred playing style</label><select id="golfer-style" value={details.playing_style} onChange={e=>setDetails({...details,playing_style:e.target.value})} disabled={!detailsReady||detailsBusy}><option value="">Not specified</option><option value="casual">Casual rounds</option><option value="practice">Practice and improvement</option><option value="competition">Competitive play</option></select>
            <label htmlFor="golfer-highlight">Personal golf milestone (self-reported)</label><input id="golfer-highlight" maxLength={180} value={details.personal_highlight} onChange={e=>setDetails({...details,personal_highlight:e.target.value})} disabled={!detailsReady||detailsBusy}/>
            <label className="g2-profile-privacy"><input type="checkbox" checked={details.share_details} onChange={e=>setDetails({...details,share_details:e.target.checked})} disabled={!detailsReady||detailsBusy}/> Share these optional details with active clubhouse members</label>
            <p>Your username and existing community posts remain visible under the existing clubhouse rules. Your official performance record stays private.</p>
            <button type="submit" className="g2-btn g2-btn-green" disabled={!detailsReady||detailsBusy}>{detailsBusy?"Saving…":"Save golfer profile"}</button>
          </form>}
          <p className="g2-feedback" role="status">{detailsStatus}</p><Link href="/my-gallaspy/home" className="g2-line-link">View my personal golf record →</Link>
        </section>
        {selectedGolfer && viewedDetails && <section className="g2-golfer-panel" aria-label="Shared golfer details"><p className="g2-eyebrow">GOLFER PROFILE</p><h2>@{selectedGolfer.username}</h2>{viewedDetails.bio && <p>{viewedDetails.bio}</p>}<dl className="g2-golfer-facts">{viewedDetails.home_course && <><dt>Home course</dt><dd>{viewedDetails.home_course}</dd></>}{viewedDetails.experience && <><dt>Experience</dt><dd>{viewedDetails.experience}</dd></>}{viewedDetails.playing_style && <><dt>Playing style</dt><dd>{viewedDetails.playing_style}</dd></>}{viewedDetails.personal_highlight && <><dt>Self-reported milestone</dt><dd>{viewedDetails.personal_highlight}</dd></>}</dl></section>}
        <section className="g2-golfer-panel g2-social-network" aria-label="Your social connections">
          <p className="g2-eyebrow">YOUR GOLF NETWORK</p><h2>Better together.</h2>
          <p>Follow golfers you enjoy playing with and keep up with their recent posts.</p>
          <p className="g2-feedback" role="status">{connectionMessage}</p>
          {!connections ? <button className="g2-btn g2-btn-green" type="button" onClick={()=>void loadConnections()}>Load connections</button> : <>
            <div className="g2-community-filters"><button type="button" aria-pressed={filter==="following"} onClick={()=>setFilter(filter==="following"?"all":"following")}>{filter==="following"?"Showing following feed":"Show following feed"}</button></div>
            {selectedGolfer?.user_id && <div className="g2-golfer-preview"><strong>@{selectedGolfer.username}</strong><button type="button" disabled={connectionBusy || Boolean(acting) || loading || profileBusy} onClick={()=>changeFollow(selectedGolfer)}>{connections.following.some(item=>item.user_id===selectedGolfer.user_id)?"Unfollow":"Follow"}</button></div>}
            <details open><summary>Following · {connections.following.length}</summary>{connections.following.length ? connections.following.map(golfer=><div className="g2-network-person" key={golfer.user_id}><button type="button" disabled={connectionBusy || profileBusy || Boolean(acting)} onClick={()=>viewGolfer(golfer.user_id!)}>@{golfer.username}</button><button type="button" disabled={connectionBusy || profileBusy || Boolean(acting) || loading} onClick={()=>changeFollow(golfer)}>Unfollow</button></div>) : <p>No golfers followed yet. Select a golfer in Discover Golfers to follow them.</p>}</details>
            <details><summary>{connections.followers.length===100?"Recent followers · 100+":"Followers · "+connections.followers.length}</summary>{connections.followers.length ? connections.followers.map(golfer=><div className="g2-network-person" key={golfer.user_id}><button type="button" disabled={connectionBusy || profileBusy || Boolean(acting)} onClick={()=>viewGolfer(golfer.user_id!)}>@{golfer.username}</button><button type="button" disabled={connectionBusy || profileBusy || Boolean(acting) || loading} onClick={()=>changeFollow(golfer)}>{connections.following.some(item=>item.user_id===golfer.user_id)?"Unfollow":"Follow back"}</button></div>) : <p>No followers yet.</p>}</details>
            <button type="button" className="g2-network-refresh" disabled={connectionBusy || Boolean(acting)} onClick={()=>void loadConnections()}>Refresh connections</button>
          </>}
        </section><Link href="/my-gallaspy/home" className="g2-line-link">Back to My Gallaspy →</Link></aside>
      <section aria-label="Community posts"><section className="g2-golfer-panel" aria-label="Golfer profiles"><p className="g2-eyebrow">YOUR CLUBHOUSE IDENTITY</p><h2>{ownProfile ? `@${ownProfile.username}` : "Make it yours."}</h2><p>Choose the name other golfers see in the community.</p><form onSubmit={saveHandle} className="g2-field"><label htmlFor="clubhouse-handle">Username</label><input id="clubhouse-handle" value={handle} onChange={event=>setHandle(event.target.value)} maxLength={20} minLength={3} pattern="[A-Za-z0-9_.]{3,20}" required disabled={!profileReady || profileBusy}/><button className="g2-btn g2-btn-green" disabled={!profileReady || profileBusy || handle.trim()===ownProfile?.username}>Save username</button></form>{nextHandleChange && nextHandleChange.getTime()>Date.now() && <p>Username changes available after {nextHandleChange.toLocaleDateString()}.</p>}<p className="g2-feedback" role="status">{profileMessage}</p><hr/><p className="g2-eyebrow">DISCOVER GOLFERS</p><p>Find golfers who have shared a recent clubhouse post.</p><input className="g2-golfer-search" aria-label="Search recent golfers" placeholder="Search usernames" value={golferQuery} onChange={event=>setGolferQuery(event.target.value)}/><div className="g2-golfer-directory">{golfers.length ? golfers.map(golfer=><button key={golfer.user_id} type="button" disabled={profileBusy || loading || Boolean(acting)} onClick={()=>viewGolfer(golfer.user_id)}>@{golfer.username}</button>) : <p>No matching recent golfers.</p>}</div>{selectedGolfer && <div className="g2-golfer-preview"><div className="g2-post-author">{selectedGolfer.avatar_url ? <img src={selectedGolfer.avatar_url} alt="" referrerPolicy="no-referrer"/> : <span aria-hidden="true">{selectedGolfer.username[0].toUpperCase()}</span>}<div><strong>@{selectedGolfer.username}</strong><p>Gallaspy community profile</p></div></div><button type="button" onClick={()=>setSelectedGolfer(null)}>Close profile</button></div>}</section><div className="g2-clubhouse-heading"><p className="g2-eyebrow">FROM THE CLUBHOUSE</p><button type="button" disabled={loading || busy || profileBusy || Boolean(acting)} onClick={()=>{setSelectedGolfer(null);refresh(token).catch(error=>setStatus(error.message));}}>{loading ? "Refreshing…" : "Refresh"}</button></div><div className="g2-community-filters" aria-label="Filter posts">{([ ["all","Latest"], ["photos","Photos"], ["mine","My posts"] ] as const).map(([value,label])=><button key={value} type="button" aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</button>)}</div><div style={{marginTop:20}}>{visible.length ? visible.map(post => <article className="g2-feed-post" key={post.id}>
        <div className="g2-post-author">{post.avatar_url ? <img src={post.avatar_url} alt="" referrerPolicy="no-referrer"/> : <span aria-hidden="true">{(post.username || "G").slice(0,1).toUpperCase()}</span>}<div><strong>{post.username ? `@${post.username}` : "Gallaspy golfer"}{post.user_id===userId ? " · You" : ""}</strong><time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</time></div></div><p>{post.body}</p>
        {post.photos?.length ? <div className="g2-feed-photos">{post.photos.map((photo,index)=><img key={`${post.id}-${index}`} src={photo.url} alt={`Photo shared with the Gallaspy community ${index + 1}`} loading="lazy" referrerPolicy="no-referrer" />)}</div> : null}
        {connections && post.user_id!==userId && post.username && <div className="g2-community-filters"><button type="button" disabled={connectionBusy || profileBusy || busy || loading || Boolean(acting)} onClick={()=>changeFollow({user_id:post.user_id,username:post.username!})}>{connections.following.some(item=>item.user_id===post.user_id)?"Unfollow":"Follow"} @{post.username}</button></div>}
        <div className="g2-community-actions"><button type="button" onClick={()=>toggleLike(post)} disabled={acting===post.id} aria-pressed={metrics[post.id]?.liked ?? false}>{metrics[post.id]?.liked ? "♥ Liked" : "♡ Like"} {metrics[post.id]?.count ?? 0}</button><button type="button" onClick={()=>openComments(post)} aria-expanded={Boolean(expanded[post.id])}>Comments {metrics[post.id]?.comments ?? ""}</button></div>
        {expanded[post.id] && <div><div className="g2-comment-list">{(comments[post.id] ?? []).map(comment=><div className="g2-comment" key={comment.id}><strong>{comment.username ? `@${comment.username}` : "Gallaspy golfer"}</strong><p>{comment.body}</p></div>)}</div><form className="g2-comment-form" onSubmit={event=>submitComment(event,post)}><input aria-label="Write a comment" maxLength={1000} required placeholder="Write a comment…" value={drafts[post.id] ?? ""} onChange={event=>setDrafts(previous=>({...previous,[post.id]:event.target.value}))}/><button type="submit" disabled={acting===post.id || !drafts[post.id]?.trim()}>Post</button></form></div>}
        {post.user_id && post.user_id!==userId && <details className="g2-post-safety"><summary>Post options</summary><button type="button" disabled={Boolean(acting)} onClick={()=>{setReport(post.id);setReason("");}}>Report post</button><button type="button" disabled={Boolean(acting)} onClick={()=>moderate(post,"block")}>Block golfer</button>{report===post.id && <form onSubmit={event=>{event.preventDefault();moderate(post,"report");}}><label htmlFor={`report-${post.id}`}>Reason for report</label><textarea id={`report-${post.id}`} value={reason} onChange={event=>setReason(event.target.value)} maxLength={500} required/><button type="submit" disabled={!reason.trim() || Boolean(acting)}>Submit report</button><button type="button" onClick={()=>setReport(null)}>Cancel</button></form>}</details>}
      </article>) : <p className="g2-community-empty">{loading ? "Loading posts…" : filter === "mine" ? "Your posts will appear here after you share." : filter === "photos" ? "Course photos will appear here as golfers share." : filter === "following" ? "No recent posts from golfers you follow. Discover golfers or switch to Latest." : "Start the conversation. Share a moment from your next round."}</p>}</div></section>
    </div>;
}
