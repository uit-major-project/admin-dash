// import antd css
import 'antd/dist/antd.css'

// import { adminVar } from '@/apollo/reactiveVars'
import MainLayout from '@/components/Layout/MainLayout'
import '@/styles/globals.css'
// import { getAdminData } from '@/utils/auth'
import { ApolloProvider, gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import type { AppProps } from 'next/app'

import dynamic from 'next/dynamic'
import { useApollo } from '../../lib/apolloClient'

// const Loader = styled.div`
// `

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  
  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
