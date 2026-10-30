(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  const tabs = {
    find: $("foursomeFind"),
    host: $("foursomeHost"),
    mine: $("foursomeMine")
  };

  const panels = {
    find: $("foursomeBrowse"),
    host: $("foursomeHostForm"),
    mine: $("foursomeMyRounds")
  };

  const message = $("foursomeMessage");

  if (Object.values(tabs).some(value => !value) ||
      Object.values(panels).some(value => !value)) return;

  function showPanel(selected) {
    Object.entries(panels).forEach(([key, panel]) => {
      panel.hidden = key !== selected;
    });

    Object.entries(tabs).forEach(([key, button]) => {
      const active = key === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (message) message.textContent = "";
  }

  Object.entries(tabs).forEach(([key, button]) => {
    button.addEventListener("click", () => showPanel(key));
  });



  // gallaspy-host-experience-v1
  // Presentation improvements only. Existing API behavior is unchanged.
  const hostingForm = $("foursomeHostForm");
  const hostingDate = $("foursomeDate");

  if (hostingForm) {
    const intro = document.createElement("div");
    intro.className = "gallaspy-host-intro";

    const heading = document.createElement("h3");
    heading.textContent = "HOST YOUR NEXT ROUND.";

    const description = document.createElement("p");
    description.textContent =
      "Your course. Your time. Your crew. Create a round and find golfers to join you.";

    intro.append(heading, description);
    hostingForm.prepend(intro);
  }

  function updateHostingMinimumDate() {
    if (!hostingDate) return;

    const current = new Date();
    const localDate = [
      current.getFullYear(),
      String(current.getMonth() + 1).padStart(2, "0"),
      String(current.getDate()).padStart(2, "0")
    ].join("-");

    hostingDate.min = localDate;
  }

  updateHostingMinimumDate();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateHostingMinimumDate();
  });

  const hostForm = $("foursomeHostForm");

  hostForm.addEventListener("submit", async event => {
    event.preventDefault();

    const submitButton = hostForm.querySelector('button[type="submit"]');

    if (!hostForm.reportValidity()) return;

    if (!window.gallaspyAuth?.foursomeRequest) {
      if (message) message.textContent = "Sign-in service is not ready.";
      return;
    }

    const course = $("foursomeCourse").value.trim();
    const date = $("foursomeDate").value;
    const time = $("foursomeTime").value;
    const style = $("foursomeStyle").value;
    const maxPlayers = Number($("foursomePlayersNeeded").value) + 1;

    submitButton.disabled = true;
    submitButton.textContent = "CREATING ROUND...";

    if (message) message.textContent = "Publishing your round...";

    try {
      await window.gallaspyAuth.foursomeRequest("", "POST", {
        course_name: course,
        round_date: date,
        tee_time: time,
        playing_style: style,
        max_players: maxPlayers
      });

      hostForm.reset();

      if (message) {
        message.textContent = "Your round has been created successfully.";
      }

      // gallaspy-host-post-create-mine-v1
      // A new host should immediately see their own round.
      showPanel("mine");
      await loadMyFoursomes();

      if (message) {
        message.textContent =
          "Round created successfully. Manage your round and join requests in MY ROUNDS.";
      }
    } catch (error) {
      if (message) {
        message.textContent =
          error.message || "Unable to create your round.";
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "HOST A ROUND →";
    }
  });


  const listings = $("foursomeListings");

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  // gallaspy-golf-partners-empty-v1
  // Reuse existing tab handlers; never create separate hosting logic.
  function makeEmptyAction(label, targetTab) {
    const button = element(
      "button",
      label,
      "foursome-empty-action"
    );

    button.type = "button";

    button.addEventListener("click", () => {
      targetTab.click();
    });

    return button;
  }

  function formatDate(date) {
    const parsed = new Date(date + "T12:00:00");
    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
  }

  function formatTime(time) {
    const match = String(time).match(/^(\d{2}):(\d{2})/);
    if (!match) return time;

    const hour = Number(match[1]);
    return `${hour % 12 || 12}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
  }

  const styles = {
    social: "SOCIAL / CASUAL",
    beginner: "BEGINNER FRIENDLY",
    competitive: "COMPETITIVE",
    all: "ALL SKILL LEVELS"
  };

  async function loadFoursomes() {
    if (!listings) return;

    listings.replaceChildren(
      element("p", "Loading available rounds...")
    );

    try {
      if (!window.gallaspyAuth?.foursomeRequest) {
        throw new Error("Sign-in service is not ready.");
      }

      const result = await window.gallaspyAuth.foursomeRequest();

      listings.replaceChildren();

      const refresh = element("button", "REFRESH");
      refresh.type = "button";
      refresh.addEventListener("click", loadFoursomes);
      listings.append(refresh);

      const rounds = Array.isArray(result.foursomes)
        ? result.foursomes
        : [];

      if (!rounds.length) {
        listings.append(
          element(
            "p",
            "No upcoming rounds are available yet. Bring your crew together and host the first one."
          ),
          makeEmptyAction(
            "HOST THE FIRST ROUND →",
            tabs.host
          )
        );
        return;
      }

      for (const round of rounds) {
        const card = element("article", undefined, "foursome-card");

        card.append(
          element("h4", round.course_name || "Golf Round"),
          element("p", formatDate(round.round_date)),
          element("p", "TEE TIME: " + formatTime(round.tee_time)),
          element("p", styles[round.playing_style] || "GOLF ROUND")
        );

        const isHost = round.host_player_id === result.player_id;
        const spotsLeft = Number(round.spots_left);
        const isFull =
          round.status !== "open" ||
          !Number.isFinite(spotsLeft) ||
          spotsLeft <= 0;

        card.append(
          element(
            "span",
            isHost
              ? "YOUR ROUND"
              : isFull
                ? "FULL"
                : spotsLeft + (spotsLeft === 1
                    ? " SPOT LEFT"
                    : " SPOTS LEFT"),
            "foursome-spots"
          )
        );

        if (!isHost && !isFull) {
          const button = element("button", "REQUEST TO JOIN →");
          button.type = "button";

          button.addEventListener("click", async () => {
            button.disabled = true;
            button.textContent = "SENDING REQUEST...";

            try {
              await window.gallaspyAuth.foursomeRequest(
                "/request",
                "POST",
                { foursome_id: round.id }
              );

              button.textContent = "REQUEST SENT";
              if (message) {
                message.textContent = "Your request has been sent to the host.";
              }
            } catch (error) {
              button.disabled = false;
              button.textContent = "REQUEST TO JOIN →";
              if (message) {
                message.textContent =
                  error.message || "Unable to send request.";
              }
            }
          });

          card.append(button);
        }

        listings.append(card);
      }
    } catch (error) {
      listings.replaceChildren(
        element(
          "p",
          error.message || "Unable to load available rounds."
        )
      );

      const retry = element("button", "TRY AGAIN");
      retry.type = "button";
      retry.addEventListener("click", loadFoursomes);
      listings.append(retry);
    }
  }

  tabs.find.addEventListener("click", loadFoursomes);

  const myRounds = $("foursomeMyRounds");

  async function loadMyFoursomes() {
    if (!myRounds) return;

    myRounds.replaceChildren(
      element("p", "Loading your rounds...")
    );

    try {
      const result = await window.gallaspyAuth.foursomeRequest("/mine");

      myRounds.replaceChildren();

      const refresh = element("button", "REFRESH");
      refresh.type = "button";
      refresh.addEventListener("click", loadMyFoursomes);
      myRounds.append(refresh);

      myRounds.append(
        element("h4", "ROUNDS YOU'RE HOSTING")
      );

      const hosting = Array.isArray(result.hosting)
        ? result.hosting
        : [];

      if (!hosting.length) {
        myRounds.append(
          element(
            "p",
            "You haven't hosted an upcoming round yet."
          ),
          makeEmptyAction(
            "CREATE A ROUND →",
            tabs.host
          )
        );
      }

      for (const round of hosting) {
        const card = element("article", undefined, "foursome-card");

        card.append(
          element("h4", round.course_name),
          element("p", formatDate(round.round_date)),
          element("p", "TEE TIME: " + formatTime(round.tee_time)),
          element(
            "p",
            "CONFIRMED PLAYERS: " +
              round.confirmed_players +
              " / " +
              round.max_players
          )
        );

        const requests = Array.isArray(round.requests)
          ? round.requests
          : [];

        const pending = round.status === "open"
          ? requests.filter(
              request => request.status === "pending"
            )
          : [];

        card.append(
          element(
            "p",
            pending.length + " PENDING JOIN REQUEST(S)"
          )
        );

        for (const request of pending) {
          const requestBox = element(
            "div",
            undefined,
            "foursome-request"
          );

          requestBox.append(
            element(
              "p",
              request.member_name || "Gallaspy Member"
            ),
            element("p", "STATUS: PENDING")
          );

          const actions = element(
            "div",
            undefined,
            "foursome-request-actions"
          );

          for (const [label, decision] of [
            ["APPROVE", "approved"],
            ["DECLINE", "declined"]
          ]) {
            const button = element("button", label);
            button.type = "button";

            button.addEventListener("click", async () => {
              const buttons = actions.querySelectorAll("button");

              buttons.forEach(item => {
                item.disabled = true;
              });

              button.textContent = "PROCESSING...";

              try {
                await window.gallaspyAuth.foursomeRequest(
                  "/approve",
                  "POST",
                  {
                    request_id: request.id,
                    decision
                  }
                );

                await loadMyFoursomes();

                if (message) {
                  message.textContent =
                    decision === "approved"
                      ? "Golfer approved successfully."
                      : "Join request declined.";
                }
              } catch (error) {
                buttons.forEach(item => {
                  item.disabled = false;
                });

                button.textContent = label;

                if (message) {
                  message.textContent =
                    error.message || "Unable to process request.";
                }
              }
            });

            actions.append(button);
          }

          requestBox.append(actions);
          card.append(requestBox);
        }

        // gallaspy-cancel-management-v1
        const roundStatus = String(
          round.status || "unknown"
        ).toLowerCase();

        card.append(
          element(
            "p",
            "ROUND STATUS: " + roundStatus.toUpperCase(),
            "foursome-round-status"
          )
        );

        // The server endpoint must be deployed and
        // verified BEFORE this client flag is enabled.
        const cancellationEnabled =
          window.GALLASPY_ENABLE_ROUND_CANCEL === true;

        const mayCancel =
          roundStatus === "open" ||
          roundStatus === "full";

        if (cancellationEnabled && mayCancel) {
          const cancelButton = element(
            "button",
            "CANCEL ROUND",
            "foursome-cancel-round"
          );

          cancelButton.type = "button";

          cancelButton.addEventListener(
            "click",
            async () => {
              const confirmed = window.confirm(
                "Cancel this round? This cannot be undone. " +
                "Gallaspy does not yet send automatic cancellation " +
                "notices. You must notify any confirmed or " +
                "pending players yourself."
              );

              if (!confirmed) return;

              cancelButton.disabled = true;
              cancelButton.textContent = "CANCELLING...";

              try {
                if (!window.gallaspyAuth?.foursomeRequest) {
                  throw new Error(
                    "Sign-in service is unavailable."
                  );
                }

                const result =
                  await window.gallaspyAuth.foursomeRequest(
                    "/cancel",
                    "POST",
                    { foursome_id: round.id }
                  );

                if (result?.success !== true) {
                  throw new Error(
                    "Unable to confirm cancellation."
                  );
                }

                await loadMyFoursomes();

                if (message) {
                  message.textContent =
                    "Round cancelled. Please notify the " +
                    "other golfers directly.";
                }
              } catch (error) {
                cancelButton.disabled = false;
                cancelButton.textContent =
                  "CANCEL ROUND";

                if (message) {
                  message.textContent =
                    error?.message ||
                    "Unable to cancel the round.";
                }
              }
            }
          );

          card.append(cancelButton);
        }

        myRounds.append(card);
      }

      myRounds.append(
        element("h4", "ROUNDS YOU'VE REQUESTED")
      );

      const joined = Array.isArray(result.joined)
        ? result.joined
        : [];

      if (!joined.length) {
        myRounds.append(
          element(
            "p",
            "You haven't requested any upcoming rounds yet."
          ),
          makeEmptyAction(
            "FIND AVAILABLE ROUNDS →",
            tabs.find
          )
        );
      }

      for (const request of joined) {
        const round = request.round;
        if (!round) continue;

        const card = element("article", undefined, "foursome-card");

        card.append(
          element("h4", round.course_name),
          element("p", formatDate(round.round_date)),
          element("p", "TEE TIME: " + formatTime(round.tee_time)),
          element(
            "span",
            "REQUEST: " + String(request.status).toUpperCase(),
            "foursome-spots"
          )
        );

        myRounds.append(card);
      }
    } catch (error) {
      myRounds.replaceChildren(
        element(
          "p",
          error.message || "Unable to load your rounds."
        )
      );

      const retry = element("button", "TRY AGAIN");
      retry.type = "button";
      retry.addEventListener("click", loadMyFoursomes);
      myRounds.append(retry);
    }
  }

  tabs.mine.addEventListener("click", loadMyFoursomes);



  showPanel("find");
  void loadFoursomes();
})();
