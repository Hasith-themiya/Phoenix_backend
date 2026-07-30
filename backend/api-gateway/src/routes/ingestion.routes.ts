import { Router } from "express";
import {
  coreModelIntegration,
  getHealth,
  ingestHazardData,
  ingestCyberData,
} from "../controllers/ingestion.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/ingestion/health:
 *   get:
 *     summary: Check Data Ingestion Service health
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API service is running
 */
router.get("/health", getHealth);

router.post(
  "/hazard",
  authenticate,
  authorize(["ingestion service"]),
  ingestHazardData,
);

/**
 * @swagger
 * /api/ingestion/hazard:
 *   post:
 *     summary: Ingest Hazard Event Data
 *     description: Submit a single hazard event payload for ingestion and persistence.
 *     tags:
 *       - Data Ingestion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - timestamp
 *               - event_type
 *               - source
 *               - payload
 *             properties:
 *               event_id:
 *                 type: string
 *                 format: uuid
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               event_type:
 *                 type: string
 *                 example: "hazard_only"
 *               source:
 *                 type: string
 *               payload:
 *                 type: object
 *     responses:
 *       200:
 *         description: Hazard data ingested successfully
 *       400:
 *         description: Invalid payload
 *       500:
 *         description: Server error
 */

router.post(
  "/cyber",
  authenticate,
  authorize(["ingestion service"]),
  ingestCyberData,
);

/**
 * @swagger
 * /api/ingestion/cyber:
 *   post:
 *     summary: Ingest Cyber Threat Data
 *     description: Submit a single cyber threat event payload for ingestion and persistence.
 *     tags:
 *       - Data Ingestion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - timestamp
 *               - event_type
 *               - source
 *               - payload
 *             properties:
 *               event_id:
 *                 type: string
 *                 format: uuid
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               event_type:
 *                 type: string
 *                 example: "cyber_only"
 *               source:
 *                 type: string
 *               payload:
 *                 type: object
 *     responses:
 *       200:
 *         description: Cyber data ingested successfully
 *       400:
 *         description: Invalid payload
 *       500:
 *         description: Server error
 */

router.post("/core", authenticate, coreModelIntegration);

/**
 * @swagger
 * /api/ingestion/core:
 *   post:
 *     summary: Core Model Integration
 *     description: Submit payload to run core-model inference and store integration results.
 *     tags:
 *       - Data Ingestion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_id:
 *                 type: string
 *               input:
 *                 type: object
 *     responses:
 *       200:
 *         description: Model integration completed
 *       400:
 *         description: Invalid model input
 *       500:
 *         description: Server error
 */

export default router;
