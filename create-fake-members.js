const faker = require('faker');
const mongoose = require('mongoose');

const MemberModel = require('./models/member');
const { db } = require('./config');

const amountMembers = 10;
const memberPromises = [];

mongoose.Promise = Promise;
mongoose.connect(db, { useMongoClient: true });

console.log('Creating fake members...');

MemberModel.remove({})
    .then(() => {
        for(let i = 0; i < amountMembers; i++) {
            memberPromises.push(createFakeMember(i));
        }

        return Promise.all(memberPromises)
    })
    .then(results => {
        console.log(`Created ${results.length} fake members`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })

function createFakeMember(iterator) {
    return new MemberModel({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        photo: faker.image.avatar(),
        address: faker.address.streetAddress() + ", " + faker.address.city() + ", " + faker.address.state() + ", " + faker.address.countryCode(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        number: iterator + 1
    }).save();
}
