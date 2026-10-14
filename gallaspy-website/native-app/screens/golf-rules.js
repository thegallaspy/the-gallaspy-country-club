(() => {
  "use strict";

  const root = document.getElementById("gallaspyRulesContent");
  const search = document.getElementById("gallaspyRulesSearch");
  const results = document.getElementById("gallaspyRulesResults");
  const status = document.getElementById("gallaspyRulesStatus");

  if (!root || !search || !results || !status) return;

  const rules = window.GallaspyGolfRules;

  if (!Array.isArray(rules)) {
    status.textContent = "Golf Rules are temporarily unavailable.";
    return;
  }

  const buttons = [
    ...root.querySelectorAll("[data-rules-category]")
  ];

  let activeCategory = "all";

  function createRuleCard(rule) {
    const card = document.createElement("details");
    card.className = "gallaspy-rule-card";

    const summary = document.createElement("summary");
    const title = document.createElement("strong");
    title.textContent = rule.title;

    const question = document.createElement("span");
    question.textContent = rule.question;

    summary.append(title, question);

    const body = document.createElement("div");
    body.className = "gallaspy-rule-body";

    const answer = document.createElement("p");
    answer.textContent = rule.answer;

    const reference = document.createElement("p");
    reference.className = "gallaspy-rule-reference";
    reference.textContent = `OFFICIAL REFERENCE: ${rule.reference}`;

    body.append(answer, reference);
    card.append(summary, body);
    return card;
  }

  function render() {
    const query = search.value.trim().toLowerCase();

    const matches = rules.filter(rule => {
      const categoryMatches =
        activeCategory === "all" ||
        rule.category === activeCategory;

      const searchable = [
        rule.title,
        rule.question,
        rule.answer,
        rule.reference,
        rule.keywords
      ].join(" ").toLowerCase();

      return categoryMatches &&
        (!query || searchable.includes(query));
    });

    for (const button of buttons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.rulesCategory === activeCategory)
      );
    }

    results.replaceChildren();

    if (matches.length === 0) {
      status.textContent =
        "No matching rules found. Try another keyword or category.";
      return;
    }

    status.textContent =
      `${matches.length} ${matches.length === 1 ? "rule" : "rules"} found.`;

    const fragment = document.createDocumentFragment();

    for (const rule of matches) {
      fragment.appendChild(createRuleCard(rule));
    }

    results.appendChild(fragment);
  }

  search.addEventListener("input", render);

  root.addEventListener("click", event => {
    const button = event.target.closest("[data-rules-category]");

    if (!button || !root.contains(button)) return;

    activeCategory = button.dataset.rulesCategory;
    render();
  });

  render();
})();
