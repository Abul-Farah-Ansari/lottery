require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      username: "admin",
      email: "dwe.golden@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

createAdmin();