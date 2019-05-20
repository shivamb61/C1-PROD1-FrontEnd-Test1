var action = require('../lib/browserAction');

var loginCommands = {

    waitForPageLoad: function(){
        action.waitForElementVisible(this,'@username',25000);
    },
    login: function(username,password)
    {
        action.setValue(this,'@username',username);
        action.setValue(this,'@password',password);
        action.click(this,'@submitButton');
    }
};

module.exports = {

    url: function () {
        return (this.api.globals.test.launchUrl);
    },

    commands: [loginCommands],

    elements: {
        username: {
            selector: '#gigya-login-form input[name="username"]' // Update the selector value based on your application
        },
        password: {
            selector: '#gigya-login-form input[name="password"]' // Update the selector value based on your application
        },
        submitButton: {
            selector: '#gigya-login-form input[type="submit"]' // Update the selector value based on your application
        }
    }
};
