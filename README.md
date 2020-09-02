# Job-Portal
> ### Scraping project

## Description

In this project we are trying to scrape the website. Scraping happens here ***asynchronously***.

- ### backend
  > Here we are using flask as a backend to serve as a api.  
  ***[more details about scraping files](https://github.com/raita0100/Job-Portal/blob/master/backend/)***.  
  
- ### Frontend
  > Angular app will be serving as frontend
  ***[more details about Angular app](https://github.com/raita0100/Job-Portal/blob/master/job-app/)***
 
 ## usage 
 - ## Initialising the backend
    [refer-here](https://github.com/raita0100/Job-Portal/tree/master/backend#requirements)  
    Run flask server.
  
 - ## Front end  
  1. Install node-js.  
 
  2. Then using node-js _(npm)_ install angular.  
     ```cmd
     >> npm install -g @angular/cli@latest
     ```
  3. create a angular app.  
     ```cmd
     >> npm new job-app
     >> cd job-app
     ```  
  4. Download the repository and copy the ***src*** folder from repo to your angular app.   
    
  5. Install dependencies.  
   - Firebase
     ```cmd
     >> npm install --save firebase@latest
     ```
   - bootstrap
     ```cmd
     >> npm install --save bootstrap ngx-bootstrap
     ```
   - jquery
     ```cmd
     >> npm install jquery
     ```
      
  6. Then run angular app
     ```cmd
     >> ng serve
     ```  
  7. Add dependencies and files to your project from the repo
     * add scripts folder from ```repos/job-app/src/assets/scripts``` to your app.
     * add dependencies in angular.json file according to the repos angular.json.
     
  8. Open browser type url:
     ```link
     http://localhost:4200/
     ```
     
## Contributors
* [vinod](https://github.com/raita0100)
* [Koushik](https://github.com/koushikkolli)
 
