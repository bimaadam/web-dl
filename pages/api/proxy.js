// pages/api/proxy.js
// const response = await fetch(`https://rest-api-steel-two.vercel.app/api?url=${encodeURIComponent(url)}`);
// const data = await response.json();

// console.log("Data API:", data); // Tambahkan log untuk lihat struktur data
// res.status(200).json(data);

export default async function handler(req, res) {
    const { url } = req.query; // Ambil parameter URL dari query
  
    // Validasi jika URL kosong
    if (!url) {
      return res.status(400).json({ error: "URL tidak boleh kosong" });
    }
  
    try {
      // Fetch data dari API pihak ketiga
      const response = await fetch(`https://rest-api-steel-two.vercel.app/api?url=${encodeURIComponent(url)}`);
      const data = await response.json(); // Parse hasilnya ke JSON
  
      // Kirim hasil ke frontend
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data" });
    }
  }
  