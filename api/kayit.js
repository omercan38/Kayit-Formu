import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const client = await db.connect();

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
    return res.status(500).json({ hata: "Veritabanı hatası: " + error.message });
  }
}
