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
    const updateWinWidth = () => setWinWidth(window.innerWidth);

    updateWinWidth();

    window.addEventListener(
      'resize',
      updateWinWidth
    );
    return () => {
      window.removeEventListener(
        'resize',
        updateWinWidth
      );
    }
  }, []);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);


  return (
    <Component
      {...{menuState, setMenuState, winWidth}}
      {...pageProps}
    />
  );
}