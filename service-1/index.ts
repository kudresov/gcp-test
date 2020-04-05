require("@google-cloud/debug-agent").start({
  debug: true,
  logLevel: 4,
  pathResolver: (
    scriptPath: string,
    knownFiles: string[],
    resolved: string[]
  ) => {
    return knownFiles.filter((f) => f.endsWith(scriptPath));
  },
});
const express = require("express");
const app = express();
// const { Logging } = require("@google-cloud/logging");
// const logging = new Logging({ projectId: "vitalij-test" });

// Selects the log to write to
// Imports the Google Cloud client library
// const { ErrorReporting } = require("@google-cloud/error-reporting");

// Instantiates a client
// const errors = new ErrorReporting();

app.get("/", async (req, res) => {
  console.log("Hello world received a request.");

  const target = process.env.TARGET || "World";
  // Selects the log to write to
  // const log = logging.log("hello-log");

  // The data to write to the log
  const text = "Hello, world!";

  // The metadata associated with the entry
  const metadata = {
    resource: { type: "global" },
  };

  // Prepares a log entry
  // const entry = log.entry(metadata, text);
  // Reports a simple error
  // errors.report("Something broke!");
  // await log.write(entry);
  console.log(`Logged: ${text}`);
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
