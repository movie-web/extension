import { relayMessage } from '@plasmohq/messaging';
import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

relayMessage({
  name: 'hello',
});

relayMessage({
  name: 'makeRequest',
});

relayMessage({
  name: 'prepareStream',
});
