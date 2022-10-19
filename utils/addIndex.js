export default function addIndex(arr) {
  const newArr = arr.map((item, idx) => ({ ...item, id: idx + 1 }));
  return newArr;
}
