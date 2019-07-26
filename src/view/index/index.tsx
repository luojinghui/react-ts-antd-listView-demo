import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface IPage {
  page: number;
  total: number;
  arr: number[]
}

function getData(page = 0, size = 10): Promise<IPage> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [];

      for (let i = 0; i < size; i++) {
        const random = Math.ceil(Math.random() * 100000);

        arr.push(random);
      }

      resolve({
        page,
        total: 100,
        arr: arr
      });
    }, 1000);
  })
}

export interface IAppProps {
  id: string;
}

export default function Home({ id }: IAppProps) {
  // const [ count ] = React.useState<number | string>(1);
  const [page] = useState(0);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<IPage>({
    page: 0,
    total: 0,
    arr: []
  });

  const onChangeInput = (value: string) => {
    console.log("onChangeInput: ", value);
  }

  const getInitData = async () => {
    const result = await getData(0, 10);

    console.log("reuslt:", result);
    setLoading(false);
    setList(result);
  }

  useEffect(() => {
    getInitData();

  }, []);

  const renderList = () => {
    return list.arr.map((item: number) => (
      <div key={item} className="item">number: {item}</div>
    ))
  }

  return (
    <div className="content">
      <InputComp onChange={onChangeInput} />
      <div className="box">
        <div className="list">
          {
            loading ?
              <div>loading...</div> :
              renderList()
          }
        </div>
      </div>
      <div className="footer">
        page: {page + 1}
      </div>
    </div>
  );
}

function InputComp({ onChange }: {
  onChange: (value: string) => void;
}) {
  const { Search } = Input;

  const onChangeInput = (value: string) => {
    onChange(value);
  }

  return <Search placeholder="input search text" allowClear={true} onSearch={onChangeInput} enterButton />
}