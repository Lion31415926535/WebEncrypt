import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/my-ciphers", requireAuth, async (req, res) => {

});

router.get("/:id/decrypt", requireAuth, async (req, res) => {

});

router.get("/:id", requireAuth, async (req, res) => {
    
});

router.post("/", requireAuth, async (req, res) => {

});

router.delete("/:id", requireAuth, async (req, res) => {

});

export default router;