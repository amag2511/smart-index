export const promisify = (f: Function) => {
  return (...params: any[]) =>
    new Promise<any>((resolve, reject) => {
      f.apply(this, [
        ...params,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        },
      ]);
    });
};
