import { GrowthEventDto } from "../dto/growth-event.dto";
import { SlackMessageDto } from "../../communication/slack-message.dto";

export function growthEventToSlackMapper(growthEvent: GrowthEventDto): SlackMessageDto {
  const blocks = [];

  const text = `:star2: *<${growthEvent.link}|${growthEvent.title}>* :star2:\n_${growthEvent.category}_ | ${growthEvent.date}`;
  const location = growthEvent.location ? `\n*Location:* ${growthEvent.location}` : "";
  const titleBlock = {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `${text}${location}`
    }
  };
  const descriptionBlock = {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `${growthEvent.description}`
    },
    "block_id": "description_block"
  };

  blocks.push(titleBlock);
  if (growthEvent.description) {
    blocks.push(descriptionBlock);
  }

  return { text, blocks };
}
