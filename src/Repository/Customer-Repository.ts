import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Customer } from '../Entity/Customer';

export class CustomerRepository {

    createCustomer(customer: Customer): Promise<Customer> {
        return getManager().getRepository(Customer).save(customer);
        }

    getCustomersList(): Promise<Customer[]> {
        return getManager().getRepository(Customer).createQueryBuilder('Customer')
        .select(['Customer.id', 'Customer.name', 'Customer.lastName'])
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