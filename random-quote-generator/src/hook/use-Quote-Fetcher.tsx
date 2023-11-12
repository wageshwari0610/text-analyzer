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
      })
      .finally(() => setLoading(false))
    generateRandomQuote()
  }, [])
  const generateRandomQuote = () => {
    const randomIdx = quote.length && Math.floor(Math.random() * quote.length)

    setRandomQuote((previousArray): any => [...previousArray, quote[randomIdx]])
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
