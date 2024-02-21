//
// Codebeamer Rest Client Utility for Node.js
//
// Created by kanoloa (kanoloa@mac.com)
//         at Feb 10th, 2024


// -------------------------------------------------------------------------------------------------------------------
//     constants, and variables
// -------------------------------------------------------------------------------------------------------------------

const axios = require('axios');
require('dotenv').config();

const cb_server = {
    "baseUrl": process.env.CB_BASE,
    "username": process.env.CB_USER,
    "password": process.env.CB_PASS
};

exports.CB_TYPE_BOOL = "BoolFieldValue";
exports.CB_TYPE_CHOICE = "ChoiceFieldValue";
exports.CB_TYPE_DATE = "DateFieldValue";
exports.CB_TYPE_INTEGER = "IntegerFieldValue";
exports.CB_TYPE_TEXT = "TextFieldValue";
exports.CB_TYPE_USER = "UserReference";
exports.CB_TYPE_WIKI = "WikiTextFieldValue";
exports.CB_TYPE_REFERENCE = "TrackerItemReference";


// -------------------------------------------------------------------------------------------------------------------
//     Setter functions
// -------------------------------------------------------------------------------------------------------------------

exports.setUrl = (url) => cb_server.baseUrl = url;
exports.setUser = (user) => cb_server.username = user;
exports.setPass = (pass) => cb_server.password = pass;

// -------------------------------------------------------------------------------------------------------------------
//     Interceptors:
// -------------------------------------------------------------------------------------------------------------------

axios.interceptors.request.use(
    (config) => {
        config.headers.setAccept("application/json");
        config.headers.setContentType("application/json");
        config.auth = {
            "username": cb_server.username,
            "password": cb_server.password
        };
        return config;
    }
)

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        return Promise.reject(error);
    }
)

// -------------------------------------------------------------------------------------------------------------------
//     main functions: - syntax sugars
// -------------------------------------------------------------------------------------------------------------------

exports.createFieldValueEntry = () =>  {
    return  {
        "fieldId": "",
        "type": "",
        "name": "",
        "value": ""
    }
}

exports.createBulkUpdateEntry = () => {
    return {
        "itemId": "",
        "fieldValues": []
    }
}

exports.getProjects = () => {
    const url = cb_server.baseUrl + "/projects";
    return axios.get(url).then((res) => res.data);
};

exports.getTrackers = (id) => {
    if (id) {
        const url = cb_server.baseUrl + "/projects/" + id + "/trackers";
        return axios.get(url).then((res) => res.data);
    } else {
        console.log("ERROR! Project ID is not specified. do nothing.");
        return Promise.reject();
    }
};

exports.getTrackerItems = (id) => {
    if (id) {
        const url = cb_server.baseUrl + "/trackers/" + id + "/items";
        // let items = [];
        return axios.get(url).then((res) => res.data);
    } else {
        console.log("ERROR! Tracker ID is not specified. do nothing.");
        return Promise.reject();
    }
};

exports.getItemById = (id) => {
    if (id) {
        const url = cb_server.baseUrl + "/items/" + id + "/fields";
        return axios.get(url).then((res) => res.data);
    } else {
        console.log("ERROR! Item ID is not specified. do nothing.");
        return Promise.reject();
    }
};

exports.getChildren = (id) => {
    if (id) {
        const url = cb_server.baseUrl + "/items/" + id + "/children";
        console.log(`url: ${url}, id: ${id}`);
        return axios.get(url).then((res) => res.data);
    } else {
        return Promise.reject();
    }

};

exports.getReferences = (id, direction) => {
    if (id) {
        const url = cb_server.baseUrl + "/items/" + id + "/relations";
        console.log("");
        console.log(`base id: ${id}, url: ${url}`);
        return axios.get(url).then((res) => {
            if (direction.toUpperCase() === "DOWN") {
                return res.data.downstreamReferences;
            } else if (direction.toUpperCase() === "UP") {
                return res.data.upstreamReferences;
            } else {
                return res.data;
            }
        });
    } else {
        return Promise.reject();
    }
};

exports.getDownstream = (id) => {
    if (id) {
        return this.getReferences(id, "DOWN");
    } else {
        return Promise.reject();
    }
};

exports.getUpstream = (id) => {
    if (id) {
        return this.getReferences(id, "UP");
    } else {
        return Promise.reject();
    }

};

exports.findItemByName = () => {
    // implement this.
};

exports.queryItems = (query) => {
    if (query) {
        const url = cb_server.baseUrl + "/items/query?queryString=" + encodeURI(query);
        return axios.get(url).then((res) => res.data);
    } else {
        return Promise.reject();
    }
};

exports.updateItem = (id, array) => {
    if (Array.isArray(array) && array.length > 0 ) {
        const url = cb_server.baseUrl + "/items/" + id + "/fields";
        // build the request body.
        const request_body = {"fieldValues": array};
        console.log(request_body);
        return axios.put(url, request_body).then((res) => res.data);
    } else {
        return Promise.reject();
    }
};

exports.bulkUpdateItems = (array) => {
    if (Array.isArray(array) && array.length > 0) {
        const url = cb_server.baseUrl + "/items/fields?atomic=true";
        console.log(array);
        return axios.put(url, array).then((res) => res.data);
    } else {
        return Promise.reject();
    }
};

