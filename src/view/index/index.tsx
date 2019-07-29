import React, { useState, useRef, useLayoutEffect } from 'react';
import { ListView } from 'antd-mobile';
import InputComp from '../../components/input';
import useListData from '../../components/list';

export interface IAppProps {
  id: string;
}

export default function Home(prams: IAppProps) {
  const cachePage = useRef(0);
  const cacheSearchPage = useRef(0);
  const cacheSearchVal = useRef("");
  const listRef: any = useRef();
  const searchListRef: any = useRef();
  const [search, setSearch] = useState("");
  const [{ list, loading, hasMore, totalPage, page }, setNewData, setPage] = useListData();
  const [{
    list: searchList,
    loading: searchLoading,
    hasMore: searchHasMore,
    totalPage: searchTotalPage,
    page: searchPage
  }, setNewSearchData, setSearchPage] = useListData();
  
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

    setNewSearchData("", cacheSearchPage.current);
  }

  useLayoutEffect(() => {
    if(search) {
      searchListRef.current && searchListRef.current.scrollTo(0, 0);
    } else {
      listRef.current && listRef.current.scrollTo(0, 0);
    }
  }, [search])

  const renderList = () => {
    const row = (rowData: any, sectionID: any, rowID: any) => {
      return (
        <div key={rowData.random} className="item" >
          {rowData.number + "   " + rowData.name} ---rowID: {rowID}
        </div>
      );
    };

    async function onEndReached() {
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
        ref={searchListRef}
        dataSource={searchList}
        renderHeader={() => <span>search header</span>}
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
        ref={listRef}
        dataSource={list}
        renderHeader={() => <span>header</span>}
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
      <div className="search-box">
        <InputComp onSubmit={onSubmitInput} onCancel={onCancelInput} />
      </div>

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
