// Codebeamer Access Client for Node.js sample program.
// Created by Atsunobu Yamada (kanoloa@mac.com)
//         at Feb 10, 2024

const cb = require('./lib/cbclient');

const id = "3811";

// build objects for updates
const f1 = cb.createFieldValueEntry();
f1.fieldId = "10001";
f1.type = cb.CB_TYPE_TEXT;
f1.name = "システム正式名称";
f1.value = "Test 4";

const data = [];
data.push(f1);

cb.updateItem(id, data);
