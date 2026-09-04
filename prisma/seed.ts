import { prisma } from "@/lib/prisma";
import posts from "./posts.json";


async function main() {
  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });

  console.log(`${posts.length} posts inserted`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });