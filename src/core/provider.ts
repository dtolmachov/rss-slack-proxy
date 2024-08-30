import Parser from "rss-parser";

import { Category } from "./dto/category.enum";
import { GrowthEventDto } from "./dto/growth-event.dto";
import { RssItemDto } from "./dto/rss-item.dto";

export abstract class Provider {
    protected _providerName!: string;
    protected _providerUrl!: string;

    private yesterdayDate: Date;

    constructor() {
        this.yesterdayDate = new Date();
        this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
    }

    // minPubDate - ISOString. E.g. 2024-08-30T13:28:12.634Z
    protected minPubDate: Date = process.env.minPubDate ? new Date(process.env.minPubDate) : new Date();

    public async fetch() : Promise<GrowthEventDto[]> {
        const parser = new Parser();
        let events: GrowthEventDto[] = [];
    
        try {
          const feed = await parser.parseURL(this._providerUrl);
          const parsedEvents = feed.items
            .map(item => item as unknown as RssItemDto)
            .filter(this.dateFilter)
            .map(this.buildGrowthEvent)
            .filter((event) => event !== null)
            .filter((event) => event.category !== Category.Unknown)
            .filter(this.providerFilter);
    
          events = events.concat(parsedEvents);
        } catch (error) {
          console.error(`Error fetching ${this._providerName} RSS feed:`, error);
        }
    
        return events;
    }

    public buildGrowthEvent(items: RssItemDto) : GrowthEventDto | null {
        throw new Error("map method not implemented");
    }

    public dateFilter(item: RssItemDto) : boolean {
        if (!item.pubDate) { return false; }
        return new Date(item.pubDate) >= this.minPubDate;
    }
    
    public providerFilter(events: GrowthEventDto) : boolean {
        return true;
    }

    public getCategory(item: RssItemDto) : Category {
        throw new Error("getCategory method not implemented");
    }
}
