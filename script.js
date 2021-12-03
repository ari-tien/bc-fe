const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const endpoint = "https://data-seed-prebsc-1-s1.binance.org:8545";
const address = "0x98b3f2219a2b7a047B6234c19926673ad4aac83A";

const web3 = new Web3(Web3.givenProvider || endpoint);
const contract = new web3.eth.Contract(abi, address);

window.addEventListener('load', () => {
	if (typeof window.ethereum !== 'undefined') {
		const connectMM = document.querySelector('#connect-mm');
		const getOwner = document.querySelector('#get-owner');
		const changeOwner = document.querySelector('#change-owner');
		const mm = document.querySelector('#mm');
		const owner = document.querySelector('#owner');
		const newOwner = document.querySelector('#new-owner');
		let account;

		connectMM.addEventListener('click', async () => {
			try {
				const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
				account = accounts[0];
				mm.innerHTML = account;
			} catch (error) {
				console.log(error);
			}
		})

		getOwner.addEventListener('click', async () => {
			try {
				const result = await contract.methods.getOwner().call({ from: account });
				owner.innerHTML = result;
			} catch (error) {
				console.log(error);
			}
		})

		changeOwner.addEventListener('click', async () => {
			try {
				const result = await contract.methods.changeOwner(newOwner.value).send({ from: account });
				console.log(result);
				alert('Owner Changed!')
			} catch (error) {
				console.log(error);
			}
		})
	}
})