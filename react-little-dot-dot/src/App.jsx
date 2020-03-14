import React from 'react';

class App extends React.Component {

    handleClick() {
        console.log(this)
    }

    render() {
        return (
            <div className="app">
                <button onClick={this.handleClick.bind(this)}>click Me</button>
            </div>
        )
    }
}

export default App;
