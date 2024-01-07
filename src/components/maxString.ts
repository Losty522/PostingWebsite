export default function truncateString(str: string, maxLength: number) {
  if (!str) return ""; // Handle null or undefined case
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
