class URLParser {
  splitObjectUrl = (objectUrl: string): string => objectUrl.split('cocoo/')[1];
}

export default new URLParser();
