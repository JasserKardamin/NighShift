import { useEffect, useState } from "react";
import { useAuth } from "../components/UserAuth";
import { LoadingComponent } from "../components/LoadingComponent";
import { useNavigate, Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Currency } from "../components/Currency";

// My constants
const MAX_TAG_LENGTH = 5;
const MAX_TITLE_LENGTH = 10;

const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: "text-green-400 bg-green-600/20 border-green-600/50",
    medium: "text-yellow-400 bg-yellow-600/20 border-yellow-600/50",
    hard: "text-red-400 bg-red-600/20 border-red-600/50",
  };
  return (
    colors[difficulty] || "text-gray-400 bg-gray-600/20 border-gray-600/50"
  );
};

const filterProblems = (
  problems,
  searchQuery,
  selectedDifficulty,
  selectedTags,
) => {
  return problems.filter((problem) => {
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
};

const Header = ({ onLogout }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
      <p className="text-gray-400">Choose a challenge and start coding</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-gray-400">
        <span className="text-green-400">●</span> 21.6k players online
      </div>
      <button
        onClick={onLogout}
        className="flex flex-row gap-3 justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-semibold"
      >
        Log out <LogOut />
      </button>
    </div>
  </div>
);

const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTags,
  setSelectedTags,
  allTags,
}) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
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
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              onClick={() => toggleTag(tag)}
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
  );
};

const formatLumen = (reward) => (
  <p className="text-[#432DD7] font-bold flex justify-center items-center gap-2">
    {reward}
    <Currency />
  </p>
);

const formatTag = (tag) =>
  tag.length > MAX_TAG_LENGTH ? tag.substring(0, MAX_TAG_LENGTH) + "..." : tag;

const formatTitle = (title) =>
  title.length > MAX_TITLE_LENGTH
    ? title.substring(0, MAX_TITLE_LENGTH) + "..."
    : title;

const ProblemRow = ({ problem, onClick }) => (
  <button
    onClick={() => onClick(problem)}
    className="w-full grid grid-cols-12 gap-4 p-4 hover:bg-slate-800/50 transition text-left"
  >
    <div className="col-span-1 flex items-center">
      <div className="w-6 h-6 rounded-full border-2 border-slate-600"></div>
    </div>
    <div className="col-span-3 flex flex-col justify-center">
      <div className="font-medium text-white mb-1">
        {formatTitle(problem.title)}
      </div>
      <div className="flex gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-400 px-2 py-1 bg-slate-800 rounded"
          >
            {formatTag(tag)}
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
      {problem.stats.accepted}%
    </div>
    <div className="col-span-2 flex items-center text-gray-300">
      {problem.stats.submissions}
    </div>
    <div className="col-span-2 flex items-center text-gray-300">
      {formatLumen(problem.reward)}
    </div>
  </button>
);

const ProblemsTable = ({ problems, onProblemClick }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-sm font-semibold text-gray-400">
      <div className="col-span-1">Status</div>
      <div className="col-span-3">Title</div>
      <div className="col-span-2">Difficulty</div>
      <div className="col-span-2">Acceptance</div>
      <div className="col-span-2">Submissions</div>
      <div className="col-span-2">Reward</div>
    </div>

    {/* Problems Rows */}
    <div className="divide-y divide-slate-800">
      {problems.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          No problems found matching your criteria
        </div>
      ) : (
        problems.map((problem) => (
          <ProblemRow
            key={problem._id}
            problem={problem}
            onClick={onProblemClick}
          />
        ))
      )}
    </div>
  </div>
);

const StatsCard = ({ label, value, valueColor = "text-white" }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
  </div>
);

const StatsSummary = ({ problems }) => {
  const easyCount = problems.filter((p) => p.difficulty === "easy").length;
  const mediumCount = problems.filter((p) => p.difficulty === "medium").length;
  const hardCount = problems.filter((p) => p.difficulty === "hard").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard label="Total Problems" value={problems.length} />
      <StatsCard label="Easy" value={easyCount} valueColor="text-green-400" />
      <StatsCard
        label="Medium"
        value={mediumCount}
        valueColor="text-yellow-400"
      />
      <StatsCard label="Hard" value={hardCount} valueColor="text-red-400" />
    </div>
  );
};

const Leaderboard = ({ players }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800">
    <div className="p-4 border-b border-slate-800">
      <h3 className="text-sm font-semibold text-gray-300">Leaderboard</h3>
    </div>
    <div className="p-4 space-y-3">
      {players.map((player) => (
        <div
          key={player.rank}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-4">{player.rank}</span>
            <span className="text-gray-300">{player.username}</span>
          </div>
          <span className="text-gray-400">{player.score.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </div>
);

const UserStatsCard = ({ stats }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800">
    <div className="p-4 border-b border-slate-800">
      <h3 className="text-sm font-semibold text-gray-300">Your Stats</h3>
    </div>
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Lumens</span>
        <span className="text-lg font-bold text-indigo-400">
          {formatLumen(stats.lumens.toLocaleString())}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Problems Solved</span>
        <span className="text-sm text-gray-300">{stats.problemsSolved}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Global Rank</span>
        <span className="text-sm text-gray-300">#{stats.rank}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Current Streak</span>
        <span className="text-sm text-gray-300">
          {stats.currentStreak} days
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Longest Streak</span>
        <span className="text-sm text-gray-300">
          {stats.longestStreak} days
        </span>
      </div>
      <button className="w-full mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition text-gray-300">
        View Profile
      </button>
    </div>
  </div>
);

export const ProblemsListPage = () => {
  const navigate = useNavigate();
  const { user, setUser, userAuthLoading } = useAuth();

  // State
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch problems on mount
  useEffect(() => {
    if (!user) return;
    fetchProblems();
  }, [user]);

  const fetchProblems = async () => {
    try {
      const res = await fetch("http://localhost:5000/problem/getAll", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch problems");

      const problemData = await res.json();
      setProblems(problemData);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      await res.json();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleProblemClick = (problem) => {
    navigate(`/problem/${problem.slug}`);
  };

  // Loading state
  if (userAuthLoading) {
    return <LoadingComponent />;
  }

  //redirecting the user to the login if user is null after the loading screne
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Derived data
  const allTags = [...new Set(problems.flatMap((p) => p.tags))];
  const filteredProblems = filterProblems(
    problems,
    searchQuery,
    selectedDifficulty,
    selectedTags,
  );

  const userStats = {
    lumens: user.lumens,
    problemsSolved: user.totalSolved,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    rank: user.globalRank,
  };

  // Mock leaderboard data (should be fetched from API in production)
  const leaderboardData = [
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10" />

      <div className="relative z-10 max-w-[1600px] mx-auto p-6">
        <Header onLogout={handleLogout} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Side - Problems */}
          <div className="xl:col-span-9 space-y-6">
            <SearchAndFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              allTags={allTags}
            />

            <ProblemsTable
              problems={filteredProblems}
              onProblemClick={handleProblemClick}
            />

            <StatsSummary problems={problems} />
          </div>

          {/* Right Side - Leaderboard & User Stats */}
          <div className="xl:col-span-3 space-y-6 sticky top-6 self-start">
            <Leaderboard players={leaderboardData} />
            <UserStatsCard stats={userStats} />
          </div>
        </div>
      </div>
    </div>
  );
};
