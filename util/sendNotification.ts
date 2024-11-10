
import * as Notifications from "expo-notifications";

export const sendNotification = async (message: string) => {
    try {
      console.log("Attempting to send notification:", message);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "GreenLink Alert",
          body: message,
          sound: true,
          priority: "high",
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          seconds: 1,
        },
      });

      console.log("Notification scheduled successfully");
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };