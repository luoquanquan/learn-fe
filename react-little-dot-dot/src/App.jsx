import React from 'react';

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

    handleClick() {
        this.setState(({count}) => ({
            count: count + 1
        }))
    }

    render() {
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
                <Child />
            </div>
        )
    }
}

export default App;
