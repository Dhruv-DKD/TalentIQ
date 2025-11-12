import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Success from API" });
});

app.get("/testdemobranchgit", (req, res) => {
  res.status(200).json({ message: "Success from git branch API" });
});

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  console.log("🧭 Static path:", staticPath);

  app.use(express.static(staticPath));

  // React Router fallback
  // ✅ Works in Express 5+
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

connectDB()
  .then(() => {
    console.log(
      "INNGEST_SIGNING_KEY loaded:",
      !!process.env.INNGEST_SIGNING_KEY
    );
    console.log("INNGEST_EVENT_KEY loaded:", !!process.env.INNGEST_EVENT_KEY);

    app.listen(ENV.PORT || 5000, (req, res) => {
      console.log(`⚙️   Server is running on port ${ENV.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED (server.js) !!", err);
  });

export default app;
