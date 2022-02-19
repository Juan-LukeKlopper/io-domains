require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.10",
  networks: {
		mumbai: {
      url: ALCHEMY_MUMBAI_URL,
      accounts: [PRIVATE_KEY],
		},
    mainnet: {
      
    }
  }
};
