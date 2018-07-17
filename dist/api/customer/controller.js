"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Customer_Repository_1 = require("../../Repository/Customer-Repository");
const uuid_1 = require("uuid");
const customerRepo = new Customer_Repository_1.CustomerRepository();
function createCustomer(userName, customerData, uploadPhoto) {
    return new Promise((resolve, reject) => {
        customerData.createdBy = userName;
        if (uploadPhoto && customerData.name && customerData.lastName) {
            const customerPhoto = uploadPhoto.imagePath;
            const extension = customerPhoto.mimetype.split('/');
            const imageName = uuid_1.v1() + '.' + extension[1];
            const photoUrl = path.resolve(__dirname, '../../images/' + imageName);
            customerData.imagePath = imageName;
            customerPhoto.mv(photoUrl).then(() => resolve(customerRepo.createCustomer(customerData))).catch((err) => reject(err));
        }
        else if (customerData.name && customerData.lastName) {
            resolve(customerRepo.createCustomer(customerData));
        }
        else {
            customerData.name !== undefined ? reject('Lastname required') : reject('Name required');
        }
    });
}
exports.createCustomer = createCustomer;
function getCustomersList() {
    return new Promise((resolve, reject) => {
        customerRepo.getCustomersList().then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}
exports.getCustomersList = getCustomersList;
function getCustomer(customerId) {
    return new Promise((resolve, reject) => {
        customerRepo.getCustomer(customerId).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}
exports.getCustomer = getCustomer;
function updateCustomerData(userName, customerId, customerData, uploadPhoto) {
    return new Promise((resolve, reject) => {
        customerData.lastUpdatedBy = userName;
        customerRepo.getCustomer(customerId).then((queryResult) => {
            if (uploadPhoto) {
                const customerPhoto = uploadPhoto.imagePath;
                const imageName = queryResult.imagePath;
                const photoUrl = path.resolve(__dirname, '../../images/' + imageName);
                queryResult = Object.assign({}, customerData);
                queryResult.imagePath = imageName;
                Promise.all([customerPhoto.mv(photoUrl), customerRepo.updateCustomer(customerId, queryResult)]).then(() => resolve(200)).catch((err) => reject(err));
            }
            else {
                customerRepo.updateCustomer(customerId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
            }
        }).catch((err) => reject(err));
    });
}
exports.updateCustomerData = updateCustomerData;
function deleteCustomer(customerId) {
    return new Promise((resolve, reject) => {
        customerRepo.deleteCustomer(customerId).then(() => resolve(200)).catch((err) => reject(err));
    });
}
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=controller.js.map