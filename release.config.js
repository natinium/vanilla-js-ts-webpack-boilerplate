export default {
  branches: ["main"], // Branches for releasing
  repositoryUrl: "", // Add the repository url here
  ci: false,
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { emoji: "✨", release: "minor" }, // Feature -> Minor release
          { emoji: "🐛", release: "patch" }, // Bugfix -> Patch release
          { emoji: "📚", release: false }, // Documentation -> No release
          { emoji: "⚙️", release: "patch" }, // Chore -> Patch release
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "🔖 chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        push: false,
      },
    ],

    [
      "@semantic-release/npm",
      {
        npmPublish: false, // Disable publishing to npm
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          " changelogFile": "CHANGELOG.md",
          preset: "conventional",
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
  ],
};
