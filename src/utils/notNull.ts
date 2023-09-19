function notNull(obj: any): any {
  const newObj: any = {};

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

export default notNull;
