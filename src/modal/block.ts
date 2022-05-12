
import * as cryptoJs from 'crypto-js'
import blockchain from './blockchain';

export default class Block {
  constructor(public index: number, public hash: string, public previousHash: string,
    public timestamp: number, public data: string) {
  }
  // 第一个block
  static firstBlock = new Block(0, 'd074bb799bdd3ca7c19a14ceb6f5a7f451decfce2199d9fc2992b0fddc527e40', null, 1652347167272, 'first block');
  // 计算hash
  static calculateHash(index: number, previousHash: string, timestamp: number, data: string): string {
    return cryptoJs.SHA256(index + previousHash + timestamp + data).toString();
  }
  // 生成block
  static createNextBlock(data: string): Block {
    const previousBlock = blockchain.getLatestBlock();
    const index: number = previousBlock.index + 1;
    const timestamp: number = Date.now();
    const hash = Block.calculateHash(index, previousBlock.previousHash, timestamp, data);
    return new Block(index, hash, previousBlock.hash, timestamp, data);
  }
}
