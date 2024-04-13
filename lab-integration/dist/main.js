"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckForUpdates_1 = __importDefault(require("./modules/tools/CheckForUpdates"));
const JsonFileReader_1 = __importDefault(require("./modules/tools/JsonFileReader"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const jsonFileManager = new JsonFileReader_1.default();
    let data = yield jsonFileManager.readJsonTestsResultFile();
    const checkForUpdates = new CheckForUpdates_1.default(data);
    console.log('DATA ON START:');
    console.log(data);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        data = yield jsonFileManager.readJsonTestsResultFile();
        console.log('______________________________________________________________________');
        if (checkForUpdates.checkForUpdatesOnFile(data)) {
            console.log('DATA WAS UPDATED');
            console.log('DATA WAS UPDATED');
            console.log('DATA WAS UPDATED');
            console.log('DATA WAS UPDATED');
            console.log('DATA WAS UPDATED');
            console.log('DATA WAS UPDATED');
        }
        console.log('______________________________________________________________________');
        console.log(data);
    }), 1000);
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
}))();
