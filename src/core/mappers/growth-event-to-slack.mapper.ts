import GrowthEventDto from "../dto/growth-event.dto";
import SlackMessageDto from "../../communication/slack-message.dto";
import categoryIcons from "../dto/category-icons";
import Category from "../dto/category.enum";

function growthEventToSlackMapper(growthEvent: GrowthEventDto): SlackMessageDto {
  const blocks = [];

  const icon = categoryIcons[growthEvent.category as Category];
  const text = `${icon} *<${growthEvent.link}|${growthEvent.title}>* ${icon}\n_${growthEvent.category}_ | ${growthEvent.date}`;
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

export default growthEventToSlackMapper;
