// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
event Minted(address indexed to, uint256 indexed tokenId);
    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uri, uint256 ticketPrice, uint256 noOfTicket) public payable {
        // incoming price is in eth(wei)
        require (msg.value >= (ticketPrice * noOfTicket), "Insufficient payment. Please try again");
        for (uint256 i = 0; i < noOfTicket; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uri);
        // emit event
        emit Minted(to, tokenId);
    }
    }
    // 0. function input จะต้องใส่ค่า ticketPrice กับ noOfTicket เข้ามา
    // 1. ต้องสร้าง function ที่ require ให้โอนเงินเข้ามา
    // 2. function safeMint จะต้อง loop over noOfTicket ให้ครบ
    // 3. ต้อง return message กลับไปยัง fe เพื่อ return token ID ที่ถูก mint ขึ้นมาให้ด้วย
    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}