# AILint

**Code provenance tracking for the AI era**

AILint is an open-source toolkit that brings transparency to AI-assisted development through automated detection and standardized marking of AI-generated content in your codebase.

## The Problem

We're building the highways of AI-assisted development without laying the pipes underneath. As AI coding assistants become ubiquitous:

- **Model collapse looms**: AI systems increasingly train on AI-generated code, creating degradation loops
- **Attribution is lost**: No way to trace which code came from humans vs. AI vs. which AI
- **Debugging becomes harder**: Understanding provenance matters when investigating bugs or security issues
- **Compliance is unclear**: Regulations are coming, but we have no infrastructure for them

Like Ireland's motorway system that had to be re-trenched for fiber optic cables, retrofitting AI transparency will cost far more than building it in from the start.

## Our Approach

AILint tackles this from two angles:

### 1. Forensic Detection
Since developers may hide or forget AI assistance, AILint analyzes commits for AI influence indicators:
- Behavioral patterns (typing speed, paste events, commit timing)
- Code fingerprints (structure, naming, documentation patterns)
- Metadata correlation (tool telemetry when available)

Results are classified as "potentially AI influenced" with confidence scores - non-accusatory, auditable, forward-compatible.

### 2. Standardized Markers
For those who want explicit marking, AILint implements embedded markers using:
- Unicode steganography (zero-width characters in text/code)
- Comment annotations in source files
- Git metadata and commit attributes

These markers encode: model type, version, timestamp, confidence - while remaining invisible to humans and non-breaking for existing tools.

## Components

### Extensions
- **VS Code Extension**: Real-time analysis during development
- **Visual Studio Extension**: Integration for .NET developers
- **Git Hooks**: Pre-commit analysis and metadata injection
- **Azure DevOps Plugin**: Branch policies and PR integration
- **GitHub Action**: Automated provenance checking in CI/CD

### Analysis Engine
- Local processing (privacy-first, no code leaves your machine)
- Pluggable heuristics for different AI patterns
- Machine learning on aggregated anonymized patterns
- Configurable thresholds for your risk tolerance

### Reporting
- Developer dashboard showing AI influence trends
- Compliance report generation
- Code review prioritization based on AI likelihood
- Historical analysis for debugging

## Why Open Source?

This problem requires **coordination**, not competition. We're open sourcing AILint because:

1. **Standards need adoption**: One company's internal tool doesn't create an industry standard
2. **Network effects**: More users = better detection algorithms
3. **Trust matters**: Transparency tools must themselves be transparent
4. **Time is short**: The window to "lay the pipes" is closing

## Getting Started
```bash
# Install VS Code extension (coming soon)
code --install-extension evosoft.ailint

# Or use Git hooks directly
git clone https://github.com/evosoftie/AILint
cd AILint
./install-hooks.sh
```

**Status**: Early development. We're building the MVP for VS Code + Git integration first.

## Roadmap

### Phase 1 (Current)
- [x] Core detection heuristics
- [ ] VS Code extension (basic)
- [ ] Git pre-commit hook
- [ ] JSON output format
- [ ] Documentation

### Phase 2
- [ ] Pattern library for known AI signatures
- [ ] Dashboard visualization
- [ ] Azure DevOps integration
- [ ] GitHub Action
- [ ] Configurable policies

### Phase 3
- [ ] Machine learning on accumulated patterns
- [ ] Visual Studio extension
- [ ] JetBrains plugin support
- [ ] API for custom integrations
- [ ] Compliance templates (SOC2, ISO, etc.)

## Privacy Guarantees

AILint is built privacy-first:

- ✅ All analysis happens **locally** on your machine
- ✅ No code content is sent anywhere
- ✅ Only anonymized patterns shared (opt-in for ML improvement)
- ✅ Clear data retention policies
- ✅ Opt-out for personal projects

This is a **transparency tool**, not a surveillance system.

## Contributing

We need help across:
- **Detection algorithms**: New heuristics for identifying AI patterns
- **IDE integrations**: Extending beyond VS Code
- **Documentation**: Clear guides for setup and calibration
- **Testing**: Real-world validation and false positive reduction
- **Standards**: Help define the metadata format

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Philosophy

We believe:
- **Transparency > Prohibition**: AI assistance isn't inherently bad, but opacity is dangerous
- **Standards > Surveillance**: Industry coordination beats individual monitoring
- **Prevention > Cure**: Building infrastructure now is cheaper than retrofitting later
- **Collaboration > Competition**: This problem requires collective action

## License

MIT License - we want maximum adoption and ecosystem growth.

## Supported By

Evo-Soft is implementing standardization techniques to improve AI integrity across text, code, and imaging. AILint is our contribution to preventing model collapse and maintaining code provenance in the AI era.

---

**"We're not in the Stone Age because we ran out of stones. We're in the AI Stone Age because we haven't yet built the Bronze."**

Let's build it together.
