import Image from "next/image";

const steps = [
  {
    description:
      "Click the button above to deploy this template to your Vercel account.",
    title: "Deploy to Vercel",
  },
  {
    description:
      "Create a GitHub App with issue_comment and pull_request_review_comment webhook events, then add the credentials to your environment variables.",
    title: "Connect a GitHub App",
  },
  {
    description:
      "Mention @openreview in any PR comment to trigger an on-demand review, optionally with specific instructions.",
    title: "Get AI reviews",
  },
];

const features = [
  "On-demand reviews via @openreview mentions",
  "Inline suggestions with one-click fixes",
  "Code changes committed and pushed to your PR branch",
  "Runs in a sandboxed environment with full repo access",
  "React with thumbs up to approve or thumbs down to skip",
  "Powered by Claude via the AI SDK",
  "Built on Vercel Workflow for durable execution",
];

export const DeployButton = () => {
  const url = new URL("https://vercel.com/new/clone");

  // Demo
  url.searchParams.set(
    "demo-description",
    "An open-source, self-hosted AI code review bot. Deploy to Vercel, connect a GitHub App, and get on-demand PR reviews powered by Claude."
  );
  url.searchParams.set(
    "demo-image",
    "https://openreview.labs.vercel.dev/opengraph-image.png"
  );
  url.searchParams.set("demo-title", "openreview.labs.vercel.dev");
  url.searchParams.set("demo-url", "https://openreview.labs.vercel.dev/");

  // Marketplace
  url.searchParams.set("from", "templates");
  url.searchParams.set("project-name", "OpenReview");

  // Repository
  url.searchParams.set("repository-name", "openreview");
  url.searchParams.set(
    "repository-url",
    "https://github.com/vercel-labs/openreview"
  );

  // Environment variables
  url.searchParams.set(
    "env",
    [
      "GITHUB_APP_ID",
      "GITHUB_APP_INSTALLATION_ID",
      "GITHUB_APP_PRIVATE_KEY",
      "GITHUB_APP_WEBHOOK_SECRET",
    ].join(",")
  );

  // Integrations
  url.searchParams.set(
    "products",
    JSON.stringify([
      {
        integrationSlug: "upstash",
        productSlug: "upstash-kv",
        protocol: "storage",
        type: "integration",
      },
    ])
  );
  url.searchParams.set("skippable-integrations", "0");

  return (
    <a href={url.toString()} target="_blank" rel="noopener noreferrer">
      <Image
        alt="Deploy with Vercel"
        height={32}
        src="https://vercel.com/button"
        unoptimized
        width={103}
      />
    </a>
  );
};

const Page = () => (
  <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
    <main className="flex w-full max-w-xl flex-col gap-16 px-6 py-24">
      <div className="flex flex-col gap-6">
        <p className="font-mono text-sm tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          Vercel Template
        </p>
        <h1 className="text-4xl leading-tight font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          OpenReview
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          An open-source, self-hosted AI code review bot. Deploy to Vercel,
          connect a GitHub App, and get on-demand PR reviews powered by Claude.
        </p>
        <div className="flex gap-3">
          <DeployButton />
          <a
            className="inline-flex h-8 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            href="https://github.com/vercel-labs/openreview"
            rel="noopener noreferrer"
            target="_blank"
          >
            Source Code
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          How it works
        </h2>
        <ol className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <li className="flex gap-4" key={step.title}>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-mono text-xs font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  {step.title}
                </p>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          Features
        </h2>
        <ul className="flex flex-col gap-2">
          {features.map((feature) => (
            <li
              className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400"
              key={feature}
            >
              <span className="text-zinc-300 dark:text-zinc-700">&mdash;</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </main>
  </div>
);

export default Page;
