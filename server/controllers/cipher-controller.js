import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createCipher, getCipherById, getCiphersByUserId, deleteCipher } from "../models/ciphers.js";
import { encryptCaesar, decryptCaesar } from "../models/caesar.js";
import { encryptHill, decryptHill } from "../models/hill.js";

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
    const cipher = await getCipherById(req.params.id, req.user.id);

    let message = "";
    if (cipher.algorithm === "caesar") {
        message = decryptCaesar(cipher.ciphertext, cipher.key);
    } else if (cipher.algorithm === "hill") {
        message = decryptHill(cipher.ciphertext, cipher.key);
    }
    res.json({ message });
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
    let ciphertext = "";
    let key = "";
    if (req.body.algorithm === "caesar") {
        ({ ciphertext, key } = encryptCaesar(req.body.message));
    } else if (req.body.algorithm === "hill") {
        ({ ciphertext, key } = encryptHill(req.body.message));
    }

    if (!ciphertext || !key) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const cipher = await createCipher(req.user.id, ciphertext, req.body.algorithm, key);
    res.status(201).json(cipher);
});

// Deletes a cipher
router.delete("/:id", requireAuth, async (req, res) => {
    const deleted = await deleteCipher(req.params.id, req.user.id);
    if (deleted) {
        res.json({ message: "Cipher deleted successfully" });
    } else {
        res.status(404).json({ error: "Cipher not found" });
    }
});

export default router;