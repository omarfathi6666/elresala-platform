import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@elresala.com";

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    console.log("=================================");
    console.log("Admin already exists");
    console.log("Email:", email);
    console.log("=================================");
    return;
  }

  const hashedPassword = await bcrypt.hash("12345678", 12);

  await prisma.admin.create({
    data: {
      name: "Admin",
      email,
      password: hashedPassword,
    },
  });

  console.log("=================================");
  console.log("Admin created successfully");
  console.log("Email:", email);
  console.log("Password: 12345678");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });