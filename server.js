const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 8080;

console.log("=== AZURE SERVER STARTUP ===");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", port);
console.log("Hostname:", hostname);
console.log("Working directory:", process.cwd());

// Check if .next directory exists
const fs = require("fs");
console.log(".next directory exists:", fs.existsSync("./.next"));
console.log("package.json exists:", fs.existsSync("./package.json"));

const app = next({
  dev,
  hostname,
  port,
  conf: {
    // Ensure Next.js can find its files
    distDir: ".next",
  },
});
const handle = app.getRequestHandler();

console.log("Preparing Next.js app...");

app
  .prepare()
  .then(() => {
    console.log("Next.js app prepared successfully");

    const server = createServer(async (req, res) => {
      try {
        console.log(`Request: ${req.method} ${req.url}`);
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });

    server.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`✅ Server ready on http://${hostname}:${port}`);
      console.log("Server is listening and ready to accept connections");
    });
  })
  .catch((ex) => {
    console.error("❌ Failed to prepare Next.js app:", ex);
    console.error("Stack trace:", ex.stack);
    process.exit(1);
  });
