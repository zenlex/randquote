import React from 'react';
import './randQuote.css';
import { CSSTransitionGroup } from 'react-transition-group';
import twitterLogo from './images/twitter_bird.png';

const QAPI = "https://type.fit/api/quotes";
let quotesArr = [];

// DEBOUNCING UTIL TO ALLOW FOR TEXT ANIMATION TO CLEAR
const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  }
}
class QuoteGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      quoteindex: 0
    }
    this.clickHandle = this.clickHandle.bind(this);
  }

  debounceQuote = debounce(() => this.setQuote(), 300)

  setQuote() {
    /*Pick random index from array of quotes and set state */
    let index = Math.floor(Math.random() * quotesArr.length)
    this.setState({
      quote: quotesArr[index].text,
      author: quotesArr[index].author,
      quoteindex: index
    });
    if (quotesArr[index].author === null) {
      this.setState({ author: "Anonymous" });
    }
  }

  async componentDidMount() {
    /* fetch to an API for a JSON quote and parse into array of objects*/
    try {
      const response = await fetch(QAPI);
      quotesArr = await response.json();
      await this.setQuote();
    } catch (err) {
      alert(err);
    }
  }

  clickHandle(event) {
    this.debounceQuote()
  };

  render() {
    return (
      <div id="wrapper">
        <div id='quote-box'>
          <CSSTransitionGroup
            transitionName="fadeboth"
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
          >
            <div id='text'
              key={this.state.quoteindex}
              className='fontDefs'
            >
              {this.state.quote
                ? `"${this.state.quote}"`
                : ''}
            </div>
            <div id='author'
              key={this.state.quoteindex + 1}
              className='fontDefs'
            >
              {this.state.author
                ? `-${this.state.author}`
                : ''}
            </div>
          </CSSTransitionGroup>
          <div id='controls'>
            <input id='new-quote' className='fontDefs' type="submit" value="Get New Quote" onClick={this.clickHandle} />
            <TweetIt quote={encodeURIComponent(this.state.quote)} author={this.state.author} />
          </div>
        </div>
      </div>
    )

  }
}

export default QuoteGen;

function TweetIt(props) {
  return (
    <div className='icoButton'>
      <a id='tweet-quote'
        href={`https://twitter.com/intent/tweet?text="${String(props.quote)}"%0a-${props.author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="img-container">
          <img id="twitter-logo" 
            src={twitterLogo} 
            alt="Twitter Logo">
          </img>
        </div>
        <span className='fontDefs'>Tweet It!</span>
      </a>
    </div>
  )
}
