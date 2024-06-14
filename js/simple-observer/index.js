class Observer {
    constructor(initState) {
        this.state = initState
        this.audience = []
    }

    attach(audience) {
        this.audience.push(audience)
    }

    setState(newState) {
        const oldState = this.state
        this.state = newState
        this.audience.forEach(s => s.update(newState, oldState))
    }
}

module.exports = Observer