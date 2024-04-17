import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

// 定义组件
const first = () => <h2>Page 1</h2>;
const second = () => <h2>Page 2</h2>;
const third = () => <h2>Page 3</h2>;
const error = () => <h2>Not Found</h2>;

// App组件
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">1</Link></li>
            <li><Link to="/second">2</Link></li>
            <li><Link to="/third">3</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={first} />
          <Route path="/second" component={second} />
          <Route path="/third" component={third} />
          <Route component={error} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
