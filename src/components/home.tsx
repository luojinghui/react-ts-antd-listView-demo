import * as React from 'react';

export interface IAppProps {
  id: string;
}

export default function App(props: IAppProps) {
  const set = new Set([1,2,3]);
  const [ state, setState ] = React.useState(set);
  const [ count, setcount ] = React.useState<number | string>(1);

  return (
    <div>
      state: 
      {
        state
      }
      <div>
        count: {
          count
        }
      </div>
    </div>
  );
}
