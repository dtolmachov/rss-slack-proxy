import { WebClient } from "@slack/web-api";
import SlackMessageDto from "./slack-message.dto";

const client = new WebClient();

const postSlackMessage = async (message: SlackMessageDto, channel = null) => {
  const channelId = channel || process.env.SLACK_CHANNEL_ID || "";
  const response = await client.chat.postMessage({
    token: process.env.SLACK_OAUTH_TOKEN,
    channel: channelId,
    ...message,
  });
};

export default postSlackMessage;
