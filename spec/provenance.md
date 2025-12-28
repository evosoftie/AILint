AILint Provenance Specification (v1.0)
1. Purpose

This specification defines a standard, explicit, machine-readable way to declare AI involvement in content.

The goal is not attribution, enforcement, or monitoring, but transparent provenance signaling so that downstream systems—human or automated—can reason correctly about content origin and handling.

2. Scope

This specification applies to:

Source code

Documentation

Configuration

Structured or unstructured text

Generated or AI-assisted artifacts

It does not:

Attempt to prove authorship

Attempt to infer intent

Replace legal or contractual attribution

Mandate monitoring or telemetry

3. Core Principle

Explicit declaration always supersedes inference.

If valid provenance metadata is present, no heuristic or probabilistic analysis should override it.

4. Provenance Statement (Normative)

A Provenance Statement is a declarative record asserting whether and how AI systems contributed to the content.

4.1 Required Fields
{
  "ai_involved": true,
  "role": "generated"
}

Field Definitions
Field	Type	Description
ai_involved	boolean	Indicates whether AI systems contributed to the content
role	enum	Nature of AI involvement
4.2 Role Enumeration (Normative)

Valid values for role:

generated – content produced primarily by an AI system

assisted – AI used for drafting, suggestions, or partial output

edited – AI used to modify or refine existing human content

summarized – AI used to condense or abstract content

translated – AI used to translate content between languages

reviewed – AI used for analysis, linting, or feedback only

5. Optional Fields (Non-Normative but Recommended)
{
  "confidence": 0.85,
  "reference": "prov-2025-01-001"
}

Field	Type	Description
confidence	number (0–1)	Self-reported confidence in declaration accuracy
reference	string	Pointer to extended provenance metadata

Notes:

confidence is informational only.

Absence of optional fields does not invalidate the statement.

6. Transport Mechanisms

The Provenance Statement may be transported using one or more of the following mechanisms.

6.1 Inline Declaration (Preferred for Readability)

Examples:

Source code comment

Markdown frontmatter

Header block

Example (Markdown frontmatter):

ai_provenance:
  ai_involved: true
  role: assisted

6.2 Git Metadata (Highly Robust)

Example Git trailer:

AILint-Provenance: ai_involved=true; role=generated; ref=prov-2025-01-001

6.3 Sidecar Manifest (Authoritative Source)

Example file:

.ailint/provenance.jsonl


Each entry binds:

content hash

file path

provenance statement

optional metadata

optional cryptographic signature

This manifest is the recommended system of record.

6.4 Embedded / Invisible Markers (Optional)

Invisible or steganographic markers:

MAY be used as transport carriers

MUST NOT be the sole source of truth

MUST be removable without semantic loss

Invisible markers are non-authoritative and non-normative.

7. Precedence Rules

When multiple provenance signals exist:

Sidecar manifest

Git metadata

Inline declaration

Embedded marker

Heuristic inference (fallback only)

8. Validity Requirements

A Provenance Statement is considered valid if:

Required fields are present

Values conform to the defined schema

Transport format preserves semantic meaning

No cryptographic signing is required for validity, but it is recommended for trust.

9. Privacy and Ethics Considerations

This specification:

Prohibits behavioral telemetry requirements

Does not encode personal identifiers

Avoids surveillance or performance monitoring implications

Provenance is content-centric, not person-centric.

10. Compatibility and Forward Evolution

Unknown fields MUST be ignored

Unknown roles SHOULD be treated as assisted

Backward compatibility MUST be preserved

Future versions may extend:

role taxonomy

trust assertions

cryptographic binding methods

11. Non-Goals (Explicit)

This specification does not:

Detect AI usage

Enforce disclosure

Judge content quality

Establish copyright ownership

12. Summary

AILint Provenance is a voluntary, explicit signal of AI involvement—designed for clarity, interoperability, and trust.
