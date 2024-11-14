SELECT k.nama_kategori, p.nama_paslon, p.count
FROM kategori k
LEFT JOIN paslon p ON k.id_kategori = p.id_kategori
ORDER BY k.nama_kategori;
