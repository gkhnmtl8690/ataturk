import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertMusicFileSchema, insertFavoriteMusicSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only MP3 and MP4 files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // Get timeline events
  app.get("/api/timeline", async (req, res) => {
    try {
      const events = await storage.getTimelineEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline events" });
    }
  });

  // Get Turkish composers
  app.get("/api/composers", async (req, res) => {
    try {
      const composers = await storage.getTurkishComposers();
      res.json(composers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch composers" });
    }
  });

  // Get single composer
  app.get("/api/composers/:id", async (req, res) => {
    try {
      const composer = await storage.getTurkishComposer(req.params.id);
      if (!composer) {
        return res.status(404).json({ message: "Composer not found" });
      }
      res.json(composer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch composer" });
    }
  });

  // Get music files
  app.get("/api/music-files", async (req, res) => {
    try {
      const type = req.query.type as string;
      const files = await storage.getMusicFiles(type);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch music files" });
    }
  });

  // Upload music file
  app.post("/api/music-files", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { name, type } = req.body;
      
      if (!name || !type) {
        return res.status(400).json({ message: "Name and type are required" });
      }

      const fileData = {
        name,
        type,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size.toString(),
      };

      const musicFile = await storage.createMusicFile(fileData);
      res.status(201).json(musicFile);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Delete music file
  app.delete("/api/music-files/:id", async (req, res) => {
    try {
      const file = await storage.getMusicFile(req.params.id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      // Delete file from filesystem
      const filePath = path.join(uploadDir, file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const success = await storage.deleteMusicFile(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "File not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete file" });
    }
  });

  // Get favorite musics
  app.get("/api/favorite-musics", async (req, res) => {
    try {
      const musics = await storage.getFavoriteMusics();
      res.json(musics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorite musics" });
    }
  });

  // Get favorite marches
  app.get("/api/favorite-marches", async (req, res) => {
    try {
      const marches = await storage.getFavoriteMarches();
      res.json(marches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorite marches" });
    }
  });

  // Get single favorite music
  app.get("/api/favorite-musics/:id", async (req, res) => {
    try {
      const music = await storage.getFavoriteMusic(req.params.id);
      if (!music) {
        return res.status(404).json({ message: "Music not found" });
      }
      res.json(music);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch music" });
    }
  });

  // Create favorite music
  app.post("/api/favorite-musics", async (req, res) => {
    try {
      const musicData = insertFavoriteMusicSchema.parse(req.body);
      const music = await storage.createFavoriteMusic(musicData);
      res.status(201).json(music);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid music data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create favorite music" });
    }
  });

  // Delete favorite music
  app.delete("/api/favorite-musics/:id", async (req, res) => {
    try {
      const success = await storage.deleteFavoriteMusic(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Music not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete favorite music" });
    }
  });

  // Placeholder image endpoint
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e2e8f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" dy=".3em" fill="#64748b">
          ${width}x${height}
        </text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}