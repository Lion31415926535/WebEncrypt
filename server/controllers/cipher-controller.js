import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createCipher, getCipherById, getCiphersByUserId } from "../models/ciphers.js";

const router = Router();

// Gets all ciphers for a user
router.get("/my-ciphers", requireAuth, async (req, res) => {
    const ciphers = await getCiphersByUserId(req.user.id);
    if (ciphers) {
        res.json({ ciphers });
    } else {
        res.status(404).json({ error: "No ciphers found" });
    }
});

// Decrypts a specific cipher
router.get("/:id/decrypt", requireAuth, async (req, res) => {

});

// Gets a specific cipher
router.get("/:id", requireAuth, async (req, res) => {
    const cipher = await getCipherById(req.params.id, req.user.id);
    if (cipher) {
        res.json(cipher);
    } else {
        res.status(404).json({ error: "Cipher not found" });
    }
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