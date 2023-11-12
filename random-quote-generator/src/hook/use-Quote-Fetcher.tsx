import { useState, useEffect } from "react"
import axios from "axios"

const useQuoteFetcher = (URL: string) => {
  const [quote, setQuote] = useState([])
  const [randomQuote, setRandomQuote] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  useEffect(() => {
    axios
      .get(URL)
      .then(({ data: response }) => {
        setQuote(response)
        setLoading(false)
        generateRandomQuote(response)
      })
      .finally(() => setLoading(false))
  }, [])
  const generateRandomQuote = (quotes = quote) => {
    const randomIdx = quotes.length && Math.floor(Math.random() * quotes.length)
    setRandomQuote((previousArray): any => [
      ...previousArray,
      quotes[randomIdx],
    ])
  }
  return {
    isLoading,
    randomQuote,
    generateRandomQuote,
    currentIdx,
    setCurrentIdx,
  }
}

export default useQuoteFetcher
