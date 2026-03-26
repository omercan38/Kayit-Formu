import { createPool } from '@vercel/postgres';

export default async function handler(req, res) {
  // Tüm olası bağlantı isimlerini (POSTGRES, DB, STORAGE) kontrol eder
  const pool = createPool({
    connectionString: process.env.POSTGRES_URL || process.env.DB_URL || process.env.STORAGE_URL
  });

  try {
    const client = await pool.connect();
    
    if (req.method === 'POST') {
      const { isim_soyisim, telefon, il, ilce, semt, cadde, sokak, kisi_sayisi, alternatif_telefon } = req.body;
      
      await client.sql`
        INSERT INTO kayitlar (isim_soyisim, telefon, il, ilce, semt, cadde, sokak, kisi_sayisi, alternatif_telefon)
        VALUES (${isim_soyisim}, ${telefon}, ${il}, ${ilce}, ${semt}, ${cadde}, ${sokak}, ${kisi_sayisi}, ${alternatif_telefon});
      `;
      return res.status(200).json({ mesaj: "Başarılı" });

    } else if (req.method === 'GET') {
      const { rows } = await client.sql`SELECT * FROM kayitlar ORDER BY tarih DESC;`;
      return res.status(200).json({ toplam: rows.length, veriler: rows });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ hata: "Bağlantı Hatası: " + error.message });
  }
}
