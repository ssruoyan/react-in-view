import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactInView from '../src/InView'

import './style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      show: false,
    }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }
  handleEnter() {
    this.setState({
      text: '进来了',
      show: true,
    })
  }
  handleLeave() {
    this.setState({
      text: '出去了',
      show: false,
    })
  }
  render() {
    let cls = 'top-bar'
    let { text, show } = this.state
    if (show) {
      cls = cls + ' show'
    }

    return (
      <div>
        <div style={{height: '1000px'}}></div>
        <div className={cls}>顶部导航</div>
        <ReactInView onEnter={this.handleEnter} onLeave={this.handleLeave} thresholdY={0.5}>
          <div style={{height: '200px', background: 'red', marginTop: '100px'}} className="in-view">
            {this.state.text}
          </div>
        </ReactInView>
        <div style={{height: '1000px'}}></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))