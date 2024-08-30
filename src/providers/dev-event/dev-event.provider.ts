import Provider from "../../core/provider";
import GrowthEventDto from "../../core/dto/growth-event.dto";
import DevEventItemDto from "./dev-event.rss-item.dto";

export class DevEventProvider extends Provider {
  protected _providerName: string;
  protected _providerUrl: string;
  
  private skipCategories = ["meetup", "masterclass", "hackathon"];
  private dateLocationRegex = /on (\w+ \d{1,2}, \d{4})(?:, (Online)| in ([\w\s,]+))\./;

  constructor() {
    super();
    this._providerName = "dev-event";
    this._providerUrl = "https://dev.events/rss.xml";
  }

  public buildGrowthEvent(item: DevEventItemDto) : GrowthEventDto | null {
    // item.description is in the format "title is happening on date, location. More information: [link]"
    // E.g. Coding dojo du midi is happening on September 4, 2024, Online. More information: https://dev.events/...
    const description: string = item.description || item.content || item.contentSnippet || "";
    const match = description.match(this.dateLocationRegex);
    if (!match || !match[1]) { return null; }

    let date = match[1];
    let location = match[2] || match[3];

    return {
      date,
      location,
      title: item.title,
      link: item.link,
      category: this.getCategory(item.categories || []),
      // description: item.description, // Skip description as it is title + date + location + link
    };
  }

  public providerFilter(item: DevEventItemDto): boolean {
    return !item.categories.some(i => this.skipCategories.includes(i.toLowerCase()));
  }
}
