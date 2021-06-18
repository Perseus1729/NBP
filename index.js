const Web3=require('web3');
const VeritIdentityTable=require('./build/contracts/VeritIdentityTable.json');
const init = async () =>{

	const web3=new Web3('http://localhost:9545');
	const id= await web3.eth.net.getId();
	const deployedNetwork = VeritIdentityTable.networks[id];
	const contract = new web3.eth.Contract(
		VeritIdentityTable.abi,
		deployedNetwork.adress
		);
	//contract.methods.
	const result = await contract.methods.registerAddress().call();
} 
init();