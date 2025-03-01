import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await prisma.user.createMany({
    data: [
      { id: "user1", name: "John Doe", email: "john@example.com", password: "hashedpassword1" },
      { id: "user2", name: "Jane Smith", email: "jane@example.com", password: "hashedpassword2" },
      { id: "user3", name: "Alice Johnson", email: "alice@example.com", password: "hashedpassword3" },
      { id: "user4", name: "Bob Brown", email: "bob@example.com", password: "hashedpassword4" },
      { id: "user5", name: "Emma Davis", email: "emma@example.com", password: "hashedpassword5" },
    ],
    skipDuplicates: true, // Prevents duplicate users from being created
  });

  // Create blogs
  await prisma.blog.createMany({
    data: [
      {
        title: "The Future of AI in Tech",
        desc: "Artificial Intelligence is rapidly evolving, transforming industries and creating new opportunities. Learn about the latest trends and innovations in AI.",
        authorId: "user1",
        publish: true,
        createdAt: new Date("2025-02-14"),
      },
      {
        title: "Blockchain Beyond Cryptocurrency",
        desc: "Blockchain technology is more than just cryptocurrency. Discover how it's being used in supply chain management, voting systems, and more.",
        authorId: "user2",
        publish: true,
        createdAt: new Date("2025-02-13"),
      },
      {
        title: "Quantum Computing Explained",
        desc: "Quantum computing promises to solve complex problems that are currently beyond the reach of classical computers. Dive into the basics of quantum computing.",
        authorId: "user3",
        publish: true,
        createdAt: new Date("2025-02-12"),
      },
      {
        title: "Cybersecurity in the Modern Era",
        desc: "As technology advances, so do cyber threats. Explore the latest in cybersecurity measures and how to protect your digital assets.",
        authorId: "user4",
        publish: true,
        createdAt: new Date("2025-02-11"),
      },
      {
        title: "The Impact of 5G Technology",
        desc: "5G technology is set to revolutionize communication and data transfer. Learn about its potential impact on various industries.",
        authorId: "user5",
        publish: true,
        createdAt: new Date("2025-02-10"),
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
