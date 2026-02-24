# DevTinder

- Create a Vite + React application
- Remove unecessary code and create a Hello world app
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a NavBar.jsx seperate component file.
- Install react router dom.
- Create Browser Router > Routes > Route=/ Body > Route Children
- Create an Outlet in the Body Component.
- Create a Footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to app with configuration: origin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- Install Redux Toolkit - react-redux + @reduxjs/toolkit
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if data is coming properly in store.
- NavBar should update as user logs in
- Refactor code to add constants file + create a components folder
- Should not be able to access other routes without login
- If token is present, redirect user to login page
- Logout feature
- Get the Feed and it in store
- Build the User Card on Feed
- Edit profile feature
- Show toast message on save of profile
- See all my connections
- See all my connection requests
- Feature: Accept/Reject a connection request
- Send/Ignore the user card from the feed
- Sign Up feature
- Compatible on mobile devices


# Deployment

- SignUp on AWS
- Launch an instance
- chmod 400 <secret>.pem to modify permission.
- ssh -i "devTinder-secret.pem" ubuntu@ec2-3-107-16-245.ap-southeast-2.compute.amazonaws.com
- Install node version 22.16.0
- Git clone 
- Frontend
     - npm install -> dependencies install
     - npm run build
     - sudo apt update
     - sudo apt install nginx
     - sudo systemctl start nginx
     - sudo systemctl enable nginx
     - Copy code from dist(build files) to /var/www/html/
     - sudo scp -r dist/* /var/www/html/
     - Enable port :80 of your instance
- Backend
     - Allowed ec2 instance public IP on mongodb server
     - npm install pm2 -g
     - pm2 start npm -- start
     - To check logs, use command pm2 logs
     - To clear the logs, pm2 flush npm --> npm is the name of the application.
     - pm2 list --> To list the processes that are running.
     - pm2 stop npm --> To stop the process.
     - pm2 delete npm --> To delete the process.
     - pm2 start npm --name "name" -- start to give a custom name to the process.
     - config nginx - /etc/nginx/sites-available/default
     - restart nginx - sudo systemctl restart nginx
     - Modify the BASEURL in frontend project to "/api"

Frontend = http://3.107.16.245/
Backend = http://3.107.16.245:7777/

Domain name = devtinder.com => 3.107.16.245

Frontend = devtinder.com
Backend = devtinder.com:7777 => devtinder.com/api





Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile