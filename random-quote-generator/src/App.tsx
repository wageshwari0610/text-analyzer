import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import { useState } from "react"
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
  const [isDisabled, setIsDisabled] = useState(true)

  const handleNextQuote = () => {
    if (randomQuote.length - 1 === currentIdx) {
      generateRandomQuote()
    }
    setCurrentIdx((prev: any) => prev + 1)
    if (currentIdx >= 0) {
      console.log(currentIdx, "inside if")
      setIsDisabled(false)
    }
  }
  const handlePreviousQuote = () => {
    let temp = currentIdx
    setCurrentIdx(temp - 1)
    if (temp - 1 === 0) {
      setIsDisabled(true)
    }
  }

  return (
    <>
      {console.log(currentIdx, randomQuote)}
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            <p>
              {randomQuote.length >= 0
                ? randomQuote[currentIdx]?.text
                : "Loading..."}
            </p>
            <span>-{!isLoading && randomQuote[currentIdx]?.author}</span>
          </div>
          <div className="bottom-navigation">
            <div>
              <Button
                className={
                  isDisabled
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
