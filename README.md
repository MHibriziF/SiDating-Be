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

### Pertanyaan 2
#### Apa yang menjadi penyebab konflik tersebut?
Konflik terjadi karena terdapat dua commit berbeda yang ingin melakukan perubahan di satu file yang sama (`index.vue`). Setelah merge di branch `feat/tutorial-6`, kita menambahkan kode baru pada `index.vue`. Setelah kita melakukan commit pada kode tersebut dan pindah ke branch `tutorial-6-for-merge`, kode yang kita tambahkan pada branch `feat/tutorial-6` akan hilang. Hal ini dikarenakan commit pada branch tutorial-6-for-merge tidak memiliki perubahan terbaru dari branch feat/tutorial-6 sehingga keduanya mengubah bagian file yang sama berdasarkan versi dasar (common ancestor) yang berbeda. Akibatnya, saat dilakukan merge kembali, Git mendeteksi dua perubahan yang saling bertentangan pada baris yang sama dan menandainya sebagai merge conflict.