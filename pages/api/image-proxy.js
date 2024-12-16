// export default async function handler(req, res) {
//     const { url } = req.query;
  
//     if (!url) {
//       return res.status(400).json({ error: "URL is required" });
//     }
  
//     try {
//       const response = await fetch(url, { method: "GET" });
//       if (!response.ok) throw new Error("Failed to fetch image");
  
//       // Set CORS headers dan proxy gambar
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Content-Type", response.headers.get("Content-Type"));
//       const buffer = await response.arrayBuffer();
//       res.send(Buffer.from(buffer));
//     } catch (error) {
//       res.status(500).json({ error: "Failed to proxy image" });
//     }
//   }
  