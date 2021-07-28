import { ReactiveBase} from '@appbaseio/reactivesearch';
import React from 'react';
import { Provider } from 'react-redux';
import AppWrapper from "./containers/AppWrapper";
import MainContainer from "./containers/MainContainer";
import store from "./store/store";
import theme from './components/theme';
import {getElasticIndex} from './hooks/use-elastic-schema';
import 'antd/dist/antd.css';
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <AppWrapper>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <ReactiveBase
          app={getElasticIndex()}
          url={process.env.REACT_APP_ES_HOST as string}
          theme={theme}>
          <MainContainer/>
        </ReactiveBase>
        </QueryClientProvider>
      </Provider>
    </AppWrapper>
  );
}

export default App;
