// Şimdilik verileri tutacağımız geçici hafıza
let geciciVeritabani = [];

export default function handler(req, res) {
    // 1. EĞER VERİ GÖNDERİLİYORSA (KAYIT EKLEME)
    if (req.method === 'POST') {
        const veri = req.body;
        
        // Basit bir zorunlu alan kontrolü
        if (!veri.isim_soyisim || !veri.telefon || !veri.il || !veri.kisi_sayisi) {
            return res.status(400).json({ hata: "Eksik bilgi girdiniz." });
        }

        // Veriyi listeye ekle
        geciciVeritabani.push(veri);
        
        return res.status(200).json({ mesaj: "Başarılı" });
    } 
    
    // 2. EĞER VERİLER İSTENİYORSA (LİSTELEME)
    else if (req.method === 'GET') {
        return res.status(200).json({
            toplam: geciciVeritabani.length,
            veriler: geciciVeritabani.reverse() // En son eklenen en üstte görünsün
        });
    }
}
