// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建一些用户
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: 'password1',
      email: 'user1@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: 'password2',
      email: 'user2@example.com',
    },
  });

  // 创建一些数据集
  const dataset1 = await prisma.dataset.create({
    data: {
      name: 'Dataset 1',
      description: 'This is the first dataset',
      size: 1048576,
      price: 10.99,
      category: 'Category A',
      uploadedBy: user1.id,
    },
  });

  const dataset2 = await prisma.dataset.create({
    data: {
      name: 'Dataset 2',
      description: 'This is the second dataset',
      size: 2097152,
      price: 20.99,
      category: 'Category B',
      uploadedBy: user2.id,
    },
  });

  // 创建一些交易记录
  await prisma.transaction.create({
    data: {
      userId: user1.id,
      datasetId: dataset2.id,
      amount: 20.99,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user2.id,
      datasetId: dataset1.id,
      amount: 10.99,
    },
  });

  // 创建一些模型性能数据
  await prisma.modelPerformance.create({
    data: {
      datasetId: dataset1.id,
      modelName: 'Model 1',
      performanceMetric: 'accuracy',
      value: 0.95,
    },
  });

  await prisma.modelPerformance.create({
    data: {
      datasetId: dataset2.id,
      modelName: 'Model 2',
      performanceMetric: 'f1-score',
      value: 0.85,
    },
  });
}

main()
  .then(() => {
    console.log('Seed data created successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });