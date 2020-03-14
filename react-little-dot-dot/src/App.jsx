import React from 'react';

class App extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this)
    }

    render() {
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
            </div>
        )
    }
}

export default App;
