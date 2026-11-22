# Deteksi Kantuk (Microsleep) Pengemudi

Proyek akhir mata kuliah **Praktikum Neuro Computing** - **Kelompok 7**.

Sistem deteksi tanda-tanda kantuk (*microsleep*) pada pengemudi menggunakan pendekatan Computer Vision dan Deep Learning berbasis citra mata dan mulut.

---

## 📌 Tujuan Proyek
- Mendeteksi kondisi mata (terbuka / tertutup).
- Mendeteksi kondisi mulut (menguap / tidak menguap).
- Memberikan peringatan dini (*early warning*) jika pengemudi terindikasi mengantuk atau mengalami microsleep demi mencegah kecelakaan.

---

## 📂 Dataset
Dataset terbagi menjadi 4 kelas:
1. `Closed_Eyes` (Mata Tertutup)
2. `Open_Eyes` (Mata Terbuka)
3. `Yawn` (Menguap)
4. `No_yawn` (Tidak Menguap)

Struktur data:
```text
Dataset/
├── Train/
├── Val/
└── Test/
```
*(Catatan: Folder `Dataset/` diabaikan oleh `.gitignore` karena ukuran file besar).*

---

## 🚀 Alur Kerja Sistem
1. **Pre-processing & Model Training:** Pelatihan model Neuro Computing (CNN) menggunakan dataset citra mata dan mulut.
2. **Evaluasi Model:** Pengujian performa model dengan metrik akurasi, loss, dan confusion matrix.
3. **Aplikasi Demo (Web):** Implementasi model ke aplikasi web untuk demo deteksi langsung melalui upload gambar maupun webcam real-time.

---

## 👥 Anggota Kelompok 7
- [@ardanrizky](https://github.com/ardanrizky)
- [@naufalhilmidh](https://github.com/naufalhilmidh)
- [@alkayyiss-ds](https://github.com/alkayyiss-ds)
- [@LeandroJovan](https://github.com/LeandroJovan)

