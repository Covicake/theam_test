import * as path from 'path';
import { CustomerRepository } from '../../Repository/Customer-Repository';
import { Customer } from '../../Entity/Customer';

const customerRepo = new CustomerRepository();

export function createCustomer(customerData: Customer, uploadPhoto): Promise<Customer> {
    return new Promise((resolve, reject) => {
        if (uploadPhoto) {
            const customerPhoto = uploadPhoto.imagePath;
            const photoUrl = path.resolve(__dirname, './images/' + customerData.name + '.jpg');
            customerData.imagePath = photoUrl;
            customerPhoto.mv(photoUrl).then(() => resolve(customerRepo.createCustomer(customerData))).catch((err) => reject(err));
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