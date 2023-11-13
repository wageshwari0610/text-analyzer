import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import { useEffect, useState } from "react"
import useQuoteFetcher from "./hook/use-Quote-Fetcher"
import "./App.css"

function App() {
  const URL = "https://type.fit/api/quotes"
  const {
    isLoading,
    randomQuote,
    generateRandomQuote,
    currentIdx,
    setCurrentIdx,
  }: any = useQuoteFetcher(URL)
  const [isPreviousDisabled, setPreviousDisabled] = useState(true)
  useEffect(() => {
    if (currentIdx > 0) {
      setPreviousDisabled(false)
    } else {
      setPreviousDisabled(true)
    }
  }, [currentIdx])
  const handleNextQuote = () => {
    if (randomQuote.length - 1 === currentIdx) {
      generateRandomQuote()
    }
    setCurrentIdx((prev: any) => prev + 1)
  }
  const handlePreviousQuote = () => {
    let temp = currentIdx
    setCurrentIdx(temp - 1)
  }

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      {console.log("Loading", isLoading)}
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          {isLoading ? (
            <h1>Loading</h1>
          ) : (
            <div className="quote">
              <p>{randomQuote[currentIdx]?.text}</p>
              <span>-{randomQuote[currentIdx]?.author}</span>
            </div>
          )}
          <div className="bottom-navigation">
            <div>
              <Button
                className={
                  isPreviousDisabled
                    ? classnames("rotate disabled-button ")
                    : classnames("rotate cp")
                }
                onClick={handlePreviousQuote}
              />
              <Button className="cp" onClick={handleNextQuote} />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter title="Post this quote on twitter!" className="cp" />
              <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
