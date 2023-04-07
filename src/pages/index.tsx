import Head from "next/head";
import Header from '@/components/Header/Header';
import Body from "@/components/Body/Body";

import { PrismaClient } from "@prisma/client";

import { MenuItem, MenuItems } from "@/types/NavMenu";
import { Item, ItemData } from "@/types/Item";

import { useAppDispatch } from '../hooks';
import { useEffect } from 'react';

import { set } from "@/redux/slices/navMenuItemsSlice";
import { set as setData } from "@/redux/slices/itemsSlice";

export default function Home({navMenuItems, items}: {navMenuItems: MenuItems, items: Item[]}) {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(set(navMenuItems))
  }, [navMenuItems])

  useEffect(()=>{
    dispatch(setData(items))
  }, [items])

  return (
    <>
      <Head>
        <title>Dead God TS</title>
        <meta name="description" content="Dead God created with NextJS and TS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Body/>
      <div id="modal"></div>
    </>
  )
}

const getNavMenuItems = async ()=>{
    
  const res = await fetch("https://dead-god.ru/wp-json/myplugin/v1/menu");
  const menuItems = await res.json();

  return menuItems.map((menuItem: MenuItem)=> {
    return(
      {
          title: menuItem.title,
          url: menuItem.url
      }
    )
  }) 
}

export async function getStaticProps() {
  const navMenuItems = await getNavMenuItems();

  const prisma = new PrismaClient();
  const items = await prisma.vanillaItem.findMany({
    include:{
      transformations: {}
    },
    orderBy: {
      id: "asc"
    },
  })

  return({
    props:{
      navMenuItems: [...navMenuItems],
      items: items
    }
  })
}
