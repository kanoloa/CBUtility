// Codebeamer Access Client for Node.js sample program.
// Created by Atsunobu Yamada (kanoloa@mac.com)
//         at Feb 10, 2024

const cb = require('./lib/cbclient');
// const constants = require("constants");

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

         */

        // example 7:
        // query items
        // const query = "SubjectName='工程計画'";
        const query = "project.id IN (6) AND tracker.id IN (16227) AND SubjectNAME = '工程計画'";
        const result = await cb.queryItems(query);
        for (const item of result.items) {
            console.log(`Tracker: ${item.tracker.id} Name: ${item.tracker.name} ID: ${item.id}: ${item.subjects[0].name}: ${item.name}`);
        }
        console.log(`${result.items.length} items returned.`);

    } catch(e) {
        console.log(e)
    }

}

main().then();
