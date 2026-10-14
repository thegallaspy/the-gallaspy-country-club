(() => {
  "use strict";

  const STORAGE_KEY = "gallaspy-golf-rounds-v1";
  const DRAFT_KEY = "gallaspy-golf-draft-v1";
  const $ = id => document.getElementById(id);

  const start = $("playStartScorecard");
  const form = $("playScorecard");
  const holes = $("playHoleInputs");
  const course = $("playCourseName");
  const date = $("playRoundDate");
  const save = $("playSaveRound");
  const discard = $("playDiscardDraft");
  const message = $("playScoreMessage");
  const history = $("playRoundHistory");
  const roundLength = $("playRoundLength");
  let holeCount = 18;
  let selectedHole = 0;
  let selectedNine = 0;

  if (!start || !form || !holes || !course || !date || !save || !history) return;

  const pars = Array(18).fill(4);
  const strokes = Array(18).fill(null);

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function validScores(values, length = 18) {
    return Array.isArray(values) &&
      values.length === length &&
      values.every(n => Number.isInteger(n) && n >= 1 && n <= 20);
  }

  function validPars(values, length = 18) {
    return Array.isArray(values) &&
      values.length === length &&
      values.every(n => Number.isInteger(n) && n >= 3 && n <= 6);
  }

  function getRounds() {
    const value = readJSON(STORAGE_KEY, []);
    return Array.isArray(value)
      ? value.filter(r =>
          r && typeof r.course === "string" &&
          [9, 18].includes(r.holeCount ?? 18) &&
          validScores(r.scores, r.holeCount ?? 18) &&
          (!r.pars || validPars(r.pars, r.holeCount ?? 18))
        )
      : [];
  }

  function formatRelative(n) {
    if (n === null) return "—";
    return n > 0 ? `+${n}` : String(n);
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        course: course.value,
        date: date.value,
        holeCount,
        pars: pars.slice(0, holeCount),
        strokes: strokes.slice(0, holeCount)
      }));
    } catch {
      message.textContent = "Unable to save draft on this device.";
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  }

  function refreshTotals() {
    function segment(from, to, prefix) {
      const p = pars.slice(from, to);
      const s = strokes.slice(from, to);
      const entered = s.filter(Number.isInteger);
      const parSum = p.reduce((a, b) => a + b, 0);
      const strokeSum = entered.reduce((a, b) => a + b, 0);
      const complete = entered.length === to - from;
      const enteredPar = s.reduce(
        (sum, value, index) => sum + (Number.isInteger(value) ? p[index] : 0),
        0
      );

      $(prefix + "Par").textContent = parSum;
      $(prefix + "Total").textContent = entered.length ? strokeSum : "—";
      $(prefix + "Relative").textContent =
        entered.length ? formatRelative(strokeSum - enteredPar) : "—";

      return { parSum, strokeSum, complete, entered: entered.length };
    }

    const front = segment(0, 9, "playFront");
    const back = holeCount === 18
      ? segment(9, 18, "playBack")
      : { parSum: 0, strokeSum: 0, complete: true, entered: 0 };


    const count = front.entered + back.entered;
    const totalStrokes = front.strokeSum + back.strokeSum;
    const totalPar = front.parSum + back.parSum;

    $("playTotalPar").textContent = totalPar;
    $("playStrokeTotal").textContent = count ? totalStrokes : "—";

    const enteredPar = strokes.slice(0, holeCount).reduce(
      (sum, value, i) => sum + (Number.isInteger(value) ? pars[i] : 0),
      0
    );
    $("playTotalRelative").textContent =
      count ? formatRelative(totalStrokes - enteredPar) : "—";

    save.disabled = !(front.complete && back.complete);
  }

  function renderHoles() {
    holes.replaceChildren();

    const from = selectedNine * 9;
    const to = Math.min(from + 9, holeCount);

    for (const type of ["HOLE", "PAR", "SCORE"]) {
      const row = document.createElement("tr");
      row.className = "gallaspy-row-" + type.toLowerCase();

      const heading = document.createElement("th");
      heading.scope = "row";
      heading.textContent = type;
      row.append(heading);

      for (let i = from; i < to; i++) {
        const cell = document.createElement("td");

        if (type === "PAR") {
          const input = document.createElement("input");
          input.type = "number";
          input.min = "3";
          input.max = "6";
          input.inputMode = "numeric";
          input.value = String(pars[i]);
          input.setAttribute("aria-label", `Hole ${i + 1} par`);

          input.addEventListener("change", () => {
            const n = Number(input.value);
            if (Number.isInteger(n) && n >= 3 && n <= 6) {
              pars[i] = n;
              saveDraft();
              renderHoles();
            } else {
              input.value = String(pars[i]);
            }
          });

          cell.append(input);
        } else {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "gallaspy-hole-button";
          button.textContent = type === "HOLE"
            ? String(i + 1)
            : String(strokes[i] ?? "—");

          if (i === selectedHole) {
            button.classList.add("is-selected");
          }

          button.addEventListener("click", () => {
            selectedHole = i;
            renderHoles();
          });

          cell.append(button);
        }

        row.append(cell);
      }

      holes.append(row);
    }

    refreshTotals();
    updateScoreboard();
  }

  function updateRelative() {
    // Relative-to-par is displayed in the live scoreboard.
  }

  function selectHole(index) {
    if (index < 0 || index >= holeCount) return;

    selectedHole = index;
    selectedNine = Math.floor(index / 9);
    renderHoles();
    updateScoreboard();
  }

  function updateScoreboard() {
    const entered = strokes.slice(0, holeCount)
      .map((score, i) => ({ score, par: pars[i] }))
      .filter(item => Number.isInteger(item.score));

    const total = entered.reduce((sum, item) => sum + item.score, 0);
    const relative = entered.reduce(
      (sum, item) => sum + item.score - item.par, 0
    );

    $("scoreboardHoleProgress").textContent =
      `HOLE ${selectedHole + 1} OF ${holeCount}`;

    $("scoreboardStrokes").textContent =
      entered.length ? String(total) : "—";

    $("scoreboardToPar").textContent =
      entered.length ? formatRelative(relative) : "—";

    $("scoreboardCompleted").textContent =
      `${entered.length} / ${holeCount}`;

    $("scoreboardHoleLabel").textContent =
      `HOLE ${selectedHole + 1}`;

    $("scoreboardSelectedPar").textContent =
      String(pars[selectedHole]);

    $("scoreboardSelectedScore").textContent =
      strokes[selectedHole] ?? "—";

    const score = strokes[selectedHole];
    const result = $("scoreboardHoleResult");

    if (score === null) {
      result.textContent = "ENTER YOUR STROKES";
    } else {
      const diff = score - pars[selectedHole];
      result.textContent =
        diff <= -4 ? "CONDOR" :
        diff === -3 ? "ALBATROSS" :
        diff === -2 ? "EAGLE" :
        diff === -1 ? "BIRDIE" :
        diff === 0 ? "PAR" :
        diff === 1 ? "BOGEY" :
        diff === 2 ? "DOUBLE BOGEY" :
        diff === 3 ? "TRIPLE BOGEY" :
        `${formatRelative(diff)} TO PAR`;
    }

    $("scoreboardFrontNine").classList.toggle(
      "is-active", selectedNine === 0
    );

    $("scoreboardBackNine").classList.toggle(
      "is-active", selectedNine === 1
    );

    $("scoreboardBackNine").hidden = holeCount === 9;
    $("scoreboardPrevious").disabled = selectedHole === 0;
    $("scoreboardNext").disabled = selectedHole === holeCount - 1;
  }

  function adjustScore(change) {
    const current = strokes[selectedHole];

    const next = current === null
      ? Math.max(1, pars[selectedHole] + (change < 0 ? -1 : 0))
      : current + change <= 0
        ? null
        : Math.min(20, current + change);

    strokes[selectedHole] = next;

    saveDraft();
    renderHoles();
    updateScoreboard();
  }

  $("scoreboardMinus").addEventListener(
    "click", () => adjustScore(-1)
  );

  $("scoreboardPlus").addEventListener(
    "click", () => adjustScore(1)
  );

  $("scoreboardPrevious").addEventListener(
    "click", () => selectHole(selectedHole - 1)
  );

  $("scoreboardNext").addEventListener(
    "click", () => selectHole(selectedHole + 1)
  );

  $("scoreboardFrontNine").addEventListener(
    "click", () => selectHole(0)
  );

  $("scoreboardBackNine").addEventListener("click", () => {
    if (holeCount === 18) selectHole(9);
  });

  function updateStats() {
    const rounds = getRounds();
    // Compare like-for-like rounds: best and average use 18 holes only.
    const scores = rounds
      .filter(r => (r.holeCount ?? 18) === 18)
      .map(r => r.total)
      .filter(Number.isFinite);
    $("playRoundsCount").textContent = rounds.length;
    $("playBestScore").textContent =
      scores.length ? Math.min(...scores) : "—";
    $("playAverageScore").textContent =
      scores.length
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
        : "—";
  }

  function renderHistory() {
    history.replaceChildren();
    const rounds = getRounds().slice().reverse();

    if (!rounds.length) {
      const empty = document.createElement("p");
      empty.textContent = "No completed rounds yet.";
      history.append(empty);
      return;
    }

    rounds.forEach(round => {
      const item = document.createElement("article");
      item.className = "play-history-item";

      const details = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = round.course;
      const dateText = document.createElement("span");
      dateText.textContent = round.date || "Date not recorded";
      const lengthText = document.createElement("span");
      lengthText.textContent = `${round.holeCount ?? 18} HOLES`;
      details.append(name, dateText, lengthText);

      const result = document.createElement("div");
      result.className = "play-history-result";
      const score = document.createElement("strong");
      score.textContent = String(round.total);
      const par = document.createElement("span");
      const parTotal = (round.pars || Array(round.holeCount ?? 18).fill(4))
        .reduce((a, b) => a + b, 0);
      par.textContent = formatRelative(round.total - parTotal);
      result.append(score, par);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "play-delete";
      remove.textContent = "DELETE";
      remove.setAttribute("aria-label", `Delete round at ${round.course}`);
      remove.addEventListener("click", () => {
        if (!confirm(`Delete your round at ${round.course}?`)) return;
        const stored = getRounds();
        const index = stored.findIndex(r => r.id === round.id);
        if (index < 0) return;
        stored.splice(index, 1);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
          window.dispatchEvent(new Event("gallaspy:rounds-changed"));
          updateStats();
          renderHistory();
        } catch {
          message.textContent = "Unable to delete round.";
        }
      });

      const viewer = document.createElement("details");
      viewer.className = "gallaspy-history-scorecard";

      const toggle = document.createElement("summary");
      toggle.textContent = "VIEW SCORECARD →";

      const content = document.createElement("div");
      content.className = "gallaspy-history-scorecard-content";

      const length = round.holeCount ?? 18;
      const roundPars = round.pars || Array(length).fill(4);
      const roundScores = round.scores;

      function addNine(label, from, to) {
        const section = document.createElement("section");
        section.className = "gallaspy-history-nine";

        const heading = document.createElement("h4");
        heading.textContent = label;
        section.append(heading);

        const scroll = document.createElement("div");
        scroll.className = "gallaspy-history-scroll";

        const table = document.createElement("table");
        table.className = "gallaspy-history-table";

        const tbody = document.createElement("tbody");

        for (const [title, values] of [
          ["HOLE", Array.from({length: to - from}, (_, i) => from + i + 1)],
          ["PAR", roundPars.slice(from, to)],
          ["SCORE", roundScores.slice(from, to)]
        ]) {
          const row = document.createElement("tr");
          const th = document.createElement("th");
          th.textContent = title;
          row.append(th);

          values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = String(value);
            row.append(cell);
          });

          tbody.append(row);
        }

        table.append(tbody);
        scroll.append(table);
        section.append(scroll);

        const parTotal = roundPars.slice(from, to)
          .reduce((a, b) => a + b, 0);

        const scoreTotal = roundScores.slice(from, to)
          .reduce((a, b) => a + b, 0);

        const subtotal = document.createElement("p");
        subtotal.className = "gallaspy-history-subtotal";
        subtotal.textContent =
          `${label}: ${scoreTotal} STROKES · ${formatRelative(scoreTotal - parTotal)}`;

        section.append(subtotal);
        content.append(section);
      }

      addNine("FRONT 9", 0, 9);

      if (length === 18) {
        addNine("BACK 9", 9, 18);
      }

      const total = document.createElement("div");
      total.className = "gallaspy-history-final";
      total.textContent =
        `ROUND TOTAL: ${round.total} · ${formatRelative(round.total - parTotal)}`;

      content.append(total);
      viewer.append(toggle, content);

      item.append(details, result, viewer, remove);
      history.append(item);
    });
  }

  function resetForm() {
    course.value = "";
    date.value = new Date().toLocaleDateString("en-CA");
    holeCount = 18;
    selectedHole = 0;
    selectedNine = 0;
    roundLength.value = "18";
    pars.fill(4);
    strokes.fill(null);
    message.textContent = "";
    renderHoles();
  }

  const draft = readJSON(DRAFT_KEY, null);
  if (draft && typeof draft === "object") {
    holeCount = draft.holeCount === 9 ? 9 : 18;
    roundLength.value = String(holeCount);
    course.value = typeof draft.course === "string" ? draft.course : "";
    date.value = typeof draft.date === "string" ? draft.date : "";
    if (validPars(draft.pars, holeCount)) {
      draft.pars.forEach((n, i) => { pars[i] = n; });
    }
    if (Array.isArray(draft.strokes) &&
        draft.strokes.length === holeCount) {
      draft.strokes.forEach((n, i) => {
        strokes[i] = Number.isInteger(n) && n >= 1 && n <= 20 ? n : null;
      });
    }
  } else {
    date.value = new Date().toLocaleDateString("en-CA");
  }

  renderHoles();
  updateStats();
  renderHistory();

  roundLength.addEventListener("change", () => {
    const next = Number(roundLength.value);
    if (![9, 18].includes(next)) return;

    holeCount = next;
    selectedHole = 0;
    selectedNine = 0;
    renderHoles();
    saveDraft();
  });

  course.addEventListener("input", saveDraft);
  date.addEventListener("change", saveDraft);

  const continueButton = $("playContinueScorecard");
  const launch = $("playScorecardLaunch");

  function hasDraft() {
    const saved = readJSON(DRAFT_KEY, null);
    return saved !== null &&
      typeof saved === "object" &&
      !Array.isArray(saved);
  }

  function updateLaunch() {
    start.textContent = "START NEW ROUND →";
    if (continueButton) {
      continueButton.hidden = !hasDraft();
    }
  }

  function openScorecard() {
    form.hidden = false;
    if (launch) launch.hidden = true;

    const content = document.getElementById("nativeContent");
    if (content) {
      requestAnimationFrame(() => {
        const top = form.getBoundingClientRect().top
          - content.getBoundingClientRect().top
          + content.scrollTop - 16;

        content.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth"
        });
      });
    }
  }

  start.addEventListener("click", () => {
    if (hasDraft() &&
        !confirm("Start a new round? Your unfinished scorecard will be replaced.")) {
      return;
    }

    clearDraft();
    resetForm();
    updateScoreboard();
    openScorecard();
    saveDraft();
  });

  if (continueButton) {
    continueButton.addEventListener("click", () => {
      if (!hasDraft()) {
        updateLaunch();
        return;
      }
      openScorecard();
    });
  }

  discard.addEventListener("click", () => {
    if (!confirm("Discard the unfinished scorecard?")) return;
    clearDraft();
    resetForm();
    form.hidden = true;
    if (launch) launch.hidden = false;
    updateLaunch();
  });

  save.addEventListener("click", () => {
    const name = course.value.trim();
    if (!name) {
      message.textContent = "Enter the golf course name.";
      return;
    }
    if (!date.value) {
      message.textContent = "Choose the round date.";
      return;
    }
    if (!validScores(strokes.slice(0, holeCount), holeCount) ||
        !validPars(pars.slice(0, holeCount), holeCount)) {
      message.textContent =
        `Complete all ${holeCount} holes with valid scores.`;
      return;
    }

    const rounds = getRounds();
    const total = strokes.slice(0, holeCount)
      .reduce((a, b) => a + b, 0);

    rounds.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      course: name,
      date: date.value,
      pars: pars.slice(0, holeCount),
      scores: strokes.slice(0, holeCount),
      holeCount,
      total
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rounds));
      window.dispatchEvent(new Event("gallaspy:rounds-changed"));
    } catch {
      message.textContent = "Unable to save. Check device storage.";
      return;
    }

    clearDraft();
    resetForm();
    updateStats();
    renderHistory();
    form.hidden = true;
    if (launch) launch.hidden = false;
    updateLaunch();
    start.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  updateLaunch();
})();