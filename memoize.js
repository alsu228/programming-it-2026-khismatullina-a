
function sumOfDigits (n) {
    if (n === 0) return 0;
    return (n % 10) + sumOfDigits (Math.floor(n / 10));
}

function memoizedSumOfDigits() {
    const cache = new Map();
    let callCount = 0;

    return function(n) {
        callCount++;

         if (cache.has(n)) {
            console.log(`  Из кэша для ${n}, всего вызовов: ${callCount}`);
            return cache.get(n);
         }
        const result = (n === 0) ? 0 : (n % 10) + arguments.callee(n / 10 | 0); 
        cache.set(n, result);
    console.log(`  Вычислено для ${n}, всего вызовов: ${callCount}`);
    return result;
    };
}

console.log("=== Обычная рекурсия (каждый вызов пересчитывает всё заново) ===");
console.log("sumOfDigits(123):", sumOfDigits(1903));
console.log("sumOfDigits(123):", sumOfDigits(1903));

console.log("\n=== Мемоизированная версия (кэш + счётчик) ===");
const memoSum = memoizedSumOfDigits();
console.log("memoSum(123):", memoSum(1903));
console.log("memoSum(123):", memoSum(1903));
console.log("memoSum(98765):", memoSum(26789));
console.log("memoSum(10):", memoSum(10));
console.log("memoSum(0):", memoSum(0));