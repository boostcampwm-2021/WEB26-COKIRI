/* eslint import/prefer-default-export: 0 */

class Urlparser {
  splitObjectUrl = (objectUrl: string): string => objectUrl.split('cocoo/')[1];
}

export default new Urlparser();
