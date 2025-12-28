# AILint Integrity Heuristics (v1.0)

## 1. Purpose

Integrity heuristics help maintain accurate provenance over time by:
- Detecting drift between declared provenance and current content
- Suggesting missing declarations (non-coercively)
- Flagging areas for review prioritization

**Critical distinction:**
- These are **advisory tools**, not detection systems
- They **suggest**, not enforce
- They **maintain hygiene**, not catch violations

## 2. Scope

Integrity heuristics operate when:
- Explicit provenance exists (checking accuracy)
- Content matches AI patterns (suggesting declaration)
- Risk factors combine (prioritizing review)

They do NOT:
- Override explicit declarations
- Make definitive claims
- Enable surveillance

## 3. Heuristic Types

### 3.1 Provenance Drift Detection

**Purpose:** Alert when content has materially changed since provenance was declared

**Example:**File: auth.py
Last provenance: role=generated (commit abc123, 3 weeks ago)
Current state: 45% edit distance from that version
Advisory: "Content has diverged significantly; consider updating role to 'edited'"

**Implementation:**
- Compare `content_hash` from last provenance to current hash
- Calculate edit distance if mismatch
- Threshold: >40% change suggests role update

**Output:**
- Non-blocking advisory
- Suggests action, doesn't require it
- Can be dismissed

### 3.2 Missing Declaration Nudge

**Purpose:** Suggest provenance when content has AI-typical patterns but lacks metadata

**Critical constraint:**
This MUST NEVER claim "this is AI" - only suggest "if AI was used, consider declaring"

**Example:**File: utils.ts
Provenance: None
Pattern confidence: 0.82
Advisory: "This content matches patterns commonly produced by AI systems.
If AI assistance was used, consider adding provenance."

**UX Requirements:**
- Non-intrusive (tooltip, not modal)
- "Remind me later" option
- One-click template to add declaration
- Permanently dismissible per-file

### 3.3 Risk-Aware Review Prioritization

**Purpose:** Flag combinations of AI provenance + risk factors for elevated review

**Example:**File: payment.py
Provenance: role=generated, tool=gpt-4
Risk factors:

Security-sensitive context
Introduces crypto library (hallucination-prone domain)
No test coverage
Advisory: "AI-generated code in high-consequence area; prioritize review"


**Risk factor categories:**
- Domain-specific (crypto, date/time, regex, SQL)
- Context-sensitive (security, financial, PII)
- Coverage gaps (no tests, no peer review)

## 4. Configuration

All heuristics MUST be configurable:
```json{
"drift_detection": {
"enabled": true,
"threshold": 0.4,
"prompt_style": "advisory"  // or "warning" or "silent"
},
"missing_declaration_nudge": {
"enabled": true,
"confidence_threshold": 0.7,
"dismissible": true
},
"review_prioritization": {
"enabled": true,
"risk_domains": ["crypto", "security", "financial"],
"require_tests": true
}
}

## 5. Non-Goals

These heuristics are NOT:
- Detection of undeclared AI usage (that's inference, not integrity)
- Quality assessment (we don't judge code quality)
- Performance monitoring (no developer-level metrics)
- Enforcement (no blocking actions)

## 6. Precedence

Integrity heuristics ALWAYS defer to explicit provenance:
- If valid provenance exists → heuristics check accuracy, not truth
- If no provenance exists → heuristics suggest, not claim

## 7. Summary

Integrity heuristics maintain hygiene, not compliance.
Advisory, not adversarial.
Suggestions, not suspicions.
