import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import throttle from './utils/throttle'


class InView extends Component {
  constructor(props) {
    super(props)

    this.interval = 100

    this.isInView = this.isInView.bind(this)
    this.check = this.check.bind(this)

    this.elements = []
    this.current = []
  }
  componentDidMount() {
    const { triggerEvents } = this.props
    this.elements.push(ReactDOM.findDOMNode(this))

    triggerEvents.forEach((e) => {
      window.addEventListener(e, this.check)
    })
  }
  componentWillUnmount() {
    const { triggerEvents } = this.props

    triggerEvents.forEach((e) => {
      window.removeEventListener(e, this.check)
    })
  }
  check(e) {
    const { onEnter, onLeave } = this.props

    throttle(() => {
      this.elements.forEach((el) => {
        let passes  = this.isInView(el);
        let index   = this.current.indexOf(el);
        let elIn = index > -1
        let entered = passes && !elIn
        let exited  = !passes && elIn

        if (entered) {
            this.current.push(el);
            onEnter && onEnter(el)
        }

        if (exited) {
            this.current.splice(index, 1);
            onLeave && onLeave(el)
        }
      })
    })()
  }
  isInView(ele) {
    const rect = ele.getBoundingClientRect()
    const { thresholdY, thresholdX, offsetBottom, offsetLeft, offsetRight, offsetTop } = this.props

    const thresholdWidth = thresholdX * rect.width, thresholdHeight = thresholdY * rect.height
    const section = {
      top: rect.bottom,
      bottom: window.innerHeight - rect.top,
      left: rect.right,
      right: window.innerWidth - rect.left,
    }
    
    return section.top > offsetTop + thresholdHeight
      && section.bottom > offsetBottom + thresholdHeight
      && section.left > offsetLeft + thresholdWidth
      && section.right > offsetRight + thresholdWidth
  }
  render() {
    return this.props.children
  }
}

InView.propTypes = {
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  triggerEvents: PropTypes.array,
  thresholdX: PropTypes.number,
  thresholdY: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
};

InView.defaultProps = {
  thresholdX: 0,
  thresholdY: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  offsetRight: 0,
  offsetTop: 0,
  triggerEvents: ['scroll', 'resize']
}

export default InView;