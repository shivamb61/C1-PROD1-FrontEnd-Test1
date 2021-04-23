var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        tabsContainer:{
            selector:'li.nav-item'
        }
    },
    commands: [
        {
            waitForTabs:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.tabsContainer.selector,50000);
            }
        }
    ]
};