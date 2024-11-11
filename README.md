# TrackChain

TrackChain é uma aplicação de blockchain projetada para o setor de seguros de carga, oferecendo maior segurança, transparência e automação no monitoramento de dados de telemetria de veículos de transporte. Com o uso de contratos inteligentes, a TrackChain possibilita a gestão de apólices de seguro, registro de dados de telemetria em tempo real, detecção automática de incidentes e processamento de reivindicações de seguro.

## Funcionalidades Principais

- **Gerenciamento de Apólices de Seguro**: Permite a criação, consulta e recarga de apólices de seguro para transporte de cargas.
- **Registro de Telemetria**: Registra dados como localização e status da porta em tempo real, com verificação automática de incidentes (ex., porta aberta de forma anormal).
- **Detecção de Incidentes**: Detecta automaticamente condições de risco e gera alertas para possíveis sinistros.
- **Processamento de Reivindicações**: Permite a reivindicação de seguro com dedução automática do valor da cobertura.
- **Relatórios e Auditoria**: Consulta múltiplos registros de telemetria em lote para análise e auditoria, útil para verificar histórico de dados.

## Tecnologias Utilizadas

- **Solidity**: Linguagem de programação usada para desenvolver contratos inteligentes.
- **Ethereum e Ganache**: Blockchain e ambiente local de testes.
- **Node.js e Web3.js**: Backend e biblioteca para interação com a blockchain.

## Como Executar o Projeto

### Pré-requisitos

1. **Node.js** e **NPM** instalados (para execução de scripts).
2. **Ganache CLI** (ou interface) rodando na porta padrão `http://127.0.0.1:8545`.
3. **Remix IDE** (ou qualquer IDE de Solidity) para compilar e implantar o contrato.

### Passo a Passo

1. **Clonar o Repositório**
    ```bash
    git clone https://github.com/seu-usuario/TrackChain.git
    cd TrackChain
    ```

2. **Instalar Dependências**
    ```bash
    npm install
    ```

3. **Implantar o Contrato**
   - Abra o contrato `TrackChain.sol` no Remix IDE.
   - Compile e implante o contrato usando o Ganache como provedor.
   - Copie a ABI e o endereço do contrato implantado e insira-os no arquivo `index.js`.

4. **Configurar o `index.js`**
   - No `index.js`, substitua:
     - `contractABI` pela ABI do contrato.
     - `contractAddress` pelo endereço do contrato implantado.

5. **Executar o Script de Teste**
    ```bash
    node index.js
    ```

## Estrutura do Projeto

- **contracts/**: Contém o contrato inteligente `TrackChain.sol`.
- **index.js**: Script principal para interagir com o contrato, incluindo testes de todas as funcionalidades.
- **README.md**: Documentação do projeto.

## Estrutura do Contrato

O contrato `TrackChain` possui as seguintes estruturas e funções:

### Estruturas

- **TelemetryData**: Estrutura que armazena dados de telemetria (timestamp, localização, status da porta, incidente reportado).
- **InsurancePolicy**: Estrutura que representa uma apólice de seguro (ID, titular, cobertura, status, contagem de sinistros).

### Funções

- **createPolicy**: Cria uma nova apólice de seguro.
- **registerTelemetry**: Registra dados de telemetria para um veículo.
- **getIncidentStatus**: Consulta se um incidente foi detectado para uma telemetria específica.
- **processClaim**: Processa uma reivindicação de seguro, deduzindo o valor da cobertura.
- **rechargePolicy**: Recarrega uma apólice de seguro, adicionando cobertura.
- **batchTelemetry**: Consulta dados de telemetria em lote para auditoria.

## Exemplo de Uso

1. **Criar uma Apólice de Seguro**
    ```javascript
    const policyId = await trackChain.methods.createPolicy(policyHolder, 10000).send({ from: accounts[0], gas: 3000000 });
    ```

2. **Registrar Telemetria**
    ```javascript
    await trackChain.methods.registerTelemetry(1, "Sao Paulo", false).send({ from: accounts[0], gas: 3000000 });
    ```

3. **Processar uma Reivindicação**
    ```javascript
    await trackChain.methods.processClaim(policyId, 3000).send({ from: policyHolder, gas: 3000000 });
    ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.
