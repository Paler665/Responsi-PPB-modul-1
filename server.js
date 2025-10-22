import express from "express";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
app.use(express.json());

// Default route untuk testing
app.get("/", (req, res) => {
  res.send("✅ REST API Cuci Sepatu berjalan! Gunakan endpoint /api/orders");
});

// Routing utama
app.use("/api/orders", ordersRouter);

// Jalankan server lokal (Vercel akan abaikan ini)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Export app agar bisa dipakai Vercel
export default app;
