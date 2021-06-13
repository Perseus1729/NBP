const veritIdentityTable = artifacts.require("../VeritIdentityTable.sol");
const veritTraceRecords = artifacts.require("../VeritTraceRecords.sol");

module.exports = function (deployer) {
  deployer.deploy(veritIdentityTable).then(() => {
    return deployer.deploy(veritTraceRecords, veritIdentityTable.address)
  });
};