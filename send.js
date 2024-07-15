const { ethers } = require('ethers');
require('dotenv').config()
const contractABI = [
   {
      "inputs": [
         {
            "internalType": "uint16",
            "name": "networkId",
            "type": "uint16"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "internalType": "struct TssKey[]",
            "name": "keys",
            "type": "tuple[]"
         }
      ],
      "stateMutability": "payable",
      "type": "constructor"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
         },
         {
            "indexed": false,
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
         }
      ],
      "name": "GmpCreated",
      "type": "event"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "indexed": true,
            "internalType": "address",
            "name": "dest",
            "type": "address"
         },
         {
            "indexed": false,
            "internalType": "uint256",
            "name": "status",
            "type": "uint256"
         },
         {
            "indexed": false,
            "internalType": "bytes32",
            "name": "result",
            "type": "bytes32"
         }
      ],
      "name": "GmpExecuted",
      "type": "event"
   },
   {
      "anonymous": false,
      "inputs": [
         {
            "indexed": true,
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "indexed": false,
            "internalType": "struct TssKey[]",
            "name": "revoked",
            "type": "tuple[]"
         },
         {
            "components": [
               {
                  "internalType": "uint8",
                  "name": "yParity",
                  "type": "uint8"
               },
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               }
            ],
            "indexed": false,
            "internalType": "struct TssKey[]",
            "name": "registered",
            "type": "tuple[]"
         }
      ],
      "name": "KeySetChanged",
      "type": "event"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "source",
            "type": "bytes32"
         },
         {
            "internalType": "uint16",
            "name": "networkId",
            "type": "uint16"
         }
      ],
      "name": "depositOf",
      "outputs": [
         {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "e",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "s",
                  "type": "uint256"
               }
            ],
            "internalType": "struct Signature",
            "name": "signature",
            "type": "tuple"
         },
         {
            "components": [
               {
                  "internalType": "bytes32",
                  "name": "source",
                  "type": "bytes32"
               },
               {
                  "internalType": "uint16",
                  "name": "srcNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "address",
                  "name": "dest",
                  "type": "address"
               },
               {
                  "internalType": "uint16",
                  "name": "destNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "uint256",
                  "name": "gasLimit",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "salt",
                  "type": "uint256"
               },
               {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
               }
            ],
            "internalType": "struct GmpMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "execute",
      "outputs": [
         {
            "internalType": "uint8",
            "name": "status",
            "type": "uint8"
         },
         {
            "internalType": "bytes32",
            "name": "result",
            "type": "bytes32"
         }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "bytes32",
                  "name": "source",
                  "type": "bytes32"
               },
               {
                  "internalType": "uint16",
                  "name": "srcNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "address",
                  "name": "dest",
                  "type": "address"
               },
               {
                  "internalType": "uint16",
                  "name": "destNetwork",
                  "type": "uint16"
               },
               {
                  "internalType": "uint256",
                  "name": "gasLimit",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "salt",
                  "type": "uint256"
               },
               {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
               }
            ],
            "internalType": "struct GmpMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "getGmpTypedHash",
      "outputs": [
         {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         }
      ],
      "name": "gmpInfo",
      "outputs": [
         {
            "components": [
               {
                  "internalType": "uint184",
                  "name": "_gap",
                  "type": "uint184"
               },
               {
                  "internalType": "uint8",
                  "name": "status",
                  "type": "uint8"
               },
               {
                  "internalType": "uint64",
                  "name": "blockNumber",
                  "type": "uint64"
               },
               {
                  "internalType": "bytes32",
                  "name": "result",
                  "type": "bytes32"
               }
            ],
            "internalType": "struct GmpInfo",
            "name": "",
            "type": "tuple"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32"
         }
      ],
      "name": "keyInfo",
      "outputs": [
         {
            "components": [
               {
                  "internalType": "uint216",
                  "name": "_gap",
                  "type": "uint216"
               },
               {
                  "internalType": "uint8",
                  "name": "status",
                  "type": "uint8"
               },
               {
                  "internalType": "uint32",
                  "name": "nonce",
                  "type": "uint32"
               }
            ],
            "internalType": "struct KeyInfo",
            "name": "",
            "type": "tuple"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [],
      "name": "prevMessageHash",
      "outputs": [
         {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
         },
         {
            "internalType": "uint16",
            "name": "network",
            "type": "uint16"
         },
         {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
         },
         {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
         }
      ],
      "name": "submitMessage",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "components": [
               {
                  "internalType": "uint256",
                  "name": "xCoord",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "e",
                  "type": "uint256"
               },
               {
                  "internalType": "uint256",
                  "name": "s",
                  "type": "uint256"
               }
            ],
            "internalType": "struct Signature",
            "name": "signature",
            "type": "tuple"
         },
         {
            "components": [
               {
                  "components": [
                     {
                        "internalType": "uint8",
                        "name": "yParity",
                        "type": "uint8"
                     },
                     {
                        "internalType": "uint256",
                        "name": "xCoord",
                        "type": "uint256"
                     }
                  ],
                  "internalType": "struct TssKey[]",
                  "name": "revoke",
                  "type": "tuple[]"
               },
               {
                  "components": [
                     {
                        "internalType": "uint8",
                        "name": "yParity",
                        "type": "uint8"
                     },
                     {
                        "internalType": "uint256",
                        "name": "xCoord",
                        "type": "uint256"
                     }
                  ],
                  "internalType": "struct TssKey[]",
                  "name": "register",
                  "type": "tuple[]"
               }
            ],
            "internalType": "struct UpdateKeysMessage",
            "name": "message",
            "type": "tuple"
         }
      ],
      "name": "updateKeys",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   }
]

const profileName = "P0CC";
const shiContract = "0xe5be4C971c7C36317758A49542055893D1B2570e"
const sepoContract = "0x28b317E0D817990714772349bdfdE0C60c81AA6E"
// Follow author on telegram: https://t.me/airdrop101xyz

const messages = [
   "blockchain", "transaction", "testmessage", "sendTransaction", "messageTest",
   "helloBlockchain", "crypto", "smartcontract", "decentralized", "ledger",
   "node", "consensus", "miner", "hashrate", "wallet", "privatekey", "publickey",
   "gasfee", "token", "ethereum", "bitcoin", "altcoin", "ICO", "airdrop",
   "dapp", "faucet", "exchange", "block", "confirmation", "peer", "network",
   "fork", "mainnet", "testnet", "protocol", "reward", "staking", "validator",
   "scalability", "immutable", "nonce", "difficulty", "hash", "signature",
   "timestamp", "blocksize", "analog", "latency", "oracles"
];

async function interactWithContract() {
   const shibuyaProvider = new ethers.JsonRpcProvider('https://evm.shibuya.astar.network');
   const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc2.sepolia.org');
   const shibuyaWallet = new ethers.Wallet(process.env.PRIVATE_KEY, shibuyaProvider);
   const sepoliaWallet = new ethers.Wallet(process.env.PRIVATE_KEY, sepoliaProvider);

   const contractShibya = new ethers.Contract("0x000000007f56768dE3133034FA730a909003a165", contractABI, shibuyaWallet);
   const contractSepolia = new ethers.Contract("0x000000007f56768dE3133034FA730a909003a165", contractABI, sepoliaWallet);

   try {
      const randomIndex1 = Math.floor(Math.random() * messages.length);
      const randomIndex2 = Math.floor(Math.random() * messages.length);
      const networkId1 = 5;
      const networkId2 = 7;
      const data1 = ethers.hexlify(ethers.toUtf8Bytes(messages[randomIndex1]));
      const data2 = ethers.hexlify(ethers.toUtf8Bytes(messages[randomIndex2]));
      const gasLimit1 = 100000;
      const gasLimit2 = 200000;
      const tx1 = await contractShibya.submitMessage(shiContract, networkId1, gasLimit1, data1, {
         value: ethers.parseEther('0.001284384'),
      });
      const tx2 = await contractSepolia.submitMessage(sepoContract, networkId2, gasLimit2, data2, {
         value: ethers.parseEther('0.0008345727'),
      });

      await tx1.wait();
      await tx2.wait();
      console.log('receipt1-shibaiya', `hash: ${tx1.hash}`);
      console.log('receipt2-sepolia', `hash: ${tx2.hash}`);

      const profileHashshibuya = profileName + "_shibuya";
      const profileHashsepolia = profileName + "_sepolia";
      await postDataToSheet(profileHashshibuya, tx1.hash);
      await postDataToSheet(profileHashsepolia, tx2.hash);

      console.log("---------------------------------------------------")
   } catch (err) {
      console.error('Error interacting with contract:', err);
   }
}

async function postDataToSheet(hashProfileName, hash) {
   fetch('https://script.google.com/macros/s/AKfycbw0QskP5vRsvBo0cf3BpYvcnexFJ-DZYm7Luau2AZ-L_hO7xKAPyOe3kn9dUy3Tq40iUQ/exec', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         ProfileHash: hashProfileName,
         Hash: hash
      })
   })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}

async function main() {
   for (let index = 0; index < 30; index++) {
      await interactWithContract();
   }
}

main();
