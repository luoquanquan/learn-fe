import React from 'react'
import withMouse from './withMouse'

class HocChild extends React.Component {
    constructor() {
        super()

        this.state = {}
    }

    render() {
        const {x, y} = this.props

        return <div>
            x: {x} / y: {y}
        </div>
    }
}

export default withMouse(HocChild)
