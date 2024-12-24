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

## [Task 3](https://github.com/dufedanceq/KPIlabs/blob/main/lab3.js)
В цьому завданні я використав код з завдання №1, в який я додав AbortController для управління скасуваннями фільтрації (Для кожної операції фільтрації я свторив окремий AbortController). Метод .abort() викликається через заданий час за допомогою setTimeout. Також, виклики функції asyncFilter та asyncFilterDebounce передають додатковий параметр signal з AbortController.

## [Task 4](https://github.com/dufedanceq/KPIlabs/blob/main/lab4.js)
У цьому завданні я використав асинхронний ітератор chunkIterator, який розбиває масив на менші чанки (розмір задається в chunkSize). processChunks приймає масив, asyncCallback та chunkSize, потім проходить через кожен чанк, оброблюючи кожен елемент чанку за допомогою asyncCallback та збирає результати, які додаються в масив з результатами.

### Demo 
Створюється масив [1, 2, 3, ..., 100] Переданий масив розбивається на чанки по 10 елементів. Викликається функція processChunks для того щоб обробити цей масив за допомогою asyncCallback з затримкою в 300мс за допомогою setTimeout. Результат збирається в масив з результатами та виводиться у консоль.

## [Task 5](https://github.com/dufedanceq/KPIlabs/blob/main/lab5.js)
У цьому завданні я створив клас Task який приймає айді, час виконання та статус (aborted, completed, failed або running). За допомогою EventEmmiter створив об'єкт для управління іентами. Коли конкретна(taskId) задача отримує івент "startTask", то вона запускається методом start(). При отриманні івенту "abortAll" всі задачі які перебували в статусі running скасовуються. Якщо задача виконалась успішко, вона переходить у статус completed. Якщо виконання завдання переривається (івентом "abortAll"), то всі задачі які знаходяться у статусі running будуть переведені у статус aborted. Якщо під час виконання завдання виникла помилка, то буде встановлено статус failed.

### Demo

У асинхроннії функції створюється eventEmitter та декілька задач (з різним часом виконання). Через 1500мс всі задачі будуть скасовані івентом "abortAll". Завдання з айді 1 та 3 встигають виконатись, тому що їх час виконання становить <1500мс, а задача з айді 2 буде скасована, так як її час виконання становить 2000мс.
