var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");
var format = require("string-template");

module.exports = {
    elements: {
        tabsContainer:{
            selector:'.my-spaces .flex-wrap'
        }
    },
    commands: [
        {
            waitForTabs:function(){
                this.api.perform(function() {
                    testlog.info("Waiting for Admin Tabs to be present")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.tabsContainer.selector,50000);
            }
        }
    ]
};