import { useState } from "react";

export const ProblemsListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      tags: ["Array", "Hash Table"],
      acceptance: 49.2,
      submissions: "8.2M",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "medium",
      tags: ["Linked List", "Math"],
      acceptance: 38.5,
      submissions: "5.1M",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating",
      difficulty: "medium",
      tags: ["String", "Hash Table"],
      acceptance: 33.8,
      submissions: "6.3M",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      tags: ["Array", "Binary Search"],
      acceptance: 35.2,
      submissions: "2.8M",
    },
    {
      id: 5,
      title: "Palindrome Number",
      difficulty: "easy",
      tags: ["Math", "String"],
      acceptance: 52.3,
      submissions: "4.9M",
    },
    {
      id: 6,
      title: "Roman to Integer",
      difficulty: "easy",
      tags: ["Hash Table", "String"],
      acceptance: 58.1,
      submissions: "3.7M",
    },
    {
      id: 7,
      title: "Valid Parentheses",
      difficulty: "easy",
      tags: ["Stack", "String"],
      acceptance: 40.5,
      submissions: "4.2M",
    },
    {
      id: 8,
      title: "Merge Two Sorted Lists",
      difficulty: "easy",
      tags: ["Linked List", "Recursion"],
      acceptance: 60.8,
      submissions: "3.5M",
    },
    {
      id: 9,
      title: "Generate Parentheses",
      difficulty: "medium",
      tags: ["String", "Backtracking"],
      acceptance: 71.3,
      submissions: "2.1M",
    },
    {
      id: 10,
      title: "Merge k Sorted Lists",
      difficulty: "hard",
      tags: ["Linked List", "Heap"],
      acceptance: 47.9,
      submissions: "1.9M",
    },
  ];

  const leaderboard = [
    { rank: 1, username: "CodeMaster92", score: 2847 },
    { rank: 2, username: "AlgoQueen", score: 2756 },
    { rank: 3, username: "DevNinja", score: 2641 },
    { rank: 4, username: "ByteWizard", score: 2534 },
    { rank: 5, username: "StackOverflow", score: 2421 },
    { rank: 6, username: "BugHunter", score: 2318 },
    { rank: 7, username: "DataDragon", score: 2205 },
    { rank: 8, username: "RecursiveRat", score: 2142 },
    { rank: 9, username: "LeetLegend", score: 2089 },
    { rank: 10, username: "SyntaxSamurai", score: 1987 },
  ];

  // User stats
  const inituserStats = {
    username: "YourUsername",
    lumens: 1543,
    problemsSolved: 87,
    currentStreak: 12,
    longestStreak: 28,
    rank: 156,
  };

  const [userStats, setUserStats] = useState(inituserStats);

  // const LoadUserStats = async (email) => {
  //   const res = await fetch(
  //     `http://localhost:5000/user/getUserByEmail/${email}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     },
  //   );

  //   const data = await res.json();

  //   if (!res.ok) {
  //     console.log("data did not load in a valid way");
  //     return;
  //   }
  //   setUserStats({ ...userStats, lumens: data.user.lumens });
  // };

  const allTags = [...new Set(problems.flatMap((p) => p.tags))];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesDifficulty =
      selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => problem.tags.includes(tag));

    return matchesSearch && matchesDifficulty && matchesTags;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400 bg-green-600/20 border-green-600/50";
      case "medium":
        return "text-yellow-400 bg-yellow-600/20 border-yellow-600/50";
      case "hard":
        return "text-red-400 bg-red-600/20 border-red-600/50";
      default:
        return "text-gray-400 bg-gray-600/20 border-gray-600/50";
    }
  };

  const handleProblemClick = (problem) => {
    console.log("Navigate to code page with:", problem);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
            <p className="text-gray-400">Choose a challenge and start coding</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-gray-400">
              <span className="text-green-400">●</span> 21.6k players online
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-semibold">
              Random Problem
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Side - Problems */}
          <div className="xl:col-span-9 space-y-6">
            {/* Search and Filters */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Search Bar */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search Problems
                  </label>
                  <input
                    type="text"
                    placeholder="Search by title or tags..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag),
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        selectedTags.includes(tag)
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800/50 border border-slate-700 text-gray-400 hover:bg-slate-700/50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Problems List */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-sm font-semibold text-gray-400">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Acceptance</div>
                <div className="col-span-2">Submissions</div>
              </div>

              {/* Problems Rows */}
              <div className="divide-y divide-slate-800">
                {filteredProblems.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    No problems found matching your criteria
                  </div>
                ) : (
                  filteredProblems.map((problem) => (
                    <button
                      key={problem.id}
                      onClick={() => handleProblemClick(problem)}
                      className="w-full grid grid-cols-12 gap-4 p-4 hover:bg-slate-800/50 transition text-left"
                    >
                      <div className="col-span-1 flex items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-600"></div>
                      </div>
                      <div className="col-span-5 flex flex-col justify-center">
                        <div className="font-medium text-white mb-1">
                          {problem.title}
                        </div>
                        <div className="flex gap-2">
                          {problem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-400 px-2 py-1 bg-slate-800 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span
                          className={`px-3 py-1 rounded-lg text-sm border capitalize ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center text-gray-300">
                        {problem.acceptance}%
                      </div>
                      <div className="col-span-2 flex items-center text-gray-300">
                        {problem.submissions}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                <div className="text-gray-400 text-sm mb-1">Total Problems</div>
                <div className="text-2xl font-bold text-white">
                  {problems.length}
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                <div className="text-gray-400 text-sm mb-1">Easy</div>
                <div className="text-2xl font-bold text-green-400">
                  {problems.filter((p) => p.difficulty === "easy").length}
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                <div className="text-gray-400 text-sm mb-1">Medium</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {problems.filter((p) => p.difficulty === "medium").length}
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                <div className="text-gray-400 text-sm mb-1">Hard</div>
                <div className="text-2xl font-bold text-red-400">
                  {problems.filter((p) => p.difficulty === "hard").length}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Leaderboard & User Stats */}
          <div className="xl:col-span-3 space-y-6 sticky top-6 self-start">
            {/* Leaderboard */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 sticky top-6">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-gray-300">
                  Leaderboard
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-4">{player.rank}</span>
                      <span className="text-gray-300">{player.username}</span>
                    </div>
                    <span className="text-gray-400">
                      {player.score.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Stats Card */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-gray-300">
                  Your Stats
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {/* Night Tokens */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Lumens</span>
                  <span className="text-lg font-bold text-indigo-400">
                    {userStats.lumens.toLocaleString()}
                  </span>
                </div>

                {/* Problems Solved */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Problems Solved</span>
                  <span className="text-sm text-gray-300">
                    {userStats.problemsSolved}
                  </span>
                </div>

                {/* Global Rank */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Global Rank</span>
                  <span className="text-sm text-gray-300">
                    #{userStats.rank}
                  </span>
                </div>

                {/* Current Streak */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Current Streak</span>
                  <span className="text-sm text-gray-300">
                    {userStats.currentStreak} days
                  </span>
                </div>

                {/* Longest Streak */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Longest Streak</span>
                  <span className="text-sm text-gray-300">
                    {userStats.longestStreak} days
                  </span>
                </div>

                {/* View Profile Button */}
                <button className="w-full mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition text-gray-300">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
