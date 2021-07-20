import { ReactiveBase} from '@appbaseio/reactivesearch';
import React from 'react';
import { Provider } from 'react-redux';
import MainContainer from "./containers/MainContainer";
import store from "./store/store";
import Container from './legacy/styles/Container';
import theme from './components/theme';

function App() {
  return (
    <Container>
      <Provider store={store}>
        <ReactiveBase
          app={process.env.REACT_APP_ES_INDEX as string}
          url={process.env.REACT_APP_ES_HOST as string}
          theme={theme}>
          <MainContainer/>
        </ReactiveBase>
      </Provider>
    </Container>
  );
}

export default App;
