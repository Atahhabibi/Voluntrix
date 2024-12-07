const Admin = require("../monogdb/modals/AdminSchema");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    // Super Admin Credentials
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    const superAdminUsername = process.env.SUPER_ADMIN_USER_NAME;

    // Additional Admin Credentials
    const admins = [
      {
        email: process.env.ADMIN_1_EMAIL,
        password: process.env.ADMIN_1_PASSWORD,
        username: process.env.ADMIN_1_USER_NAME,
        role: "admin"
      },
      {
        email: process.env.ADMIN_2_EMAIL,
        password: process.env.ADMIN_2_PASSWORD,
        username: process.env.ADMIN_2_USER_NAME,
        role: "admin"
      }
    ];

    // Create Super Admin
    const existingSuperAdmin = await Admin.findOne({
      $or: [{ username: superAdminUsername }, { email: superAdminEmail }]
    });

    if (!existingSuperAdmin) {
      const hashedPassword =await  bcrypt.hash(superAdminPassword, 10);
      const superAdmin = new Admin({
        username: superAdminUsername,
        email: superAdminEmail,
        password: hashedPassword,
        role: "super-admin"
      });

      await superAdmin.save();
      console.log(`Super Admin created: ${superAdminEmail}`);
    } else {
      console.log("Super Admin already exists.");
    }

    // Create Other Admins
    for (const adminData of admins) {
      const existingAdmin = await Admin.findOne({
        $or: [{ username: adminData.username }, { email: adminData.email }]
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        const admin = new Admin({
          username: adminData.username,
          email: adminData.email,
          password: hashedPassword,
          role: adminData.role
        });

        await admin.save();
        console.log(`Admin created: ${adminData.email}`);
      } else {
        console.log(`Admin already exists: ${adminData.email}`);
      }
    }
  } catch (error) {
    console.error("Error seeding admin users:", error);
  }
};

module.exports = seedAdmin;
