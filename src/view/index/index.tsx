import * as React from 'react';

export interface IAppProps {
  id: string;
}

export default function Home({ id }: IAppProps) {
  // const set = new Set([1,2,3]);
  // const [ state ] = React.useState(set);
  // const [ count ] = React.useState<number | string>(1);

  return (
    <div className="content">
      <input type="text" />
      <div>
        id: { id }
      </div>
    </div>
  );
}
