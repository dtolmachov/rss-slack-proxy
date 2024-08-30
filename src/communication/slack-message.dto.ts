import { Block } from "@slack/web-api";

interface SlackMessageDto {
  text: string;
  blocks: Block[];
}

export default SlackMessageDto;
