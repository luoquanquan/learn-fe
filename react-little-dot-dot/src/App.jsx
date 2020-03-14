import React from 'react'
import ReactDOM from 'react-dom'

class Child extends React.Component {
    constructor() {
        super()
        console.log('constructor')
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    render() {
        console.log('render')

        return <div>i'm child ~</div>
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            count: 0
        }

        this.handleClick = this.handleClick.bind(this)
    }

    renderPop() {
        console.log('renderPop')
        return ReactDOM.createPortal(<Child />, document.body)
    }

    handleClick() {
        this.setState(({count}) => ({
            count: count + 1
        }))
    }

    render() {
        const {count} = this.state
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
                {!!(count % 2) && this.renderPop()}
            </div>
        )
    }
}

export default App;
