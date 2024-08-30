import RssItemDto from "../../core/dto/rss-item.dto";

interface DevEventItemDto extends RssItemDto {
  content?: string;
  contentSnippet?: string;
  categories: string[];
}

export default DevEventItemDto;
