import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createCipher } from "../models/ciphers.js";

const router = Router();

// Gets all ciphers for a user
router.get("/my-ciphers", requireAuth, async (req, res) => {

});

// Decrypts a specific cipher
router.get("/:id/decrypt", requireAuth, async (req, res) => {

});

// Gets a specific cipher
router.get("/:id", requireAuth, async (req, res) => {
    
});

// Creates a new cipher
router.post("/", requireAuth, async (req, res) => {
    // Add function to actually encrypt the data
    
    const cipher = await createCipher(req.user.id, req.body.message, req.body.algorithm, 12345);
    res.status(201).json(cipher);
});

// Deletes a cipher
router.delete("/:id", requireAuth, async (req, res) => {

});

export default router;