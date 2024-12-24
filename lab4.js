async function* chunkIterator(array, chunkSize) {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}

async function processChunks(array, asyncCallback, chunkSize = 5) {
  const results = [];
  for await (const chunk of chunkIterator(array, chunkSize)) {
    const chunkResult = await Promise.all(
      chunk.map((item) => asyncCallback(item))
    );
    results.push(...chunkResult);
  }

  return results;
}

async function demoTask() {
  const largeDataset = Array.from({ length: 100 }, (_, i) => i + 1);

  const asyncCallback = async (n) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`${n} Proceeded`), 300)
    );
  };

  const results = await processChunks(largeDataset, asyncCallback, 10);
  console.log("Task Result:", results);
}

demoTask();
