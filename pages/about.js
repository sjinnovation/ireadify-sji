import Head from 'next/head'
import About from '../components/about'
import Layout from '../components/layout/Home-Layout'

export default function AboutUs() {
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Ireadify</title>
        <meta name="description" content="Ireadify - Home" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className=""> 
        <About />
      </main>
    </Layout>
  )
}
