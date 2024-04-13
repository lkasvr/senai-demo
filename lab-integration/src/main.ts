import { promises as fs } from 'fs';
import path from 'path';

import JsonFileTestsManager from './modules/tools/JsonFileTestsManager';
import { testsResult } from './modules/types';

(async () => {
  const jsonFileTestsManager = new JsonFileTestsManager(
    (await fs.readFile(path.join(process.cwd(), '../test-results.json'), {
      encoding: 'utf8',
    })) as unknown as testsResult[],
  );

  console.info('SCRIPT IS RUNNING...');

  setInterval(async () => {
    const dataset = await jsonFileTestsManager.readJsonTestsResultFile();
    if (jsonFileTestsManager.isTestsResultsFileUpdated(dataset)) {
      console.warn('__________________________');
      console.warn(`[${new Date()}] TESTS RESULTS FILE UPDATED`);
      console.warn('__________________________');
    }
  }, 1000);
})();
