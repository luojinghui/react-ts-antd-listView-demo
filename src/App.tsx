
import * as React from 'react';
import Home from './view/index';

interface IProps {
  name: string
}

const App: React.FC<IProps> = ({name}) => {
  return (
    <div className="App">
      <header className="App-header">
        <div>{name}</div>
        <Home id="123"></Home>
      </header>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';

// interface IComponentNameProps { 
//   id: string;
// }

// interface IComponentNameState { }

// class App extends Component<IComponentNameProps, IComponentNameState> {
//   public render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <span>id: { this.props.id }</span>
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
