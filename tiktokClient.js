const { WebcastPushConnection } = require("tiktok-live-connector");
const { GenerateUmur } = require("./utils/randomUmur");
const { addToQueue } = require("./utils/queue");

async function runTikTokClient(username) {
  const tiktokLiveConnection = new WebcastPushConnection(username);

  try {
    await tiktokLiveConnection.connect();

    tiktokLiveConnection.on("chat", async (data) => {
      const randomAge = GenerateUmur(10, 35);
      const commentData = {
        comment: data.comment,
        umur: randomAge,
      };

      const text = `Hai, ${data.comment}, umur kamu ${randomAge}`;

      addToQueue(text, commentData);
    });

    tiktokLiveConnection.on("error", (err) => {
      console.error("Error in TikTok live connection:", err);
    });

    tiktokLiveConnection.on("disconnected", () => {
      console.log("Disconnected from TikTok live.");
    });
  } catch (error) {
    console.error("Failed to connect to TikTok live:", error);
  }
}
module.exports = { runTikTokClient };
