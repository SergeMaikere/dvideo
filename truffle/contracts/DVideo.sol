// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DVideo {

    uint private videoCount = 0;

    string public name = "DVideo";

    // Struct
    struct Video {
        uint id;
        string title;
        string description;
        string hash;
        address payable author;
    }

    // Id -> Struct mapping
    mapping(uint => Video) public videos;

    // Event
    event VideoCreated(
        uint id,
        string title,
        string description,
        string hash,
        address payable author
    )
  
    constructor () public { }

    /**
     * @dev        Check if empty string
     * @param      String
     * @return     Error if empty string
     */
    modifier isRealString ( string memory _str ) {
        require(byte(_str).length > 0);
        _;
    }
    /**
     * @dev        Check adress validity
     * @return     Error id address invalid
     */
    modifier isAuthor () {
        require( msg.sender != address(0x0) );
        _;
    }

    /**
     * @dev        Add video to the contract
     * @param      _videoHash    The video hash
     * @param      _title        The title
     * @param      _description  The description
     */
    function uploadVideo ( string memory _videoHash, string memory _title, string memory _description) public isRealString(_videoHash) isRealString(_title) isAuthor() {  

        //Upload count
        videoCount++;

        //Upload mapping
        videos[videoCount] = Video(videoCount, _videoHash, _title, _description, msg.sender);

        //Trigger Event
        emit VideoCreated(videoCount, _videoHash, _title, _description, msg.sender);
    }

}