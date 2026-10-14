(() => {
  "use strict";

  const button = document.getElementById("caddieAskButton");
  const distance = document.getElementById("caddieDistance");
  const lie = document.getElementById("caddieLie");
  const wind = document.getElementById("caddieWind");
  const question = document.getElementById("caddieQuestion");
  const status = document.getElementById("caddieStatus");
  const response = document.getElementById("caddieResponse");
  const answer = document.getElementById("caddieAnswer");

  if (!button || !distance || !lie || !wind ||
      !question || !status || !response || !answer) {
    console.error("AI Caddie screen elements are missing.");
    return;
  }

  button.disabled = false;
  status.textContent = "Enter your shot details to get advice.";

  button.addEventListener("click", async () => {
    if (button.disabled) return;

    const yards = Number(distance.value);

    if (!distance.value.trim() ||
        !Number.isFinite(yards) ||
        yards < 1 || yards > 600) {
      status.textContent = "Enter a distance between 1 and 600 yards.";
      distance.focus();
      return;
    }

    if (!window.gallaspyAuth?.aiCaddieRequest) {
      status.textContent = "AI Caddie is not ready. Please try again.";
      return;
    }

    button.disabled = true;
    button.textContent = "THINKING...";
    status.textContent = "Your caddie is reviewing the shot.";
    response.hidden = true;
    answer.textContent = "";

    try {
      const result = await window.gallaspyAuth.aiCaddieRequest({
        distance: yards,
        lie: lie.value,
        wind: wind.value,
        question: question.value.trim(),
      });

      answer.textContent = result.advice;
      response.hidden = false;
      status.textContent = "Your recommendation is ready.";
    } catch (error) {
      status.textContent =
        error instanceof Error
          ? error.message
          : "Unable to reach AI Caddie.";
    } finally {
      button.disabled = false;
      button.textContent = "ASK AI CADDIE →";
    }
  });
})();
