var action = require('../lib/browserAction');
require("./../lib/logging.js");

var loginCommands = {

    waitForPageLoad: function(){
        this.api.perform(function() {
            testlog.info("Waiting for Login Page to get loaded")
        })
        action.waitForElementVisible(this,this.elements.username.selector,25000);
    },
    login: function(username,password)
    {
        this.api.perform(function() {
            testlog.info("Entering login details")
        })
        action.waitForElementVisible(this,this.elements.username.selector,25000);
        action.setValue(this,this.elements.username.selector,username);
        action.setValue(this,this.elements.password.selector,password);
        action.click(this,this.elements.submitButton.selector);
    },
    LoginWithGoogleOption: function() {
        action.waitForElementVisible(this,this.elements.googleOption.selector,50000);
        action.click(this,'@googleOption');
    },
    loginWithGoogleCredentials: function(email, pass) {
        action.waitForElementVisible(this,this.elements.googleUsername.selector,50000);
        action.setValue(this,'@googleUsername',email);
        action.click(this,'@googleNext');
        action.waitForElementVisible(this,this.elements.googlePass.selector,50000);
        action.setValue(this,'@googlePass',pass);
        action.click(this,'@googleNext2');
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
        },
        googleOption: {
            selector: ".gigya-login-providers-list .gigya-login-provider:nth-of-type(2) .tabbing-button"
        },
        googleUsername: {
            selector: "#identifierId"
        },
        googleNext: {
            selector: "#identifierNext"
        },
        googlePass: {
            selector: 'input[type="password"]'
        },
        googleNext2: {
            selector: "#passwordNext"
        }
    }
};
