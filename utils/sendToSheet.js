const axios = require("axios");
const { playTextToSpeech } = require("./textToSpech");

async function SendToSheet(data) {
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwxqEb0BJpWDI4yLs3NstZs8IEQhuhuvhVgXmuiAKBzj3cfNSHEakeYKg1DgbnF8jc7bQ/exec";

  try {
    const response = await axios.post(WEBHOOK_URL, data);
    console.log(`Data berhasil dikirim:`, response.config.data);
  } catch (error) {
    console.error(`Error sending data to webhook: ${error}`);
  }
}

module.exports = { SendToSheet };
