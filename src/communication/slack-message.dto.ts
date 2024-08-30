import { Block } from "@slack/web-api";

export interface SlackMessageDto {
  text: string;
  blocks: Block[];
}
