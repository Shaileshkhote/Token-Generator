// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenContract is ERC20 {

    using SafeMath for uint256;

    address public minter;
    uint256 public supply;

    event Mint(address _recipent, uint256 _amount);
    event SetMinter(address _minter);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _minter
    ) ERC20(_name, _symbol) {
        supply=_supply;
        minter=_minter;

    }

         modifier onlyMinter() {
        require(msg.sender == minter, "Not Minter");
        
        _;
    }

        modifier checkSupply(uint256 _amount) {
        require(totalSupply().add(_amount) <= supply, "Supply Overflow");
        
        _;
    }

    function mintTokens(uint256 _amount) external onlyMinter() checkSupply(_amount) {
        _mint(msg.sender, _amount);

        emit Mint(msg.sender, _amount);
    }



    function setMinter(address _minter) external onlyMinter() {
        minter=_minter;

        emit SetMinter(_minter);
    }


}


contract TokenFactory {

    address public owner;
    uint256 public payableFees = 0.1 ether;
    address[] public tokensCreated;


    mapping(address => string) public tokenName;
    mapping(address => address[]) public creatorsMap;

    event TokenCreated(address TokenAddress);
    event SetPayableFees(uint256 payableAmt);
    event SetOwner(address _owner);
    event WithdrawFees(address sendTo, uint256 Amt);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");

        _;
    }

    modifier payableAmt() {
        require(msg.value == payableFees, "Invalid Amount");

        _;
    }


    function getTokensCreatedLength(address _minter) external view returns(uint)  {
        uint size = creatorsMap[_minter].length;
        return size;

    }

    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _supply
    ) external payable payableAmt() {
        
        _deployToken(_name, _symbol, _supply, msg.sender);
        
    }



    function withdrawFees(address payable _sendTo) external onlyOwner {
        emit WithdrawFees(_sendTo, address(this).balance);
        _sendTo.transfer(address(this).balance);
    }

    function setPayableFees(uint256 _payableFees) external onlyOwner {
        payableFees = _payableFees;
        emit SetPayableFees(_payableFees);
    }

    function setOwner(address _owner) external onlyOwner {
        owner = _owner;
        emit SetOwner(_owner);
    }

    function _deployToken(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _minter
    ) internal {
        TokenContract token = new TokenContract(
            _name,
            _symbol,
            _supply,
            _minter
        );
        tokenName[address(token)] = _name;
        tokensCreated.push(address(token));

        creatorsMap[_minter].push(address(token));
        emit TokenCreated(address(token));
    }
}