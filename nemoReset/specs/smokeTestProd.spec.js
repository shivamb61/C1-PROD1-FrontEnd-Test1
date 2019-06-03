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
        //Login via Teacher
        nemoLoginPageObj.login(username_teacher,password);
        //Create Teacher dashboard page object
        nemoTeacherDashboardPageObj = browser.page['nemoTeacherDashboard.page']();
        //Wait for Teacher dashboard
        nemoTeacherDashboardPageObj.waitForClassAppear();
        //Go to class
        nemoTeacherDashboardPageObj.goToClass();
        //wait for student analytic
        nemoTeacherDashboardPageObj.waitForAnalytic();
        //enter student details page
        nemoTeacherDashboardPageObj.openStudentDetails();
        //Create page object for student details page
        studentDetailsPageObj = browser.page['studentDetails.page']();
        //Wait for activity attempts to appear
        studentDetailsPageObj.waitForActivityAttempts();
        //Get activity attempts before submission
        studentDetailsPageObj.getActivityAttempts(function(result)
        {            
            //Store before submission attempts in a variable
            countBefore = result;            
        })
        //Create page object for header
        headerPageObj = browser.page['header.page']();
        //Logout
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();       
        done();
    });
    
    it('Verify that the student can attempt and submit activities.', function (browser) {
        
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
        nemoLaunchPageObj.clickLogin();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        //Login via Student
        nemoLoginPageObj.login(username_learner,password);
        //Create student dashboard page object
        nemoStudentDashboardPageObj = browser.page['studentDashboard.page']();
        //wait for student dashboard
        nemoStudentDashboardPageObj.waitForPageLoad();
        //Wait for class load
        nemoStudentDashboardPageObj.waitForClassLoad();
        //Go to class        
        nemoStudentDashboardPageObj.goToClass();    
        //Create object for Learning Pathway
        nemoClassLearningPathwayPageObj= browser.page['classLearningPathway.page']();
        //Wait for activity to launch
        nemoClassLearningPathwayPageObj.waitForFrame(); 
        //Wait for TOC dropdown to appear
        nemoClassLearningPathwayPageObj.waitForTocDropdownToAppear();
        //Open toc dropdown
        nemoClassLearningPathwayPageObj.clickTocDropdown();
        //Wait for scorable activity in the learning path
        nemoClassLearningPathwayPageObj.waitForActivityInLP(scorablename);
        //Launch scorable
        nemoClassLearningPathwayPageObj.openScorable(scorablename);  
        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {            
            //Wait for 1st input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(0);     
            //Enter 1st answer       
            nemoClassLearningPathwayPageObj.enterinput(0,prodActivity.answer[0]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();
        //Wait for next question button to appear
        nemoClassLearningPathwayPageObj.waitnext();
        //Click on next question button
        nemoClassLearningPathwayPageObj.clicknext();

        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for 2nd input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(1);    
            //Enter 2nd answer        
            nemoClassLearningPathwayPageObj.enterinput(1,prodActivity.answer[1]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();
        //Wait for next question button to appear
        nemoClassLearningPathwayPageObj.waitnext();
        //Click on next question button
        nemoClassLearningPathwayPageObj.clicknext();

        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for 3rd input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(2);   
            //Enter 3rd answer         
            nemoClassLearningPathwayPageObj.enterinput(2,prodActivity.answer[2]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();
        //Wait for next question button to appear
        nemoClassLearningPathwayPageObj.waitnext();
        //Click on next question button
        nemoClassLearningPathwayPageObj.clicknext();
        
        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for 4th input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(3); 
            //Enter 4th answer           
            nemoClassLearningPathwayPageObj.enterinput(3,prodActivity.answer[3]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();
        //Wait for next question button to appear
        nemoClassLearningPathwayPageObj.waitnext();
        //Click on next question button
        nemoClassLearningPathwayPageObj.clicknext();

        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for 5th input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(4);  
            //Enter 5th answer          
            nemoClassLearningPathwayPageObj.enterinput(4,prodActivity.answer[4]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();
        //Wait for next question button to appear
        nemoClassLearningPathwayPageObj.waitnext();
        //Click on next question button
        nemoClassLearningPathwayPageObj.clicknext();

        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for 6th input text box to appear
            nemoClassLearningPathwayPageObj.waitForInput(5);  
            //Enter 6th answer          
            nemoClassLearningPathwayPageObj.enterinput(5,prodActivity.answer[5]);
        });
        //Get out of the frame
        browser.frame(null);
        //Wait for check button to appear
        nemoClassLearningPathwayPageObj.waitcheck();
        //Click check button
        nemoClassLearningPathwayPageObj.clickcheck();      

        //Wait for submit activity button to appear
        nemoClassLearningPathwayPageObj.waitsubmit();
        //Click on submit activity button
        nemoClassLearningPathwayPageObj.clicksubmit();
        //Wait for next activity button to appear
        nemoClassLearningPathwayPageObj.waitnextact();
        //Wait for activity to launch              
        nemoClassLearningPathwayPageObj.waitForFrame();   
        //Enter frame     
        browser.frame(0,function()
        {
            //Wait for activity completed screen to appear
            nemoClassLearningPathwayPageObj.waitForActivityCompletedScreen();
        });
        //Get out of the frame
        browser.frame(null);        
        //Wait for TOC dropdown to appear
        nemoClassLearningPathwayPageObj.waitForTocDropdownToAppear();
        //Open toc dropdown
        nemoClassLearningPathwayPageObj.clickTocDropdown();        
        //Wait for score to appear in the learning path
        nemoClassLearningPathwayPageObj.waitscore(scorablename);
        //Get score of the activity
        nemoClassLearningPathwayPageObj.checkscore(function(result)
        {
            //Verify activity score
            browser.verify.equal(result,scorableScore.marks,"Actual result is not as expected");
        },scorablename)
        //Wait for star to appear alongside activity in the learning path
        nemoClassLearningPathwayPageObj.waitstar(scorablename);
        browser.pause(5000);
        
    });       
    it('Verify the student progress under class analytics via teacher login', function (browser) {

        nemoLaunchPageObj.clickLogin();
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        //Login via Teacher
        nemoLoginPageObj.login(username_teacher,password);
        //Create Teacher dashboard page object
        nemoTeacherDashboardPageObj = browser.page['nemoTeacherDashboard.page']();
        //Wait for Teacher dashboard
        nemoTeacherDashboardPageObj.waitForClassAppear();
        //Go to class
        nemoTeacherDashboardPageObj.goToClass();
        //wait for student analytic
        nemoTeacherDashboardPageObj.waitForAnalytic();
        //enter student details page
        nemoTeacherDashboardPageObj.openStudentDetails();
        //Create page object for student details page
        studentDetailsPageObj = browser.page['studentDetails.page']();
        //Wait for activity attempts to appear
        studentDetailsPageObj.waitForActivityAttempts();
        //Get activity attempts
        studentDetailsPageObj.getActivityAttempts(function(result)
        {            
            countAfter = result;
            console.log("Activity attempts (before submission) = "+countBefore)
            console.log("Activity attempts (after submission) = "+countAfter)
            //Assert that the activity attempts has increased on submission
            assert.isAbove(browser,countBefore,countAfter,"Attempts has not increased")                     
        })

    });
    it('Add and remove teacher from a class', function (browser) {
        
        nemoLaunchPageObj.clickLogin();
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();

        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        //Login via Teacher
        nemoLoginPageObj.login(username_teacher,password);
        //Create Teacher dashboard page object
        nemoTeacherDashboardPageObj = browser.page['nemoTeacherDashboard.page']();
        //Wait for Teacher dashboard
        
        nemoTeacherDashboardPageObj.waitForClassAppear();
        browser.pause(4000);
      //  browser.refresh();
      //  nemoTeacherDashboardPageObj.waitForClassAppear();
        //Go to class
        nemoTeacherDashboardPageObj.goToClass();
        //wait for add teacher link
        nemoTeacherDashboardPageObj.waitForAddTeacher();
        browser.pause(4000);
      //  browser.refresh();
      //  nemoTeacherDashboardPageObj.waitForAddTeacher();
        //Click add teacher
        nemoTeacherDashboardPageObj.clickAddTeacher();
        //wait for add button
        nemoTeacherDashboardPageObj.waitforaddbtn();
        //wait for teachers list
        nemoTeacherDashboardPageObj.waitSelectTeacher();
        //move to add teacher
        nemoTeacherDashboardPageObj.moveToTeacher();
        
        //Select a teacher from list
        nemoTeacherDashboardPageObj.selectTeacher();
        
        //Click add button
        nemoTeacherDashboardPageObj.clickaddteacherbtn();
        //verify added teacher text
        nemoTeacherDashboardPageObj.verifyAddedTeacher(vertext);
        browser.pause(2000);            
        //wait for back button
        /* nemoTeacherDashboardPageObj.waitbackbtn();
        //BACK TO DASHBOARD     
        nemoTeacherDashboardPageObj.clickBackBtn(); */
        //Wait for logo
        headerPageObj.waitForLogoToAppear();
        //Click on logo
        headerPageObj.clickLogo();
        //Wait for Teacher dashboard
        nemoTeacherDashboardPageObj.waitForClassAppear();
        //Go to class
        nemoTeacherDashboardPageObj.goToClass();
        //wait for add teacher link
        nemoTeacherDashboardPageObj.waitForSelectTeacher();
         //select added teacher
        nemoTeacherDashboardPageObj.selectAddedTeacher();
        //wait for remove button
        nemoTeacherDashboardPageObj.waitForRemoveBtn();
        //click remove button
        nemoTeacherDashboardPageObj.clickRemoveBtn();
        //wait for final remove button
        nemoTeacherDashboardPageObj.waitFinalRemove();
        nemoTeacherDashboardPageObj.lastRemove();

       //wait for remove button to be present
      // nemoTeacherDashboardPageObj.removeBtnPresent();
        //click final remove
        nemoTeacherDashboardPageObj.clickFinalRemove();
        //verify removed text
        nemoTeacherDashboardPageObj.verifyRemovedTeacher(vertext1);
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

        //take screenshot on every test completion
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
