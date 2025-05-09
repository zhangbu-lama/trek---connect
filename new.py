import git
import os

# Function to initialize the Git repository if it doesn't exist
def init_git_repo(path):
    if not os.path.isdir(path):
        print(f"The directory {path} does not exist!")
        return None
    if not os.path.isdir(os.path.join(path, '.git')):
        print(f"Initializing Git repository in {path}...")
        repo = git.Repo.init(path)
        print(f"Git repository initialized at {path}")
        return repo
    else:
        return git.Repo(path)

# Ask the user for the local repository path
repo_path = input("Enter the path to your local Git repository: ").strip()

# Initialize or open the repo
repo = init_git_repo(repo_path)
if repo is None:
    exit(1)

# Set the remote repository to your GitHub URL
remote_url = "https://github.com/zhangbu-lama/TrekConnect"
try:
    if 'origin' in repo.remotes:
        repo.git.remote('set-url', 'origin', remote_url)
    else:
        repo.create_remote('origin', remote_url)
    print(f"Remote 'origin' set to: {remote_url}")
except Exception as e:
    print(f"Failed to set remote: {e}")
    exit(1)

# Push to remote
try:
    print(f"Pushing to remote: {remote_url}")
    repo.git.push('--set-upstream', 'origin', 'main')  # Ensure 'main' exists
    print("Changes pushed successfully.")
except Exception as e:
    print(f"An error occurred while pushing to remote: {str(e)}")