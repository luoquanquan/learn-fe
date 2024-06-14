import bar from './bar'
function foo(invoker) {
    console.log(invoker, ' invokes foo.js')
    bar('foo.js')
}
export default foo
