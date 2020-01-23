var screenshots = require('./../lib/screenshots');
var testData = require('../testdata/nemoResetTestData.js');

describe('Cambridge One APP', function () {
    //Variable Declaration
    var password;

    before(function (browser, done) {              
        password = testData.nemoReset.teacher.password;
        a_password='#compro@1254';
        studentDashboard = testData.nemoReset.studentDashboard;                        
        username_admin = 'admin1_aberystwyth_prod1@comprodls.com';            
	    studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        //nemoLaunchPageObj.waitForGetStartedButtonToAppear();
        // nemoLaunchPageObj.waitForLoginButtonToBePresent();  // changed to match alpha test
        // nemoLaunchPageObj.clickLogin();
        // //Wait for login button
        // //nemoLaunchPageObj.waitForLoginButtonToBePresent();
        // //Create object for login page
        // nemoLoginPageObj = browser.page['login.page']();
        // //Wait for login page
        // nemoLoginPageObj.waitForPageLoad();
        headerPageObj = browser.page['header.page']();
         done();
    });

    it('Support-Admin Login and Creates Excel File Of Institutes And Registered Users', function (browser) {
        browser.url('http://hotfix.cambridgeone.org?p=@cambridge.org&t=saml');
        browser.pause(10000);
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[1]);   
            nemoSupportAdminDashboardPageObj = browser.page['nemoSupportAdminDashboard.page']();
            //Wait for okta login
            nemoSupportAdminDashboardPageObj.waitForOktalogin();       
        });
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[0]);  
            //Wait for search box
            nemoSupportAdminDashboardPageObj.waitForSearchBoxAndGetAllInstitutes();
        //     var limit=73;
        //     var instStarter = function(num) {
        //         nemoSupportAdminDashboardPageObj.getDetails(num,function() {
        //             if(num+1 <= limit) {
        //                   instStarter(num+1);
        //             }
        //         });
        //     }
        //     instStarter(2);
        // });
        //browser.pause(100000);      
    });    

    after(function (browser, done) {
        console.log("closing");
        //close browser
        if (browser.sessionId) {
            browser.end(function () {
                done();
            });
        } else {
            done();
        }
    });
});
