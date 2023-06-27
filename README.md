Project live website link 
https://unique-trifle-c0f79b.netlify.app
# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

About:

The main idea is to create a simple e-commerce website that can handle tasks such as loading product data from a third-party API and then showing it on the home page. Following that, we can add the products to the cart, from which we can remove them if we no longer require them. And finally, we can checkout or make a payment using the Razorpay payment gateway in test mode. You can see your purchase history also.

This project improved my understanding of the Redux toolkit which is used for state management, as well as reduced my extra tasks, such as creating users, loading products, and working in the cart section.This project also provided me with the opportunity to work on Firebase authentication by integrating it with email-password based login.As the project progressed, the concept of react-routing became clearer. And also used the firebase/firestore database for persistent storage of purchase history.

The problem faced by me during the project is working with local storage, which has scope for improvement in this project. Other libraries can be used to help with the user persistence process. And also in showing user specific purchase history.

I also wanted to use the firestore for the cart section. But was unable to use. But I will integrate the firestore for cart section.

My future thoughts for this ebsite is to give more feature's like
1. Sign/login with Google and Facebook.
2. A feature like amazon pay types. A native payment feature where you can get cashback or get the refund of the item purchased.


Getting Started
1. Clone the repo :
    git clone https://github.com/Persu1t/emart.git
2. Install denpedencies
    npm install
3. Create an account with Firebase, start a new project in the console, and read the Firebase Doc(https://firebase.google.com/docs/web/setup?hl=en&authuser=0). The required configuration will be provided by Firebase, which you can add in the file ``firebaseinit.js` path--> src/firebaseinit.js.
4. Create an .env file in root folder. and add all of the following firebase configuration ids and keys to the.env file with their respective keys and values.

REACT_APP_API_KEY = "Your firebase id";

REACT_APP_FIREBASE_AUTH_DOMAIN = "Your firebase auth Domain";

REACT_APP_FIREBASE_PROJECT_ID = "Your firebae project id";

REACT_APP_STORAGE_BUCKET = "Your storage bucket";

REACT_APP_MESSAGE_ID = "Your messaging sender id";

REACT_APP_APP_ID = "Your app Id";

then modify your configuration firebaseinit.js as follows:

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
};


5. Create an Razorpay account and consult Docs Razorpay for payment gateway integration. Razorpay will provide you with a unique ID,   which you can use in the filename "cart.js."Add the razorpay Id to the '.env' file as follows:
REACT_APP_RAZORPAY_ID = "Your Razorpay Id";
and replace the key in Addtocart.js

key: process.env.REACT_APP_RAZORPAY_ID;

6.Don't forget to add .env in .gitignore

7.Finally, to run the project, use the following command:
    npm start
