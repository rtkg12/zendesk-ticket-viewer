const colors = ['blue', 'red', 'yellow', 'green', 'kale'];

const hashCode = (string: string): number => {
  let hash = 0;
  if (string.length === 0) {
    return hash;
  }
  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// Using hashCode for string to get tag colors
const getTagColor = (string: string): string => {
  const index = Math.abs(hashCode(string)) % colors.length;
  return colors[index];
};

export default getTagColor;
