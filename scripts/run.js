const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
 
  console.log("Domain service deployed to:", domainContract.address);
  console.log("Contract deployed by: ", owner.address);

  let txn = await domainContract.register("doom");
  await txn.wait();

  let domainOwner = await domainContract.getAddress("doom");
  console.log("owner of domain: ", domainOwner);

  txn = await domainContract.connect(randomPerson).setRecord("Doom","haha im changing something that isn't mine");
  await txn.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
