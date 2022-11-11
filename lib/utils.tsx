export function kebabCase(str: string) {
  return str.replace(/ /g, '-').toLowerCase();
}

export function join(...strs: string[]) {
  return strs.join(' ');
}