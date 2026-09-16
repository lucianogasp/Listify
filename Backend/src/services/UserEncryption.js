import bcrypt from 'bcrypt';

export class UserEncryption {

  constructor() {
    this.saltRounds = 10;
  }

  async asyncGenerateHash(data) {
    return await bcrypt.hash(data, this.saltRounds);
  }

  async asyncCompareHash(dataToCompare, hashComparison) {
    return await bcrypt.compare(dataToCompare, hashComparison);
  }
}