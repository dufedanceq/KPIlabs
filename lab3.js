async function asyncFilter(array, asyncCallback, signal) {
  const results = [];
  for (let i = 0; i < array.length; i++) {
    if (signal?.aborted) {
      throw new Error('Operation aborted');
    }
    results.push(await asyncCallback(array[i], i));
  }
  return array.filter((_, index) => results[index]);
}

async function asyncFilterDebounce(array, asyncCallback, debounceTime = 0) {
  let lastExecutionTime = 0;

  const debouncedCallback = async (item, index) => {
    const now = Date.now();
    const delay = Math.max(0, debounceTime - (now - lastExecutionTime));
    await new Promise((resolve) => setTimeout(resolve, delay));
    lastExecutionTime = Date.now();
    return asyncCallback(item, index);
  };

  return asyncFilter(array, debouncedCallback);
}

async function greaterThan10(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num > 10), 100));
}

const numbers = [5, 12, 8, 130, 44];
asyncFilter(numbers, greaterThan10).then((result) =>
  console.log("Filtered Numbers:", result)
);

async function isEvenWithDelay(num) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(num % 2 === 0), 100)
  );
}

const items = [1, 2, 3, 4, 5];
asyncFilterDebounce(items, isEvenWithDelay, 200).then((result) =>
  console.log("Filtered Evens with Debounce:", result)
);
