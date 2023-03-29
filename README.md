The code which runs API postman test remotely is in regression.js

The Azure pipeline yaml file: scheduleRun.yaml

The project allows us to run all our Postman API tests from particullar collection remotely by using Postman API url
The project integrated with additional libraries: newman, newman-reporter-htmlextra, newman-reporter-slackreporter. The libraries allows us to generate an HTML report and send a notification to a particular slack channel after each run


The project I integrated with Azure DevOps pipelines, for that I've created a yaml file and linked this repo and the yaml file with our Azure
![azurep](https://user-images.githubusercontent.com/57813114/228606583-f5a71c9d-5b9a-406d-bd0a-a80620677367.png)

The pipeline runs every 30 minutes in both QA and Stage environments simultaneously after that we can see HTML reports for each environment. We can see all detailed requests with request/respons headers and request/response bodies by clicking on 'Total Requests'
![2023-03-29_12-29](https://user-images.githubusercontent.com/57813114/228607066-1822de33-4e46-440f-a68f-39bcc77f8ea9.png)

After each run we are getting a notification with the Azure pipeline build url

On Success 

![success slack](https://user-images.githubusercontent.com/57813114/228608339-ea0dfe9a-31ea-4377-8a68-ec58cdc08927.png)


On Failure

![on failure 2](https://user-images.githubusercontent.com/57813114/228608768-40f83d30-ab52-4807-9e70-e7ad9bcd5196.png)
