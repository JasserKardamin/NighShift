import { spawn } from "child_process";
import { logger } from "../utils/Logger";

export const runDockerJS = (codePath: string, input: string) => {
  return new Promise<{ stdout: string; stderr: string; error?: string }>(
    (resolve) => {
      logger.info("[Docker] Preparing to run container...");
      logger.info(`[Docker] Code path: ${codePath}`);
      logger.info(`[Docker] Input to pass:\n${input}`);

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
          "-i",
          "node:20-alpine",
          "node",
          "code.js",
        ],
        { stdio: ["pipe", "pipe", "pipe"] },
      );

      let stdout = "";
      let stderr = "";

      docker.stdout.on("data", (d) => {
        stdout += d;
        logger.info(`[Docker][STDOUT] ${d.toString().trim()}`);
      });

      docker.stderr.on("data", (d) => {
        stderr += d;
        logger.error(`[Docker][STDERR] ${d.toString().trim()}`);
      });

      docker.on("error", (err) => {
        logger.error("[Docker] Failed to start container:", err);
        resolve({ stdout: "", stderr: "", error: err.message });
      });

      // Wait a bit for container to be ready, then write input
      setTimeout(() => {
        logger.info("[Docker] Writing input to container stdin...");
        docker.stdin.write(input + "\n"); // ADD NEWLINE HERE
        docker.stdin.end();
      }, 100);

      const timer = setTimeout(() => {
        logger.warn("[Docker] Container exceeded time limit. Killing...");
        docker.kill("SIGKILL");
        clearTimeout(timer);
        resolve({ stdout: "", stderr: "", error: "Time Limit Exceeded" });
      }, 2000);

      docker.on("close", (code, signal) => {
        clearTimeout(timer);
        logger.info(
          `[Docker] Container closed. Exit code: ${code}, signal: ${signal}`,
        );
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        });
      });
    },
  );
};
