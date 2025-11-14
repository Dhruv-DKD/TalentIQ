import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream api key or secret is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully", userData);
  } catch (error) {
    console.error("Error upserting Stream User", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser({ userId });
    console.log("Stream user deleted successfully");
  } catch (error) {
    console.error("Error deleting Stream User", error);
  }
};


// todo : add another method to generateToken