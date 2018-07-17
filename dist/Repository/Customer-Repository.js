"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Customer_1 = require("../Entity/Customer");
class CustomerRepository {
    createCustomer(customer) {
        return typeorm_1.getManager().getRepository(Customer_1.Customer).save(customer);
    }
    getCustomersList() {
        return typeorm_1.getManager().getRepository(Customer_1.Customer).createQueryBuilder('Customer')
            .select(['Customer.id', 'Customer.name', 'Customer.lastName'])
            .getMany();
    }
    getCustomer(customerId) {
        return typeorm_1.getManager().getRepository(Customer_1.Customer).findOne({
            where: {
                id: customerId
            }
        });
    }
    updateCustomer(customerId, newCustomerData) {
        return typeorm_1.getManager().getRepository(Customer_1.Customer).update({ id: customerId }, newCustomerData);
    }
    deleteCustomer(customerId) {
        return typeorm_1.getManager().getRepository(Customer_1.Customer).delete({ id: customerId });
    }
}
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=Customer-Repository.js.map