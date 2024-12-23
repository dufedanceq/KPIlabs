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

const numbers = [5, 12, 8, 130, 44];
asyncFilterPromise(numbers, greaterThan10).then((result) =>
  console.log("Filtered Numbers:", result)
);

function isEvenWithDelay(num) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(num % 2 === 0), 100)
  );
}

const items = [1, 2, 3, 4, 5];
asyncFilterDebouncePromise(items, isEvenWithDelay, 200).then((result) =>
  console.log("Filtered Evens with Debounce:", result)
);
