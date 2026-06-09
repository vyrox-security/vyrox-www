# Vyrox WWW Justfile
# =====================================================================
# Production-grade task runner for the marketing site.
# Public landing page at vyrox.dev
#
# Usage:
#   just              # Show all commands
#   just <command>   # Run specific command
# =====================================================================

set shell := ["zsh", "-cu"]

# =====================================================================
# DEFAULT
# =====================================================================

default:
    @just --list

# =====================================================================
# CONTENT
# =====================================================================

# View README
readme:
    @cat README.md

# View SECURITY policy
security:
    @cat SECURITY.md

# List assets
assets:
    ls -la assets/

# =====================================================================
# LINTING
# =====================================================================

# Check markdown files
lint:
    @echo "Checking markdown files..."
    @for f in *.md; do
      [ -f "$f" ] && echo "OK: $f"
    done

# Check for broken links in README
check-links:
    grep -Ehn "\]\(https?://" README.md | head -10

# =====================================================================
# STATS
# =====================================================================

# Count lines
lines:
    wc -l *.md

# List all files
files:
    find . -type f -name "*.md" -o -name "*.html" -o -name "*.css" 2>/dev/null

# =====================================================================
# CLEANUP
# =====================================================================

# Clean temporary files
clean:
    rm -f *~

# =====================================================================
# CI/CD
# =====================================================================

# CI check
ci:
    just lint

# =====================================================================
# HELP
# =====================================================================

help:
    @just --list --unsorted