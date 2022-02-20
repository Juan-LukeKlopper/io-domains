const hre = require("hardhat");

async function main() {
  const domainContractFactory = await hre.ethers.getContractFactory("DomainNameService");
  const domainContract = await domainContractFactory.deploy("io");
  await domainContract.deployed();
 
  console.log("Custom Domain service has been deployed to: ", domainContract.address);

  let txn = await domainContract.register("Luke", {value: hre.ethers.utils.parseEther('1')});
  await txn.wait();
  console.log("Contract was registered sucessfully!");


  txn = await domainContract.setRecord("Luke","Hello world applications might not seem like much, but they can lead to exceptional things.");
  await txn.wait();
  console.log("Record has been set!");

  const address = await domainContract.getAddress("Luke");
  console.log("Owner of the Luke.io address: ",address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance : ", hre.ethers.utils.formatEther(balance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
