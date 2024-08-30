import { Provider } from './dist/core/provider';
import * as providers from './src/providers';

async function checkFeed(providerName: string): Promise<void> {
    async function checkFeed(providerName: string): Promise<void> {
        let providerClass: typeof Provider | undefined;

        switch (providerName.toLowerCase()) {
            case 'dev-event':
                providerClass = providers.DevEventProvider;
                break;
            default:
                console.error(`Provider '${providerName}' not found.`);
                return;
        }

        const providerInstance = new providerClass();
        await providerInstance.fetch();
    }
}
