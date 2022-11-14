import Link from 'next/link';
import { getFirstPageNameForEachNavItem } from '../lib/dataFetch';
import {kebabCase} from '../lib/utils';
import styles from '../styles/Header.module.scss';
import {barlowCondensed, barlowCondensedB} from '../lib/fonts';
import logo from '../public/assets/shared/logo.svg';
import burger from '../public/assets/shared/icon-hamburger.svg';
import cross from '../public/assets/shared/icon-close.svg';
import Image from 'next/image';
import {break1280, break600} from '../lib/constants';
import {Dispatch, SetStateAction, useLayoutEffect, useState} from 'react';
import { MenuState } from '../lib/types';

export default function Header({menuState, setMenuState}: {
  menuState: MenuState,
  setMenuState: Dispatch<SetStateAction<MenuState>>
}) {

  const [winWidth, setWinWidth] = useState(0);

  useLayoutEffect(() => {
    setWinWidth(window.innerWidth);
    window.addEventListener(
      'resize',
      () => {setWinWidth(window.innerWidth)}
    );
    return () => {
      window.removeEventListener(
        'resize',
        () => setWinWidth(window.innerWidth)   
      );
    }
  }, []);

  const pageNameForEachNavItem = getFirstPageNameForEachNavItem();

  const renderNavBar = () => {
    if (winWidth >= break600) {
      return (
        <ul className={styles.ul}>
          <li >
            <Link href='/'>
              <Index winWidth={winWidth}>00</Index>
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`/destinations/${kebabCase(pageNameForEachNavItem.destination)}`}
            >
              <Index winWidth={winWidth}>01</Index>
                Destination
            </Link>
          </li>
          <li>
            <Link 
              href={`/crew/${kebabCase(pageNameForEachNavItem.crew)}`}
            >
              <Index winWidth={winWidth}>02</Index>
                Crew
            </Link>
          </li>
          <li>
            <Link
              className={barlowCondensed.className}
              href={`/technology/${kebabCase(pageNameForEachNavItem.technology)}`}
            >
              <Index winWidth={winWidth}>03</Index>
              Technology
            </Link>
          </li>
        </ul>
      );
    } else {
      return <></>;
    }
  }

  const openMenuHandler = () => {
    setMenuState((state) => {
      if (state === 'open') {
        return 'closed';
      } else {
        return 'open';
      }
    });
  }

  const renderBurgerbtn = () => {

    if (winWidth < break600) {
      return (
        <button className={styles.modalBtn} onClick={openMenuHandler}>
          {menuState === 'closed'?
            <Image src={burger} alt='Open menu icon'/>
            : <Image src={cross} alt='Close menu icon'/>}
        </button>
      );
    } else {
      return <></>;
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt='logo'/>
      </div>
      <div className={styles.frosted}/>
      <nav className={styles.nav + ' ' + barlowCondensed.className}>
        <div className={styles.line}/>
        {renderNavBar()}
        {renderBurgerbtn()}
      </nav>
    </header>
  );
}

function Index({children, winWidth}: {children: string, winWidth: number}) {
  if (winWidth >= break1280) {
    return (
      <span className={barlowCondensedB.className + ' ' + styles.index}>
        {children}
      </span>
    );
  } else {
    return <></>;
  }
}