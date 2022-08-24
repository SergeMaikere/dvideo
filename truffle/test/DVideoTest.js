const DVideo = artifacts.require('DVideo');

require('chai').use(require('chai-as-promised')).should();


contract(
    'DVideo', ( [deployer, author, tipper] ) => {

        let dvideo;

        before( async () => dvideo = await DVideo.deployed() );

        describe(
            'deployement', async () => {
                it(
                    'deploys succesfully', async () => {
                        const address = await dvideo.address;

                        assert.notEqual(address, 0x0);
                        assert.notEqual(address, '');
                        assert.notEqual(address, null);
                        assert.notEqual(address, undefined);
                    }
                )

                it(
                    'has a name', async () => {
                        const name = await dvideo.name();
                        assert.equal(name, 'DVideo');
                    }
                )
            }
        )

        describe(
            'upload and tip', async () => {
                const hash = '789456123';
                const title = 'The 4 pallbearers';
                const description = "What I wish my burial to look like";
                let results, videoCount;

                before(
                    async () => {
                        results = await dvideo.uploadVideo( hash, title, description, {from: author} );
                        videoCount = await dvideo.videoCount();
                    }
                )

                it(
                    'uploads video succesfully', async () => {
                        event = results.logs[0].args;
                        
                        assert.equal(videoCount, 1, 'videoCount correctly updated');
                        assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct');
                        assert.equal(event.title, title, 'title is correct');
                        assert.equal(event.description, description, 'description is correct');
                        assert.equal(event.tips.toNumber(), 0, 'tips is correct' );
                        assert.equal(event.author, author, 'author is ocrrect');

                    }
                )

                it(
                    'failes to upload video', async () => {
                        await dvideo.uploadVideo( '', title, description, {from: author} ).should.be.rejected;
                        await dvideo.uploadVideo( hash, '', description, {from: author} ).should.be.rejected;
                        await dvideo.uploadVideo( hash, title, description, {from: 0x0} ).should.be.rejected;
                    }
                )

                it(
                    'contains the new video data', async () => {
                        const video = await dvideo.videos(videoCount);

                        assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct');
                        assert.equal(video.title, title, 'title is correct');
                        assert.equal(video.description, description, 'description is correct');
                        assert.equal(video.tips, 0, 'tips is correct' );
                        assert.equal(video.author, author, 'author is correct');
                    }
                )

                it(
                    'tips video uploader', async () => {
                        //Get old author balance
                        let oldBalance = await web3.eth.getBalance(author);
                        oldBalance = web3.utils.BN(oldBalance);

                        //Tip 1 Ether to author
                        results = await dvideo.tipVideoOwner( videoCount, {from: tipper, value: web3.utils.toWei('1', 'Ether')} );

                        //Get event
                        event = results.logs[0].args;                        //Assert event's data is correct
                        assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct');
                        assert.equal(event.title, title, 'title is correct');
                        assert.equal(event.description, description, 'description is correct');
                        assert.equal(event.tips, 1000000000000000000, 'tips is correct' );
                        assert.equal(event.author, author, 'author is ocrrect');

                        //Get new author balance
                        let newBalance = await web3.eth.getBalance(author);
                        newBalance = web3.utils.BN(newBalance);
                        
                        //Set expected balance (old balance + tipeed amount)
                        let tippedAmount = web3.utils.toWei('1', 'Ether');
                        tippedAmount = web3.utils.BN(tippedAmount);
                        const expectedBalance = oldBalance.add(tippedAmount);

                        //Assert new balance and expected balance is correct
                        assert.equal(newBalance.toString(), expectedBalance.toString(), 'balance is correct');
                    }
                )

                it(
                    'failed to tip video uploader', async () => {
                        await dvideo.tipVideoOwner( 99, {from: tipper, value: web3.utils.toWei('1', 'Ether')} ).should.be.rejected;
                    }
                )
            }
        )
    }
)