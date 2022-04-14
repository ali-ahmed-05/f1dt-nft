// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");
const  data  = require("./NFTIds");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
  
  let nFT
  let contractAddress = "0x8Eb6B4D40D35243352aBAD59BFDB27a161F3Bdc1"

  const [deployer,per1,per2] = await ethers.getSigners();

  
const DeltaTimeInventory = await ethers.getContractFactory("DeltaTimeInventory", {
    libraries: {
        Bytes: "0x90B72a8a1259f3Cd493670639E03fdabF252560b",
    },
  });
   nFT = await DeltaTimeInventory.attach(contractAddress)     



    let shortHexString = '0x0'
    const padded = ethers.utils.hexZeroPad(shortHexString, 32)


    for(let i = 0 ; i<data.ids.length ; i++){
         let id = ethers.BigNumber.from(data.ids[i]);
        
         let mint = await nFT.mintNonFungible(deployer.getAddress(),id,padded,true)
         await mint.wait()
    }


}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby