(() => {
  "use strict";

  const API = "https://thegallaspy.com/api/mobile/community/posts";
  const screen = document.getElementById("nativeCommunityScreen");
  const feed = document.getElementById("communityFeed");
  const body = document.getElementById("communityPostBody");
  const publish = document.getElementById("communityPublishButton");
  const status = document.getElementById("communityPostStatus");

  if (!screen || !feed || !body || !publish || !status) return;

  let loading = false;
  let posting = false;

  function message(text) {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }

  async function token() {
    return window.gallaspyAuth?.getCheckoutAccessToken?.() || null;
  }

  async function request(method, payload) {
    const accessToken = await token();

    if (!accessToken) {
      throw new Error("Please sign in to your Gallaspy account.");
    }

    const response = await fetch(API, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(payload ? { "Content-Type": "application/json" } : {})
      },
      ...(payload ? { body: JSON.stringify(payload) } : {}),
      cache: "no-store"
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(result.error || "Community is unavailable.");
    }

    return result;
  }

  function renderPost(post) {
    const article = document.createElement("article");
    article.className = "home-club-card";

    const heading = document.createElement("strong");
    heading.textContent = "GALLASPY GOLFER";

    const date = document.createElement("p");
    date.className = "intro-label";

    const parsed = new Date(post.created_at);
    date.textContent = Number.isNaN(parsed.getTime())
      ? ""
      : parsed.toLocaleDateString();

    const text = document.createElement("p");
    text.textContent = post.body || "";

    article.append(heading, date, text);
    return article;
  }

  async function load() {
    if (loading) return;
    loading = true;

    feed.replaceChildren(message("Loading Community posts..."));

    try {
      const result = await request("GET");
      const posts = Array.isArray(result.posts) ? result.posts : [];

      feed.replaceChildren();

      if (!posts.length) {
        feed.append(message("No posts yet. Start the conversation."));
      } else {
        posts.forEach(post => feed.append(renderPost(post)));
      }
    } catch (error) {
      feed.replaceChildren(message(error.message || "Unable to load Community."));
    } finally {
      loading = false;
    }
  }

  publish.addEventListener("click", async () => {
    if (posting) return;

    const text = body.value.trim();

    if (!text || text.length > 3000) {
      status.textContent = "Enter a post between 1 and 3,000 characters.";
      return;
    }

    posting = true;
    publish.disabled = true;
    status.textContent = "Publishing your post...";

    try {
      await request("POST", { body: text });
      body.value = "";
      status.textContent = "Post published successfully.";
      await load();
    } catch (error) {
      status.textContent = error.message || "Unable to publish post.";
    } finally {
      posting = false;
      publish.disabled = false;
    }
  });

  window.loadGallaspyCommunity = load;
})();
