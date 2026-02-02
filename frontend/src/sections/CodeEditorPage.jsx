import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../components/LoadingComponent";
import { useAuth } from "../components/UserAuth";
import { LocateFixed } from "lucide-react";

export const CodeEditorPage = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [code, setCode] = useState();
  const [testResults, setTestResults] = useState(null);

  const RenderProblem = async () => {
    const res = await fetch(`http://localhost:5000/problem/getBySlug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      return;
    }

    const problemData = await res.json();
    setProblem(problemData);
  };

  useEffect(() => {
    if (!user || !slug) return;

    // Wrap async call properly
    const fetchProblem = async () => {
      setIsLoading(true);
      await RenderProblem();
      setIsLoading(false);
    };

    fetchProblem();
  }, [user, slug]);

  useEffect(() => {
    if (problem?.starterCode) {
      setAvailableLanguages(problem.starterCode.map((item) => item.language));
    }
  }, [problem]);

  if (!user || !slug || isLoading) {
    return <LoadingComponent />;
  }

  const defaultProblem = {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    stats: {
      accepted: 49.2,
      submissions: "8.2M",
    },
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    fullDescription:
      "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    starterCode: {
      language: "javascript",
      code: "example",
    },
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
  };

  const handleCodeSelection = (language) => {
    const starterCode = problem.starterCode.filter((item) => {
      return item.language === language;
    });
    if (!starterCode) return;
    setCode(starterCode[0].code);
  };

  const currentProblem = problem || defaultProblem;

  const handleRunTests = () => {
    // Simulate running tests
    setTestResults({
      passed: 2,
      total: 3,
      cases: [
        {
          input: "[2,7,11,15], 9",
          expected: "[0,1]",
          actual: "[0,1]",
          passed: true,
        },
        {
          input: "[3,2,4], 6",
          expected: "[1,2]",
          actual: "[1,2]",
          passed: true,
        },
        {
          input: "[3,3], 6",
          expected: "[0,1]",
          actual: null,
          passed: false,
          error: "Time Limit Exceeded",
        },
      ],
    });
  };

  const handleSubmit = () => {
    // Handle submission
    alert("Code submitted!");
  };

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Decorative purple gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{currentProblem.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded text-xs border capitalize ${getDifficultyColor(currentProblem.difficulty)}`}
                >
                  {currentProblem.difficulty}
                </span>
                {currentProblem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 px-2 py-1 bg-slate-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg transition">
              Solutions
            </button>
            <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg transition">
              Discuss
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Problem Description */}
          <div
            className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 overflow-y-auto"
            style={{ maxHeight: "700px" }}
          >
            <h2 className="text-lg font-bold mb-4">Description</h2>

            <div className="space-y-4 text-gray-300">
              <p>{currentProblem.statement}</p>
              <p>{currentProblem.fullDescription}</p>

              {currentProblem.examples.map((example, index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-semibold mb-2 text-white">
                    Example {index + 1}:
                  </h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm space-y-1">
                    <div>
                      <span className="text-indigo-400">Input:</span>{" "}
                      {example.input}
                    </div>
                    <div>
                      <span className="text-indigo-400">Output:</span>{" "}
                      {example.output}
                    </div>
                    {example.explanation && (
                      <div className="mt-2 text-gray-400">
                        <span className="text-indigo-400">Explanation:</span>{" "}
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-white">Constraints:</h3>
                <ul className="space-y-2">
                  {currentProblem.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span className="text-gray-400">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden flex-1">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <select
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedLanguage}
                    onChange={(e) => {
                      const lang = e.target.value;
                      setSelectedLanguage(lang);
                      handleCodeSelection(lang);
                    }}
                  >
                    <option value="" hidden>
                      Select a language
                    </option>

                    {availableLanguages?.length > 0 ? (
                      availableLanguages.map((item) => (
                        <option key={Date.now()} value={item}>
                          {item}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading languages...</option>
                    )}
                  </select>

                  <button
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition"
                    onClick={() => setCode(getStarterCode(selectedLanguage))}
                  >
                    Reset Code
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition"
                    onClick={handleRunTests}
                  >
                    Run Tests
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition font-semibold"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <div className="p-4">
                <textarea
                  className="w-full h-96 bg-slate-800/50 border border-slate-700 rounded-lg p-4 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Test Results</h3>
                {testResults && (
                  <span
                    className={`text-sm ${testResults.passed === testResults.total ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {testResults.passed}/{testResults.total} passed
                  </span>
                )}
              </div>

              {!testResults ? (
                <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-gray-400">
                  Run your code to see test results here...
                </div>
              ) : (
                <div className="space-y-2">
                  {testResults.cases.map((testCase, index) => (
                    <div
                      key={index}
                      className={`bg-slate-800/50 rounded-lg p-3 text-sm border ${
                        testCase.passed
                          ? "border-green-600/30"
                          : "border-red-600/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">
                          Test Case {index + 1}
                        </span>
                        <span
                          className={
                            testCase.passed ? "text-green-400" : "text-red-400"
                          }
                        >
                          {testCase.passed ? "✓ Passed" : "✗ Failed"}
                        </span>
                      </div>
                      <div className="text-gray-400 space-y-1">
                        <div>
                          <span className="text-indigo-400">Input:</span>{" "}
                          {testCase.input}
                        </div>
                        <div>
                          <span className="text-indigo-400">Expected:</span>{" "}
                          {testCase.expected}
                        </div>
                        {testCase.actual && (
                          <div>
                            <span className="text-indigo-400">Actual:</span>{" "}
                            {testCase.actual}
                          </div>
                        )}
                        {testCase.error && (
                          <div className="text-red-400 mt-1">
                            {testCase.error}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
            <div className="text-gray-400 text-sm mb-1">Acceptance Rate</div>
            <div className="text-2xl font-bold text-green-400">
              {currentProblem.stats.accepted}%
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
            <div className="text-gray-400 text-sm mb-1">Total Submissions</div>
            <div className="text-2xl font-bold text-indigo-400">
              {currentProblem.stats.submissions}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
            <div className="text-gray-400 text-sm mb-1">Your Best Time</div>
            <div className="text-2xl font-bold text-yellow-400">--</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
            <div className="text-gray-400 text-sm mb-1">Your Attempts</div>
            <div className="text-2xl font-bold text-gray-300">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
