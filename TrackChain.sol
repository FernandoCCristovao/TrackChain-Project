// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrackChain {

    struct TelemetryData {
        uint256 timestamp;
        string location;
        bool doorStatus;
        bool incidentReported;
    }

    struct InsurancePolicy {
        uint256 policyId;
        address policyHolder;
        uint256 coverageAmount;
        bool isActive;
        uint256 claimCount;
    }

    mapping(uint256 => TelemetryData) public telemetry;
    mapping(uint256 => InsurancePolicy) public policies;
    mapping(uint256 => uint256) public incidents;

    uint256 public policyCounter;
    uint256 public telemetryCounter;
    uint256 public alertThreshold = 2; // número de alertas para um incidente

    event TelemetryRegistered(uint256 id, string location, bool doorStatus, uint256 timestamp);
    event PolicyCreated(uint256 policyId, address policyHolder, uint256 coverageAmount);
    event IncidentReported(uint256 telemetryId, string location, uint256 timestamp);
    event ClaimProcessed(uint256 policyId, uint256 claimAmount);

    modifier onlyPolicyHolder(uint256 _policyId) {
    require(msg.sender == policies[_policyId].policyHolder, "Somente o titular da apolice pode executar esta funcao.");
    _;
    }

    // Função para criar uma nova apólice de seguro
    function createPolicy(address _policyHolder, uint256 _coverageAmount) public returns (uint256) {
        policyCounter++;
        policies[policyCounter] = InsurancePolicy(policyCounter, _policyHolder, _coverageAmount, true, 0);
        emit PolicyCreated(policyCounter, _policyHolder, _coverageAmount);
        return policyCounter;
    }

    // Função para registrar dados de telemetria de um veículo/carga
    function registerTelemetry(uint256 _id, string memory _location, bool _doorStatus) public {
        telemetryCounter++;
        telemetry[_id] = TelemetryData(block.timestamp, _location, _doorStatus, false);
        emit TelemetryRegistered(_id, _location, _doorStatus, block.timestamp);

        // Verifica e registra um incidente caso o status da porta seja anormal
        if (!isDoorStatusNormal(_doorStatus)) {
            incidents[_id]++;
            if (incidents[_id] >= alertThreshold) {
                reportIncident(_id, _location);
            }
        }
    }

    // Função inteligente que detecta status anormal da porta (fechada = normal, aberta = anormal)
    function isDoorStatusNormal(bool _doorStatus) internal pure returns (bool) {
        return !_doorStatus;
    }

    // Função que gera um alerta de incidente caso o status da porta seja anormal ou haja desvios
    function reportIncident(uint256 _id, string memory _location) internal {
        telemetry[_id].incidentReported = true;
        emit IncidentReported(_id, _location, block.timestamp);
    }

    // Função para consultar o status de incidentes de um ID específico
    function getIncidentStatus(uint256 _id) public view returns (bool) {
        return telemetry[_id].incidentReported;
    }

    // Função para processar uma reivindicação de seguro após a verificação de incidentes
    function processClaim(uint256 _policyId, uint256 _amount) public onlyPolicyHolder(_policyId) {
        InsurancePolicy storage policy = policies[_policyId];
        require(policy.isActive, "A apolice nao esta ativa.");
        require(_amount < policy.coverageAmount, "O valor da reivindicacao excede a cobertura.");
        
        policy.claimCount++;
        policy.coverageAmount -= _amount;
        emit ClaimProcessed(_policyId, _amount);
        
        // Desativa a apólice se a cobertura chegar a zero
        if (policy.coverageAmount == 0) {
            policy.isActive = false;
        }
    }

    // Função para listar dados de telemetria em lote para relatórios e auditoria
    function batchTelemetry(uint256[] memory ids) public view returns (TelemetryData[] memory) {
        TelemetryData[] memory batchData = new TelemetryData[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            batchData[i] = telemetry[ids[i]];
        }
        return batchData;
    }
}
