export function generateId(array: any): number{
  const usedIds = new Set(array.map((item: any) => item.id));
  let randomId = Math.floor(Math.random() * 99) + 1;

  if (!usedIds.has(randomId)) {
      return randomId;
  } else {
      return generateId(array);
  }
}
