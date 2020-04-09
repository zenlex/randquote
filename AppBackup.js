import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from "react"

{/*(function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/}


{//Random Quote Generator - Free Code Camp Front End Libraries Certification - Project 1
/********************************************************************
 * Test Cases:
 * wrapper element id = "quote-box"
 * inside #quote-box:
 *  #text element
 *  #author element
 *  clickable element (button) for #newquote
 *  a element #tweet-quote
 * 
 * at first load it should display a random quote in the #text element
 * clicking #new-quote button should fetch new quote and rerender #text & #author fields
 * a #tweet-quote element should include href = "twitter.com/intent/tweet"
 * 
 * #quote-box wwrapper should be horizonatally centered
*/}









const NewQuote = (props) => {};
{/*call QuoteGen.newQuote on button click*/}


const TweetQuote = (props) => {};
{/*call href in new window on button click*/}

const QAPI = "https://type.fit/api/quotes";

class QuoteGen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote:'', 
            author: ''
        }
        this.clickHandle = this.clickHandle.bind(this);
    }
    
    componentDidMount() {
        this.clickHandle();
    }
    clickHandle(event) {
        {/* fetch to an API for a JSON quote and parse into array of objects*/}
        var quotesArr;
      
        fetch(QAPI)
          .then(response => response.json())
          .then(data => quotesArr = data)
          .then(() => console.log(quotesArr))
          .then((index=Math.floor(Math.random()*quotesArr.length)) => this.setState(
            {quote:quotesArr[index].text, author:quotesArr[index].author}));
        {/*Pick random index from array of quotes and set state */}
    };
    
    
        render() {
            return(
                <div>
                    <div>Quote: "{this.state.quote}"</div>
                    <div>Author: -{this.state.author}</div>
                    <input type="submit" value="Get New Quote" onClick={this.clickHandle} />
                </div>
            )

        }    

    }
    export default QuoteGen;