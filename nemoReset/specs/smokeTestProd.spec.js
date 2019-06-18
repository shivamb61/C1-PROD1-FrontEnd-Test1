var screenshots = require('./../lib/screenshots');
var assert = require('../lib/assertionLibrary.js');
var helper = require('../lib/helper.js');
var testData = require('../testdata/nemoResetTestData.js');

describe('Cambridge One APP', function () {
    //Variable Declaration
    var username,password,className,emailCreator,teacher,key,vertext,vertext1,vertext2;

    before(function (browser, done) {
        test_data = browser.globals.test;               
        password = testData.nemoReset.teacher.password;
        a_password='#compro@1254';
        emailCreator = testData.nemoReset.emailCreator;
        teacher = testData.nemoReset.teacherDashboard;
        studentDashboard = testData.nemoReset.studentDashboard;
        smokeTestData = testData.smokeTest;        
        pname = smokeTestData.pname;        
        textn = smokeTestData.textn;
        savedmsg = smokeTestData.savedmsg
        psskill = smokeTestData.psskill;
        submitmarking = smokeTestData.submitmarking;
        dwnld = smokeTestData.dwnld;
        scorablename = smokeTestData.scorablename;
        nonscorename = smokeTestData.nonscorename;
        lesson4 = smokeTestData.lesson;
        inputtxt1 = smokeTestData.inputtxt1;
        inputtxt2 = smokeTestData.inputtxt2;
        inputtxt3 = smokeTestData.inputtxt3;
        vertext=smokeTestData.vertext;
        vertext1=smokeTestData.vertext1;
        vertext2=smokeTestData.vertext2;
        scorableScore=testData.nemoReset.activityScore;
        averageScore=testData.nemoReset.avgScore;
        completedActivity=testData.nemoReset.completedAct;
        completedAbove=testData.nemoReset.completedAboveAct;
        completedBelow=testData.nemoReset.completedBelowAct;
        prodActivity = smokeTestData.prodActivity;
        //username_learner = "learner_" + Math.random().toString(36).substr(2, 5) + emailCreator.suffix;                
        username_learner = smokeTestData.learner_username;        
        //Create unique email address
        //username_teacher = "teacher_" + Math.random().toString(36).substr(2, 5) + emailCreator.suffix;
        username_teacher = smokeTestData.teacher_usermane;  
        username_admin = 'admin1_aberystwyth_prod1@comprodls.com';      
        className = "CLASS "+Math.random().toString(36).substr(2, 5);  
        percentage = testData.nemoReset.teacher.percentage;
        feedback = testData.nemoReset.teacher.feedback;      
	    studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();

        //-------- Get attempts count before activity submission ----------
        nemoLaunchPageObj.clickLogin();
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();

        nemoTeacherDashboardPageObj = browser.page['nemoTeacherDashboard.page']();

        studentDetailsPageObj = browser.page['studentDetails.page']();

        headerPageObj = browser.page['header.page']();
      
         done();
    });
    it('Verify that the learning path app and class app are working', function(browser) {
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
        nemoLaunchPageObj.clickLogin();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        nemoLoginPageObj.login('cqastudent10@yopmail.com',password);
        studentDashboard = browser.page['studentDashboard.page']();
        studentDashboard.waitForProductAppear();
        //browser.url('https://www.cambridgeone.org/learning-path/teacher/org_mqa-sierra-prod1/product/f02c62ee-461c-11e9-a22c-0242ac110003/item/1552539073657%2F1552539113501%2F1552541626759');
        studentDashboard.practiceextraopen();
        nemoClassLearningPathwayPageObj= browser.page['classLearningPathway.page']();
        studentDashboard.waitForFrame();
        browser.pause(20000);
        nemoClassLearningPathwayPageObj.goback();
        studentDashboard.waitForProductAppear();
        studentDashboard.goToClass2();
        studentDashboard.waitForAnalytic();

    });   
    it('Admin Login and access dashboard', function (browser) {
        
        nemoLaunchPageObj.clickLogin();
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();

        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        //Login via Teacher
        nemoLoginPageObj.login(username_admin,a_password);
        //Create Teacher dashboard page object
        nemoAdminDashboardPageObj = browser.page['nemoAdminDashboard.page']();
        //Wait for Admin dashboard
        nemoAdminDashboardPageObj.waitForTabs();
        //count of tabs
        browser.elements('css selector',".my-spaces .flex-wrap .flex-column",function(result){   //Need to change the selector for teacher/admin
            if(result.value.length !=5)
            {
                browser.assert.fail('Tabs Count do not match');
            }
        });   
    });     
    it('Support-Admin Login and access dashboard', function (browser) {
        browser.url('https://www.cambridgeone.org?p=@cambridge.org&t=saml');
        browser.pause(10000);
        browser.window_handles(function(result) {
                // console.log(result.value);
            browser.switchWindow(result.value[1]);   
            nemoSupportAdminDashboardPageObj = browser.page['nemoSupportAdminDashboard.page']();
            //Wait for okta login
            nemoSupportAdminDashboardPageObj.waitForOktalogin();  
                       
        });
        browser.window_handles(function(result) {
            //console.log(result.value);
            browser.switchWindow(result.value[0]);  
            //Wait for search box
            nemoSupportAdminDashboardPageObj.waitForSearchBox();      
        });
         
    });     


    afterEach(function (browser, done) {

      //  take screenshot on every test completion
        screenshots.takeScreenshot(browser);
        done();
        //Logout
        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
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
