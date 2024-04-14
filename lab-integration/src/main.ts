import dotenv from 'dotenv';
dotenv.config();

import { promises as fs } from 'fs';
import path from 'path';

import JsonFileTestsManager from './modules/tools/JsonFileTestsManager';
import { ITestsResult } from './modules/types';
import FulfillmentAutomation from './modules/tools/FulfillmentAutomation';
import { DataBaseService } from './modules/tools/DataBaseService';

(async () => {
  const databaseService = new DataBaseService();
  const firstDataset = await fs.readFile(
    path.join(process.cwd(), '../test-results.json'),
    {
      encoding: 'utf8',
    },
  );

  const jsonFileTestsManager = new JsonFileTestsManager(
    JSON.parse(firstDataset) as ITestsResult[],
  );
  const fulfillmentAutomation = await new FulfillmentAutomation().init();

  const isDevEnv = process.env.NODE_ENV === 'dev';

  if(isDevEnv) console.info('SCRIPT IS RUNNING...\n');
  setInterval(async () => {
    const dataset = await jsonFileTestsManager.readJsonTestsResultFile();
    if (jsonFileTestsManager.isTestsResultsFileUpdated(dataset)) {
      if(isDevEnv) {
        console.info('\n-----------------------------------------------');
        console.info(`[${new Date()}] \n ARQUIVO DE TESTE ATUALIZADO`);
        console.info('-----------------------------------------------\n');
      }

      const lastTestResult = jsonFileTestsManager.getLastTestResult();
      await fulfillmentAutomation.registerTestResult(lastTestResult);

      jsonFileTestsManager.setDataset(dataset);

      if(isDevEnv) {
        console.info('\n-----------------------------------------------');
        console.info(`Data: ${lastTestResult.Data}`);
        console.info(`ID da Máquina: ${lastTestResult.Id_da_Maquina}`);
        console.info(
          `ID do Corpo da Prova: ${lastTestResult.Id_do_Corpo_de_Prova}`,
        );
        console.info(`Força: ${lastTestResult.Forca}`);
        console.info('-----------------------------------------------\n');
      }

      if (isDevEnv && databaseService.isDBUpdated(await databaseService.find()))
        console.info('BANCO DE DADOS ATUALIZADO COM SUCESSO');
    }
  }, Number(process.env.CHECKTESTSFILEINTERVAL) * 1000);

})();
