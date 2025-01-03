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

async function asyncFilterDebounce(array, asyncCallback, debounceTime = 0, signal) {
  let lastExecutionTime = 0;

  const debouncedCallback = async (item, index) => {
    if (signal?.aborted) {
      throw new Error('Operation aborted');
    }

    const now = Date.now();
    const delay = Math.max(0, debounceTime - (now - lastExecutionTime));
    await new Promise((resolve) => setTimeout(resolve, delay));
    lastExecutionTime = Date.now();
    return asyncCallback(item, index);
  };

  return asyncFilter(array, debouncedCallback, signal);
}

async function greaterThan10(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num > 10), 100));
}

const numbers = [5, 12, 8, 130, 44];
const controller1 = new AbortController();
asyncFilter(numbers, greaterThan10, controller1.signal)
  .then((result) => console.log("Filtered Numbers:", result))
  .catch((err) => console.log("Error:", err.message));

async function isEvenWithDelay(num) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(num % 2 === 0), 100)
  );
}

const items = [1, 2, 3, 4, 5];
const controller2 = new AbortController();
asyncFilterDebounce(items, isEvenWithDelay, 200, controller2.signal)
  .then((result) => console.log("Filtered Evens with Debounce:", result))
  .catch((err) => console.log("Error:", err.message));

setTimeout(() => {
  console.log("Aborting operation for numbers...");
  controller1.abort();
}, 500);

setTimeout(() => {
  console.log("Aborting operation for items...");
  controller2.abort();
}, 700);

