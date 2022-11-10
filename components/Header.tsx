import Link from 'next/link';
import { getFirstPageNameForEachNavItem } from '../lib/dataFetch';
import { kebabCase } from '../lib/utils';
import styles from '../styles/Header.module.scss';
import {barlowCondensed, barlowCondensedB} from '../lib/fonts';
import logo from '../public/assets/shared/logo.svg';
import Image from 'next/image';

export default function Nav() {
  const pageNameForEachNavItem = getFirstPageNameForEachNavItem();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo"/>
      </div>
      <div className={styles.frosted}/>
      <nav className={styles.nav + ' ' + barlowCondensed.className}>
        <div className={styles.line}/>
        <ul className={styles.ul}>
          <li >
            <Link href='/'>
              <span className={barlowCondensedB.className + ' ' + styles.index}>00</span>
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`/destinations/${kebabCase(pageNameForEachNavItem.destination)}`}
            >
              <span className={barlowCondensedB.className + ' ' + styles.index}>01</span>
                Destination
            </Link>
          </li>
          <li>
            <Link 
              href={`/crew/${kebabCase(pageNameForEachNavItem.crew)}`}
            >
              <span className={barlowCondensedB.className + ' ' + styles.index}>02</span>
                Crew
            </Link>
          </li>
          <li>
            <Link
              className={barlowCondensed.className}
              href={`/technology/${kebabCase(pageNameForEachNavItem.technology)}`}
            >
              <span className={barlowCondensedB.className + ' ' + styles.index}>03</span>
              Technology
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}