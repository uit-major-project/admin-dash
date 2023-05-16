import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { ThemeProvider, Global, css } from '@emotion/react';

import { gql, useQuery } from '@apollo/client';
import { adminVar } from '@/apollo/reactiveVars';
// import { StyledLoader } from '../Loader';

const StyledMain = styled.main`
  // height: calc(100vh - 5em);
  width: 100%;
  // margin-top: 3.5em;
`;

const MainLayoutContainer = styled.div`
  // width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface Props {
  title?: string;
  children: JSX.Element;
}

const MainLayout = (props: Props): JSX.Element => {
  // get admin data and store in apollo reactive variable
  // const { data } = useQuery(GET_ADMIN_DATA)
  
  // query for getting currently logged in admin user
  const GET_CURRENT_ADMIN_USER = gql`
    query getCurrentAdminUser {
      getCurrentAdminUser {
        id
        createdAt
        updatedAt
        role

        firstname
        lastname
        email
        image
        phone
        permanentAddress
      }
    }
  `
  
  const { data, error, loading } = useQuery(GET_CURRENT_ADMIN_USER, {
    fetchPolicy: 'network-only',
  })

  if (error) {
    alert(`error fetching current admin ${error}`)
  }

  // if (data) {
  //   // store admin data in apollo reactive variable
  //   adminVar(data)
  //   console.log('admin', data);
  // }

  React.useEffect(() => {
    console.log('user', data?.getCurrentAdminUser);
    if (data && data.getCurrentAdminUser) {
      adminVar(data.getCurrentAdminUser);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{props.title ? '- ' + props.title : ''}</title>
      </Head>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html {
            overflow-x: hidden;
            font-size: 14px;
          }
          body {
            font-size: 1.25rem;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            padding: 0;
            margin: 0;
          }
          .section-heading {
            font-size: 3em;
            font-weight: 300;
            letter-spacing: 0.15em;
            margin: 0 0 1em 0;
            text-transform: uppercase;
            text-align: center;
          }
          button:disabled {
            cursor: not-allowed !important;
            pointer-events: all !important;
          }

          @media (max-width: 800px) {
            .section-heading {
              font-size: 1.5em;
            }
          }
        `}
      />
      {loading ? (
        // <StyledLoader />
        <div>Loading...</div>
      ) : (
        <MainLayoutContainer>
          <StyledMain>{props.children}</StyledMain>
        </MainLayoutContainer>
      )}
    </>
  );
};

export default MainLayout;
