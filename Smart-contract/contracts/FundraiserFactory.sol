// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Fundraiser.sol";
import "./IndividualFundraiser.sol";

contract FundraiserFactory {
  address public owner;
  Fundraiser[] private _fundraisers;
  IndividualFundraiser[] private _individualFundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);
  event IndividualFundraiserCreated(IndividualFundraiser indexed fundraiser, address indexed owner);

  mapping(address => bool) private whitelisted;

  uint256 constant maxLimit = 20;

  constructor() {
    owner = msg.sender;
  }

  //whitelist address
  function whitelist(address _address) public {
    require(owner == msg.sender, "Only owner can whitelist address");
    whitelisted[_address] = true;
  }

  //Check if address is whitelisted
  function checkWhitelisted(address _address) public view returns(bool) {
    return whitelisted[_address];
  }

  // Creates organisation fundraiser
  function createFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary
  )
  public
  {
    require(whitelisted[msg.sender] == true, "Address is not whitelisted");
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      msg.sender
    );
    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser, msg.sender);
  }

  // Creates individual fundraiser
  function createIndividualFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary,
    uint256 limit
  )
  public
  {
    require(whitelisted[msg.sender] == true, "Address is not whitelisted");
    IndividualFundraiser fundraiser = new IndividualFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      msg.sender,
      limit
    );
    _individualFundraisers.push(fundraiser);
    emit IndividualFundraiserCreated(fundraiser, msg.sender);
  }

  // Query the number of fundrisers in our smart contract
  function fundraisersCount() public view returns(uint256) {
    return _fundraisers.length;
  }

  // Query the number of individual fundrisers in our smart contract
  function individualFundraisersCount() public view returns(uint256) {
    return _individualFundraisers.length;
  }

  // Query all fundraisers in our smart contract
  function fundraisers(uint256 limit, uint256 offset) 
    public 
    view
    returns(Fundraiser[] memory coll)
  {
    require(offset <= fundraisersCount(), "offset out of bounds");
    uint256 size = fundraisersCount() - offset;
    // size should not exceed the maxLimit
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new Fundraiser[](size);

    for(uint256 i = 0; i < size; i++) {
      coll[i] = _fundraisers[offset + i];
    }
    
    return coll;
  }

  // Query all individual fundraisers in our smart contract
  function individualFundraisers(uint256 limit, uint256 offset) 
    public 
    view
    returns(IndividualFundraiser[] memory coll)
  {
    require(offset <= individualFundraisersCount(), "offset out of bounds");
    uint256 size = individualFundraisersCount() - offset;
    // size should not exceed the maxLimit
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new IndividualFundraiser[](size);

    for(uint256 i = 0; i < size; i++) {
      coll[i] = _individualFundraisers[offset + i];
    }
    
    return coll;
  }
}