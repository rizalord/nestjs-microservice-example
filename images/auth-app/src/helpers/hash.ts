import * as bcrypt from 'bcrypt';

export namespace Hash {
  export function encrypt(text: string): string {
    try {
      const salt = bcrypt.genSaltSync();

      return bcrypt.hashSync(text, salt);
    } catch (error) {
      throw new Error(error);
    }
  }

  export function compare(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
