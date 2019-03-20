export const breakString = (string) => {
  if (string.length > 30) {
    const limitedText = string.slice(0, 30);

    return `— ${limitedText} ...`;
  }

  return `— ${string}`;
};
