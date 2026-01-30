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



Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile