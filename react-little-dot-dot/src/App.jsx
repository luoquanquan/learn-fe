import React from 'react'

class App extends React.Component {
    constructor() {
        super()
        this.state = { count: 0 }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)
        this.setState(({count}) => ({count: count + 1}))
        console.log(this.state.count)

        setTimeout(() => {
            this.setState(({count}) => ({count: count + 1}))
            console.log(this.state.count)
            this.setState(({count}) => ({count: count + 1}))
            console.log(this.state.count)
        }, 1e3);
    }

    componentDidMount() {
        this.btn2.addEventListener('click', this.handleClick)
    }


    render() {
        const {count} = this.state
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
                <button ref={ref => {this.btn2 = ref}}>click Me2</button>
                {count}
            </div>
        )
    }
}

export default App;
