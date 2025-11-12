import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Success from API" });
});

app.get("/testdemobranchgit", (req, res) => {
  res.status(200).json({ message: "Success from git branch API" });
});
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
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

export default app;
