# react-inview
Add in/exit viewport event hook on react components


# install
install with npm

> npm install --save react-in-view

# how to use
```
import React, { Component } from 'react'
import InView from 'react-in-view'

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
```

#received props

| 属性名 | 描述信息 | 默认值 | 类型
--- | --- | --- | ---
onLeave | trigger when element leave viewport | | Function
onEnter | trigger when element enter viewport | | Function
thresholdX | set enter/leave threshold rate that relative to the element width. | 0 | Number
thresholdY | set enter/leave threshold rate that relative to the element height. | 0 | Number
offsetTop | set enter/leave threshold value that offset window top | 0 | Number
offsetBottom | set enter/leave threshold value that offset window bottom | 0 | Number
offsetRight | set enter/leave threshold value that offset window right | 0 | Number
offsetLeft | set enter/leave threshold value that offset window left | 0 | Number
