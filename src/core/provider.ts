import Parser from "rss-parser";

import { Category } from "./dto/category.enum";
import { GrowthEventDto } from "./dto/growth-event.dto";
import { RssItemDto } from "./dto/rss-item.dto";
import { CategoryKeywords } from "./dto/category-keywords";

export abstract class Provider {
  protected _providerName!: string;
  protected _providerUrl!: string;
  protected yesterdayDate: Date;
  protected minPubDate: Date

  constructor() {
    this.yesterdayDate = new Date();
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);

    // process?.env?.minPubDate - ISOString. E.g. 2024-08-30T13:28:12.634Z
    this.minPubDate = process?.env?.minPubDate ? new Date(process.env.minPubDate) : this.yesterdayDate;
  }

  public async fetch(): Promise<GrowthEventDto[]> {
    const parser = new Parser();
    let events: GrowthEventDto[] = [];

    console.log(`Fetching ${this._providerName} RSS feed...`);

    try {
      const feed = await parser.parseURL(this._providerUrl);

      console.log(`Fetched ${feed.items.length} items from ${this._providerName}`);

      const parsedItems = feed.items.map(item => item as unknown as RssItemDto);
      console.log("Parsed items:", parsedItems.length);

      const dateFilteredItems = parsedItems.filter(this.dateFilter.bind(this));
      console.log("Date filtered items:", dateFilteredItems.length);

      const mappedEvents = dateFilteredItems.map(this.buildGrowthEvent.bind(this));
      console.log("Mapped events:", mappedEvents.length);

      const filteredEvents = mappedEvents.filter(event => event !== null);
      console.log("Filtered events:", filteredEvents.length);

      const categorizedEvents = filteredEvents.filter(event => event.category !== Category.Unknown);
      console.log("Categorized events:", categorizedEvents.length);

      const providerFilteredEvents = categorizedEvents.filter(this.providerFilter);
      console.log("Provider filtered events:", providerFilteredEvents.length);

      events = events.concat(providerFilteredEvents);
    } catch (error) {
      console.error(`Error fetching ${this._providerName} RSS feed:`, error);
    }

    console.log(`Fetched ${events.length} events from ${this._providerName}`);

    return events;
  }

  public buildGrowthEvent(items: RssItemDto): GrowthEventDto | null {
    throw new Error("map method not implemented");
  }

  public dateFilter(item: RssItemDto): boolean {
    if (!item.pubDate) { return false; }
    return new Date(item.pubDate) >= this.minPubDate;
  }

  public providerFilter(events: GrowthEventDto): boolean {
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
