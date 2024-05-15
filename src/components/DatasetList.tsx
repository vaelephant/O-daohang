// components/DatasetList.tsx
import React from 'react';

type Dataset = {
  id: number;
  name: string;
  description?: string;
  size: bigint;
  price: number;
  category?: string;
  createdAt: string;
  user: { username: string };
  transactions: { id: number }[];
  modelPerformances: { modelName: string; performanceMetric: string; value: number }[];
};

const DatasetList = ({ datasets }: { datasets: Dataset[] }) => {
  return (
    <div>
      <h1>Data Market</h1>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>
            <h2>{dataset.name}</h2>
            <p>{dataset.description}</p>
            <p>Size: {dataset.size} bytes</p>
            <p>Price: ${dataset.price}</p>
            <p>Category: {dataset.category}</p>
            <p>Uploaded by: {dataset.user.username}</p>
            <p>Transactions: {dataset.transactions.length}</p>
            <h3>Model Performances</h3>
            <ul>
              {dataset.modelPerformances.map((performance) => (
                <li key={performance.modelName}>
                  {performance.modelName}: {performance.performanceMetric} - {performance.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetList;