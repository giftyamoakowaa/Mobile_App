import admin from "firebase-admin";
import fs from "fs";

// Read and parse the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync("./firebase-service-account.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (title) => {
  const message = {
    notification: {
      title: "New Story Available!",
      body: `Check out the latest story: ${title}`,
    },
    topic: "all-users",
  };

  try {
    await admin.messaging().send(message);
    console.log("Push notification sent successfully!");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};
