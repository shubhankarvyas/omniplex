const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 8080;

console.log("Starting Next.js server...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", port);
console.log("Hostname:", hostname);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    })
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, hostname, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  })
  .catch((ex) => {
    console.error("Failed to start server:", ex.stack);
    process.exit(1);
  });
