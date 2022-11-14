import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {useEffect, useState} from 'react';
import {MenuState} from '../lib/types';

export default function App({ Component, pageProps }: AppProps) {
  const [menuState, setMenuState] = useState<MenuState>('closed');

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);


  return (
    <Component
      menuState={menuState}
      setMenuState={setMenuState}
      {...pageProps}
    />
  );
}
