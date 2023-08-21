function updateProperty<T, K extends keyof T>(
  object: T,
  value: any,
  propertyPath: string,
): T {
  const keys = propertyPath.split('.');
  let updatedObject: any = { ...object };

  let currentObject = updatedObject;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as K;
    if (currentObject[key] === undefined) {
      currentObject[key] = {};
    }
    currentObject = currentObject[key];
  }

  currentObject[keys[keys.length - 1] as K] = value;

  return updatedObject as T;
}

export default updateProperty;
