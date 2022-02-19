const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory("DomainNameService");
  const domainContract = await domainContractFactory.deploy("io");
  await domainContract.deployed();
 
  console.log("IODomain service has been deployed to:", domainContract.address);
  console.log("The contract was deployed by: ", owner.address);

  let txn = await domainContract.register("Luke", {value: hre.ethers.utils.parseEther('0.7')});
  await txn.wait();

  let domainOwner = await domainContract.getAddress("Luke");
  console.log("The owner of new domain: ", domainOwner);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  /*txn = await domainContract.setRecord("Luke","Hello world applications might not seem like much, but they can lead to exceptional things");
  await txn.wait();

  txn = await domainContract.connect(randomPerson).register("Tyson");
  await txn.wait();

  txn = await domainContract.connect(randomPerson).setRecord("Tyson","Web3 is really awesome!");
  await txn.wait();

  txn = await domainContract.connect(randomPerson).setRecord("Luke","haha im changing something that isn't mine");
  await txn.wait();*/
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
