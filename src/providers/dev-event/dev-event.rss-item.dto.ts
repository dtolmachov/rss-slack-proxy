import { RssItemDto } from "../../core/dto/rss-item.dto";

export interface DevEventItemDto extends RssItemDto {
  content?: string;
  contentSnippet?: string;
  categories: string[];
}
