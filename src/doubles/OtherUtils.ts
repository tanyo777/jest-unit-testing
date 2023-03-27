export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
};

export function calculateComplexity(stringInfo: stringInfo): number {
  return stringInfo.length * stringInfo.characters.length;
}
