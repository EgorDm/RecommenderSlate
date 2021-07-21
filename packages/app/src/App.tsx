import { ReactiveBase} from '@appbaseio/reactivesearch';
import React from 'react';
import { Provider } from 'react-redux';
import AppWrapper from "./containers/AppWrapper";
import MainContainer from "./containers/MainContainer";
import store from "./store/store";
import theme from './components/theme';
import 'antd/dist/antd.css';

function App() {
  return (
    <AppWrapper>
      <Provider store={store}>
        <ReactiveBase
          app={process.env.REACT_APP_ES_INDEX as string}
          url={process.env.REACT_APP_ES_HOST as string}
          theme={theme}>
          <MainContainer/>
        </ReactiveBase>
      </Provider>
    </AppWrapper>
  );
}

export default App;
