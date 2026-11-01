export function HashMap() {
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

  const set = (key, value) => {
    let bucketIndex = hash(key);
    const entry = { key: key, value: value };
    if (buckets[bucketIndex] === undefined) {
      buckets[bucketIndex] = [];
    }
    for (const bucketKey of buckets[bucketIndex]) {
      if (entry.key === bucketKey.key) {
        bucketKey.value = entry.value;
        return;
      }
    }
    const savedEntries = entries();
    if (length() + 1 > capacity * loadFactor) {
      capacity = capacity * 2;
      buckets.length = capacity;
      clear();
      for (const entry of savedEntries) {
        set(entry[0], entry[1]);
      }
      bucketIndex = hash(key);
      if (buckets[bucketIndex] === undefined) {
        buckets[bucketIndex] = [];
      }
    }
    buckets[bucketIndex].push(entry);
  };

  const get = (key) => {
    const bucketIndex = hash(key);
    if (buckets[bucketIndex] === undefined) {
      return undefined;
    }
    for (const bucketKey of buckets[bucketIndex]) {
      if (key === bucketKey.key) {
        return bucketKey.value;
      }
    }
  };

  const has = (key) => {
    const bucketIndex = hash(key);
    if (buckets[bucketIndex] === undefined) {
      return false;
    }
    for (const bucketKey of buckets[bucketIndex]) {
      if (key === bucketKey.key) {
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
      if (key === bucketKey.key) {
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
          keyArray.push(object.key);
        }
      }
    }
    return keyArray;
  };

  const values = () => {
    const valueArray = [];
    for (const bucket of buckets) {
      if (bucket) {
        for (const object of bucket) {
          valueArray.push(object.value);
        }
      }
    }
    return valueArray;
  };

  const entries = () => {
    const entriesArray = [];
    for (const bucket of buckets) {
      if (bucket) {
        for (const object of bucket) {
          entriesArray.push([object.key, object.value]);
        }
      }
    }
    return entriesArray;
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
