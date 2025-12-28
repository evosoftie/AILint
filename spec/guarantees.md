AILint Guarantees and Non-Guarantees (v1.0)
1. Purpose

This document defines what AILint explicitly guarantees — and what it explicitly does not guarantee.

This clarity is essential to prevent:

misuse,

over-interpretation,

legal or ethical ambiguity.

2. Guarantees (Normative)

AILint guarantees the following only when explicit provenance is present.

2.1 Declaration Fidelity

If a valid AILint Provenance Statement exists, AILint guarantees that:

the declaration is preserved as-is,

no heuristic logic overrides it,

no inference contradicts it.

2.2 Interpretation Stability

Given the same provenance input:

AILint MUST produce consistent interpretation

Results MUST NOT vary by environment or user

2.3 Non-Surveillance Guarantee

AILint guarantees that:

no behavioral monitoring is required by the spec

no typing, timing, or productivity metrics are mandated

provenance is content-centric, not person-centric

2.4 Loss Safety

AILint guarantees that:

removing markers does not alter content meaning

missing provenance is treated as unknown, not false

2.5 Forward Compatibility

AILint guarantees that:

unknown fields are ignored safely

older provenance remains valid in newer versions

3. Non-Guarantees (Explicit)

AILint explicitly does not guarantee:

## 3.1 Authorship or Ownership

AILint does not:

assert legal authorship

establish copyright ownership

replace attribution requirements

## 3.2 Detection Accuracy

AILint does not guarantee:

accurate detection of undeclared AI usage

absence of false positives or negatives

identification of specific models or tools

Inference is always best-effort.

## 3.3 Intent or Responsibility

AILint does not:

infer intent

assign responsibility

evaluate ethics or compliance

## 3.4 Content Quality

AILint does not:

judge correctness

assess safety

validate factual accuracy

## 3.5 Non-Aggregation for Personnel Evaluation

AILint guarantees that:

**The specification does NOT support aggregation for personnel evaluation**

What this means:
- Tools SHOULD NOT aggregate provenance at developer level
- HR or performance monitoring is out of scope
- Reporting focuses on repository/module scope, not individuals

**Acknowledgment:**
We cannot technically prevent misuse, but we establish the normative boundary:

**Aggregating provenance data for performance reviews or hiring decisions is contrary to AILint's purpose.**

Organizations should establish policies prohibiting such use.

4. Heuristic Interpretation Disclaimer

When explicit provenance is absent:

heuristic analysis MAY be used

results MUST be labeled probabilistic

confidence MUST be surfaced

conclusions MUST be non-binding

5. Legal and Organizational Boundary

AILint is:

a technical signaling system

not a policy enforcement engine

not a compliance framework

Organizations adopting AILint:

remain responsible for governance

MUST NOT treat AILint output as sole evidence

6. Summary

AILint provides clarity, not certainty.
Signals, not verdicts.
Provenance, not policing.
