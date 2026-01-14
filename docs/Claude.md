# docs/ - Documentation Index

Existing documentation for the Apigen website project.

## Directory Structure

```
docs/
├── architecture/     # System design
├── guides/          # How-to guides
├── plans/           # Feature plans, sprints
├── style/           # Design system docs
└── *.md             # Root-level guides
```

---

## Key Documents

### Environment Setup
| File | Purpose |
|------|---------|
| `../ENVIRONMENT_VARIABLES.md` | All env vars with descriptions |
| `Contact-Form-Setup.md` | Resend email integration |
| `Domain-Setup-Guide.md` | DNS configuration |
| `EmailJS-Setup-Guide.md` | Legacy (deprecated) |

### Architecture
| File | Purpose |
|------|---------|
| `architecture/Architecture.md` | System overview |
| `architecture/Content-Architecture.md` | CMS/content system |
| `architecture/Home-Page-Architecture.md` | Homepage structure |

### Guides
| File | Purpose |
|------|---------|
| `guides/componentinventory.md` | Component list |
| `guides/ComponentImportGuide.md` | Import patterns |
| `guides/Buttons-Guide.md` | Button styling |
| `guides/Header-Tuning-Guide.md` | Header customization |
| `guides/Mobile-Viewport-Status.md` | Mobile responsiveness |
| `guides/UI-Layout-and-Spacing-Guide.md` | Layout system |

### Style
| File | Purpose |
|------|---------|
| `style/brand-tokens.md` | Color/typography tokens |
| `style/StyleAudit.md` | Style consistency |
| `style/UI-Layout-and-Spacing-Guide.md` | Spacing system |

### Plans
| File | Purpose |
|------|---------|
| `plans/claudedotmdplan.md` | This documentation plan |
| `plans/Home-Page-Standardization-Plan.md` | Homepage refactor |
| `plans/Content-Management-Standardization-Plan.md` | CMS plan |
| `plans/Carousel-Admin-Portal-Plan.md` | Carousel manager |

---

## Quick Reference

### "How do I set up the project?"
1. See `../ENVIRONMENT_VARIABLES.md` for env vars
2. See `scripts/Claude.md` for database setup
3. Run `npm install && npm run dev`

### "What's the content system?"
- `architecture/Content-Architecture.md`
- `src/lib/Claude.md` (content.ts section)

### "How do I style components?"
- `style/brand-tokens.md` for tokens
- `guides/Buttons-Guide.md` for buttons
- `src/styles/theme.css` for CSS vars

### "What components exist?"
- `guides/componentinventory.md`
- `src/components/Claude.md`
- `src/sections/Claude.md`

---

## Documentation Patterns

### When to Update

| Change | Update |
|--------|--------|
| New component | `guides/componentinventory.md` |
| New env var | `../ENVIRONMENT_VARIABLES.md` |
| Architecture change | `architecture/*.md` |
| New feature | Create plan in `plans/` |

### Creating New Docs

1. Choose appropriate directory
2. Use descriptive filename
3. Include purpose at top
4. Link from related Claude.md files

---

## Deprecated Documents

These are outdated but kept for reference:
- `EmailJS-Setup-Guide.md` - Replaced by Resend

---

## Relationship to Claude.md Files

| Docs | Claude.md |
|------|-----------|
| High-level architecture | Detailed implementation |
| Setup guides | API reference |
| Design decisions | Current patterns |

Use Claude.md files for coding tasks.
Use docs/ for understanding decisions and setup.
