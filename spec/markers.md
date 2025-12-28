AILint Marker Specification (v1.0)
1. Purpose

Markers are transport mechanisms for carrying AI provenance signals alongside content.

They exist to:

preserve provenance across systems,

survive common transformations (copy, format, diff),

provide machine-readable hints without enforcing interpretation.

Markers do not define truth.
They only reference or carry provenance declarations.

2. Design Principles

Markers MUST be:

Non-semantic – removing a marker must not change meaning

Loss-tolerant – stripping a marker must not invalidate content

Non-covert – presence must be auditable by tooling

Non-authoritative – never the sole source of provenance truth

Markers SHOULD be:

Minimal

Stable across encodings

Easy to ignore safely

3. Marker Types

AILint defines four marker classes, ordered from most robust to most fragile.

3.1 Git Metadata Marker (Normative)

Format: Git trailer

AILint-Provenance: <reference>


Example:

AILint-Provenance: prov-2025-01-001


Properties:

Highly durable

Survives formatting and refactoring

Preferred for CI/CD and audits

Status: Recommended

3.2 Inline Comment Marker (Normative)

Used when human readability matters.

Examples:

// AILINT: ai_involved=true; role=assisted

<!-- AILINT: ai_involved=true; role=generated -->


Rules:

MUST be placed in comment-safe regions

MUST NOT affect execution or rendering

SHOULD be concise

Status: Recommended

3.3 Structured Header / Frontmatter Marker (Normative)

Example (YAML frontmatter):

ai_provenance:
  ai_involved: true
  role: summarized


Rules:

MUST follow host format conventions

MUST be parseable without executing content

Status: Recommended

3.4 Embedded / Invisible Marker (Optional, Non-Normative)

Examples:

Zero-width Unicode characters

Non-printing delimiters in comment whitespace

Rules:

MUST NOT encode full provenance data

MUST be removable without semantic loss

MUST NOT be the only provenance signal

SHOULD be detectable by linters

Status: Optional / Transport-only

4. Marker Payload Rules

Markers MAY contain:

A provenance reference ID

A minimal inline declaration

Markers MUST NOT contain:

Personal identifiers

Behavioral telemetry

Sensitive operational metadata

Enforcement or policy flags

5. Marker Precedence

Markers are interpreted only after authoritative provenance sources.

Precedence order:

Sidecar manifest

Git metadata

Inline / header markers

Embedded markers

6. Marker Loss and Degradation

Loss of a marker:

MUST NOT invalidate content

MUST NOT imply tampering

MAY reduce downstream confidence

AILint tooling SHOULD treat missing markers as:

“No explicit signal present,” not “signal denied.”

7. Security Considerations

Invisible markers MUST NOT form covert channels

Tooling SHOULD provide normalization and stripping options

Markers MUST NOT bypass content security reviews

8. Summary

Markers carry provenance. They do not define it.
