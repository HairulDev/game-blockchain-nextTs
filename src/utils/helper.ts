export const isEmpty = (obj: any): boolean => {
  try {
    let json: any = {};
    let arr: any[] = [];
    if (
      obj === null ||
      obj === '' ||
      // obj === {} ||
      obj === undefined ||
      ((json.constructor === obj.constructor || arr.constructor === obj.constructor) &&
        Object.keys(obj).length === 0) ||
      (obj && obj.length === 0)
    ) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return true;
  }
};
