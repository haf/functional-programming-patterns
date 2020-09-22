import { useEffect, useState } from "react"
import Layout from '../components/Layout'

type Item = Readonly<{ text: string; done: boolean; }>

type State = Readonly<{
  loading: boolean;
  items: Item[]
}>

function stateful()

export default function Page() {
  const [data, setData] = useState<State>({
    loading: true,
    items: []
  })

  const { loading, items } = data

  return (
    <Layout title="Hole in the middle example">
      <h1>Pattern: hole in the middle</h1>
      {loading
        ? <h2>Loading...</h2>
        : <>
          <h2>Todos:</h2>
          <ol>
            {items.map(item => (
              <li key={item.text}>
                <label>
                  <input type="checkbox" disabled readOnly checked={item.done} />
                  <span className={item.done ? "done" : ""}>{item.text}</span>
                </label>
              </li>
            ))}
          </ol>
        </>}
    </Layout>
  )
}