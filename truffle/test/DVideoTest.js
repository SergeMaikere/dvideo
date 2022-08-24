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
            'upload', async () => {
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
                        assert.equal(video.tips.toNumber(), 0, 'tips is correct' );
                        assert.equal(video.author, author, 'author is correct');
                    }
                )
            }
        )
    }
)