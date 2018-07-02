import * as path from 'path';
import { CustomerRepository } from '../../Repository/Customer-Repository';
import { Customer } from '../../Entity/Customer';
import { v1 as uuid } from 'uuid';

const customerRepo = new CustomerRepository();

export function createCustomer(userName: string, customerData: Customer, uploadPhoto): Promise<Customer> {
    return new Promise((resolve, reject) => {
        customerData.createdBy = userName;
        if (uploadPhoto && customerData.name && customerData.lastName) {
            const customerPhoto = uploadPhoto.imagePath;
            const extension = customerPhoto.mimetype.split('/');
            const imageName = uuid() + '.' + extension[1];
            const photoUrl = path.resolve(__dirname, '../../images/' + imageName);
            customerData.imagePath = imageName;
            customerPhoto.mv(photoUrl).then(() => resolve(customerRepo.createCustomer(customerData))).catch((err) => reject(err));
        } else if (customerData.name && customerData.lastName) {
            resolve(customerRepo.createCustomer(customerData));
        } else {
            customerData.name !== undefined ? reject('Lastname required') : reject('Name required');
        }
    });
}

export function getCustomersList(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
        customerRepo.getCustomersList().then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}

export function getCustomer(customerId: number): Promise<Customer> {
    return new Promise((resolve, reject) => {
        customerRepo.getCustomer(customerId).then((queryResult) => resolve(queryResult)).catch((err) => reject(err));
    });
}

export function updateCustomerData(userName: string, customerId: number, customerData: Customer, uploadPhoto): Promise<number> {
    return new Promise((resolve, reject) => {
        customerData.lastUpdatedBy = userName;
        customerRepo.getCustomer(customerId).then((queryResult) => {
            if (uploadPhoto) {
                const customerPhoto = uploadPhoto.imagePath;
                const imageName = queryResult.imagePath;
                const photoUrl = path.resolve(__dirname, '../../images/' + imageName);
                queryResult = {...customerData};
                queryResult.imagePath = imageName;
                Promise.all([customerPhoto.mv(photoUrl), customerRepo.updateCustomer(customerId, queryResult)]).then(() => resolve(200)).catch((err) => reject(err));
            } else {
                customerRepo.updateCustomer(customerId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
            }
        }).catch((err) => reject(err));
    });
}

export function deleteCustomer(customerId: number): Promise<number> {
    return new Promise((resolve, reject) => {
        customerRepo.deleteCustomer(customerId).then(() => resolve(200)).catch((err) => reject(err));
    });
}