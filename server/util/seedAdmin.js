const User = require("../monogdb/modals/userSchema");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });

      await admin.save();
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};


module.exports=seedAdmin; 