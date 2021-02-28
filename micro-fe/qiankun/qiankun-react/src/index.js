import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = props => {
    const {container} = props

    console.log(`当前时间 ${Date.now()}: debug 的数据是 container: `, container)
    ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        container ? container.querySelector('#root') : document.getElementById('root')
      );
}

// 对接协议
export async function bootstrap (props) {}
export async function mount (props) {
  console.log(`当前时间 ${Date.now()}: debug 的数据是 props: `, props)
  render(props)
}
export async function unmount (props) {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
