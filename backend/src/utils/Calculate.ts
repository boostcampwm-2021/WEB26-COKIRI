/* eslint import/prefer-default-export: 0 */

class Calculate {
  calculateLanguage = (languageData: any) => {
    const total = (Object.values(languageData) as number[]).reduce((acc, cur) => acc + cur);
    const result = languageData;
    Object.entries(result).forEach(([key, value]) => {
      result[key] = +(((value as number) / total) * 100).toFixed(2);
    });
    return result;
  };
}

export default new Calculate();
