// Codebeamer Access Client for Node.js sample program.
// Created by Atsunobu Yamada (kanoloa@mac.com)
//         at Feb 10, 2024

const cb = require('./lib/cbclient');
const constants = require("constants");

async function main() {
    try {

        /*
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


        // example 4:
        // get child nodes.
        const children = await cb.getChildren("2171");
        console.log(children);
        for (const child of children.itemRefs) {
            console.log(`id: ${child.id},  name: ${child.name}`)
        }
         */

        // example 5:
        // get downstream references.
        // this method returns an array.
        const downstream = await cb.getDownstream("2171");
        console.log("--- DOWN STREAMS ---");
        for (const down of downstream) {
            console.log(`id: ${down.id}, type: ${down.type}`);
        }

        // example 6:
        // get upstream references.
        // this method returns an array.
        const upstream = await cb.getUpstream("2171");
        console.log("--- UP STREAMS ---");
        for (const up of upstream) {
            console.log(`id: ${up.id}, type: ${up.type}`);
        }

    } catch(e) {
        console.log(e);
    }
}

main().then();
