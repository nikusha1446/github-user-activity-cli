# GitHub User Activity CLI

A simple command-line interface (CLI) tool to fetch and display recent GitHub user activity directly in your terminal.

## 🚀 Features

- Fetch recent GitHub user activity
- Display formatted activity feed
- GitHub token authentication
- Support for multiple event types
- Comprehensive error handling
- Clean, readable output format

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nikusha1446/github-user-activity-cli.git
   cd github-user-activity-cli
   ```
   
2. **Create a Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token (classic)
   - No special scopes needed for public repositories

3. **Create a `.env` file in the project root:**
   ```bash
   GITHUB_TOKEN=your_token_here
   ```

4. **Run the application:**
   ```bash
   npm start username
   ```


**Note:** Without a token, all requests will return 401 Unauthorized errors.

## 📊 Supported Event Types

The CLI displays the following GitHub activity types:

- **Push Events** - Commits pushed to repositories
- **Create Events** - Repository, branch, or tag creation
- **Watch Events** - Repository stars
- **Issues Events** - Issue creation, closing, etc.
- **Fork Events** - Repository forks
- **Pull Request Events** - PR creation, merging, etc.
- **Delete Events** - Branch or tag deletion
- **Release Events** - New releases
- **Other Events** - Generic display for unsupported types

## 💡 Example Output

```
Fetching GitHub activity for torvalds...

Recent activity for torvalds:
--------------------------------------------------
1. Pushed 3 commits to torvalds/linux on 9/16/2025
2. Pushed 1 commits to torvalds/linux on 9/15/2025
3. Created tag v6.17-rc6 on 9/15/2025
4. Pushed 17 commits to torvalds/linux on 9/15/2025
5. Pushed 19 commits to torvalds/linux on 9/14/2025
```

## ⚙️ Requirements

- Node.js (v20.6.0 or higher)
- Internet connection
- GitHub Personal Access Token

## 📄 License

This project is licensed under the ISC License.
