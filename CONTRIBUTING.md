# Contributing to AILint

Thanks for your interest in building the infrastructure for AI-transparent development! This guide will help you contribute effectively.

## Quick Start
```bash
# Fork and clone
git clone https://github.com/evosoftie/AILint
cd AILint

# Install dependencies
npm install  # for VS Code extension
pip install -r requirements.txt  # for analysis engine

# Run tests
npm test
pytest

# Create a branch
git checkout -b feature/your-feature-name
```

## Ways to Contribute

### 🔍 Detection Algorithms
Help improve our ability to identify AI-generated code patterns.

**What we need:**
- New heuristics for specific AI tools (Copilot, Claude, ChatGPT, etc.)
- Language-specific patterns (Python, C#, JavaScript, etc.)
- Adversarial testing (how to evade detection, so we can defend against it)

**How to contribute:**
1. Document the pattern you've observed
2. Implement detection logic in `/detection-engine/heuristics/`
3. Provide test cases (both true positives and false positives)
4. Measure precision/recall on test dataset

**Example:**
```python
# detection-engine/heuristics/copilot_comment_style.py
def detect_copilot_comment_pattern(code: str) -> float:
    """
    Copilot tends to generate comments with specific patterns:
    - Over-documentation of obvious code
    - Consistent triple-slash /// style in C#
    - "Helper function to..." phrasing
    
    Returns: confidence score 0.0-1.0
    """
    score = 0.0
    
    # Check for over-documentation
    if comment_to_code_ratio(code) > 0.4:
        score += 0.3
    
    # Check for characteristic phrases
    if re.search(r'Helper function to|Utility method for', code):
        score += 0.2
    
    # ... more checks
    
    return min(score, 1.0)
```

### 🔧 IDE Integration
Expand support beyond VS Code.

**Platforms we need:**
- Visual Studio (priority - Microsoft stack focus)
- JetBrains IDEs (IntelliJ, PyCharm, Rider)
- Vim/Neovim plugins
- Emacs integration

**Requirements:**
- Hook into editor events (typing, paste, file save)
- Local processing only (no code sent to servers)
- Non-blocking (can't slow down development)
- Configurable (let teams set their own thresholds)

### 📊 Visualization & Reporting
Make provenance data actionable.

**What we need:**
- Dashboard showing AI influence trends over time
- Heatmaps of codebase by AI likelihood
- Compliance report templates (SOC2, ISO 27001)
- Integration with code review tools

### 📐 Standards & Formats
Help define the metadata standards.

**Open questions:**
- What metadata format for Git notes/attributes?
- How to encode markers in different file types?
- Interoperability with other provenance tools?
- API design for external integrations?

### 📚 Documentation
Clear docs are critical for adoption.

**Needed:**
- Setup guides for different environments
- Calibration guides (tuning false positive rates)
- Architecture decision records (ADRs)
- Case studies from early adopters

## Development Guidelines

### Code Style

**Python:**
- Follow PEP 8
- Type hints required
- Docstrings for all public functions
- Black formatter (run `black .`)

**TypeScript/JavaScript:**
- ESLint + Prettier
- Strict mode enabled
- JSDoc comments for public APIs

**C#:**
- Follow Microsoft coding conventions
- XML documentation comments
- StyleCop analyzer enabled

### Privacy Requirements

**Every PR must consider:**
1. **What data moves off-machine?** (Answer should be: nothing, or only anonymized metadata)
2. **Could this be used for surveillance?** (Design to prevent misuse)
3. **Can users opt out?** (For personal projects, yes)
4. **Is data retention clear?** (Document what's stored where)

If your change violates any of these, it won't be merged.

### Testing Standards

**Required tests:**
- Unit tests for all detection logic
- Integration tests for IDE plugins
- Performance tests (can't slow commits by >100ms)
- Adversarial tests (evasion resistance)

**Test data requirements:**
- Known human code (pre-2020 commits)
- Known AI code (synthetic from various models)
- Realistic hybrid code (human + AI)

**Coverage:**
- Core detection: >90%
- IDE integrations: >70%
- Utilities: >80%

### Commit Guidelines

**Format:**
```
type(scope): brief description

Longer explanation of what and why, not how.
Reference issues: Fixes #123

AI-Assistance: [None | Copilot-autocomplete | Claude-refactor | etc.]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `perf`: Performance improvement
- `test`: Adding tests
- `refactor`: Code change that neither fixes nor adds features

**AI-Assistance tag:**
We practice what we preach! Declare AI help in your commits:
- `None` - written entirely by you
- `Copilot-autocomplete` - used autocomplete suggestions
- `Claude-refactor` - AI helped restructure code
- `ChatGPT-debug` - AI helped find/fix bugs
- `Mixed` - combination of the above

This helps us dogfood our own tools and provides real-world test data.

## Architecture Overview
```
AILint/
├── detection-engine/          # Core analysis logic
│   ├── heuristics/           # Individual detection methods
│   ├── models/               # ML models (future)
│   ├── analysis.py           # Orchestration
│   └── confidence.py         # Scoring system
│
├── markers/                   # Embedded marker implementation
│   ├── unicode_steg.py       # Zero-width character encoding
│   ├── comment_inject.py     # Comment-based markers
│   └── metadata_format.py    # Standard format definition
│
├── integrations/             # IDE/platform plugins
│   ├── vscode/              # VS Code extension
│   ├── visualstudio/        # Visual Studio extension
│   ├── git-hooks/           # Pre-commit hooks
│   ├── azure-devops/        # Azure DevOps plugin
│   └── github-action/       # GitHub Action
│
├── reporting/                # Dashboard & analytics
│   ├── dashboard/           # Web UI
│   ├── cli/                 # Command-line reports
│   └── templates/           # Compliance templates
│
├── tests/                    # Test suite
│   ├── fixtures/            # Test data
│   ├── unit/
│   ├── integration/
│   └── adversarial/
│
└── docs/                     # Documentation
    ├── architecture/        # ADRs and design docs
    ├── guides/              # User guides
    └── api/                 # API documentation
```

## Review Process

1. **Automated checks** (must pass):
   - Tests pass
   - Linting clean
   - Coverage maintained
   - Performance benchmarks acceptable

2. **Human review** (two approvals required):
   - Code quality
   - Privacy implications
   - Documentation complete
   - Tests adequate

3. **Maintainer review**:
   - Architectural fit
   - Standards alignment
   - Roadmap coherence

## Detection Heuristics - How to Add

This is the most common contribution, so here's the detailed process:

### 1. Document the Pattern

Create `/docs/heuristics/YOUR_HEURISTIC.md`:
```markdown
# Heuristic: [Name]

## Pattern Description
What AI behavior are we detecting?

## Why It Works
Why does AI generate this pattern?

## False Positive Risk
What legitimate human code looks similar?

## Evasion Resistance
How easy is it to deliberately avoid this pattern?

## Test Cases
Link to test data demonstrating pattern.
```

### 2. Implement Detection

In `/detection-engine/heuristics/your_heuristic.py`:
```python
from detection_engine.base import Heuristic

class YourHeuristic(Heuristic):
    """
    Brief description.
    
    False positive rate: ~X% (based on testing)
    Evasion difficulty: [Low|Medium|High]
    """
    
    def analyze(self, code: str, metadata: dict) -> float:
        """
        Analyze code and return confidence score.
        
        Args:
            code: Source code to analyze
            metadata: Context (language, file type, etc.)
            
        Returns:
            Confidence score 0.0-1.0
        """
        # Your logic here
        pass
    
    def explain(self, code: str) -> str:
        """
        Explain why this scored high.
        
        Returns human-readable explanation for debugging.
        """
        pass
```

### 3. Add Tests

In `/tests/heuristics/test_your_heuristic.py`:
```python
import pytest
from detection_engine.heuristics.your_heuristic import YourHeuristic

class TestYourHeuristic:
    def test_detects_ai_pattern(self):
        """Should score high on known AI code."""
        heuristic = YourHeuristic()
        code = load_fixture('ai_generated/example1.py')
        score = heuristic.analyze(code, {'language': 'python'})
        assert score > 0.7
    
    def test_human_code_low_score(self):
        """Should score low on human code."""
        heuristic = YourHeuristic()
        code = load_fixture('human_written/example1.py')
        score = heuristic.analyze(code, {'language': 'python'})
        assert score < 0.3
    
    def test_edge_cases(self):
        """Handle edge cases gracefully."""
        heuristic = YourHeuristic()
        # Empty file
        assert heuristic.analyze('', {}) == 0.0
        # Minified code
        # Obfuscated code
        # etc.
```

### 4. Benchmark Performance
```bash
python -m detection_engine.benchmark your_heuristic

# Should complete in <10ms for typical files
# Should handle files up to 10k lines
```

### 5. Submit PR

Title: `feat(heuristic): Add [pattern name] detection`

Include in description:
- What pattern this detects
- Measured false positive rate
- Test coverage
- Performance benchmarks

## Community

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: Questions, ideas, showcase
- **Discord** (coming soon): Real-time chat
- **Monthly calls** (coming soon): Community sync

### Code of Conduct

We're building infrastructure for transparency and trust. Our community must model these values:

- **Assume good faith**: People may disagree on approaches
- **Be respectful**: Attack ideas, not people
- **Privacy matters**: Never share others' code without permission
- **Collaborate openly**: Solutions over credit

Full Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### Recognition

Contributors are recognized in:
- README.md credits
- Release notes
- Annual report (coming 2025)

Significant contributions may earn:
- Commit access
- Maintainer role
- Representation at conferences

## Legal

### Licensing

- All code: MIT License
- All documentation: CC BY 4.0

By submitting a PR, you agree to license your contribution under these terms.

### Patents

You confirm you have the right to contribute the code and are not violating any patents or other IP rights.

### Privacy of Test Data

If contributing test data:
- Must be your own code, or
- Must have explicit permission, or
- Must be public domain / open source

Never contribute proprietary code as test fixtures.

## Getting Help

**Stuck?** Here's how to get unblocked:

1. **Check docs**: `/docs` folder and GitHub wiki
2. **Search issues**: Someone may have asked already
3. **Ask in Discussions**: For design questions
4. **Open an issue**: For bugs or feature requests
5. **Tag maintainers**: If urgent (but respect their time)

**Mentorship**: New to open source or AI detection? Open an issue labeled `good-first-issue` or `mentorship-wanted` and we'll help you get started.

## Roadmap Input

We maintain the roadmap in [ROADMAP.md](ROADMAP.md). 

Want to influence priorities? Open an issue labeled `roadmap-input` explaining:
- What capability you need
- Why it matters
- Rough implementation approach

Community needs shape what we build.

---

## Thank You

Every contribution - code, docs, testing, ideas - moves us closer to an AI-transparent future. 

You're not just building a tool. You're laying the pipes while we build the motorways.

**Let's build the Bronze Age together.**

---

*Questions about contributing? Open an issue labeled `contributing-question` and we'll update this doc.*
```

---

# VS Code Extension Architecture

Now the technical design for the first implementation:

## Extension Structure
```
vscode-extension/
├── src/
│   ├── extension.ts              # Entry point
│   ├── monitors/
│   │   ├── typingMonitor.ts      # Track typing patterns
│   │   ├── pasteMonitor.ts       # Detect paste events
│   │   └── fileMonitor.ts        # Watch file changes
│   ├── analysis/
│   │   ├── analyzer.ts           # Orchestrate detection
│   │   ├── localEngine.ts        # Interface to detection engine
│   │   └── cache.ts              # Performance optimization
│   ├── git/
│   │   ├── gitIntegration.ts     # Git commands
│   │   ├── metadata.ts           # Format metadata
│   │   └── hooks.ts              # Pre-commit integration
│   ├── ui/
│   │   ├── statusBar.ts          # Show AI likelihood in status
│   │   ├── decorations.ts        # Highlight suspicious code
│   │   ├── webview.ts            # Dashboard panel
│   │   └── notifications.ts      # User feedback
│   └── config/
│       └── settings.ts           # User preferences
├── detection-engine/             # Python analysis (bundled)
│   └── [Core detection logic]
├── package.json
├── tsconfig.json
└── README.md
