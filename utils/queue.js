const { SendToSheet } = require("./sendToSheet");
const { textToSpeech } = require("./textToSpech");

let audioQueue = []; // Antrian untuk komentar yang menunggu diputar
let isPlaying = false; // Flag untuk menandakan apakah audio sedang diputar

function generateUmur(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk menambahkan ke antrian dan memproses audio secara berurutan
async function processQueue() {
  if (isPlaying || audioQueue.length === 0) return; // Jika sedang memutar atau antrian kosong, keluar

  isPlaying = true; // Tandai bahwa audio sedang diputar
  const { text, dataToSheet } = audioQueue.shift(); // Ambil item pertama dari antrian

  // Kirim data ke Google Sheets setelah audio selesai diputar
  await SendToSheet(dataToSheet);

  // Mainkan TTS
  await textToSpeech(text);

  isPlaying = false; // Tandai bahwa audio sudah selesai diputar
  processQueue(); // Panggil lagi untuk memproses audio berikutnya
}

// Fungsi untuk menambahkan item ke antrian dan memulai proses
function addToQueue(text, dataToSheet) {
  audioQueue.push({ text, dataToSheet });
  processQueue(); // Mulai proses antrian jika belum berjalan
}

module.exports = { addToQueue, generateUmur };
