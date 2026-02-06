import { spawn } from "child_process";

export const runDockerJS = (codePath: string, input: string) => {
  return new Promise<{ stdout: string; stderr: string; error?: string }>(
    (resolve) => {
      const docker = spawn(
        "docker",
        [
          "run",
          "--rm",
          "--network",
          "none",
          "--memory",
          "128m",
          "--cpus",
          "0.5",
          "--pids-limit",
          "64",
          "--read-only",
          "--security-opt",
          "no-new-privileges",
          "-v",
          `${codePath}:/sandbox/code.js:ro`,
          "-w",
          "/sandbox",
          "node:20-alpine",
          "node",
          "code.js",
        ],
        { stdio: ["pipe", "pipe", "pipe"] },
      );

      let stdout = "";
      let stderr = "";

      docker.stdout.on("data", (d) => (stdout += d));
      docker.stderr.on("data", (d) => (stderr += d));

      docker.stdin.write(input);
      docker.stdin.end();

      const timer = setTimeout(() => {
        docker.kill("SIGKILL");
        resolve({ stdout: "", stderr: "", error: "Time Limit Exceeded" });
      }, 2000);

      docker.on("close", () => {
        clearTimeout(timer);
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        });
      });
    },
  );
};
