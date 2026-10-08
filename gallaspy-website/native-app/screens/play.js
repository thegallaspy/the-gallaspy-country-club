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

  function validScores(values) {
    return Array.isArray(values) &&
      values.length === 18 &&
      values.every(n => Number.isInteger(n) && n >= 1 && n <= 20);
  }

  function validPars(values) {
    return Array.isArray(values) &&
      values.length === 18 &&
      values.every(n => Number.isInteger(n) && n >= 3 && n <= 6);
  }

  function getRounds() {
    const value = readJSON(STORAGE_KEY, []);
    return Array.isArray(value)
      ? value.filter(r =>
          r && typeof r.course === "string" &&
          validScores(r.scores) &&
          (!r.pars || validPars(r.pars))
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
        pars: [...pars],
        strokes: [...strokes]
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
    const back = segment(9, 18, "playBack");
    const count = front.entered + back.entered;
    const totalStrokes = front.strokeSum + back.strokeSum;
    const totalPar = front.parSum + back.parSum;

    $("playTotalPar").textContent = totalPar;
    $("playStrokeTotal").textContent = count ? totalStrokes : "—";

    const enteredPar = strokes.reduce(
      (sum, value, i) => sum + (Number.isInteger(value) ? pars[i] : 0),
      0
    );
    $("playTotalRelative").textContent =
      count ? formatRelative(totalStrokes - enteredPar) : "—";

    save.disabled = !(front.complete && back.complete);
  }

  function renderHoles() {
    holes.replaceChildren();

    for (let i = 0; i < 18; i++) {
      const row = document.createElement("tr");

      const holeCell = document.createElement("th");
      holeCell.scope = "row";
      holeCell.textContent = String(i + 1);

      const parCell = document.createElement("td");
      const parInput = document.createElement("input");
      parInput.type = "number";
      parInput.min = "3";
      parInput.max = "6";
      parInput.step = "1";
      parInput.inputMode = "numeric";
      parInput.value = String(pars[i]);
      parInput.setAttribute("aria-label", `Hole ${i + 1} par`);
      parInput.addEventListener("change", () => {
        const n = Number(parInput.value);
        if (!Number.isInteger(n) || n < 3 || n > 6) {
          parInput.value = String(pars[i]);
          return;
        }
        pars[i] = n;
        updateRelative();
        refreshTotals();
        saveDraft();
      });
      parCell.append(parInput);

      const strokeCell = document.createElement("td");
      const strokeInput = document.createElement("input");
      strokeInput.type = "number";
      strokeInput.min = "1";
      strokeInput.max = "20";
      strokeInput.step = "1";
      strokeInput.inputMode = "numeric";
      strokeInput.placeholder = "—";
      strokeInput.value = strokes[i] ?? "";
      strokeInput.setAttribute("aria-label", `Hole ${i + 1} strokes`);
      strokeInput.addEventListener("input", () => {
        const raw = strokeInput.value.trim();
        const n = Number(raw);
        strokes[i] = raw && Number.isInteger(n) && n >= 1 && n <= 20
          ? n
          : null;
        updateRelative();
        refreshTotals();
        saveDraft();
      });
      strokeCell.append(strokeInput);

      const relativeCell = document.createElement("td");
      relativeCell.className = "play-relative";
      relativeCell.dataset.hole = String(i);
      row.append(holeCell, parCell, strokeCell, relativeCell);
      holes.append(row);
    }

    updateRelative();
    refreshTotals();
  }

  function updateRelative() {
    holes.querySelectorAll(".play-relative").forEach(cell => {
      const i = Number(cell.dataset.hole);
      cell.textContent = strokes[i] === null
        ? "—"
        : formatRelative(strokes[i] - pars[i]);
    });
  }

  function updateStats() {
    const rounds = getRounds();
    const scores = rounds.map(r => r.total).filter(Number.isFinite);
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
      details.append(name, dateText);

      const result = document.createElement("div");
      result.className = "play-history-result";
      const score = document.createElement("strong");
      score.textContent = String(round.total);
      const par = document.createElement("span");
      const parTotal = (round.pars || Array(18).fill(4))
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
          updateStats();
          renderHistory();
        } catch {
          message.textContent = "Unable to delete round.";
        }
      });

      item.append(details, result, remove);
      history.append(item);
    });
  }

  function resetForm() {
    course.value = "";
    date.value = new Date().toLocaleDateString("en-CA");
    pars.fill(4);
    strokes.fill(null);
    message.textContent = "";
    renderHoles();
  }

  const draft = readJSON(DRAFT_KEY, null);
  if (draft && typeof draft === "object") {
    course.value = typeof draft.course === "string" ? draft.course : "";
    date.value = typeof draft.date === "string" ? draft.date : "";
    if (validPars(draft.pars)) {
      draft.pars.forEach((n, i) => { pars[i] = n; });
    }
    if (Array.isArray(draft.strokes) && draft.strokes.length === 18) {
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

  course.addEventListener("input", saveDraft);
  date.addEventListener("change", saveDraft);

  start.addEventListener("click", () => {
    form.hidden = false;
    start.textContent = "CONTINUE SCORECARD →";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  discard.addEventListener("click", () => {
    if (!confirm("Discard the unfinished scorecard?")) return;
    clearDraft();
    resetForm();
    form.hidden = true;
    start.textContent = "START A SCORECARD →";
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
    if (!validScores(strokes) || !validPars(pars)) {
      message.textContent = "Complete all 18 holes with valid scores.";
      return;
    }

    const rounds = getRounds();
    const total = strokes.reduce((a, b) => a + b, 0);

    rounds.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      course: name,
      date: date.value,
      pars: [...pars],
      scores: [...strokes],
      total
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rounds));
    } catch {
      message.textContent = "Unable to save. Check device storage.";
      return;
    }

    clearDraft();
    resetForm();
    updateStats();
    renderHistory();
    form.hidden = true;
    start.textContent = "START A SCORECARD →";
    start.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  if (draft) {
    start.textContent = "CONTINUE SCORECARD →";
  }
})();
