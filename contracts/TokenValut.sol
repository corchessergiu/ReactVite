// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVault {
    IERC20 public token;
    mapping(address => uint256) public balances;

    // Set the token address at the time of deployment
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    // Deposit tokens into the contract
    function deposit(uint256 _amount) external {
        require(_amount > 0, "Valut: Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), _amount), "Valut: Transfer failed");
        balances[msg.sender] += _amount;
    }

    // Withdraw tokens from the contract
    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Valut: Amount must be greater than 0");
        require(balances[msg.sender] >= _amount, "Valut: Insufficient balance");
        balances[msg.sender] -= _amount;
        require(token.transfer(msg.sender, _amount), "Valut: Transfer failed");
    }

    // View function to see the contract's token balance
    function getContractTokenBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

}
