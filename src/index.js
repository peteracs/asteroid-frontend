import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/layout/app.jsx';
import 'rodal/lib/rodal.css'
import './styles/fonts.scss'
import './styles/style.scss'
import {RecoilRoot} from "recoil";

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);