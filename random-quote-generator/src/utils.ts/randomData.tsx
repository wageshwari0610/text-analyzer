import { useState } from "react"

const RandomArray = (quote: any) => {
  let quoteArray: any = []
  const [randomQuote, setRandomQuote] = useState([])
  const randomIdx = Math.floor(Math.random() * quote.length)
  setRandomQuote(quote[randomIdx])
  console.log(randomIdx)

  return { quoteArray, randomQuote }
}

export default RandomArray
