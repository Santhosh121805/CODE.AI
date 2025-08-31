import Web3 from "web3";

const web3 = new Web3(process.env.RPC_URL); // e.g., Infura or local node

export const callContract = async (contractAddress, abi, methodName, params = []) => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  return await contract.methods[methodName](...params).call();
};
