# Working with Claude on AILint

This document explains how to effectively work with Claude (Anthropic's AI assistant) when contributing to or extending AILint. It serves as both a guide for human contributors and context for Claude itself.

## Project Context

AILint addresses a critical infrastructure gap in AI-assisted development: **code provenance tracking**. As AI coding assistants become ubiquitous, we're creating a feedback loop where:

1. AI generates code
2. That code gets committed to repositories
3. Future AI models train on that code
4. Quality degrades (model collapse)

This is the "Irish motorway problem" - building infrastructure without planning for future needs, then having to retrofit at 10x the cost.

## Core Philosophy

When working on AILint, remember:

### 1. Privacy First
We're building a transparency tool, not a surveillance system. Every design decision must consider:
- Can this be abused for employee monitoring?
- Does data stay local by default?
- Can developers opt out where appropriate?

### 2. Forensic Over Declarative
We **cannot** rely on developers honestly declaring AI use because:
- Imposter syndrome / job security fears
- Performance review concerns
- Simply forgetting what was AI-assisted
- Competitive pressures

Therefore: detect rather than ask, classify as "potentially AI influenced" rather than making definitive claims.

### 3. Standards Over Solutions
The goal isn't just "a tool that works" - it's creating infrastructure that becomes industry standard. Design for:
- Interoperability with other tools
- Extensibility for future detection methods
- Clear metadata formats others can implement
- Open standards over proprietary formats

## Technical Architecture

### Detection Pipeline
```
Editor Events → Local Analysis → Metadata → Git Storage
     ↓              ↓              ↓           ↓
 (typing,      (heuristics,   (JSON,      (notes,
  paste,        patterns,     scores,     attributes,
  timing)       ML models)    metadata)   hooks)
```

**Key Constraint**: No code content leaves the local machine during analysis.

### Heuristic Categories

When Claude helps develop detection algorithms, focus on:

1. **Behavioral Patterns**
   - Typing velocity anomalies
   - Large paste events
   - Commit timing (3am perfect commits are suspicious)
   - Edit patterns (AI tends toward complete rewrites)

2. **Code Fingerprints**
   - Comment style and density
   - Variable naming conventions
   - Documentation completeness
   - Error handling patterns
   - Boilerplate structure

3. **Metadata Correlation**
   - Known AI tool telemetry
   - Cross-reference with training data patterns
   - Git blame granularity
   - Commit message linguistic analysis

### Marker Implementation

For embedded markers, the design principles:

**Unicode Steganography:**
```python
# Example: Embed model metadata in zero-width characters
def embed_marker(code: str, metadata: dict) -> str:
    """
    Insert zero-width Unicode characters encoding:
    - Model type (GPT-4, Claude, Copilot, etc.)
    - Timestamp
    - Confidence score
    """
    marker = encode_to_zwc(metadata)
    # Insert after first comment or at file start
    return inject_marker(code, marker)
```

**Requirements:**
- Non-breaking: must not affect code execution
- Parseable: tools can extract metadata
- Removable: developers can strip if needed (but default is preserve)
- Format-agnostic: works across languages

## Common Pitfalls

### False Positives
**Problem**: Experienced developers writing clean code quickly look like AI.

**Mitigation**:
- Multi-factor analysis (never rely on single indicator)
- Confidence scores rather than binary classification
- Calibration period to learn developer baseline
- Whitelisting for known-good patterns

### Evasion
**Problem**: Developers deliberately writing messier code to avoid detection.

**Mitigation**:
- Make evasion require more effort than honest marking
- Focus on hard-to-fake patterns (structural, not stylistic)
- Audit trail even for evasion attempts
- Culture shift: marking becomes expected, like signing commits

### Performance
**Problem**: Analysis can't slow down commits significantly.

**Mitigation**:
- Async analysis where possible
- Caching of results
- Progressive detail (quick scan, deep analysis on demand)
- Configurable depth vs. speed tradeoff

## Prompting Claude for AILint Work

### Effective Patterns

**For Detection Algorithms:**
```
"Design a heuristic to detect [specific AI pattern] in [language] code.
Requirements:
- Low false positive rate (<5%)
- Computationally cheap (must run on commit)
- Resistant to simple evasion
Consider: [context about how AI generates this pattern]"
```

**For Integration Code:**
```
"Implement a [VS Code/Git/Azure DevOps] integration that:
1. Hooks into [specific event]
2. Analyzes [specific aspect]
3. Stores results as [format]
Privacy constraint: no code content leaves local machine"
```

**For Standards Design:**
```
"Design a metadata format for AI provenance that:
- Works across version control systems
- Doesn't break existing tools
- Allows future extension
- Can be implemented by other tools
Provide JSON schema and examples"
```

### What Claude Knows About This Project

Claude has context about:
- The motorway analogy and why timing matters
- Detection vs. declaration approach
- Privacy-first architecture
- Multi-platform goals (Microsoft stack initially, broader later)
- Open source strategy for standard creation

Claude should reference this context when helping, rather than explaining it back.

## Development Workflow

### When Adding Features

1. **Check privacy implications**: Does this require data to leave the machine?
2. **Consider evasion**: Can developers easily bypass this?
3. **Test false positive rate**: Run against known-human code
4. **Document heuristic**: Why does this pattern indicate AI?
5. **Make configurable**: Different teams have different risk tolerance

### When Reviewing PRs

Key questions:
- Does this maintain privacy guarantees?
- Could this be used for employee surveillance?
- Is the detection logic explainable?
- Does it integrate with existing tools?
- Is the metadata format documented?

## Testing Strategy

### Ground Truth Datasets

We need labeled data:
- **Known human code**: commits from pre-AI era (before 2020)
- **Known AI code**: synthetic test sets from various models
- **Hybrid code**: realistic human + AI collaboration

### Validation Metrics

- **Precision**: Of flagged commits, how many were actually AI-assisted?
- **Recall**: Of AI-assisted commits, how many did we catch?
- **F1 Score**: Balance of both
- **Adversarial robustness**: How well do we handle evasion attempts?

## Future Directions

Areas where Claude can help:

### Machine Learning Integration
As we accumulate data, we can train models to:
- Identify new AI signature patterns
- Distinguish between different AI tools
- Predict likelihood scores more accurately

Privacy constraint: training must happen on anonymized aggregated patterns, never on raw code.

### Standards Advocacy
Help draft:
- IETF RFC for AI provenance metadata
- W3C standard for embedded markers
- Industry best practices documentation

### Ecosystem Integration
Design APIs for:
- Code review tools (prioritize high-AI-score commits)
- Security scanners (flag supply chain risks)
- Compliance systems (generate audit reports)

## Questions to Ask Claude

When stuck or designing new features:

1. "How could this be abused for surveillance, and how do we prevent it?"
2. "What's the simplest implementation that still works?"
3. "How would a motivated developer evade this, and how do we make that harder?"
4. "What existing standards or tools can we build on?"
5. "How does this help the 'Bronze Age transition' for AI tooling?"

## Contributing Context

When Claude helps write documentation or code for AILint, it should:
- Assume reader familiarity with the core problem
- Focus on implementation details, not philosophical justification
- Prioritize privacy and interoperability
- Use concrete examples from Microsoft stack (but design for portability)
- Reference the motorway analogy sparingly (it's in README, don't repeat)

## Meta-Note

This document itself demonstrates AILint's philosophy: **explicit marking** of AI assistance. It was co-authored with Claude, and that fact is openly stated rather than hidden. As AILint develops, we should maintain this transparency about our own AI usage.

---

*Last updated: 2024-12-28*
*This document will evolve as the project matures. Contributions welcome.*
