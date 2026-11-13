const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const temp = fs.mkdtempSync(
  path.join(os.tmpdir(), "gallaspy-period-test-")
);

try {
  for (const name of [
    "standard-plan-policy",
    "standard-billing-v2",
    "standard-period-eligibility",
  ]) {
    const content = fs.readFileSync(
      path.join(root, "lib/membership", name + ".ts"),
      "utf8"
    );
    const output = ts.transpileModule(content, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
      fileName: name + ".ts",
    });
    fs.writeFileSync(
      path.join(temp, name + ".js"),
      output.outputText
    );
  }

  const { isEligibleStandardPaidPeriod: eligible } =
    require(path.join(temp, "standard-period-eligibility.js"));

  const now = Date.parse("2026-11-12T12:00:00Z");

  function valid(plan) {
    const monthly = plan === "monthly";
    return {
      plan,
      renewalAmountCents: monthly ? 10000 : 100000,
      renewalInterval: monthly ? "monthly" : "annual",
      currency: "USD",
      subscriptionStatus: "active",
      periodStart: "2026-11-01T00:00:00Z",
      periodEnd: monthly
        ? "2026-12-01T00:00:00Z"
        : "2027-11-01T00:00:00Z",
      paymentStatus: "completed",
      paymentAmountCents: monthly ? 10000 : 100000,
      paymentCurrency: "USD",
      paymentPeriodStart: "2026-11-01T00:00:00Z",
      paymentPeriodEnd: monthly
        ? "2026-12-01T00:00:00Z"
        : "2027-11-01T00:00:00Z",
    };
  }

  for (const plan of ["monthly", "annual"]) {
    const good = valid(plan);

    assert.equal(eligible(good, now), true);
    assert.equal(
      eligible({...good, subscriptionStatus: "canceled"}, now),
      true
    );

    const bad = [
      {renewalAmountCents: 999},
      {renewalInterval: plan === "monthly" ? "annual" : "monthly"},
      {subscriptionStatus: "pending"},
      {subscriptionStatus: "past_due"},
      {paymentStatus: "refunded"},
      {paymentAmountCents: 25000},
      {paymentCurrency: "EUR"},
      {paymentPeriodStart: "2026-10-01T00:00:00Z"},
      {paymentPeriodEnd: "2028-01-01T00:00:00Z"},
      {periodStart: "invalid"},
    ];

    for (const change of bad) {
      assert.equal(
        eligible({...good, ...change}, now),
        false,
        `${plan}: invalid eligibility accepted`
      );
    }

    assert.equal(
      eligible(good, Date.parse("2028-01-01T00:00:00Z")),
      false
    );
    assert.equal(
      eligible(good, Date.parse(good.periodEnd)),
      false
    );
  }

  console.log("PASS: Monthly paid-period eligibility.");
  console.log("PASS: Annual paid-period eligibility.");
  console.log("PASS: Canceled paid-period eligibility.");
  console.log("PASS: Incorrect billing and payment amounts rejected.");
  console.log("PASS: Unpaid/refunded membership periods rejected.");
  console.log("PASS: Invalid and expired periods rejected.");
  console.log("NO payment requests, database writes, or activation.");
} finally {
  fs.rmSync(temp, {recursive: true, force: true});
}
