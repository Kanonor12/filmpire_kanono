import ReactDOM  from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Provider } from "react-redux";
import store from "./app/store";
import ToggleColorMode from "./utils/ToggleColorMode";


ReactDOM.render(
  <Provider store={store}>
    <ToggleColorMode>
       <BrowserRouter>
        <App/>   
      </BrowserRouter>
    </ToggleColorMode>
  </Provider>, 
    document.getElementById('root')
);