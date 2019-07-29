
import { useState, useEffect, useRef } from 'react';
import { ListView } from 'antd-mobile';
import { IData, IPage, IItem } from '../../type';

const NUM_ROWS = 20;

function getData(page = 0, size = 20, search: string = ""): Promise<IData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [];

      for (let i = 0; i < size; i++) {
        const index = (page * size) + i + 1;
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
    }, 500);
  })
}

export default function useListData(): any {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2
  });
  const [list, setList] = useState<IPage>(dataSource);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [hasMore] = useState(false);
  const [page, setPage] = useState(0);
  const cacheValue = useRef("");

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
