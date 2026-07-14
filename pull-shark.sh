#!/bin/bash

# Function to retry commands that might fail due to network flakes
retry_cmd() {
  local n=1
  local max=3
  local delay=3
  while true; do
    "$@" && break || {
      if [[ $n -lt $max ]]; then
        ((n++))
        echo "Command failed. Attempt $n/$max in $delay seconds..."
        sleep $delay;
      else
        echo "Command failed after $max attempts."
        exit 1
      fi
    }
  done
}

REPO_NAME="pull-shark-dummy-$(date +%s)"
echo "Creating dummy directory: $REPO_NAME"

# Add the dummy directory to .gitignore so it doesn't pollute your main workspace
echo "$REPO_NAME/" >> .gitignore
mkdir $REPO_NAME
cd $REPO_NAME

# Initialize a new git repository
git init
git checkout -b main
echo "# $REPO_NAME" > README.md
git add README.md
git commit -m "Initial commit"

# Create the repository on GitHub
echo "Creating GitHub repository: $REPO_NAME..."
retry_cmd gh repo create $REPO_NAME --public --source=. --remote=origin --push

# Run 16 cycles just to be sure you hit the threshold
for i in {1..16}
do
  echo "Starting cycle $i..."
  
  # Step 2: Create a unique branch
  git checkout -b auto-branch-$i
  
  # Step 3: Make a code change
  echo "// update $i" >> update.js
  
  # Step 4: Stage and commit the change
  git add update.js
  git commit -m "chore: automated update $i"
  
  # Step 5: Push to GitHub
  retry_cmd git push -u origin auto-branch-$i
  
  # Step 6: Create the Pull Request instantly
  retry_cmd gh pr create --title "Automated PR $i" --body "Testing pull shark loop"
  
  # Step 7: Merge and clean up
  retry_cmd gh pr merge --merge --delete-branch
  
  # Step 8: Reset for the next cycle
  git checkout main
  retry_cmd git pull origin main
  
  echo "Cycle $i complete!"
  echo "-----------------------"
done

echo "All done! Go check your GitHub profile for the Pull Shark badge."
echo "Note: You can safely delete the '$REPO_NAME' repository from your GitHub account and the folder from your computer now."
