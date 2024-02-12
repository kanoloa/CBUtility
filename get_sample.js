// Codebeamer Access Client for Node.js sample program.
// Created by Atsunobu Yamada (kanoloa@mac.com)
//         at Feb 10, 2024

const cb = require('./lib/cbclient');

async function main() {
    try {

        // example 1:
        // get list of projects
        const projects = await cb.getProjects();
        for (const project of projects) {
            console.log(`ID: ${project.id}, Name: ${project.name}`);
        }

        // example 2:
        // list all items in a tracker.
        const items = await cb.getTrackerItems("43906");
        for (const item of items.itemRefs) {
            console.log(`id: ${item.id}, name: ${item.name}`);
        }

        // example 3:
        // list all editable field which an item has.
        const fields = await cb.getItemById("5410");
        for (const field of fields.editableFields) {
            console.log(`fieldID: ${field.fieldId}, name: ${field.name}, value: ${field.value}`);
        }

    } catch(e) {
        console.log(e);
    }
}

main().then();
