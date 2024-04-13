import CheckForUpdates from "./modules/tools/CheckForUpdates";
import JsonFileReader from "./modules/tools/JsonFileReader";

(async () => {
const jsonFileManager = new JsonFileReader();
let data = await jsonFileManager.readJsonTestsResultFile();
const checkForUpdates = new CheckForUpdates(data);

console.log('DATA ON START:');
console.log(data);
setInterval(async () => {
  data = await jsonFileManager.readJsonTestsResultFile();

  console.log('______________________________________________________________________');

  if(checkForUpdates.checkForUpdatesOnFile(data)) {
    console.log('DATA WAS UPDATED');
    console.log('DATA WAS UPDATED');
    console.log('DATA WAS UPDATED');
    console.log('DATA WAS UPDATED');
    console.log('DATA WAS UPDATED');
    console.log('DATA WAS UPDATED');
  }

  console.log('______________________________________________________________________');

  console.log(data);
}, 1000);

setInterval(() => {
  ;

  jsonFileManager.writeJsonTestFile({
    "Id_da_Maquina": "5534",
    "Id_do_Teste": (Number(data[data.length - 1].Id_do_Teste) + 1).toString(),
    "Id_do_Corpo_de_Prova": "1234",
    "Data": "27/04/2021 11:09:49",
    "Tipo_do_Ensaio": "Cilíndrico",
    "Dimensoes": [
      {
        "Descricao": "Diâmetro",
        "Valor": "100 mm"
      }
    ],
    "Forca": "0 kN",
    "Tensão": "0 MPa",
    "Ruptura": "ND"
  });
}, 5000);
})();
