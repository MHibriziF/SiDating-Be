# sidating-app-fe

Praktikum Frontend dengan Vue.js untuk memenuhi mata kuliah Arsitektur dan Pemrograman Aplikasi Perusahaan tahun ajaran 2025/2026 semester gasal

## Hasil unit test
![alt text](image.png)

## Jawaban pertanyaan

### Pertanyaan 1
#### Apa yang terjadi setelah git cherry-pick dilakukan?
Setelah menjalankan perintah cherry-pick, file `index.vue` pada branch feat/tutorial-6 yang semulanya kosong, sekarang telah berisi kode yang sesuai dengan isi `index.vue` pada commit pertama dari branch `tutorial6-for-cherrypick` 

#### Apakah kita bisa melakukan cherry-pick tanpa harus melakukan commit?
Tidak. Kita membutuhkan commit-id untuk menjalankan cherry-pick. Apabila kita menjalankan perintah cherrypick tanpa commit-id, maka git akan mengembalikan pesan error (lihat gambar). Maka dari itu, sebuah commit diperlukan untuk melakukan cherry-pick
![alt text](image-1.png)
