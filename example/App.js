import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactInView from '../src/InView'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      visible: false,
    }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }
  handleEnter() {
    this.setState({
      text: '进来了',
      visible: true,
    })
  }
  handleLeave() {
    this.setState({
      text: '出去了',
      visible: false,
    })
  }
  render() {
    const { text, visible } = this.state
    const style = {
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '40px',
      opacity: visible ? 1 : 0,
      lineHeight: '40px',
      color: '#fff',
      textAlign: 'center',
      transition: 'all 300ms ease-in-out',
      background: 'black'
    }
    const sectionStyle = {
      height: '200px',
      background: 'red',
      marginTop: '100px'
    }

    return (
      <div>
        <div style={{height: '1000px'}}></div>
        <div style={style}>顶部导航</div>
        <ReactInView onEnter={this.handleEnter} onLeave={this.handleLeave} thresholdY={0.5}>
          <div style={sectionStyle} className="in-view">
            {this.state.text}
          </div>
        </ReactInView>
        <div style={{height: '1000px'}}></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))