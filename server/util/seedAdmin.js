const Admin = require("../monogdb/modals/AdminSchema");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD ;
  const username = process.env.USER_NAME;


  try {
     const existingAdmin = await Admin.findOne({
       $or: [{ username: username }, { email: adminEmail }]
     });


    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new Admin({
        username: username,
        email: adminEmail,
        password: hashedPassword,
        role: "super-admin"
      });

      await admin.save();
      console.log(` Super Admin user created: ${adminEmail}`);
    } else {
      console.log("super admin already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

module.exports = seedAdmin;
