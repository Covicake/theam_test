import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Customer } from '../Entity/Customer';

export class CustomerRepository {

    createCustomer(customer: Customer): Customer {
        return getManager().getRepository(Customer).create(customer);
        }

    getCustomersList(): Promise<Customer[]> {
        return getManager().getRepository(Customer).createQueryBuilder()
            .select('id')
            .addSelect('name')
            .addSelect('lastName')
            .getMany();
        }

    getCustomer(customerId: number): Promise<Customer> {
        return getManager().getRepository(Customer).findOne({
            where: {
                id: customerId
            }
        });
    }

    updateCustomer(customerId: number, newCustomerData: Customer): Promise<UpdateResult> {
        return getManager().getRepository(Customer).update({id: customerId}, newCustomerData);
        }

    deleteCustomer(customerId: number): Promise<DeleteResult> {
        return getManager().getRepository(Customer).delete({id: customerId});
        }
}