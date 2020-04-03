require("@google-cloud/debug-agent").start();
const express = require("express");
const app = express();
const { Logging } = require("@google-cloud/logging");
const logging = new Logging({ projectId: "vitalij-test" });

// Selects the log to write to
const log = logging.log(logName);
// Imports the Google Cloud client library
const { ErrorReporting } = require("@google-cloud/error-reporting");

// Instantiates a client
const errors = new ErrorReporting();

// Use the error message builder to customize all fields ...
const errorEvent = errors.event();

// Add error information
errorEvent.setMessage("My error message");
errorEvent.setUser("root@nexus");
logging.errors // Report the error event
  .report(errorEvent, () => {
    console.log("Done reporting error event!");
  });

// Report an Error object
errors.report(new Error("My error message"), () => {
  console.log("Done reporting Error object!");
});

// Report an error by provided just a string
errors.report("My error message", () => {
  console.log("Done reporting error string!");
});

app.get("/", async (req, res) => {
  console.log("Hello world received a request.");

  const target = process.env.TARGET || "World";
  // Selects the log to write to
  const log = logging.log("hello-log");

  // The data to write to the log
  const text = "Hello, world!";

  // The metadata associated with the entry
  const metadata = {
    resource: { type: "global" },
  };

  // Prepares a log entry
  const entry = log.entry(metadata, text);
  await log.write(entry);
  console.log(`Logged: ${text}`);
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
