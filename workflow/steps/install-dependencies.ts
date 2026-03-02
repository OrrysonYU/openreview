import { Sandbox } from "@vercel/sandbox";

import { parseError } from "@/lib/error";

const detectInstallCommand = async (
  sandbox: Sandbox
): Promise<{ args: string[]; cmd: string }> => {
  const checks = [
    {
      args: ["install", "--frozen-lockfile"],
      cmd: "bun",
      lockfile: "bun.lock",
    },
    {
      args: ["install", "--frozen-lockfile"],
      cmd: "pnpm",
      lockfile: "pnpm-lock.yaml",
    },
    {
      args: ["install", "--frozen-lockfile"],
      cmd: "yarn",
      lockfile: "yarn.lock",
    },
  ];

  for (const { args, cmd, lockfile } of checks) {
    const result = await sandbox.runCommand("test", ["-f", lockfile]);
    if (result.exitCode === 0) {
      return { args, cmd };
    }
  }

  return { args: ["install"], cmd: "npm" };
};

export const installDependencies = async (sandboxId: string): Promise<void> => {
  "use step";

  let sandbox: Sandbox | null = null;

  try {
    sandbox = await Sandbox.get({ sandboxId });
  } catch (error) {
    throw new Error(
      `[installDependencies] Failed to get sandbox: ${parseError(error)}`,
      { cause: error }
    );
  }

  try {
    // Install GitHub CLI via direct binary
    await sandbox.runCommand("bash", [
      "-c",
      // oxlint-disable-next-line no-template-curly-in-string
      'GH_VERSION=$(curl -fsSL https://api.github.com/repos/cli/cli/releases/latest | grep -o \'"tag_name":"v[^"]*\' | cut -d"v" -f2) && curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" | tar xz -C /tmp && mv /tmp/gh_${GH_VERSION}_linux_amd64/bin/gh /usr/local/bin/gh',
    ]);

    // Install project dependencies
    const { cmd, args } = await detectInstallCommand(sandbox);

    if (cmd !== "npm") {
      await sandbox.runCommand("npm", ["install", "-g", cmd]);
    }

    await sandbox.runCommand(cmd, args);
  } catch (error) {
    throw new Error(
      `Failed to install project dependencies: ${parseError(error)}`,
      { cause: error }
    );
  }
};
