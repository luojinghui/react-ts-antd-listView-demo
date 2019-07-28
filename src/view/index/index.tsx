import React, { useState, useEffect, useRef } from 'react';
import { ListView, SearchBar } from 'antd-mobile';

type IPage = IItem[];

interface IItem {
  number: number;
  name: string;
}

interface IData {
  data: IItem[],
  total: number
}

const NUM_ROWS = 20;

function getData(page = 0, size = 10): Promise<IData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [];

      for (let i = 0; i < size; i++) {
        const index = (page * size) + i;
        const random = Math.ceil(Math.random() * 100000);

        arr.push({
          number: random,
          name: "name: " + index
        });
      }

      resolve({
        total: 3,
        data: arr
      });
    }, 1000);
  })
}

export interface IAppProps {
  id: string;
}

export default function Home({ id }: IAppProps) {
  // const [ count ] = React.useState<number | string>(1);
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2
  });

  const ref = useRef(null);

  const [page, setPage] = useState(0);
  const [list, setList] = useState<IPage>(dataSource);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(false);

  const cacheData = useRef({
    total: 0,
    data: [] as IItem[]
  });

  const onChangeInput = (value: string) => {
    console.log("onChangeInput: ", value);
  }

  useEffect(() => {
    async function getInitData() {
      const { data, total } = await getData(page, NUM_ROWS);
      cacheData.current = {
        total,
        data: cacheData.current.data.concat(data)
      }

      setLoading(false);
      setTotalPage(cacheData.current.total);
      setList((preList: any) => {
        return preList.cloneWithRows(cacheData.current.data)
      });
    }

    getInitData();
  }, [page]);

  const renderList = () => {
    const row = (rowData: any, sectionID: any, rowID: any) => {
      console.log("rowData: ", rowData);
      return (
        <div key={rowID} className="item" >
          data: {rowData.number + "   " + rowData.name}
          -----rowID: {rowID}
        </div>
      );
    };

    async function onEndReached(event: any) {

      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (loading && !hasMore) {
        return;
      }

      console.log("data end : ", event);
      if(page <= totalPage) {
        setLoading(true);
        setPage(page + 1);
      }

      // console.log('reach end', event);
      // setLoading(true);

      // // setTimeout(() => {
      // //   this.rData = { ...this.rData, ...genData(++pageIndex) };
      // //   this.setState({
      // //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
      // //     isLoading: false,
      // //   });
      // // }, 1000);

      // const result = await getData(1, 10);

      // setLoading(false);
      // const newArr: any = [...cacheArr, result.arr];

      // console.log("newArr: ", newArr);
    }

    return (
      <ListView
        ref={ref}
        dataSource={list}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {loading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={40}
      />
    )
  }

  return (
    <div className="content">
      <InputComp onChange={onChangeInput} />
      <div className="box">
        <div className="list">
          {
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

function InputComp(param: {
  onChange: (value: string) => void;
}) {

  // return <Search placeholder="input search text" allowClear={true} onSearch={onChangeInput} enterButton />
  return <SearchBar placeholder="Search" maxLength={8} />
}