#!/bin/bash

# ==============================================================================
# CONFIGURATION
# ==============================================================================
# 1. Choose which branch you want to switch to:
# Options: "feature/docker-setup" or "Register-file"
TARGET_BRANCH="feature/docker-setup"

# 2. Define the Issue details you want to create and solve
ISSUE_TITLE="Fix container environment configurations"
ISSUE_BODY="Investigate and resolve the container initialization bugs."

# ==============================================================================
# EXECUTION STEPS
# ==============================================================================

# Step 1: Switch from your current active branch to the target branch
echo "🔄 Switching to branch: $TARGET_BRANCH..."
git checkout main
git pull origin main
git checkout $TARGET_BRANCH
git pull origin $TARGET_BRANCH

# Step 2: Create a brand new GitHub Issue
echo "➕ Creating a new GitHub Issue..."
NEW_ISSUE_URL=$(gh issue create --title "$ISSUE_TITLE" --body "$ISSUE_BODY")
echo "✅ Issue created successfully: $NEW_ISSUE_URL"

# Extract the issue number out of the URL string
ISSUE_NUM=$(echo "$NEW_ISSUE_URL" | grep -oE '[0-9]+$')

# Step 3: Simulate making your code changes
echo "🔧 Applying the code updates..."
echo "# Build updates" >> README.md

# Step 4: Commit your changes and push them to GitHub
git add .
git commit -m "fix: resolve workspace setup issues closes #$ISSUE_NUM"
git push origin $TARGET_BRANCH

# Step 5: Open the Pull Request linked to the Issue
echo "🚀 Opening Pull Request..."
gh pr create --title "Fixes #$ISSUE_NUM: Update Environment Config" \
             --body "Automated tracking fix for the setup workspace." \
             --base main \
             --head $TARGET_BRANCH

echo "🎉 Workflow completed! A PR has been opened and linked to close Issue #$ISSUE_NUM."
