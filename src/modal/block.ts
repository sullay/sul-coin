
import * as cryptoJs from 'crypto-js'
import blockchain from './blockchain';

export default class Block {
  constructor(public index: number, public hash: string, public previousHash: string,
    public timestamp: number, public data: string) {
  }
  // 验证区块结构是否有效
  isVaidStructure() {
    return typeof this.index === 'number'
      && typeof this.hash === 'string'
      && typeof this.previousHash === 'string'
      && typeof this.timestamp === 'number'
      && typeof this.data === 'string'
  }
  // 验证hash
  isVaildHash(): boolean {
    return this.hash === Block.calculateHash(this.index, this.previousHash, this.timestamp, this.data);
  }
  // 验证前一个区块
  isVaildPreviousBlock(previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== this.index) return false;
    if (previousBlock.hash !== this.previousHash) return false;
    return true;
  }
  // 验证区块是否有效
  isVaild(previousBlock: Block): boolean {
    return this.isVaidStructure() && this.isVaildHash && this.isVaildPreviousBlock(previousBlock);
  }
  // 第一个block
  static readonly firstBlock: Readonly<Block> = new Block(0, 'd074bb799bdd3ca7c19a14ceb6f5a7f451decfce2199d9fc2992b0fddc527e40', null, 1652347167272, 'first block');
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
