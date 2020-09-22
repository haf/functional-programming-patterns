import { useEffect, useState } from "react"
import Layout from '../components/Layout'

const defaultItems = [
  { text: "Learn Functional Programming", done: false, colour: null },
  { text: "Learn React", done: false, colour: null },
  { text: "Play around in JSFiddle", done: true, colour: null },
  { text: "Build something awesome", done: true, colour: null }
]

type Item = Readonly<{ text: string; done: boolean; }>

type ColourisedItem = Readonly<Omit<Item, 'colour'> & { colour: string; }>

// currying and hole-in-the-middle
function colourise(configure: (config: RequestInit) => RequestInit): 
  // returning a configured function
  (item: Item) => Promise<ColourisedItem> {

  // async-await (aka monadic control flow)
  return async (item: Item) => {
    const res = await fetch('/api/colours', configure({
      method: 'GET',
    }))

    const json = await res.json()
    return {
      ...item,
      colour: json.colour as string
    }
  }
}

type State = Readonly<{
  loading: boolean;
  items: ColourisedItem[]
}>

export default function Page() {
  const [data, setData] = useState<State>({
    loading: true,
    items: []
  })

  const { loading, items } = data

  // currying usage
  const localToPage = '0123456789ABCDEF'
  const getColour = colourise(init => ({
    ...init,
    headers: {
      ...init.headers,
      'x-vanity-header': localToPage
    }}))

  // state handling in react:
  useEffect(() => {
    async function kickOff() {
      const nextItems = await Promise.all(defaultItems.map(getColour))
      setData({
        loading: false,
        items: nextItems
      })
    }
    if (data.loading) kickOff()
  }, [data, setData, getColour])

  return (
    <Layout title="Hole in the middle example">
      <h1>Pattern: hole in the middle</h1>
      {loading
        ? <h2>Loading...</h2>
        : <>
          <h2>Todos:</h2>
          <ol>
            {items.map(item => (
              <li key={item.text} style={{ color: item.colour }}>
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