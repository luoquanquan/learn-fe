import React from 'react'

const ThemeContext = React.createContext('light')

const FuncChild = () => <ThemeContext.Consumer>
    {context => <div>i'm func Child ~ current theme {context}</div>}
</ThemeContext.Consumer>
class Child extends React.Component {
    constructor() {
        super()
        console.log('constructor')
    }

    static contextType = ThemeContext

    render() {
        const {context} = this
        return <div>i'm child ~ current theme: {context}</div>
    }
}
class App extends React.Component {
    constructor() {
        super()

        this.state = {
            theme: 'light'
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(({theme}) => ({
            theme: theme === 'light' ? 'black' : 'light'
        }))
    }

    render() {
        const {theme} = this.state
        return (
            <ThemeContext.Provider className="Provider" value={theme}>
                <div className="app">
                    <button onClick={this.handleClick}>click Me</button>
                    <Child />
                    <FuncChild />
                </div>
            </ThemeContext.Provider>
        )
    }
}

export default App;
