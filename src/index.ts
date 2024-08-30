import { Provider } from './core/provider';
import * as providers from './providers';

async function checkFeed(providerName: string): Promise<void> {
  let providerClass: { new(): Provider } | undefined;

  switch (providerName.toLowerCase()) {
    case 'dev-event':
      providerClass = providers.DevEventProvider;
      break;
    default:
      console.error(`Provider '${providerName}' not found.`);
      return;
  }

  if (providerClass) {
    const providerInstance = new providerClass();
    await providerInstance.fetch();
  }
}

checkFeed('dev-event');
