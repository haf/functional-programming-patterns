import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/parallelism-and-currying-and-hole">
        <a>Using parallelism, currying and a hole in the middle</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
