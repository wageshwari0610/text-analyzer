import { useState, useEffect } from "react"
import axios from "axios"

const useQuoteFetcher = (URL: string) => {
  const [quote, setQuote] = useState([])
  const [randomQuote, setRandomQuote] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  useEffect(() => {
    setLoading(true)
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
    const tempArr = [...quotes]

    const randomIdx =
      tempArr.length && Math.floor(Math.random() * (tempArr.length - 1))
    if (tempArr?.[randomIdx]) {
      setRandomQuote((previousArray): any => [
        ...previousArray,
        tempArr[randomIdx],
      ])
    }
    tempArr.splice(randomIdx, 1)
    if (tempArr.length === 0) {
      setCurrentIdx(-1)
    }
    setQuote(tempArr)
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
