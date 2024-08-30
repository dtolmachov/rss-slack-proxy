import { Provider } from "../../core/provider";
import { Category } from "../../core/dto/category.enum";
import { GrowthEventDto } from "../../core/dto/growth-event.dto";
import { DevEventItemDto } from "./dev-event.rss-item.dto";

export class DevEventProvider extends Provider {
  protected _providerName: string;
  protected _providerUrl: string;

  private dateLocationRegex = /on (\w+ \d{1,2}, \d{4})(?:, (Online)| in ([\w\s,]+))\./;

  constructor() {
    super();
    this._providerName = "dev-event";
    this._providerUrl = "https://dev.events/rss.xml";
  }

  public buildGrowthEvent(item: DevEventItemDto) : GrowthEventDto | null {
    // item.description is in the format "title is happening on date, location. More information: [link]"
    // E.g. Coding dojo du midi is happening on September 4, 2024, Online. More information: https://dev.events/...
    const match = item.description.match(this.dateLocationRegex);
    if (!match || !match[1]) { return null; }

    let date = match[1];
    let location = match[2] || match[3];

    return {
      date,
      location,
      title: item.title,
      link: item.link,
      category: this.getCategory(item),
      // description: item.description, // Skip description as it is title + date + location + link
    };
  }

  public getCategory(item: DevEventItemDto) : Category {
      throw new Error("getCategory method not implemented");
  }
}
