# KPIlabs
Репозиторій для асинхронної здачі лабораторних робіт студента групи ІМ-34 Никифорова Артема

## [Task 1](https://github.com/dufedanceq/KPIlabs/blob/main/lab1.js)
Я використав функції asyncFilter для фільтрації масиву асинхронно. asyncFilter використовує map для асинхронного застосування колбеку до кожного елементу масиву, а потім фільтрує масив за результатами отриманими від колбеку. Функція asyncFilterDebounce додає механізм дебаунса (як було зазначено у додатковому завданні), який затримує виконання колбеку, якщо останній виконується занадто швидко, використовуючи параметр debounceTime.

### Demo 1
В цьому прикладі я фільтрую масив чисел, залишаючи лише ті, які більше від 10. Функція greaterThan10 перевіряє цю умову. Результати збираються у масив result (true, якщо число быльше за 10 та false, якщо меньше).

### Demo 2
В цьому прикладі я фільтрую масив чисел залишаючь лише парні числа, використовуючи функцію з дебаунсом. Для цього використав функцію isEvenWithDelay, котра перевіряє чи є число парним та впроваджує затримку 100мс. Параметр debounceTime встановлює затримку в 200мс. Якщо функція виконується менше ніж за 200мс, то вона буде затримана.

## [Task 2](https://github.com/dufedanceq/KPIlabs/blob/main/lab2.js)
До функцій з першої лабораторної були додані функції:
- якя працюють з Promise без використання async/await (asyncFilterPromise, asyncFilterDebouncePromise, asyncFilterParallelPromise(дозволяє фільтрувати елементи паралельно, обмежуючи кількість паралельно оброблювальних елементів)).
- функції фільтрації з паралелізмом (asyncFilterParallelPromise (використовує чисті Promise для реалізації паралелізму) та asyncFilterParallelAwait (використовує async/await для реалізації паралелізму).

  
asyncFilterPromise та asyncFilterAwait демонструють базову фільтрацію.

asyncFilterDebouncePromise та asyncFilterDebounceAwait демонструють Debounce фільтрацію.

asyncFilterParallelPromise та asyncFilterParallelAwait демонструють фільтрацію з обмеженнями паралелізму.

## [Task 3](https://github.com/dufedanceq/KPIlabs/blob/main/lab2.js)
В цьому завданні я використав код з завдання №1, в який я додав AbortController для управління скасуваннями фільтрації (Для кожної операції фільтрації я свторив окремий AbortController). Метод .abort() викликається через заданий час за допомогою setTimeout. Також, виклики функції asyncFilter та asyncFilterDebounce передають додатковий параметр signal з AbortController.

## Task 4
