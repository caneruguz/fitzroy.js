define([
    'intern!object',
    'intern/assert',
    'require'
], function (registerSuite, assert, require) {
    var home = 'example/index.html';
    var scroll = "window.scrollTo(0, document.body.scrollHeight);";
    var getBrowser = function(remote) {
        return remote.environmentType.browserName;
    };
    var getVersion = function (remote){
        return remote.environmentType.version;
    }
    registerSuite({
        name: 'Fitzroy main',

        'clicking home navigates to home AND shows content': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('Home').click().end()
                .setFindTimeout(3000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'Welcome Home',
                            'Home Title should say "Welcome Home", returned instead : ' + text );
                })
        },

        'clicking Test navigates to file page AND shows content': function() {
            return this.get('remote').get(require.toUrl(home))
                .findByLinkText('File Page').click().end()
                .setFindTimeout(3000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function(text){
                    assert.strictEqual(text, 'File Page',
                            'About Title should say "File Page", returned instead : ' + text );
                })
        },

        // item returns param ID
        'Returns parameter accurately': function() {
            return this.get('remote').get(require.toUrl(home))
                .setFindTimeout(4000)
                .findByLinkText('Parameter').click().end()
                .setFindTimeout(4000)
                .findById('pageTitle')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, "Id: 42", 'Param ID is not accurate, returned instead : ' + text);
                });
        }




    });
});

