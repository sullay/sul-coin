import Block from "./block"

class BlockChain {
  // 区块链
  public list: Block[] = [Block.firstBlock];
  // 获取最后一个block
  getLatestBlock(): Block {
    return this?.list[this.list.length - 1]
  }
  isValid(): boolean {
    if (!this?.list.length) return false;
    let firstBlock = this.list[0];
    if (firstBlock.index !== Block.firstBlock.index) return false;
    if (firstBlock.previousHash !== Block.firstBlock.previousHash) return false;
    if (firstBlock.timestamp !== Block.firstBlock.timestamp) return false;
    if (firstBlock.data !== Block.firstBlock.data) return false;
    if (firstBlock.hash !== Block.firstBlock.hash) return false;

    for (let i = 1; i < this.list.length; i++) {
      if (!this.list[i].isVaild(this.list[i - 1])) return false;
    }
    return true;
  }
}

export default new BlockChain();