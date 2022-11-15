import styles from '../styles/ModalMenu.module.scss';
import { getFirstPageNameForEachNavItem } from '../lib/dataFetch';
import Link from 'next/link';
import {join, kebabCase} from '../lib/utils';
import {barlowCondensed, barlowCondensedB} from '../lib/fonts';
import { Dispatch, SetStateAction } from 'react';
import { MenuState, NavState } from '../lib/types';



export default function ModalMenu(
  {setMenuState, navState}: {
    setMenuState: Dispatch<SetStateAction<MenuState>>,
    navState: NavState
  }
) {

  const closeMenuHandler = () => {
    setMenuState('closed');
  }

  const pageNameForEachNavItem = getFirstPageNameForEachNavItem();

  return (
    <div className={styles.menu}>
      <ul className={styles.ul}>
        <li {... navState === 'home' && {className: styles.liSelected}}>
          <Link 
            className={join(styles.link, barlowCondensed.className)}
            href='/'
          >
            <span className={barlowCondensedB.className + ' ' + styles.index}>
              00
            </span>
            Home
          </Link>
        </li>
        <li {... navState === 'destination' && {className: styles.liSelected}}>
          <Link
            className={join(styles.link, barlowCondensed.className)}
            href={`/destinations/${kebabCase(pageNameForEachNavItem.destination)}`}
          >
            <span className={barlowCondensedB.className + ' ' + styles.index}>
              01
            </span>
              Destination
          </Link>
        </li>
        <li {... navState === 'crew' && {className: styles.liSelected}}>
          <Link 
            className={join(styles.link, barlowCondensed.className)}
            href={`/crew/${kebabCase(pageNameForEachNavItem.crew)}`}
          >
            <span className={barlowCondensedB.className + ' ' + styles.index}>
              02
            </span>
              Crew
          </Link>
        </li>
        <li {... navState === 'technology' && {className: styles.liSelected}}>
          <Link
            className={join(styles.link, barlowCondensed.className)}
            href={`/technology/${kebabCase(pageNameForEachNavItem.technology)}`}
          >
          <span className={barlowCondensedB.className + ' ' + styles.index}>
            03
          </span>
            Technology
          </Link>
        </li>
      </ul>

    </div>
  );
}
