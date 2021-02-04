var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

module.exports = {
    elements: {
        userProfileDropdown: {
            selector: '#dropdownMenuLink'
        },
        logout: {
            // selector: '[class*="dropdown-menu"] [class*="logout"]'
            selector: '.logout button'
        },
        logo: {
            selector: "[qid='cHeader-1'] [src*='cup-logo']"
        },
        welcome: {
            selector: ".start-learning-container .welcome "
        }
    },
    commands: [
        {
            clickUserProfileDropdown: function(){
                this.api.perform(function() {
                    testlog.info("Clicking User Profile dropdown")
                })
                this.api.useCss();
                actions.click(this,this.elements.userProfileDropdown.selector);
            },
            waitForLogoutToAppear: function(){
                this.api.perform(function() {
                    testlog.info("Waiting for Logout button to appear")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.logout.selector,30000);
            },
            clickLogout: function(){
                this.api.perform(function() {
                    testlog.info("Clicking Logout button")
                })
                this.api.useCss();
                actions.click(this,this.elements.logout.selector);
            },
            waitForLogoToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.logo.selector,60000);
            },
            clickLogo: function(){
                this.api.useCss();
                actions.click(this,this.elements.logo.selector);
            },
            waitForWelcomeMsg: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.welcome.selector,100000);       
            }
        }
    ]
};
