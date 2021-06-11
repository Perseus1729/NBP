const verit = artifacts.require("veritIdentityTable");

module.exports = function (deployer) {
  deployer.deploy(verit);
};