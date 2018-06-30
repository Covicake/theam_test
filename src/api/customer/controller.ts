import * as path from 'path';
import { CustomerRepository } from '../../Repository/Customer-Repository';
import { Customer } from '../../Entity/Customer';
import { v1 as uuid } from 'uuid';

const customerRepo = new CustomerRepository();

export function createCustomer(customerData: Customer, uploadPhoto): Promise<Customer> {
    return new Promise((resolve, reject) => {
        if (uploadPhoto) {
            const customerPhoto = uploadPhoto.imagePath;
            const imageName = uuid();
            const photoUrl = path.resolve(__dirname, '../../images/' + imageName + '.jpg');
            customerData.imagePath = imageName;
            customerPhoto.mv(photoUrl).then(() => resolve(customerRepo.createCustomer(customerData))).catch((err) => reject(err));
        } else {
            resolve(customerRepo.createCustomer(customerData));
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

export function updateCustomerData(customerId: number, customerData: Customer): Promise<number> {
    return new Promise((resolve, reject) => {
        customerRepo.getCustomer(customerId).then((queryResult) => {
            queryResult = {...customerData};
            customerRepo.updateCustomer(customerId, queryResult).then(() => resolve(200)).catch((err) => reject(err));
        });
    });
}

export function deleteCustomer(customerId: number): Promise<number> {
    return new Promise((resolve, reject) => {
        customerRepo.deleteCustomer(customerId).then(() => resolve(200)).catch((err) => reject(err));
    });
}