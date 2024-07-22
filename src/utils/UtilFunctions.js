const capitalizeFirst = (word) => {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
};

const toKebabCase = (str) => {
  return str
    .split(" ") // Step 1: Split based on uppercase letters, spaces, and underscores
    .join("-") // Step 2: Join with hyphens
    .toLowerCase(); // Step 3: Convert to lowercase
};

export { capitalizeFirst, toKebabCase };
