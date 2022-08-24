// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DVideo {

    uint public videoCount = 0;

    string public name = "DVideo";

    // Struct
    struct Video {
        uint id;
        string title;
        string description;
        string hash;
        address author;
        uint tips;
    }

    // Id -> Struct mapping
    mapping(uint => Video) public videos;

    // Event new video created
    event VideoCreated(
        uint id,
        string title,
        string description,
        string hash,
        address author,
        uint tips
    );

    // Event the uploader was tipped
    event VideoTipped(
        uint id,
        string title,
        string description,
        string hash,
        address payable author,
        uint tips
    );
  
    constructor () { }

    //Check string exists
    modifier isRealString ( string memory _str ) {
        require(bytes(_str).length > 0);
        _;
    }

    //Check uploader has a legit address
    modifier isAuthor () {
        require( msg.sender != address(0x0) );
        _;
    }

    //Check video is in contract
    modifier isVideo ( uint _id ) {
        require( _id > 0 && _id <= videoCount );
        _;
    }

    /**
     * @dev        Add video to the contract
     * @param      _videoHash    The video hash
     * @param      _title        The title
     * @param      _description  The description
     */
    function uploadVideo ( string memory _videoHash, string memory _title, string memory _description) public isRealString(_videoHash) isRealString(_title) isAuthor() {  

        //Update count
        videoCount++;

        //Upload mapping
        videos[videoCount] = Video(videoCount, _title, _description, _videoHash, msg.sender, 0);

        //Trigger Event
        emit VideoCreated(videoCount, _title, _description, _videoHash, msg.sender, 0);
    }

    /**
     * @dev        Tip the uploader of the video
     * @param      _id   The identifier
     */
    function tipVideoOwner ( uint _id ) public payable isVideo(_id) {

        //Get Video data
        Video memory myVideo = videos[ _id ];

        //Get the owner
        address payable author = payable( myVideo.author );

        //Transfer tip to owner
        author.transfer( msg.value );

        //Update tipAmout of video
        myVideo.tips = myVideo.tips + msg.value;

        //Update the contract
        videos[ _id ] = myVideo;

        //Emit event
        emit VideoTipped( _id, myVideo.title, myVideo.description, myVideo.hash, author, myVideo.tips  );
    }

}