import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import { useState } from 'react'

// import { verifyAdmin, loginAdmin } from '@/utils/auth'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import { adminVar } from '@/apollo/reactiveVars'

import { message } from 'antd';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  // get admin var data from apollo reactive variable
  const admin = useReactiveVar(adminVar)

  if (admin && localStorage.getItem('major_project_admin') !== '') {
    // redirect to dashboard
    window.location.href = '/';
  }

  // const [answer, setAnswer] = useState('');
  // const [error, setError] = useState(null);
  // const [status, setStatus] = useState('typing');

  // if (status === 'success') {
  //   return <h1>That's right!</h1>
  // }

  function handleSubmit(e: any) {
    e.preventDefault();
    // setStatus('submitting');

    let email = e.target[0].value || '';
    let password = e.target[1].value || '';

    console.log(email, password);

    // verify admin
    // const isAdmin = verifyAdmin(email, password);
    // if (isAdmin) {
    //   // login admin
    //   loginAdmin(email, password);
    // } else {
    //   // show alert
    //   alert('Invalid credentials');
    // }
    loginAdmin({ variables: { email, password } });
  }

  function onCompleted(data: any) {
    // clear admin data in apollo reactive variable
    console.log('logged in data', data)
    adminVar(data.loginAdmin)

    // update in local storage
    localStorage.setItem('major_project_admin', JSON.stringify(data.loginAdmin));

    // redirect to login
    window.location.href = '/';
  }


  const LOGIN_ADMIN = gql`
    mutation loginAdmin($email: String!, $password: String!) {
      loginAdmin(email: $email, password: $password) {
        id
        firstname
        lastname
        email
        password
        phone
        permanentAddress
      }
    }
  `

  const [loginAdmin, { data, error, loading }] = useMutation(LOGIN_ADMIN, {
    onCompleted,
  })

  if (error) {
    alert(`error logging in admin ${error}`)
  }

  // if (data) {
  //   alert(`admin logged in ${data}`)
  // }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}

        {/* admin login */}
        <div className={styles.center}>
          <div className={styles.card}>
            <h2>
              Admin Login <span>-&gt;</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
              </div>
              <div className={styles.formGroup}>
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
