import {BrowserRouter, Link, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/react">
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>

        <br />

        <Route path="/" exact render={() => '这里是首页' } />
        <Route path="/about" exact render={() => '这里是关于' } />
    </BrowserRouter>
  );
}

export default App;
