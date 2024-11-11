const Web3 = require('web3').default;
const web3 = new Web3('http://127.0.0.1:8545'); // Conecta ao Ganache localmente

// ABI e endereço do contrato (substitua pelo endereço correto ao implantar)
const contractABI =
    [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "claimAmount",
				"type": "uint256"
			}
		],
		"name": "ClaimProcessed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "telemetryId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "IncidentReported",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "policyHolder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "coverageAmount",
				"type": "uint256"
			}
		],
		"name": "PolicyCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "doorStatus",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TelemetryRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "alertThreshold",
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
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "batchTelemetry",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "doorStatus",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "incidentReported",
						"type": "bool"
					}
				],
				"internalType": "struct TrackChain.TelemetryData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_policyHolder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_coverageAmount",
				"type": "uint256"
			}
		],
		"name": "createPolicy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getIncidentStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "incidents",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "policies",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "policyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "policyHolder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "coverageAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "claimCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "policyCounter",
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
				"internalType": "uint256",
				"name": "_policyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "processClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_doorStatus",
				"type": "bool"
			}
		],
		"name": "registerTelemetry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "telemetry",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "doorStatus",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "incidentReported",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "telemetryCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = '0xdEfD0087ee0aa983129745c8F2Fbb7763fb273f7';

// Instância do contrato
const trackChain = new web3.eth.Contract(contractABI, contractAddress);

// Função para obter contas e definir variáveis de teste
async function setup() {
    const accounts = await web3.eth.getAccounts();
    return {
        policyHolder: accounts[1],         // Conta do titular da apólice
        accounts: accounts,
        initialCoverage: 10000,            // Cobertura inicial da apólice
        additionalCoverage: 5000,          // Cobertura adicional para recarga
        claimAmount: 3000,                  // Quantia de uma reivindicação de exemplo
	highClaimAmount: 100000		    // Quantia que irá esgotar a apolice
    };
}

// Função para criar uma apólice de seguro
async function createPolicy(policyHolder, coverageAmount) {
    console.log('Criando apólice de seguro...');
    const response = await trackChain.methods.createPolicy(policyHolder, coverageAmount)
        .send({ from: policyHolder, gas: 3000000, gasPrice: '20000000000' }); // Definindo gasPrice explicitamente
    const policyId = response.events.PolicyCreated.returnValues.policyId;
    console.log(`Apólice criada com ID: ${policyId}`);
    return policyId;
}

// Função para registrar dados de telemetria
async function registerTelemetry(id, location, doorStatus, fromAccount) {
    console.log(`Registrando telemetria: ID = ${id}, Localizacao = ${location}, Status da porta = ${doorStatus}`);
    await trackChain.methods.registerTelemetry(id, location, doorStatus)
        .send({ from: fromAccount, gas: 3000000, gasPrice: '20000000000' }); // Definindo gasPrice explicitamente
    console.log('Telemetria registrada.');
}

// Função para consultar o status de incidente de um ID de telemetria
async function getIncidentStatus(id) {
    console.log(`Consultando status do incidente para ID ${id}...`);
    const incidentStatus = await trackChain.methods.getIncidentStatus(id).call();
    console.log(`Status do incidente para ID ${id}: ${incidentStatus ? "Incidente detectado" : "Sem incidente detectado"}`);
    return incidentStatus;
}

// Função para processar uma reivindicação de seguro
async function processClaim(policyId, claimAmount, fromAccount) {
    console.log(`Processando reivindicacao de ${claimAmount} para a apólice ${policyId}...`);
    await trackChain.methods.processClaim(policyId, claimAmount)
        .send({ from: fromAccount, gas: 3000000, gasPrice: '20000000000' }); // Definindo gasPrice explicitamente
    console.log('Reivindicação processada.');
}

// Função para consultar a cobertura restante de uma apólice
async function getCoverageAmount(policyId) {
    const policy = await trackChain.methods.policies(policyId).call();
    console.log(`Cobertura restante da apólice ${policyId}: ${policy.coverageAmount}`);
    return policy.coverageAmount;
}

// Função para recarregar a apólice com cobertura adicional
async function rechargePolicy(policyId, additionalCoverage, fromAccount) {
    console.log(`Recarregando a apólice ${policyId} com cobertura adicional de ${additionalCoverage}...`);
    await trackChain.methods.rechargePolicy(policyId, additionalCoverage)
        .send({ from: fromAccount, gas: 3000000, gasPrice: '20000000000' }); // Definindo gasPrice explicitamente
    console.log('Apólice recarregada.');
}


// Função para consultar dados de telemetria em lote para relatório
async function batchTelemetryReport(telemetryIds) {
    console.log(`Consultando dados de telemetria para IDs: ${telemetryIds.join(', ')}...`);
    const batchTelemetryData = await trackChain.methods.batchTelemetry(telemetryIds).call();
    batchTelemetryData.forEach((data, index) => {
        console.log(`ID ${telemetryIds[index]}: Localizacao = ${data.location}, Status da porta = ${data.doorStatus}, Incidente = ${data.incidentReported}`);
    });
    return batchTelemetryData;
}


// Função para processar uma reivindicação de seguro
async function processClaim(policyId, claimAmount, fromAccount) {
    console.log(`Processando reivindicacao de ${claimAmount} para a apólice ${policyId}...`);
    await trackChain.methods.processClaim(policyId, claimAmount)
        .send({ from: fromAccount, gas: 3000000, gasPrice: '20000000000' }); // Definindo gasPrice explicitamente
    console.log('Reivindicação processada.');
}

// Função principal para executar todos os testes de forma modular
async function runTests() {
    // Configuração inicial dos parâmetros e contas
    const { policyHolder, accounts, initialCoverage, highClaimAmount, claimAmount } = await setup();

    // 1. Criar uma apólice de seguro e registrar seu ID
    const policyId = await createPolicy(policyHolder, initialCoverage);

    // 2. Registrar telemetria normal sem incidentes
    console.log("\nRegistrando telemetria sem incidentes...");
    await registerTelemetry(1, "Sao Paulo", false, accounts[0]);
    await registerTelemetry(2, "Rio de Janeiro", false, accounts[0]);

    // 3. Registrar telemetria com condição de incidente (porta aberta)
    console.log("\nRegistrando telemetria com porta aberta para incidentes...");
    await registerTelemetry(3, "Curitiba", true, accounts[0]);
    await registerTelemetry(4, "Curitiba", true, accounts[0]);  // Deve registrar um incidente após o limite ser atingido

    // 4. Consultar o status do incidente para um ID específico
    console.log("\nConsultando status do incidente...");
    await getIncidentStatus(3);

    // 5. Processar uma reivindicação parcial e consultar cobertura restante
    console.log("\nProcessando reivindicação parcial...");
    await processClaim(policyId, claimAmount, policyHolder);
    await getCoverageAmount(policyId);

    // 6. Processar uma reivindicação que esgota a cobertura
    console.log("\nProcessando reivindicação que esgota a cobertura...");
    console.log(`Valor da cobertura inicial: ${initialCoverage}`);
    console.log(`Tentando processar reivindicação de alto valor: ${highClaimAmount}`);

    try {
        await processClaim(policyId, highClaimAmount, policyHolder);
    } catch (error) {
        console.error("Erro ao processar reivindicação que esgota a cobertura:", error);
    }

    // 7. Consome toda a cobertura da apólice
    console.log("\nConsumindo totalmente a cobertura da apólice...");
    const remainingCoverage = await getCoverageAmount(policyId); // Obtém a cobertura restante
    await processClaim(policyId, remainingCoverage, policyHolder); // Processa a reivindicação com todo o valor restante
    await getCoverageAmount(policyId); // Verifica se a apólice foi desativada

    // 8. Tentar processar uma reivindicação em uma apólice inativa (deve falhar)
    console.log("\nTentativa de processar reivindicação em apólice inativa...");
    try {
        await processClaim(policyId, claimAmount, policyHolder);
    } catch (error) {
        console.log("Erro esperado ao tentar reivindicar em apólice inativa:", error.message);
    }

    // 9. Consultar dados de telemetria em lote (relatório)
    console.log("\nConsultando dados de telemetria em lote...");
    await batchTelemetryReport([1, 2, 3, 4]);
}

// Executa o script de testes e lida com qualquer erro
runTests().catch(console.error);
