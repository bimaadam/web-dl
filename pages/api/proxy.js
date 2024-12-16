import fetch from "node-fetch"; // Kalau perlu, hanya di Node.js versi lama

export default async function handler(req, res) {
  const { url } = req.query; // Ambil parameter URL dari query

  // Validasi jika URL kosong
  if (!url) {
    return res.status(400).json({ error: "URL tidak boleh kosong" });
  }

  // Validasi format URL (opsional, jika ingin lebih ketat)
  const urlPattern = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
  if (!urlPattern.test(url)) {
    return res.status(400).json({ error: "URL tidak valid" });
  }

  // Menambahkan CORS header
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    // Fetch data dari API pihak ketiga
    const response = await fetch(`https://rest-api-steel-two.vercel.app/api?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari API pihak ketiga");
    }

    const data = await response.json(); // Parse hasilnya ke JSON

    // Kirim hasil ke frontend
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
}
