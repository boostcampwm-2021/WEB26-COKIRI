class Query {
  objectToQuery(queryObject: { [key: string]: string | undefined }): string {
    return Object.keys(queryObject)
      .reduce((prev: string, curr: string) => `${prev}${curr}=${queryObject[curr]}&`, '')
      .slice(0, -1);
  }
}

export default new Query();
