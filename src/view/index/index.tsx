import React, { useState, useEffect, useRef } from 'react';
import { ListView } from 'antd-mobile';
import InputComp from '../../components/input';

type IPage = IItem[];

interface IItem {
  number: string;
  name: string;
  random: number;
}

interface IData {
  data: IItem[],
  total: number
}

const NUM_ROWS = 20;

export interface IAppProps {
  id: string;
}

export default function Home(prams: IAppProps) {
  const cachePage = useRef(0);
  const cacheSearchPage = useRef(0);
  const cacheSearchVal = useRef("");

  const [search, setSearch] = useState("");

  const [{ list, loading, hasMore, totalPage, page }, setNewData, setPage] = useListData("");
  const [{
    list: searchList,
    loading: searchLoading,
    hasMore: searchHasMore,
    totalPage: searchTotalPage,
    page: searchPage
  }, setNewSearchData, setSearchPage] = useListData("");

  const onSubmitInput = (value: string) => {
    setSearch(value);
    cacheSearchVal.current = value;

    if (value) {
      setNewSearchData(value, cacheSearchPage.current);
    } else {
      setNewData("", cachePage.current);
    }
  }

  const onCancelInput = () => {
    setSearch("");
    cacheSearchVal.current = "";

    cacheSearchPage.current = 0;

    // setNewData("", cachePage.current);
    setNewSearchData("", cacheSearchPage.current);
  }

  const renderList = () => {
    const row = (rowData: any, sectionID: any, rowID: any) => {
      return (
        <div key={rowData.random} className="item" >
          {rowData.number + "   " + rowData.name} ---rowID: {rowID}
        </div>
      );
    };

    async function onEndReached(event: any) {
      if (cacheSearchVal.current) {
        if (searchLoading && !searchHasMore) {
          return;
        }

        if (searchPage < searchTotalPage) {
          const newPage = searchPage + 1;

          cacheSearchPage.current = newPage;
          setSearchPage(newPage);
        }
      } else {
        if (loading && !hasMore) {
          return;
        }

        if (page < totalPage) {
          const newPage = page + 1;

          cachePage.current = newPage;
          setPage(newPage);
        }
      }
    }

    if (search) {
      return <ListView
        dataSource={searchList}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {searchLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="list"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={40}
      />
    }
    return <div style={{ display: search ? "none" : "block" }}>
      <ListView
        dataSource={list}
        renderHeader={() => <span>header111</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {loading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="list"
        pageSize={4}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={40}
      />
    </div>
  }

  return (
    <div className="content">
      <InputComp onSubmit={onSubmitInput} onCancel={onCancelInput} />

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

function getData(page = 0, size = 20, search: string = ""): Promise<IData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [];

      for (let i = 0; i < size; i++) {
        const index = (page * size) + i;
        const random = Math.ceil(Math.random() * 1000000);

        arr.push({
          random,
          number: `search: ${search}`,
          name: `name: ${index}`
        });
      }

      resolve({
        total: 3,
        data: arr
      });
    }, 1000);
  })
}

function useListData(searchValue: string = ""): any {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2
  });
  const [list, setList] = useState<IPage>(dataSource);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState(searchValue);
  const [hasMore] = useState(false);
  const [page, setPage] = useState(0);
  let cacheValue = useRef(searchValue);

  const cacheData = useRef({
    total: 0,
    data: [] as IItem[]
  });

  function setNewData(val: string, page: number) {
    setPage(page);
    setSearchVal(val);
  }

  useEffect(() => {
    if (searchVal !== cacheValue.current) {
      cacheData.current.data = [];
    }
  }, [searchVal]);

  useEffect(() => {
    setLoading(true);

    async function getInitData() {
      const { data, total } = await getData(page, NUM_ROWS, searchVal);
      cacheValue.current = searchVal;

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
  }, [page, searchVal]);

  return [{ list, loading, hasMore, totalPage, page }, setNewData, setPage];
}