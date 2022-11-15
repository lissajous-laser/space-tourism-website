import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {useEffect, useLayoutEffect, useState} from 'react';
import {MenuState} from '../lib/types';

export default function App({ Component, pageProps }: AppProps) {

  const [winWidth, setWinWidth] = useState(0);  
  const [menuState, setMenuState] = useState<MenuState>('closed');

  // useLayoutEffect instead of useEffect otherwise page will 
  // render with possibly incorrect image for split second.
  useLayoutEffect(() => {
    setWinWidth(window.innerWidth);
    window.addEventListener(
      'resize',
      () => setWinWidth(window.innerWidth)
    );
    return () => {
      window.removeEventListener(
        'resize',
        () => setWinWidth(window.innerWidth)
      );
    }
  }, []);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);


  return (
    <Component
      // menuState={menuState}
      // setMenuState={setMenuState}
      {...{menuState, setMenuState, winWidth}}
      {...pageProps}
    />
  );
}
