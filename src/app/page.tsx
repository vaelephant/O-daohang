// app/page.tsx
import { PrismaClient } from '@prisma/client';
import DatasetList from '../components/DatasetList';

const prisma = new PrismaClient();

const getDatasets = async () => {
  const datasets = await prisma.dataset.findMany({
    include: {
      user: true,
      transactions: true,
      modelPerformances: true,
    },
  });
  return datasets;
};

export default async function Page() {
  const datasets = await getDatasets();
  return <DatasetList datasets={datasets} />;
}