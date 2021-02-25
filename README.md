# created for sezzle

Visit: https://sezzle-frontend-calculator.herokuapp.com/

To start 
```
git clone https://github.com/Nopekick/calculator.git
```

Frontend (required)
```
npm install
npm start
```

Backend (not required)
```
npm install
node index.js
```
*In order to use the backend locally, change line 16 in App.js (frontend ) to 
```
socket = io("http://localhost:8080"); 
```