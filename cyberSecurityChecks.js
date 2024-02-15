// Cyber-Security Check Program
//
// Created by kanoloa (kanoloa@mac.com)
//         at Feb 16th, 2024

const cb = require('./lib/cbclient');

async function main() {

    const projectId = "6";
    const targetTrackerId = "16227";   // システムCSレビュー_チェック項目トラッカー番号
    const sourceTrackerId = "90280";   // システムCS計画トラッカー番号
    const subjectName = "工程計画";      // システムCSレビュー_チェック項目・チェック対象名
    const targetItems = [];
    const sourceItems = [];
    const sourceFieldId = "1004";      // システムCS計画トラッカー・チェック対象フィールド番号
    const query = "project.id IN (" + projectId
        + ") AND tracker.id IN (" + targetTrackerId + ") AND SubjectNAME = '" + subjectName + "'";
    console.log("");
    console.log("[SEARCH CRITERIA]");
    console.log("===");
    console.log("=== " + query);
    console.log("===");

    //
    // Get the target (upstream reference) items.
    //

    const result = await cb.queryItems(query);
    if (result != null) {
        for (const item of result.items) {
            // console.log(`Tracker: ${item.tracker.id} Name: ${item.tracker.name} ID: ${item.id}: ${item.subjects[0].name}: ${item.name}`);
            let entry = {
                "id": item.id,
                "uri": "/issue/" + item.id,
                "type": cb.CB_TYPE_REFERENCE
            }
            targetItems.push(entry);
        }
        for (const target of targetItems) {
            console.log(`ID: ${target.id},  URI: ${target.uri},  Name: ${target.type}`);
        }
        // console.log("values: " + JSON.stringify(targetItems));
    }

    if (targetItems.length < 1) {
        return;
    }
    console.log("");
    console.log("[SEARCH RESULT]");
    console.log("===");
    console.log("=== targetItem has " + targetItems.length + " items.");
    console.log("===");

    //
    // Get list of source Items
    //

    const trackerItems = await cb.getTrackerItems(sourceTrackerId);
    if (trackerItems.itemRefs.length > 1) {
        for (const item of trackerItems.itemRefs) {
            let values = {
                "values": targetItems,
                "fieldId": sourceFieldId,
                // "type": cb.CB_TYPE_REFERENCE
                "type": cb.CB_TYPE_CHOICE
            };
            let fieldValues = [values];
            let entry = {
                "itemId": item.id,
                "fieldValues": fieldValues
            }
            sourceItems.push(entry);
            console.log(JSON.stringify(entry));
        }
    }

    //
    // Bulk update source Items
    //

    const response = await cb.bulkUpdateItems(sourceItems);
    console.log(response);

}

main();


