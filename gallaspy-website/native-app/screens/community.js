
(() => {
  "use strict";

  const POSTS_API =
    "https://thegallaspy.com/api/mobile/community/posts";
  const PROFILE_API =
    "https://thegallaspy.com/api/mobile/community/profile";
  const ENGAGEMENT_API =
    "https://thegallaspy.com/api/mobile/community/engagement";

  const screen = document.getElementById("nativeCommunityScreen");
  const feed = document.getElementById("communityFeed");
  const body = document.getElementById("communityPostBody");
  const publish = document.getElementById("communityPublishButton");
  const status = document.getElementById("communityPostStatus");

  const usernameSetup = document.getElementById("communityUsernameSetup");
  const usernameInput = document.getElementById("communityUsernameInput");
  const saveUsername = document.getElementById("communitySaveUsernameButton");
  const usernameStatus = document.getElementById("communityUsernameStatus");

  if (!screen || !feed || !body || !publish || !status) return;

  let loading = false;
  let posting = false;
  let savingUsername = false;

  function message(text) {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }

  async function token() {
    return window.gallaspyAuth?.getCheckoutAccessToken?.() || null;
  }

  async function request(url, method = "GET", payload) {
    const accessToken = await token();

    if (!accessToken) {
      throw new Error("Please sign in to your Gallaspy account.");
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(payload ? { "Content-Type": "application/json" } : {})
      },
      ...(payload ? { body: JSON.stringify(payload) } : {}),
      cache: "no-store"
    });

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error("Unable to read the server response.");
    }

    if (!response.ok || result.success !== true) {
      throw new Error(result.error || "Community is unavailable.");
    }

    return result;
  }

  function relativeTime(value) {
    const date = new Date(value);
    const time = date.getTime();

    if (!Number.isFinite(time)) return "";

    const seconds = Math.max(
      0,
      Math.floor((Date.now() - time) / 1000)
    );

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return date.toLocaleDateString();
  }


  // GALLASPY R9.2 PROFILE NAVIGATION
  const publicProfileView =
    document.getElementById("communityPublicProfileView");
  const publicProfileContent =
    document.getElementById("communityPublicProfileContent");
  const publicProfileBack =
    document.getElementById("communityPublicProfileBack");

  function closePublicProfile() {
    if (!publicProfileView) return;
    publicProfileRequestId++;
    publicProfileView.hidden = true;
    const timeline = document.getElementById("communityTimelineView");
    if (timeline) timeline.hidden = false;
  }

  let publicProfileRequestId = 0;

  async function openPublicProfile(post) {
    if (!publicProfileView || !publicProfileContent) return;

    if (typeof post.user_id !== "string" ||
        !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(post.user_id)) return;

    const timeline = document.getElementById("communityTimelineView");
    if (!timeline) return;

    const requestId = ++publicProfileRequestId;

    const username =
      typeof post.username === "string" && post.username.trim()
        ? `@${post.username.trim()}`
        : "Gallaspy Golfer";

    publicProfileContent.replaceChildren(
      message("Loading golfer profile…")
    );

    timeline.hidden = true;
    publicProfileView.hidden = false;

    try {
      const endpoint =
        "https://thegallaspy.com/api/mobile/community/public-profile" +
        "?user_id=" + encodeURIComponent(post.user_id);

      const result = await request(endpoint);

      if (requestId !== publicProfileRequestId ||
          publicProfileView.hidden) return;

      const profile = result.profile;

      if (!profile ||
          profile.user_id !== post.user_id ||
          typeof profile.username !== "string") {
        throw new Error("Golfer profile unavailable.");
      }

      const container = document.createElement("div");
      container.className = "gallaspy-public-profile-details";

      const avatar = document.createElement("div");
      avatar.className = "gallaspy-public-profile-avatar";

      const initial = profile.username.trim().charAt(0).toUpperCase() || "G";
      avatar.textContent = initial;

      if (typeof profile.avatar_url === "string" &&
          /^https:\/\//i.test(profile.avatar_url)) {
        const image = document.createElement("img");
        image.src = profile.avatar_url;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove());
        avatar.append(image);
      }

      const heading = document.createElement("h3");
      heading.textContent = "@" + profile.username.trim();

      const description = document.createElement("p");
      description.textContent = "Gallaspy Community Golfer";

      container.append(avatar, heading, description);
      publicProfileContent.replaceChildren(container);

    } catch (error) {
      if (requestId !== publicProfileRequestId ||
          publicProfileView.hidden) return;

      publicProfileContent.replaceChildren(
        message(error.message || "Unable to load golfer profile.")
      );
    }
  }

  if (publicProfileBack) {
    publicProfileBack.addEventListener("click", closePublicProfile);
  }

  function renderPost(post) {
    const article = document.createElement("article");
    article.className = "home-club-card community-post";

    const header = document.createElement("div");
    header.className = "community-post-header";

    const avatar = document.createElement("div");
    avatar.className = "community-post-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const fallback = (typeof post.username === "string" && post.username.trim())
      ? post.username.trim().charAt(0).toUpperCase() : "G";
    avatar.textContent = fallback;
    if (typeof post.avatar_url === "string" &&
        /^https:\/\//.test(post.avatar_url)) {
      const photo = document.createElement("img");
      photo.alt = "";
      photo.className = "gallaspy-avatar-photo";
      photo.loading = "lazy";
      photo.decoding = "async";
      photo.referrerPolicy = "no-referrer";
      photo.src = post.avatar_url;
      photo.addEventListener("error", () => photo.remove());
      avatar.append(photo);
    }

    const authorInfo = document.createElement("div");
    authorInfo.className = "community-post-author-info";

    const heading = document.createElement("strong");
    heading.className = "community-post-author";

    // Other golfers' usernames will be supplied by
    // the posts API in a later update.
    const username =
      typeof post.username === "string" && post.username
        ? `@${post.username}`
        : "GALLASPY GOLFER";

    heading.textContent = username;

    const date = document.createElement("p");
    date.className = "community-post-time";
    date.textContent = relativeTime(post.created_at);

    const text = document.createElement("p");
    text.className = "community-post-body";
    text.textContent = post.body || "";


    if (typeof post.user_id === "string" &&
        /^[a-f0-9-]{36}$/i.test(post.user_id)) {
      avatar.removeAttribute("aria-hidden");
      avatar.setAttribute("role", "button");
      avatar.setAttribute("tabindex", "0");
      avatar.setAttribute("aria-label", "View golfer profile");

      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");
      heading.setAttribute("aria-label", "View " + username + " profile");

      for (const target of [avatar, heading]) {
        target.addEventListener("click", () => openPublicProfile(post));
        target.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPublicProfile(post);
          }
        });
      }
    }

    authorInfo.append(heading, date);
    header.append(avatar, authorInfo);
    article.append(header, text);
    const photos = Array.isArray(post.photos) ? post.photos.slice(0, 4) : [];
    if (photos.length) {
      const gallery = document.createElement("div");
      gallery.className = "gallaspy-community-gallery";
      gallery.setAttribute("aria-label", "Post photos");
      for (const entry of photos) {
        if (!entry || typeof entry.url !== "string" || !entry.url.startsWith("https://")) continue;
        const img = document.createElement("img");
        img.src = entry.url;
        img.alt = "Photo shared with Gallaspy Community";
        img.loading = "lazy";
        img.decoding = "async";
        img.referrerPolicy = "no-referrer";
        gallery.append(img);
      }
      if (gallery.childElementCount) article.append(gallery);
    }
    if (typeof post.id === "string" && /^[a-f0-9-]{36}$/i.test(post.id)) {
      attachSocialActions(article, post);
    }
    return article;
  }

  function socialButton(label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallaspy-social-action ${className}`;
    button.textContent = label;
    return button;
  }

  function attachSocialActions(article, post) {
    const wrap = document.createElement("section");
    wrap.className = "gallaspy-social-actions";
    wrap.setAttribute("aria-label", "Post actions");
    const row = document.createElement("div");
    row.className = "gallaspy-social-action-row";
    const stats = post.engagement || {};
    let liked = Boolean(stats.viewer_liked);
    let likesCount = Number(stats.likes_count) || 0;
    let commentCount = Number(stats.comments_count) || 0;
    const like = socialButton("", "gallaspy-social-like");
    const comments = socialButton("", "gallaspy-social-comments");
    const report = socialButton("Report", "gallaspy-social-report");
    const block = socialButton("Block", "gallaspy-social-block");
    const feedback = document.createElement("p");
    feedback.className = "gallaspy-social-feedback";
    feedback.setAttribute("role", "status");
    const replies = document.createElement("section");
    replies.className = "gallaspy-social-replies";
    replies.hidden = true;
    const reporting = document.createElement("section");
    reporting.className = "gallaspy-social-report-panel";
    reporting.hidden = true;
    const reportReason = document.createElement("textarea");
    reportReason.maxLength = 500;
    reportReason.rows = 2;
    reportReason.placeholder = "Why should this post be reviewed?";
    reportReason.setAttribute("aria-label", "Reason for report");
    const submitReport = socialButton("Submit report", "gallaspy-social-send");
    reporting.append(reportReason, submitReport);
    const update = () => {
      like.textContent = `${liked ? "♥ Liked" : "♡ Like"} · ${likesCount}`;
      like.setAttribute("aria-pressed", String(liked));
      comments.textContent = `💬 Comments · ${commentCount}`;
    };
    update();
    // Keep moderation available without crowding primary engagement buttons.
    // Reuse the existing report/block elements, so their handlers stay intact.
    const moderation = document.createElement("details");
    moderation.className = "gallaspy-post-menu";
    const moderationToggle = document.createElement("summary");
    moderationToggle.textContent = "•••";
    moderationToggle.setAttribute("aria-label", "More actions for this post");
    const moderationOptions = document.createElement("div");
    moderationOptions.className = "gallaspy-post-menu-options";
    moderationOptions.append(report, block);
    moderation.append(moderationToggle, moderationOptions);
    const postHeader = article.querySelector(".community-post-header");
    if (postHeader) postHeader.append(moderation);
    row.append(like, comments);
    wrap.append(row, feedback, replies, reporting);
    article.append(wrap);
    let busy = false;
    async function updateCounts() {
      try {
        const refreshed = await request(`${ENGAGEMENT_API}?post_ids=${encodeURIComponent(post.id)}`);
        const latest = refreshed.engagement?.[0];
        if (latest) {
          liked = Boolean(latest.viewer_liked);
          likesCount = Number(latest.likes_count) || 0;
          commentCount = Number(latest.comments_count) || 0;
          update();
        }
      } catch { /* Feed stays available when counts are temporarily unavailable. */ }
    }
    like.addEventListener("click", async () => {
      if (busy) return;
      busy = true; like.disabled = true; feedback.textContent = "";
      try {
        await request(ENGAGEMENT_API, "POST", {
          action: liked ? "unlike" : "like", post_id: post.id
        });
        liked = !liked;
        likesCount = Math.max(0, likesCount + (liked ? 1 : -1));
        update();
        await updateCounts();
      } catch (error) {
        feedback.textContent = error.message || "Could not update like.";
      } finally { busy = false; like.disabled = false; }
    });
    comments.addEventListener("click", async () => {
      replies.hidden = !replies.hidden;
      if (replies.hidden) return;
      replies.replaceChildren(message("Loading replies…"));
      try {
        const result = await request(`${ENGAGEMENT_API}?post_id=${encodeURIComponent(post.id)}`);
        replies.replaceChildren();
        const items = Array.isArray(result.comments) ? result.comments : [];
        if (!items.length) replies.append(message("No replies yet."));
        items.slice().reverse().forEach(item => {
          const entry = document.createElement("p");
          entry.className = "gallaspy-social-reply";
          const name = document.createElement("strong");
          name.textContent = item.username ? `@${item.username} ` : "Golfer ";
          const text = document.createElement("span");
          text.textContent = item.body || "";
          entry.append(name, text);
          replies.append(entry);
        });
        const compose = document.createElement("div");
        compose.className = "gallaspy-social-compose";
        const replyText = document.createElement("textarea");
        replyText.rows = 2;
        replyText.maxLength = 1000;
        replyText.placeholder = "Write a thoughtful reply…";
        replyText.setAttribute("aria-label", "Write a comment");
        const send = socialButton("Reply", "gallaspy-social-send");
        compose.append(replyText, send);
        replies.append(compose);
        send.addEventListener("click", async () => {
          if (send.disabled) return;
          const value = replyText.value.trim();
          if (!value) { feedback.textContent = "Write a reply first."; return; }
          send.disabled = true; feedback.textContent = "";
          try {
            await request(ENGAGEMENT_API, "POST", {action:"comment",post_id:post.id,body:value});
            replies.hidden = true;
            await updateCounts();
            comments.click();
          } catch (error) {
            feedback.textContent = error.message || "Reply could not be posted.";
          } finally { send.disabled = false; }
        });
      } catch (error) {
        replies.replaceChildren(message(error.message || "Unable to load replies."));
      }
    });
    report.addEventListener("click", () => {
      moderation.open = false;
      reporting.hidden = !reporting.hidden;
      if (!reporting.hidden) reportReason.focus();
    });
    submitReport.addEventListener("click", async () => {
      if (submitReport.disabled) return;
      submitReport.disabled = true; feedback.textContent = "";
      try {
        await request(ENGAGEMENT_API,"POST",{
          action:"report",post_id:post.id,reason:reportReason.value.trim()
        });
        reporting.hidden = true;
        reportReason.value = "";
        feedback.textContent = "Report submitted for review.";
      } catch (error) {
        feedback.textContent = error.message || "Report could not be submitted.";
      } finally { submitReport.disabled = false; }
    });
    block.addEventListener("click", async () => {
      moderation.open = false;
      if (!post.user_id || !window.confirm("Block this golfer and hide each other's posts?")) return;
      block.disabled = true;
      try {
        await request(ENGAGEMENT_API,"POST",{action:"block",user_id:post.user_id});
        await loadPosts();
      } catch (error) {
        feedback.textContent = error.message || "Could not block golfer.";
        block.disabled = false;
      }
    });
  }

  async function loadProfile() {
    if (!usernameSetup || !usernameInput || !usernameStatus) {
      return;
    }

    try {
      const result = await request(PROFILE_API);

      if (result.profile?.username) {
        usernameSetup.hidden = true;
        usernameInput.value = result.profile.username;
      } else {
        usernameSetup.hidden = false;
      }

      usernameStatus.textContent = "";
    } catch (error) {
      usernameSetup.hidden = true;
      status.textContent =
        error.message || "Unable to load Community profile.";
    }
  }

  async function loadPosts() {
    if (loading) return;
    loading = true;

    feed.replaceChildren(message("Loading Community posts..."));

    try {
      const result = await request(POSTS_API);
      const posts = Array.isArray(result.posts) ? result.posts : [];

      feed.replaceChildren();

      if (!posts.length) {
        feed.append(message("No posts yet. Start the conversation."));
      } else {
        let counts = new Map();
        try {
          const ids = posts.map(post => post.id).filter(Boolean);
          const result = await request(`${ENGAGEMENT_API}?post_ids=${encodeURIComponent(ids.join(","))}`);
          counts = new Map((result.engagement || []).map(item => [item.post_id, item]));
        } catch { /* Posts remain readable even if engagement is unavailable. */ }
        posts.forEach(post => feed.append(renderPost({...post,engagement:counts.get(post.id)})));
      }
    } catch (error) {
      feed.replaceChildren(
        message(error.message || "Unable to load Community.")
      );
    } finally {
      loading = false;
    }
  }

  async function load() {
    // GALLASPY R9.6: restore Community on re-entry.
    // Also invalidate any unfinished public-profile request.
    closePublicProfile();
    await Promise.all([loadProfile(), loadPosts()]);
  }

  if (saveUsername && usernameInput && usernameStatus) {
    saveUsername.addEventListener("click", async () => {
      if (savingUsername) return;

      const username = usernameInput.value.trim();

      if (!/^[A-Za-z0-9_.]{3,20}$/.test(username)) {
        usernameStatus.textContent =
          "Use 3–20 letters, numbers, underscores, or periods.";
        return;
      }

      savingUsername = true;
      saveUsername.disabled = true;
      usernameStatus.textContent = "Saving username...";

      try {
        const result = await request(
          PROFILE_API,
          "POST",
          { username }
        );

        usernameInput.value = result.profile.username;
        usernameStatus.textContent = "Username saved successfully.";

        if (usernameSetup) {
          usernameSetup.hidden = true;
        }

        await loadPosts();
      } catch (error) {
        usernameStatus.textContent =
          error.message || "Unable to save username.";
      } finally {
        savingUsername = false;
        saveUsername.disabled = false;
      }
    });
  }

  publish.addEventListener("click", async () => {
    if (posting) return;

    const photoBridge = window.gallaspyCommunityPhotos;
    if (photoBridge?.isPreparing?.()) {
      status.textContent = "Wait for your photos to finish preparing.";
      return;
    }
    const hasPhotos = Boolean(photoBridge?.hasPhotos?.());
    const text = body.value.trim();

    if ((!text && !hasPhotos) || text.length > 3000) {
      status.textContent = hasPhotos
        ? "Caption cannot exceed 3,000 characters."
        : "Write a post or select up to four photos.";
      return;
    }

    posting = true;
    publish.disabled = true;
    status.textContent = "Publishing your post...";

    try {
      if (hasPhotos) {
        await photoBridge.publish(text);
        photoBridge.clear();
      } else {
        await request(POSTS_API, "POST", { body: text });
      }

      body.value = "";
      status.textContent = "Post published successfully.";

      await loadPosts();
    } catch (error) {
      status.textContent =
        error.message || "Unable to publish post.";
    } finally {
      posting = false;
      publish.disabled = false;
    }
  });

  window.loadGallaspyCommunity = load;
})();
