"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customController = customController;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function customController(options) {
    return (tree, context) => {
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('../custom-resource/files'), [
            (0, schematics_1.applyTemplates)(Object.assign(Object.assign({}, options), core_1.strings)),
            (0, schematics_1.move)('src') // tạo file vào thư mục src
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)])(tree, context);
    };
}
// Export as CommonJS default to allow factory without #export
module.exports = customController;
