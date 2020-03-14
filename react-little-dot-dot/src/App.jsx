import React from 'react'

class App extends React.Component {
    constructor() {
        super()
        this.state = { count: 0 }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)
    }

    render() {
        const {count} = this.state
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
                {count}
            </div>
        )
    }
}

export default App;
