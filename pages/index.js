import Head from 'next/head'

import Header from '../components/Header/Header'
import Body from '../components/Body/Body'
import { useDispatch } from 'react-redux'
import { set } from "../features/itemsData/itemsDataSlice";
import { useEffect } from 'react';

export default function Home({items}) {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(set(items))
  }, [items])

  return (
    <>
      <Head>
        <title>Dead God Next</title>
        <meta name="description" content="Dead God created with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Body items={items}/>
      <div id="modal"></div>
    </>
  )
}

export async function getStaticProps(){

  const perPage = 100;

  const getTotalPages = async ()=>{
      const response = await fetch(`https://dead-god.ru/wp-json/wp/v2/item?_fields=acf&per_page=${perPage}`)
      return parseInt(response.headers.get('x-wp-totalpages'));
  }

  const buildItemsData = (data)=>{
    return data.map((cur)=>{
      let itemData = {...cur.acf};
      const scaleMultiplier = 0.7
      itemData.icon_width = parseInt(cur.post_meta.icon_width) * scaleMultiplier;
      itemData.icon_height = parseInt(cur.post_meta.icon_height) * scaleMultiplier;
      return {
        ...itemData
      }
    })
  }

  const getAllItems = async ()=>{
      const totalPages = await getTotalPages();

      let allItems = [];

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
          let response = await fetch(`https://dead-god.ru/wp-json/wp/v2/item?order=asc&_fields=acf,post_meta&acf_format=standard&page=${currentPage}&per_page=${perPage}`);

          let data = await response.json();
          allItems.push(...data);  
      }

      return buildItemsData(allItems);
  }

  const itemsData = await getAllItems();

  return {
    props: {
      items: itemsData
    }
  }
}
