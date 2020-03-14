import React from 'react';

export default Comp => class withMouse extends React.Component {
    constructor() {
        super()
        this.state = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        window.addEventListener('mousemove', ({x, y}) => {
            this.setState({x, y})
        })
    }

    render() {
        const {x, y} = this.state
        const props = {x, y}
        return <Comp {...props} />
    }
}
