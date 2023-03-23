export interface stringInfo {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
}

export default class Utils {
  toUpperCase = (value: string) => {
    return value.toUpperCase();
  };

  getStringInfo = (value: string): stringInfo => {
    return {
      lowerCase: value.toLowerCase(),
      upperCase: value.toUpperCase(),
      characters: value.split(''),
      length: value.length,
    };
  };
}
