require("@google-cloud/debug-agent").start();
const express = require("express");
const app = express();
// Imports the Google Cloud client library
const { ErrorReporting } = require("@google-cloud/error-reporting");

// Instantiates a client
const errors = new ErrorReporting();

// Use the error message builder to customize all fields ...
const errorEvent = errors.event();

// Add error information
errorEvent.setMessage("My error message");
errorEvent.setUser("root@nexus");

// Report the error event
errors.report(errorEvent, () => {
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

app.get("/", (req, res) => {
  console.log("Hello world received a request.");

  const target = process.env.TARGET || "World";
  logging.log("Test log entry");
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
