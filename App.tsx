import React from 'react'
import { Navigator } from './src/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { OrderProvider } from './src/context/OrderContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
