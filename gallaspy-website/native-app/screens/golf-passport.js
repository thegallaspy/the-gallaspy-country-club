(() => {
  "use strict";

  const KEY = "gallaspy-golf-rounds-v1";
  const $ = id => document.getElementById(id);

  const coursesEl = $("passportCourses");
  const roundsEl = $("passportRounds");
  const milestonesEl = $("passportMilestones");
  const courseList = $("passportCourseList");
  const badgeList = $("passportBadgeList");

  if (!coursesEl || !roundsEl || !milestonesEl ||
      !courseList || !badgeList) return;

  const milestones = [
    { count: 1, name: "FIRST FAIRWAY" },
    { count: 5, name: "COURSE EXPLORER" },
    { count: 10, name: "GALLASPY TRAVELER" },
    { count: 25, name: "COURSE COLLECTOR" }
  ];

  function getRounds() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]");

      if (!Array.isArray(data)) return [];

      return data.filter(round =>
        round &&
        typeof round.course === "string" &&
        round.course.trim() &&
        Array.isArray(round.scores) &&
        round.scores.length === 18 &&
        round.scores.every(score =>
          Number.isInteger(score) && score >= 1 && score <= 20
        )
      );
    } catch {
      return [];
    }
  }

  function render() {
    const rounds = getRounds();
    const courses = new Map();

    rounds.forEach(round => {
      const name = round.course.trim();
      const key = name.toLocaleLowerCase().replace(/\s+/g, " ");
      const existing = courses.get(key);

      if (!existing) {
        courses.set(key, {
          name,
          rounds: 1,
          lastDate: round.date || "",
          best: round.scores.reduce((a, b) => a + b, 0)
        });
      } else {
        existing.rounds += 1;
        const total = round.scores.reduce((a, b) => a + b, 0);
        existing.best = Math.min(existing.best, total);

        if (round.date && round.date > existing.lastDate) {
          existing.lastDate = round.date;
        }
      }
    });

    const collection = [...courses.values()].sort(
      (a, b) => b.lastDate.localeCompare(a.lastDate)
    );

    const unlocked = milestones.filter(
      milestone => collection.length >= milestone.count
    ).length;

    coursesEl.textContent = collection.length;
    roundsEl.textContent = rounds.length;
    milestonesEl.textContent = unlocked;

    courseList.replaceChildren();
    badgeList.replaceChildren();

    if (!collection.length) {
      const empty = document.createElement("p");
      empty.className = "passport-empty";
      empty.textContent =
        "Your passport is waiting. Complete your first 18-hole scorecard to earn a course stamp.";
      courseList.append(empty);
    }

    collection.forEach(course => {
      const item = document.createElement("div");
      item.className = "passport-course";

      const details = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = course.name;

      const meta = document.createElement("span");
      meta.textContent =
        course.rounds + (course.rounds === 1 ? " round" : " rounds") +
        " · Best " + course.best +
        (course.lastDate ? " · " + course.lastDate : "");

      details.append(name, meta);

      const stamp = document.createElement("div");
      stamp.className = "passport-stamp";
      stamp.textContent = "PLAYED";
      stamp.setAttribute("aria-label", "Course played");

      item.append(details, stamp);
      courseList.append(item);
    });

    milestones.forEach(milestone => {
      const achieved = collection.length >= milestone.count;
      const badge = document.createElement("div");

      badge.className =
        "passport-badge" + (achieved ? "" : " locked");

      const name = document.createElement("strong");
      name.textContent = milestone.name;

      const status = document.createElement("span");
      status.textContent = achieved
        ? "UNLOCKED"
        : milestone.count + " COURSES TO UNLOCK";

      badge.append(name, status);
      badgeList.append(badge);
    });
  }

  document.querySelector('[data-route="/my-gallaspy"]')
    ?.addEventListener("click", render);

  window.addEventListener("gallaspy:rounds-changed", render);
  window.addEventListener("pageshow", render);

  render();
})();
