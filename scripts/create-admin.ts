import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@elresala.com";
  const newPassword = "12345678";

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.admin.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log("=================================");
  console.log("Password reset successfully");
  console.log("Email:", email);
  console.log("Password:", newPassword);
  console.log("=================================");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });