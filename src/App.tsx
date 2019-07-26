
import * as React from 'react';
import Home from './components/home';

interface IProps {
  id: string
}

const App: React.FC<IProps> = ({id}) => {
  return (
    <div className="App">
      <header className="App-header">
        <div>id: {id}</div>
        <Home id="123"></Home>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
