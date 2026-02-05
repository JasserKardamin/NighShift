import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { LoadingComponent } from "../components/LoadingComponent";
import { useAuth } from "../components/UserAuth";
import Editor, { useMonaco } from "@monaco-editor/react";

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

const ProblemHeader = ({ problem, getDifficultyColor }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`px-2 py-1 rounded text-xs border capitalize ${getDifficultyColor(problem.difficulty)}`}
          >
            {problem.difficulty}
          </span>
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
);

const ExampleSection = ({ example, index }) => (
  <div className="mt-4">
    <h3 className="font-semibold mb-2 text-white">Example {index + 1}:</h3>
    <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm space-y-1">
      <div>
        <span className="text-indigo-400">Input:</span> {example.input}
      </div>
      <div>
        <span className="text-indigo-400">Output:</span> {example.output}
      </div>
      {example.explanation && (
        <div className="mt-2 text-gray-400">
          <span className="text-indigo-400">Explanation:</span>{" "}
          {example.explanation}
        </div>
      )}
    </div>
  </div>
);

const ProblemDescription = ({ problem }) => (
  <div
    className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 overflow-y-auto"
    style={{ maxHeight: "700px" }}
  >
    <h2 className="text-lg font-bold mb-4">Description</h2>

    <div className="space-y-4 text-gray-300">
      <p>{problem.statement}</p>
      <p>{problem.fullDescription}</p>

      {problem.examples.map((example, index) => (
        <ExampleSection key={index} example={example} index={index} />
      ))}

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-white">Constraints:</h3>
        <ul className="space-y-2">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span className="text-gray-400">{constraint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const EditorHeader = ({
  availableLanguages,
  selectedLanguage,
  onLanguageChange,
  onResetCode,
  onRunTests,
  onSubmit,
}) => (
  <div className="flex items-center justify-between p-4 border-b border-slate-800">
    <div className="flex items-center gap-3">
      <select
        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={selectedLanguage}
        onChange={onLanguageChange}
      >
        <option value="" hidden>
          Select a language
        </option>
        {availableLanguages?.length > 0 ? (
          availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))
        ) : (
          <option disabled>Loading languages...</option>
        )}
      </select>

      <button
        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition"
        onClick={onResetCode}
      >
        Reset Code
      </button>
    </div>

    <div className="flex items-center gap-2">
      <button
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition"
        onClick={onRunTests}
      >
        Run Tests
      </button>
      <button
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition font-semibold"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  </div>
);

const CodeEditor = ({ language, code, setCode }) => {
  const [themeLoaded, setThemeLoaded] = useState(false);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("nightshift-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "keyword", foreground: "FF79C6", fontStyle: "bold" },
          { token: "string", foreground: "50FA7B" },
          { token: "comment", foreground: "6272A4", fontStyle: "italic" },
        ],
        scrollbar: {
          vertical: "visible",
          horizontal: "auto",
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          arrowSize: 12,
          handleMouseWheel: true,
        },
        colors: {
          "editor.background": "#00000000",
          "editor.foreground": "#F8F8F2",
          "editorLineNumber.foreground": "#6272A4",
          "editorCursor.foreground": "#FF79C6",
          "editor.selectionBackground": "#44475AAA",
        },
      });
      setThemeLoaded(true);
    }
  }, [monaco]);

  if (!themeLoaded) {
    return <LoadingComponent />;
  }

  return (
    <Editor
      height="400px"
      language={language == "js" ? "javascript" : language || "javascript"}
      value={code}
      theme="nightshift-dark"
      onChange={(value) => setCode(value)}
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
};

const TestCaseResult = ({ testCase, index }) => (
  <div
    className={`bg-slate-800/50 rounded-lg p-3 text-sm border ${
      testCase.passed ? "border-green-600/30" : "border-red-600/30"
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-medium text-white">Test Case {index + 1}</span>
      <span className={testCase.passed ? "text-green-400" : "text-red-400"}>
        {testCase.passed ? "✓ Passed" : "✗ Failed"}
      </span>
    </div>
    <div className="text-gray-400 space-y-1">
      <div>
        <span className="text-indigo-400">Input:</span> {testCase.input}
      </div>
      <div>
        <span className="text-indigo-400">Expected:</span> {testCase.expected}
      </div>
      {testCase.actual && (
        <div>
          <span className="text-indigo-400">Actual:</span> {testCase.actual}
        </div>
      )}
      {testCase.error && (
        <div className="text-red-400 mt-1">{testCase.error}</div>
      )}
    </div>
  </div>
);

const TestResults = ({ testResults }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-sm">Test Results</h3>
      {testResults && (
        <span
          className={`text-sm ${
            testResults.passed === testResults.total
              ? "text-green-400"
              : "text-yellow-400"
          }`}
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
          <TestCaseResult key={index} testCase={testCase} index={index} />
        ))}
      </div>
    )}
  </div>
);

const StatCard = ({ label, value, valueColor = "text-white" }) => (
  <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
    <div className="text-gray-400 text-sm mb-1">{label}</div>
    <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
  </div>
);

const StatisticsBar = ({ stats }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
    <StatCard
      label="Acceptance Rate"
      value={`${stats.accepted}%`}
      valueColor="text-green-400"
    />
    <StatCard
      label="Total Submissions"
      value={stats.submissions}
      valueColor="text-indigo-400"
    />
    <StatCard label="Your Best Time" value="--" valueColor="text-yellow-400" />
    <StatCard label="Your Attempts" value="0" valueColor="text-gray-300" />
  </div>
);

// main
export const CodeEditorPage = () => {
  const { slug } = useParams();
  const { user, userAuthLoading } = useAuth();

  // State
  const [problem, setProblem] = useState(null);
  const [problemLoading, setProblemLoading] = useState(true);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState(null);

  // Fetch problem on mount
  useEffect(() => {
    if (!user || !slug) return;

    const fetchProblem = async () => {
      setProblemLoading(true);
      await loadProblem();
      setProblemLoading(false);
    };

    fetchProblem();
  }, [user, slug]);

  // Load available languages when problem loads
  useEffect(() => {
    if (problem?.starterCode) {
      const languages = problem.starterCode.map((item) => item.language);
      setAvailableLanguages(languages);
    }
  }, [problem]);

  const loadProblem = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/problem/getBySlug/${slug}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!res.ok) {
        console.error("Failed to fetch problem");
        return;
      }

      const problemData = await res.json();
      setProblem(problemData);
    } catch (err) {
      console.error("Error loading problem:", err);
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);

    // Load starter code for selected language
    const starterCodeEntry = problem.starterCode.find(
      (item) => item.language === lang,
    );

    if (starterCodeEntry) {
      setCode(starterCodeEntry.code);
    }
  };

  const handleResetCode = () => {
    if (selectedLanguage && problem?.starterCode) {
      const starterCodeEntry = problem.starterCode.find(
        (item) => item.language === selectedLanguage,
      );
      if (starterCodeEntry) {
        setCode(starterCodeEntry.code);
      }
    }
  };

  const handleRunTests = async () => {
    const res = await fetch("http://localhost:5000/problem/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userCode: code }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    // setTestResults({
    //   passed: 2,
    //   total: 3,
    //   cases: [
    //     {
    //       input: "[2,7,11,15], 9",
    //       expected: "[0,1]",
    //       actual: "[0,1]",
    //       passed: true,
    //     },
    //     {
    //       input: "[3,2,4], 6",
    //       expected: "[1,2]",
    //       actual: "[1,2]",
    //       passed: true,
    //     },
    //     {
    //       input: "[3,3], 6",
    //       expected: "[0,1]",
    //       actual: null,
    //       passed: false,
    //       error: "Time Limit Exceeded",
    //     },
    //   ],
    // });
  };

  const handleSubmit = () => {
    // TODO: Implement actual submission
    alert("Code submitted!");
  };

  // Loading state
  if (userAuthLoading || !slug || problemLoading) {
    return <LoadingComponent />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Default problem for fallback
  const defaultProblem = {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    stats: {
      accepted: 49.2,
      submissions: "8.2M",
    },
    statement:
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
    starterCode: [
      {
        language: "javascript",
        code: "// Write your solution here",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
  };

  const currentProblem = problem || defaultProblem;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <ProblemHeader
          problem={currentProblem}
          getDifficultyColor={getDifficultyColor}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Problem Description */}
          <ProblemDescription problem={currentProblem} />

          {/* Right: Code Editor */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden flex-1 flex flex-col">
              <EditorHeader
                availableLanguages={availableLanguages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                onResetCode={handleResetCode}
                onRunTests={handleRunTests}
                onSubmit={handleSubmit}
              />
              <CodeEditor
                language={selectedLanguage}
                code={code}
                setCode={setCode}
              />
            </div>

            <TestResults testResults={testResults} />
          </div>
        </div>

        <StatisticsBar stats={currentProblem.stats} />
      </div>
    </div>
  );
};
