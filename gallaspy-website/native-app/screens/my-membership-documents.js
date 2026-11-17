(() => {
  "use strict";

  const root = document.getElementById("myMembershipSection");
  if (!root) return;

  const section = document.createElement("section");
  section.style.marginTop = "24px";

  const heading = document.createElement("h4");
  heading.textContent = "MEMBERSHIP DOCUMENTS";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "my-action";
  button.textContent = "VIEW SIGNED AGREEMENTS";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const records = document.createElement("div");
  let generation = 0;

  section.append(heading, button, status, records);
  root.append(section);

  function clear() {
    generation++;
    records.replaceChildren();
    status.textContent = "";
    button.disabled = false;
  }

  button.addEventListener("click", async () => {
    clear();
    const current = generation;
    button.disabled = true;
    status.textContent = "Loading signed agreements...";

    try {
      const token = await window.gallaspyAuth?.getCheckoutAccessToken?.();

      if (!token) throw new Error("Sign in required.");

      const response = await fetch(
        "https://thegallaspy.com/api/mobile/membership/documents",
        {
          headers: { Authorization: "Bearer " + token },
          cache: "no-store"
        }
      );

      const result = await response.json();

      if (current !== generation) return;

      if (!response.ok || result.success !== true ||
          !Array.isArray(result.records)) {
        throw new Error("Records unavailable.");
      }

      if (!result.records.length) {
        status.textContent = "No signed membership agreements available.";
        return;
      }

      for (const record of result.records) {
        const card = document.createElement("div");
        card.style.marginTop = "20px";

        const title = document.createElement("h4");
        title.textContent = record.membership_plan === "annual"
          ? "STANDARD ANNUAL MEMBERSHIP"
          : "STANDARD MONTHLY MEMBERSHIP";

        const signed = document.createElement("p");
        signed.textContent = "Signed by: " + record.signed_full_name;

        const date = document.createElement("p");
        date.textContent = "Accepted: " + record.accepted_at;

        card.append(title, signed, date);

        for (const [name, doc] of Object.entries(record.documents)) {
          const details = document.createElement("details");
          const summary = document.createElement("summary");
          const version = document.createElement("p");
          const body = document.createElement("p");

          summary.textContent = name.replace(".md", "").replaceAll("-", " ");
          version.textContent = "Version: " + doc.version;
          body.style.whiteSpace = "pre-wrap";
          body.textContent = doc.content;

          details.append(summary, version, body);
          card.append(details);
        }

        records.append(card);
      }

      status.textContent = "Your signed membership records.";

    } catch {
      if (current === generation) {
        status.textContent = "Unable to load records. Confirm that you are signed in.";
      }
    } finally {
      if (current === generation) button.disabled = false;
    }
  });

  window.addEventListener("gallaspy:auth-changed", clear);
  window.addEventListener("pagehide", clear);
})();
