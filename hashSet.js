export function HashSet() {
  let capacity = 16;
  const loadFactor = 0.75;
  const buckets = [];
  buckets.length = capacity;
  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  };
  const set = (key) => {
    let bucketIndex = hash(key);
    if (buckets[bucketIndex] === undefined) {
      buckets[bucketIndex] = [];
    }
    for (const bucketKey of buckets[bucketIndex]) {
      if (key === bucketKey) {
        return;
      }
    }
    const savedEntries = keys();
    if (length() + 1 > capacity * loadFactor) {
      capacity = capacity * 2;
      buckets.length = capacity;
      clear();
      for (const entry of savedEntries) {
        set(entry);
      }
      bucketIndex = hash(key);
      if (buckets[bucketIndex] === undefined) {
        buckets[bucketIndex] = [];
      }
    }
    buckets[bucketIndex].push(key);
  };

  const has = (key) => {
    const bucketIndex = hash(key);
    if (buckets[bucketIndex] === undefined) {
      return false;
    }
    for (const bucketKey of buckets[bucketIndex]) {
      if (key === bucketKey) {
        return true;
      }
    }
    return false;
  };

  const remove = (key) => {
    const bucketIndex = hash(key);
    if (buckets[bucketIndex] === undefined) {
      return false;
    }
    let count = 0;
    for (const bucketKey of buckets[bucketIndex]) {
      if (key === bucketKey) {
        buckets[bucketIndex].splice(count, 1);
        return true;
      }
      count++;
    }
    return false;
  };

  const length = () => {
    let count = 0;
    for (const bucket of buckets) {
      if (bucket) {
        count += bucket.length;
      }
    }
    return count;
  };

  const clear = () => {
    for (const bucket of buckets) {
      if (bucket) {
        bucket.length = 0;
      }
    }
  };

  const keys = () => {
    const keyArray = [];
    for (const bucket of buckets) {
      if (bucket) {
        for (const object of bucket) {
          keyArray.push(object);
        }
      }
    }
    return keyArray;
  };

  return {
    hash,
    set,
    has,
    remove,
    length,
    clear,
    keys,
  };
}
