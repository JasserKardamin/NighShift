import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const fileName = (language: string) => {
  const map: Record<string, string> = {
    js: "code.js",
    python: "code.py",
    cpp: "code.cpp",
    java: "Main.java",
  };

  if (!map[language]) {
    throw new Error("Unsupported language");
  }

  return map[language];
};

export const createTmp = async (
  content: string,
  language: string,
  executionCode: string,
) => {
  // validation first
  const fName = fileName(language);

  const id = crypto.randomUUID();
  const baseTemp = path.resolve("./temp");
  const runDir = path.join(baseTemp, id);

  await fs.mkdir(runDir, { recursive: true });

  const codePath = path.join(runDir, fName);
  const fullCode = content + "\n" + executionCode;
  await fs.writeFile(codePath, fullCode, "utf-8");

  return {
    runDir,
    codePath,
  };
};
