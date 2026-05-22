const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function check() {
    await mongoose.connect('mongodb://localhost:27017/tms');
    const admins = await Admin.find({});
    console.log("Admins:", admins);
    mongoose.disconnect();
}

check().catch(console.error);
