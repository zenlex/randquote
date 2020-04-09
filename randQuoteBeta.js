import React from 'react';
import logo from './logo.svg';
import './randQuote.css';
import { Component } from "react"


{//Random Quote Generator - Free Code Camp Front End Libraries Certification - Project 1
/****************************************************************************************
 *
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
*****************************************************************************************/}


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
                <div id='quote-box'>
                    <div id='text'>Quote: "{this.state.quote}"</div>
                    <div id='author'>Author: -{this.state.author}</div>
                    <input type="submit" value="Get New Quote" onClick={this.clickHandle} />
                    <TweetIt quote={this.state.quote} author={this.state.author}/>
                </div>
            )

        }    
    }
    
    export default QuoteGen;

    function TweetIt(props){
      return(
        <div>
          <a id='tweet-quote' href = {`https://twitter.com/intent/tweet?text="${String(props.quote)}"%0a-${props.author}`} target="_blank">Tweet It!</a><br />
        </div> 
      )
    }