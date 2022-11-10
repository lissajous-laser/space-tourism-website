
export function kebabCase(str: string) {
  return str.replace(/ /g, '-').toLowerCase();
}