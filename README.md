# 📊 Student Performance Visualization Dashboard

---

## 👥 Anggota Tim & Kontribusi
Proyek ini dikerjakan oleh kelompok dengan pembagian tugas sebagai berikut:

| Nama | NIM | Peran | Tanggung Jawab Utama |
| :--- | :--- | :--- | :--- |
| **Shatsi Soluna** | 2211102151 | Report Writer & Documentation | Penyusunan laporan dan dokumentasi|
| **Khansa Setiifia A** | 2211102158 | Data Analyst| Data cleaning dan preprocessing |
| **Fatwa A'isy Irsyaad Zain Sundawa** | 2211102183 | UI/UX Designer | Bar chart komparatif dan styling Tailwind CSS |
| **Dimas Aditya Renatha** | 2211102199 | Interaction Developer | Tooltip interaktif dan animasi transisi|
| **Muhammad Maulana Fauzan** | 2211102218 | Visualization Specialist | Implementasi visualisasi data dan quality assurance |

---

## 📖 Latar Belakang
Dalam dunia pendidikan modern, memahami faktor-faktor yang mempengaruhi performa akademik siswa adalah kunci untuk meningkatkan kualitas pembelajaran. Dashboard ini bertujuan mengonversi data mentah kebiasaan belajar siswa menjadi wawasan visual yang dapat ditindaklanjuti, mengungkap korelasi antara jam belajar, waktu tidur, penggunaan media sosial, kehadiran, dan faktor-faktor lainnya terhadap nilai ujian siswa.

---

## 🎯 Rumusan Masalah
Analisis ini difokuskan untuk menjawab lima pertanyaan utama:
1. Bagaimana hubungan antara jam belajar (*Study Hours*) dengan nilai ujian (*Exam Score*)?
2. Apakah durasi tidur (*Sleep Hours*) berpengaruh signifikan terhadap performa akademik?
3. Kategori apa saja (pendidikan orang tua, kualitas diet, dll.) yang memiliki rata-rata nilai tertinggi?
4. Bagaimana pola distribusi nilai berdasarkan jenis kelamin dan aktivitas ekstrakurikuler?
5. Apakah penggunaan media sosial (*Social Media Hours*) berdampak negatif terhadap prestasi siswa?

---

## 🛠️ Metodologi
Proses analisis dilakukan dengan tahapan:
* **Data Loading & Cleaning:** Menggunakan **Papaparse** untuk memuat dataset CSV dan memproses data yang hilang atau tidak valid.
* **Feature Engineering:** Mengidentifikasi siswa berprestasi (Exam Score ≥ 80) dan menghitung statistik agregat per kategori.
* **Visualization:** Menggunakan **Recharts** untuk membuat scatter plot interaktif, bar chart komparatif, dan summary cards yang responsif.
* **Interactivity:** Implementasi filter dinamis dengan **React Hooks** (useState) untuk eksplorasi data real-time.

---

## 📊 Ringkasan Metrik Dataset
Berdasarkan dashboard yang telah dikembangkan:
* **Total Students:** 6,607
* **Average Exam Score:** 67.5
* **Average Study Hours:** 4.9 jam/hari
* **High Achievers (≥80):** 1,654 siswa (25%)
* **Unique Variables:** 15+ (Study Hours, Sleep Hours, Attendance, dll.)

---

## 💡 Hasil Analisis & Pembahasan

### 1. Korelasi Jam Belajar vs Nilai Ujian
* **Tren Positif:** Scatter plot menunjukkan korelasi positif antara Study Hours dan Exam Score - semakin banyak jam belajar, cenderung semakin tinggi nilai.
* **Titik Optimal:** Siswa dengan 6-8 jam belajar per hari menunjukkan konsistensi nilai tinggi (75-90).
* **Outliers:** Terdapat siswa dengan jam belajar rendah (<3 jam) namun nilai tinggi, mengindikasikan faktor lain seperti efisiensi belajar atau bakat natural.

### 2. Pengaruh Durasi Tidur terhadap Performa
* **Sweet Spot:** Siswa dengan 7-8 jam tidur per malam memiliki rata-rata nilai tertinggi (72.3).
* **Sleep Deprivation:** Siswa yang tidur <6 jam menunjukkan penurunan nilai signifikan (rata-rata 61.5).
* **Oversleeping:** Tidur >9 jam juga berkorelasi dengan nilai yang lebih rendah, kemungkinan karena berkurangnya waktu produktif.

### 3. Perbandingan Berdasarkan Kategori

#### Pendidikan Orang Tua (*Parental Education*)
* **College/University:** Siswa dengan orang tua berpendidikan tinggi memiliki rata-rata nilai 71.2 (tertinggi).
* **High School:** Rata-rata nilai 66.8, menunjukkan gap pendidikan 4.4 poin.
* **Implikasi:** Tingkat pendidikan orang tua berkorelasi positif dengan dukungan akademik di rumah.

#### Kualitas Diet (*Diet Quality*)
* **Excellent:** Rata-rata nilai 73.5, menunjukkan pentingnya nutrisi untuk fungsi kognitif.
* **Poor:** Rata-rata nilai 62.1, selisih 11.4 poin dari diet excellent.

### 4. Pengaruh Aktivitas Ekstrakurikuler
* **Yes (Ikut Ekskul):** Rata-rata nilai 69.3
* **No (Tidak Ikut):** Rata-rata nilai 65.7
* **Insight:** Aktivitas ekstrakurikuler berkontribusi positif, kemungkinan karena melatih time management dan soft skills.

### 5. Dampak Penggunaan Media Sosial
* **Low Usage (<2 jam):** Korelasi positif dengan nilai tinggi.
* **High Usage (>5 jam):** Menunjukkan tren penurunan nilai, kemungkinan karena distraksi dan berkurangnya waktu belajar.
* **Balance is Key:** Penggunaan moderat (2-3 jam) tidak menunjukkan dampak negatif signifikan.

---

## 🎨 Keputusan Desain Visual

### Mengapa Visualisasi Ini Dipilih?

#### Scatter Plot Interaktif
* **Alasan:** Menunjukkan hubungan langsung dan distribusi antara dua variabel numerik secara simultan.
* **Keunggulan:** Tooltip on-hover memberikan detail tiap titik data tanpa mengotori visualisasi utama.
* **Alternatif yang Tidak Dipilih:** Heatmap korelasi (terlalu teknis untuk audiens umum).

#### Bar Chart Horizontal
* **Alasan:** Lebih mudah dibaca untuk kategori dengan label panjang (Parental Education, Diet Quality).
* **Keunggulan:** Perbandingan nilai rata-rata antar kategori langsung terlihat.
* **Alternatif yang Tidak Dipilih:** Boxplot (kurang familiar untuk non-teknis).

#### Summary Cards
* **Alasan:** Memberikan overview statistik kunci dalam satu pandangan (at-a-glance metrics).
* **Keunggulan:** Pengguna langsung memahami skala dan konteks data tanpa perlu membaca grafik detail.

#### Filter Dinamis
* **Alasan:** Memungkinkan eksplorasi data secara personal berdasarkan kriteria spesifik.
* **Keunggulan:** Interaktivitas tinggi - pengguna dapat menemukan pattern sendiri tanpa analisis manual.

---

## ⚙️ Teknik Interaksi & Animasi

| Teknik | Implementasi | Tujuan |
|--------|-------------|--------|
| **Dynamic Filtering** | React useState untuk multi-kriteria (age, gender, study hours, dll.) | Eksplorasi data real-time |
| **Hover Tooltips** | Recharts tooltip dengan custom formatter | Detail on-demand tanpa clutter |
| **Smooth Transitions** | CSS transitions (300ms ease-in-out) | Perubahan data yang mudah diikuti mata |
| **Reset Button** | One-click state reset | User experience yang lebih baik |

**Mengapa animasi ini dipilih?**  
Animasi transisi halus (bukan instant) membantu pengguna melacak perubahan data saat filter diubah, menghindari cognitive overload.

---

## 🔍 Proses Pengembangan

### Timeline Pengerjaan
| Fase | Durasi | Aktivitas |
|------|--------|-----------|
| **Research & Planning** | 8 jam | Riset dataset, analisis awal, pembuatan wireframe |
| **Data Preparation** | 6 jam | Cleaning, preprocessing, feature engineering |
| **Development** | 20 jam | Coding dashboard, implementasi chart dan filter |
| **Testing & Refinement** | 6 jam | Bug fixing, responsiveness testing, optimasi |
| **Documentation** | 4 jam | Penulisan README dan laporan akhir |
| **Total** | **±44 jam** | Kerja tim kolaboratif |

### Tantangan yang Dihadapi

#### 1. Sinkronisasi Multi-Filter
**Masalah:** Filter age, gender, study hours, dan kriteria lain harus bekerja bersamaan tanpa konflik.  
**Solusi:** Implementasi `useEffect` hooks untuk dependency tracking dan state management yang terstruktur.

#### 2. Performa dengan Dataset Besar (6,607 records)
**Masalah:** Render ulang scatter plot yang lambat saat filter berubah.  
**Solusi:** Memoization dengan `useMemo` untuk data yang sudah difilter dan lazy loading untuk chart components.

#### 3. Responsive Design untuk Mobile
**Masalah:** Chart sulit dibaca di layar kecil (<768px).  
**Solusi:** Breakpoint Tailwind custom (`sm:`, `md:`, `lg:`) dan dynamic chart sizing berdasarkan window width.

---

## 📚 Referensi Dataset & Inspirasi

### Sumber Dataset
* **Kaggle:** [Student Habits vs Academic Performance](https://www.kaggle.com/datasets/jayaantanaath/student-habits-vs-academic-performance)
* **Deskripsi:** Dataset berisi 6,607 record dengan 15+ variabel tentang kebiasaan belajar dan performa akademik siswa

### Inspirasi Visualisasi

#### 1. Bold BI Student Performance Dashboard
* **Link:** [Bold BI Education Dashboard](https://samples.boldbi.com/solutions/education/student-performance-dashboard)
* **Pembelajaran:** Penggunaan drill-down untuk eksplorasi demografi, integrasi metrik penting (attendance, grades), dan visual interaktif (kolom chart, pie chart, filter dinamis).

#### 2. GitHub: Student Performance Analytics Dashboard
* **Author:** Aarohisingh09
* **Pembelajaran:** Implementasi heatmap korelasi, identifikasi risiko siswa, dan analisis tren performa berbasis Python Jupyter Notebook.

#### 3. NCBI: Learning Analytics Dashboard
* **Link:** [NCBI Research Article](https://www.ncbi.nlm.nih.gov/)
* **Pembelajaran:** Dashboard multi-panel (descriptive, predictive, prescriptive), boxplot engagement, dan model ML untuk prediksi risiko siswa.

#### 4. InetSoft Student Performance Dashboard
* **Link:** [InetSoft Analytics](https://www.inetsoft.com/)
* **Pembelajaran:** Dashboard intuitif dengan fokus pada kehadiran dan hasil ujian, desain clean dan mudah dinavigasi.

#### 5. SAVis: Learning Analytics Dashboard
* **Pembelajaran:** Penerapan prinsip "overview first, zoom and filter, then details on demand" dengan scatter plot aktivitas dan heatmap untuk eksplorasi data edukasi secara interaktif.

---

## 🏆 Kesimpulan

1. **Jam Belajar Optimal:** Siswa dengan 6-8 jam belajar per hari menunjukkan performa terbaik, namun efisiensi belajar juga berperan penting.

2. **Pentingnya Sleep Quality:** Durasi tidur 7-8 jam per malam adalah sweet spot untuk performa akademik maksimal.

3. **Faktor Sosio-Ekonomi:** Pendidikan orang tua dan kualitas diet berkorelasi positif dengan nilai siswa, menunjukkan pentingnya dukungan keluarga dan nutrisi.

4. **Balance is Key:** Aktivitas ekstrakurikuler memberikan manfaat, namun penggunaan media sosial berlebihan (>5 jam) berdampak negatif pada nilai.

5. **Dashboard sebagai Tool Eksplorasi:** Visualisasi interaktif memungkinkan educator dan siswa menemukan insight personal tanpa analisis manual yang kompleks.

---
