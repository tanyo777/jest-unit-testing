import axios from 'axios';
import { v4 } from 'uuid';

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
};

export function calculateComplexity(stringInfo: stringInfo): number {
  return stringInfo.length * stringInfo.characters.length;
}

export function toUpperCaseWithId(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

export async function getUser() {
  return await axios.get('/user/1');
}
