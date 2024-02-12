// Codebeamer Access Client for Node.js sample program.
// Created by Atsunobu Yamada (kanoloa@mac.com)
//         at Feb 10, 2024

const cb = require('./lib/cbclient');

//
// method 1:  simple way
//
const f1 = cb.createFieldValueEntry();
f1.fieldId = "10003";
f1.name = "AutoCheckID";
f1.type = cb.CB_TYPE_TEXT;
f1.value = "NODE TEST A01";

const body_1 = cb.createBulkUpdateEntry();
body_1.itemId = "5410";
body_1.fieldValues = [f1];  // fieldValues is an array.

//
// method 2:  IIFE (Immediately Invoked Function Expression)
//

const body_2 = cb.createBulkUpdateEntry();
body_2.itemId = "5409";
body_2.fieldValues = (function() {
    const f2 = cb.createFieldValueEntry();
    f2.fieldId = "10003";
    f2.name = "AutoCheckID";
    f2.type = cb.CB_TYPE_TEXT;
    f2.value = "NODE TEST B01";
    return [f2];
})();

// console.log(body_2);

const request_body = [body_1, body_2];
cb.bulkUpdateItems(request_body);
