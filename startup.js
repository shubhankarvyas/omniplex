console.log("=== AZURE STARTUP DEBUG ===");
console.log("Node version:", process.version);
console.log("Current directory:", process.cwd());
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);

// Check if required files exist
const fs = require("fs");

console.log("Checking files...");
console.log("package.json exists:", fs.existsSync("./package.json"));
console.log(".next exists:", fs.existsSync("./.next"));
console.log("next.config.mjs exists:", fs.existsSync("./next.config.mjs"));

// List directory contents
try {
  console.log("Directory contents:", fs.readdirSync("."));
} catch (e) {
  console.log("Could not read directory:", e.message);
}

// Try to start the app
try {
  console.log("Starting Next.js...");
  const { spawn } = require("child_process");
  const child = spawn("npm", ["start"], {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: process.env.PORT || 8080,
      NODE_ENV: "production",
    },
  });

  child.on("error", (error) => {
    console.error("Failed to start application:", error);
    process.exit(1);
  });

  child.on("close", (code) => {
    console.log(`Application exited with code ${code}`);
    process.exit(code);
  });
} catch (error) {
  console.error("Failed to start:", error);
  process.exit(1);
}
