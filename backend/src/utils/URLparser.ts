class URLparser {
  splitObjectUrl = (objectUrl: string): string => objectUrl.split('cocoo/')[1];
}

export default new URLparser();
