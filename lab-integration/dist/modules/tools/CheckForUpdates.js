"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckForUpdates {
    constructor(data) {
        this.testsResult = [];
        this.testsResult = data;
    }
    checkForUpdatesOnFile(testsResult) {
        const actualData = testsResult;
        console.log(this.testsResult.length !== actualData.length);
        console.log(this.testsResult.length);
        console.log(actualData.length);
        const flag = this.testsResult.length !== actualData.length;
        this.testsResult = actualData;
        return flag;
    }
}
exports.default = CheckForUpdates;
