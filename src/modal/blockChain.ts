import Block from "./block"

class BlockChain {
  // 区块链
  public list: Block[] = [Block.firstBlock];
  // 获取最后一个block
  getLatestBlock(): Block {
    return this.list[this.list.length - 1]
  }
}

export default new BlockChain();