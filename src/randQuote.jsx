import React from 'react';
import './randQuote.css';
import { CSSTransitionGroup } from 'react-transition-group';

//Random Quote Generator - Free Code Camp Front End Libraries Certification - Project 1
/****************************************************************************************
 *
 * Test Cases:
 * wrapper element id = "quote-box"
 * inside #quote-box:
 *  #text element
 *  #author element
 *  clickable element (button) for #newquote
 *  <a> element #tweet-quote
 * 
 * at first load it should display a random quote in the #text element
 * clicking #new-quote button should fetch new quote and rerender #text & #author fields
 * a #tweet-quote element should include href = "twitter.com/intent/tweet"
 * 
 * #quote-box wwrapper should be horizonatally centered
*****************************************************************************************/


const QAPI = "https://type.fit/api/quotes";
let quotesArr = [];

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

    setQuote() {
        /*Pick random index from array of quotes and set state */

        let index = Math.floor(Math.random() * quotesArr.length)
        this.setState({ quote: quotesArr[index].text, author: quotesArr[index].author, quoteindex: index });
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

    componentDidUpdate() {

    }

    clickHandle(event) {
        this.setQuote();
    };



    render() {
        return (
            <div id='quote-box'>
                <CSSTransitionGroup
                    transitionName="fadeboth"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={0}
                    transitionLeave={false}
                >
                    <div id='text' key={this.state.quoteindex} className='fontDefs'>"{this.state.quote}"</div>
                    <div id='author' key={this.state.quoteindex + 1} className='fontDefs'>-{this.state.author}</div>
                </CSSTransitionGroup>
                <input id='new-quote' className='fontDefs' type="submit" value="Get New Quote" onClick={this.clickHandle} />
                <TweetIt quote={encodeURIComponent(this.state.quote)} author={this.state.author} />
            </div>
        )

    }
}

export default QuoteGen;

function TweetIt(props) {
    return (
        <div className='icoButton'>
            <a id='tweet-quote' href=
                {`https://twitter.com/intent/tweet?text="${String(props.quote)}"%0a-${props.author}`} target="_blank" rel="noopener noreferrer">
                <img id="twitter-logo" src="./assets/twitter_bird.png" alt="Twitter Logo"></img>
                <span className='fontDefs'>Tweet It!</span>
            </a>
        </div>
    )
}