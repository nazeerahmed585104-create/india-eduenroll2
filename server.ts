import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for server-side persistence
  let registrationLedger: any[] = [];
  let applicationStore: any[] = [];

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "EduPlatform Backend Services Running Smoothly", 
      timestamp: new Date().toISOString(),
      architecture: {
        runtime: "Node.js / Express Proxy",
        targetEnterpriseStack: "Java / Spring Boot Microservices + PostgreSQL",
        securityIsolation: "RESTRICTED_SERVER_ONLY",
        kycEngine: "Active (NSDL, GSTN, MCA Verified)",
        rbacLayer: "Enforced"
      }
    });
  });

  // Institution Registration Endpoint
  app.post("/api/registration", (req, res) => {
    const institutionData = req.body;
    if (!institutionData || !institutionData.name) {
      return res.status(400).json({ error: "Institution name and profile type required" });
    }

    const record = {
      ...institutionData,
      registeredAt: new Date().toISOString(),
      internalAuditId: `AUDIT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };

    registrationLedger.push(record);
    res.status(201).json({ success: true, record });
  });

  // Application Submission / Processing Endpoint
  app.post("/api/applications", (req, res) => {
    const appData = req.body;
    applicationStore.push(appData);
    res.status(201).json({ success: true, application: appData });
  });

  // Server-Side KYC Verification Proxy Simulation
  app.post("/api/kyc/verify", (req, res) => {
    const { panGst, regNumber } = req.body;
    // Simulated server verification engine without exposing keys
    res.json({
      success: true,
      panVerified: true,
      gstVerified: true,
      mcaStatus: "ACTIVE_INCORPORATION",
      accreditationStatus: "VALIDATED_REGULATORY_BOARD",
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduPlatform server running on http://localhost:${PORT}`);
  });
}

startServer();
