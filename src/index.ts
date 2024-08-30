import dotenv from "dotenv";

import { Provider } from "./core/provider";
import * as providers from "./providers";
import { sendSlackMessage } from "./communication/slack";
import { growthEventToSlackMapper } from "./core/mappers/growth-event-to-slack.mapper";
import { GrowthEventDto } from "./core/dto/growth-event.dto";

dotenv.config();

async function checkFeed(providerName: string): Promise<GrowthEventDto[]> {
  let providerClass: { new(): Provider } | undefined;

  switch (providerName.toLowerCase()) {
    case "dev-event":
      providerClass = providers.DevEventProvider;
      break;
    default:
      console.error(`Provider "${providerName}" not found.`);
  }

  if (!providerClass) { return []; }

  const providerInstance = new providerClass();
  return await providerInstance.fetch();
}

async function main() {
  const events = await checkFeed("dev-event");

  for (const event of events) {
    await sendSlackMessage(growthEventToSlackMapper(event));
  }
}

main();
