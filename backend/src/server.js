import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

// middlewares
app.use(express.json());
// credentials true meaning => server allows a frontend/browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Success from API" });
});

app.get("/testdemobranchgit", (req, res) => {
  res.status(200).json({ message: "Success from git branch API" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
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
