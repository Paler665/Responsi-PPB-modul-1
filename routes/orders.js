import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// === GET semua order ===
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// === POST tambah order baru ===
router.post("/", async (req, res) => {
  const { nama_pelanggan, nomor_telepon, nama_sepatu, tipe_layanan, harga } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([{ nama_pelanggan, nomor_telepon, nama_sepatu, tipe_layanan, harga }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// === PUT ubah status ===
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, tanggal_selesai } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({ status, tanggal_selesai })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// === DELETE hapus order ===
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Order dihapus" });
});

export default router;
