import Parser from "rss-parser";

import Category from "./dto/category.enum";
import GrowthEventDto from "./dto/growth-event.dto";
import RssItemDto from "./dto/rss-item.dto";
import CategoryKeywords from "./dto/category-keywords";

abstract class Provider {
  protected _providerName!: string;
  protected _providerUrl!: string;
  protected yesterdayStartDate: Date;
  protected todayStartDate: Date;
  protected minPubDate: Date
  protected maxPubDate: Date

  constructor() {
    this.yesterdayStartDate = new Date();
    this.yesterdayStartDate.setDate(this.yesterdayStartDate.getDate() - 1);
    this.yesterdayStartDate.setHours(0, 0, 0, 0);

    this.todayStartDate = new Date();
    this.todayStartDate.setHours(0, 0, 0, 0);

    // process?.env?.minPubDate - ISOString. E.g. 2024-08-30T13:28:12.634Z
    this.minPubDate = process?.env?.MIN_PUB_DATE ? new Date(process.env.MIN_PUB_DATE) : this.yesterdayStartDate;
    this.maxPubDate = process?.env?.MAX_PUB_DATE ? new Date(process.env.MAX_PUB_DATE) : this.todayStartDate;
  }

  public async fetch(): Promise<GrowthEventDto[]> {
    const parser = new Parser();
    let events: GrowthEventDto[] = [];

    console.log(`Fetching ${this._providerName} RSS feed...`);

    try {
      const feed = await parser.parseURL(this._providerUrl);
      const parsedItems = feed.items.map(item => item as unknown as RssItemDto);
      const providerFilteredEvents = parsedItems.filter(this.providerFilter.bind(this));
      const dateFilteredItems = providerFilteredEvents.filter(this.dateFilter.bind(this));
      const mappedEvents = dateFilteredItems.map(this.buildGrowthEvent.bind(this));
      const filteredEvents = mappedEvents.filter(event => event !== null);
      const locationFilteredEvents = filteredEvents.filter(this.locationFilter.bind(this));
      const categorizedEvents = locationFilteredEvents.filter(event => event.category !== Category.Unknown);

      events = events.concat(categorizedEvents);
    } catch (error) {
      console.error(`Error fetching ${this._providerName} RSS feed:`, error);
    }

    const orderedEvents = events.sort((a, b) => (new Date(a.date) as any) - (new Date(b.date) as any));
    console.log(`Fetching ${this._providerName} RSS feed - ${orderedEvents.length} events`);
    
    return orderedEvents;
  }

  public buildGrowthEvent(items: RssItemDto): GrowthEventDto | null {
    throw new Error("map method not implemented");
  }

  public dateFilter(item: RssItemDto): boolean {
    if (!item.pubDate) { return false; }
    const pubDate = new Date(item.pubDate);
    return pubDate >= this.minPubDate && pubDate <= this.maxPubDate;
  }

  public locationFilter(item: GrowthEventDto): boolean {
    const location = item.location?.toLowerCase();
    const ignoreLocations = process?.env?.IGNORE_LOCATIONS?.split(",") || [];

    return !ignoreLocations.some(ignoreLocation => location?.includes(ignoreLocation.toLowerCase()));
  }

  public providerFilter(item: RssItemDto): boolean {
    return true;
  }

  public getCategory(hints: string[]): Category {
    let category = Category.Unknown;
   
    hints.forEach(hint => {
      const lowercaseHint = hint.toLowerCase();

      Object.keys(CategoryKeywords).forEach((name) => {
        const categoryName = name as keyof typeof CategoryKeywords;
        const cat = Category[categoryName];
        const keywords = CategoryKeywords[cat];

        const keywordMatch = keywords.find(keyword => {
          if (keyword.length >= 4) {
            return lowercaseHint.includes(keyword);
          } else {
            return lowercaseHint === keyword;
          }
        });

        if (!!keywordMatch) {
          category = cat;
        }
      });

    });

    return category;
  }
}

export default Provider;
