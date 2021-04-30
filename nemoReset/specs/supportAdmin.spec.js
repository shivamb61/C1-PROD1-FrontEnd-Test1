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
        nemoLaunchPageObj.waitForLoginButtonToBePresent();  // changed to match alpha test
        //Wait for login button
        //nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        headerPageObj = browser.page['header.page']();
         done();
    });

    it('Support-Admin Login and access dashboard', function (browser) {
        // browser.url('https://identity.cambridge.org/login/login.htm?fromURI=%2Fapp%2Fcambridgeuniversitypress_gigyapressplatformlive_1%2Fexk9v6qlr1h0yk6MT1t7%2Fsso%2Fsaml%3FSAMLRequest%3DtZJBc9owFIT%252Fikd3LAkTSDTAjCekxSkECrSlvTBClkHBloSeTPG%252Fr%252B1M0%252BTQ3nrz7Lyd%252FVbrIfAitywu%252FVGv5LmU4INkMkIHdai4GNz1slsiuYhIn%252Ff63Vu%252BzwThadqVN33C5SDKUPBVOlBGj1A3JChIAEqZaPBc%252B1oiXdohvU5ENuSGRYRFgx8omNQpSnPfuo7eW2AYq1Rqr3wVCl7snUoPMjTugLm1%252BFUptbo0ab6yTgLsWsr20%252BbcZ8YVeX2wo1heT3eX%252Fjl39EiqU3%252B%252BoX6AAQxu6qLgg3FCtp1HKOM5yIZ7yQFq96sSA0jXMN4bDWUh3Vq6ixLyy2r2hzpTaRHKkoYtSihM0UbgS%252F0YONo9balbPM%252BT%252FWO82uv1rFo8CHV%252B6MUb8ulovm0%252F82xw2ibLiC4X1%252BOUfqfxdMKfP06ndne3hUcMFnMBKLgWuQbWjjVCpdPMcFDANC8kMC%252FYOp7PWJ3JrDPeCJOj8bC5Zu0e7o3%252F33b%252BuzQav6v4f%252BoN8RvGF2DLnmqoZLI0uRJVs1TB%252Fd%252BZaUhbRaWdrD1lpQYrhcqUTOsN89z8vHeS%252B3pX78p6Vjx%252BSX3%252F049%252FAQ%253D%253D%26RelayState%3Dtk1.x1LsWoA6hUOXpl1MvjGfVnDqGYtr0pxQA7hefEPsm18%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2000%252F09%252Fxmldsig%2523rsa-sha1%26Signature%3DcUVCtkwaXN5n01W0lEZS6LUGtUKgW0%252FfI4Pte1fYOON9CL9sNtqkBr%252BsKmRozkUJe02SeoNnvbXnZ5vEO7WmiZuzRqU4ZgOCU6H3DoO9WHt5tPvlHHzmAEtqYxwBEvyI%252Fm5%252BrRiMqiSB0TxJJMMd3XqX5uLpr%252BQWbv5NWxm%252BDiJzyYMNpl4EEB7yTLT6uI5XIwU%252FGIShv3%252BdCQX6z9pWroRL5vmA2IfoWRVPlv4MGDnYhLFtvNsoYcw6CpS4olrBldrcRAUroqzkR3HIMpVyB9qKQOkRIWb3rCxW9adZipz93gzetwCqkrG64fBh%252BoFyXP8szJT1phBi%252Bm6UK0xPlQ%253D%253D');
        browser.url('https://www.cambridgeone.org?p=@cambridge.org&t=saml');
        browser.pause(20000);
        browser.window_handles(function(result) {
            var handle = result.value[1];
            browser.switchWindow(handle);
        });
        nemoSupportAdminDashboardPageObj = browser.page['nemoSupportAdminDashboard.page']();
        nemoSupportAdminDashboardPageObj.waitForOktalogin();
        browser.pause(20000);
        browser.window_handles(function(result) {
            var handle = result.value[0];
            browser.switchWindow(handle);
        });
        nemoSupportAdminDashboardPageObj.waitForSearchBox();                
    }); 

    // xit('Login with google account', function (browser) {  
    //     nemoLaunchPageObj.clickLogin();
    //    // nemoLaunchPageObj.waitForLoginButtonToBePresent();
    //     nemoLoginPageObj = browser.page['login.page']();
    //     nemoLoginPageObj.waitForPageLoad();
    //     nemoLoginPageObj.LoginWithGoogleOption();
    //     //switch window
    //     browser.window_handles(function(result) { 
    //         browser.switchWindow(result.value[1]);
    //         nemoLoginPageObj.loginWithGoogleCredentials("cupprod1@gmail.com","Compro11");    
    //     });    
    //     //switch back to original window
    //     browser.window_handles(function(result) {
    //         headerPageObj = browser.page['header.page']();
    //         browser.switchWindow(result.value[0]);  
    //         headerPageObj.waitForWelcomeMsg(); 
    //     }); 
    // });   


    afterEach(function (browser, done) {
      //  take screenshot on every test completion
        screenshots.takeScreenshot(browser);
        done();
        //Logout
        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        done();
    });

    after(function (browser, done) {
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
