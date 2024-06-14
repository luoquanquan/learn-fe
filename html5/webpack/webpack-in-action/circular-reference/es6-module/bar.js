import foo from './foo'
let invoked = false

function bar(invoker) {
    if (!invoked) {
        invoked = true
        console.log(invoker, ' invokes bar.js')
        foo('bar.js')
    }
}
export default bar
