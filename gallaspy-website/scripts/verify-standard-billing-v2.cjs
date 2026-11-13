const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const temp = fs.mkdtempSync(
  path.join(os.tmpdir(), "gallaspy-billing-test-")
);

try {
  const files = [
    "standard-plan-policy",
    "standard-billing-v2",
  ];

  for (const name of files) {
    const input = fs.readFileSync(
      path.join(root, "lib/membership", name + ".ts"),
      "utf8"
    );

    const output = ts.transpileModule(input, {
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

  const {
    getStandardBillingDetails,
    resolveStandardBillingDetails,
    matchesStandardBilling,
  } = require(path.join(temp, "standard-billing-v2.js"));

  const monthly = getStandardBillingDetails("monthly");
  const annual = getStandardBillingDetails("annual");

  assert.deepEqual(monthly, {
    plan: "monthly",
    initiationFeeCents: 25000,
    initialPaymentCents: 35000,
    renewalAmountCents: 10000,
    renewalInterval: "monthly",
    currency: "USD",
  });

  assert.deepEqual(annual, {
    plan: "annual",
    initiationFeeCents: 0,
    initialPaymentCents: 100000,
    renewalAmountCents: 100000,
    renewalInterval: "annual",
    currency: "USD",
  });

  for (const plan of ["monthly", "annual"]) {
    const details = getStandardBillingDetails(plan);

    assert.equal(
      matchesStandardBilling(plan, details),
      true
    );

    for (const field of [
      "initiationFeeCents",
      "initialPaymentCents",
      "renewalAmountCents",
    ]) {
      assert.equal(
        matchesStandardBilling(plan, {
          ...details,
          [field]: details[field] + 100,
        }),
        false,
        `${plan} accepted incorrect ${field}`
      );
    }

    assert.equal(
      matchesStandardBilling(plan, {
        ...details,
        renewalInterval:
          plan === "monthly" ? "annual" : "monthly",
      }),
      false
    );
  }

  assert.equal(
    resolveStandardBillingDetails("invalid"),
    null
  );

  assert.equal(
    matchesStandardBilling("annual", monthly),
    false
  );

  assert.equal(
    matchesStandardBilling("monthly", annual),
    false
  );

  console.log("PASS: Monthly pricing verified.");
  console.log("PASS: Annual pricing verified.");
  console.log("PASS: Incorrect initiation fees rejected.");
  console.log("PASS: Incorrect initial charges rejected.");
  console.log("PASS: Incorrect renewal charges rejected.");
  console.log("PASS: Incorrect billing intervals rejected.");
  console.log("PASS: Invalid and mismatched plans rejected.");
  console.log("NO payment requests or database changes.");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
