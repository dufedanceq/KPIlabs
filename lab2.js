function asyncFilterPromise(array, asyncCallback) {
  return Promise.all(array.map(asyncCallback)).then((results) => {
    return array.filter((_, index) => results[index]);
  });
}

function asyncFilterDebouncePromise(array, asyncCallback, debounceTime = 0) {
  let lastExecutionTime = 0;

  const debouncedCallback = (item, index) => {
    const now = Date.now();
    const delay = Math.max(0, debounceTime - (now - lastExecutionTime));
    return new Promise((resolve) => {
      setTimeout(() => {
        lastExecutionTime = Date.now();
        resolve(asyncCallback(item, index));
      }, delay);
    });
  };

  return asyncFilterPromise(array, debouncedCallback);
}

function greaterThan10(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num > 10), 100));
}

function isEvenWithDelay(num) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(num % 2 === 0), 100)
  );
}

function asyncFilterParallelPromise(array, asyncCallback, maxParallel = 3) {
  const results = [];
  let index = 0;

  function processNext() {
    if (index >= array.length) return Promise.resolve(results);

    const item = array[index++];
    return asyncCallback(item, index - 1).then((result) => {
      results.push(result);
      if (index < array.length) return processNext();
    });
  }

  const pool = Array.from({ length: maxParallel }).map(processNext);
  return Promise.all(pool).then(() => array.filter((_, i) => results[i]));
}

async function asyncFilterAwait(array, asyncCallback) {
  const results = await Promise.all(array.map(asyncCallback));
  return array.filter((_, index) => results[index]);
}

async function asyncFilterDebounceAwait(array, asyncCallback, debounceTime = 0) {
  let lastExecutionTime = 0;

  const debouncedCallback = async (item, index) => {
    const now = Date.now();
    const delay = Math.max(0, debounceTime - (now - lastExecutionTime));
    await new Promise((resolve) => setTimeout(resolve, delay));
    lastExecutionTime = Date.now();
    return asyncCallback(item, index);
  };

  return asyncFilterAwait(array, debouncedCallback);
}

async function asyncFilterParallelAwait(array, asyncCallback, maxParallel = 3) {
  const results = [];
  let index = 0;

  const processNext = async () => {
    if (index >= array.length) return results;

    const item = array[index++];
    const result = await asyncCallback(item, index - 1);
    results.push(result);
    if (index < array.length) return processNext();
  };

  const pool = Array.from({ length: maxParallel }).map(processNext);
  await Promise.all(pool);
  return array.filter((_, i) => results[i]);
}

const numbers = [5, 12, 8, 130, 44];

asyncFilterPromise(numbers, greaterThan10).then((result) =>
  console.log("Filtered Numbers with Promises:", result)
);

const items = [1, 2, 3, 4, 5];

asyncFilterDebouncePromise(items, isEvenWithDelay, 200).then((result) =>
  console.log("Filtered Evens with Debounce (Promises):", result)
);

asyncFilterParallelPromise(numbers, greaterThan10, 2).then((result) =>
  console.log("Filtered Numbers with Parallelism (Promises):", result)
);

asyncFilterAwait(numbers, greaterThan10).then((result) =>
  console.log("Filtered Numbers with Async/Await:", result)
);

asyncFilterDebounceAwait(items, isEvenWithDelay, 200).then((result) =>
  console.log("Filtered Evens with Debounce (Async/Await):", result)
);

asyncFilterParallelAwait(numbers, greaterThan10, 2).then((result) =>
  console.log("Filtered Numbers with Parallelism (Async/Await):", result)
);
