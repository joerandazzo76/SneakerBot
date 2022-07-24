import { faker } from '@faker-js/faker';
import knex from 'knex';

const randomName = faker.name.findName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

export const seed = (knex) => {
    const addresses = [
        { 
        type: 'shipping', 
        first_name: faker.name.firstName(), 
        last_name: faker.name.lastName(), 
        address_line_1: faker.address.streetAddress(), 
        address_line_2: ' ', 
        city: faker.address.cityName(), 
        postal_code: faker.address.zipCode(), 
        state: faker.address.state(), 
        country: faker.address.country(),
        email_address: faker.internet.email(),
        phone_number: faker.phone.number()}
    ];

    
    return knex('addresses')
      .insert(addresses)
      .onConflict('id')
      .ignore()
      .returning('*')
      .then((rows) => rows);
}

  export default seed;
