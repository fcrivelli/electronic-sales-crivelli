import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css";
import firebaseConfig from './Firebase-config';
import { FirebaseAppProvider } from 'reactfire';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={'Loading..'}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
