import { getManager } from 'typeorm';
import { Customer } from '../Entity/Customer';

export class CustomerRepository {

    getCustomer(customerId: number): Promise<Customer> {
        return getManager().getRepository(Customer).findOne({
            where: {
                id: customerId
            }
        });
    }
}