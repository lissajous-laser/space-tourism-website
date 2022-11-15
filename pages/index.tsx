import Head from 'next/head';
import Link from 'next/link';
import styles from './index.module.scss';
import {getFirstPageNameForEachNavItem} from '../lib/dataFetch';
import {join, kebabCase} from '../lib/utils';
import Header from '../components/Header';
import {barlow, barlowCondensed, bellefair} from '../lib/fonts';
import {MenuState} from '../lib/types';
import {Dispatch, SetStateAction, useEffect} from 'react';
import ModalMenu from '../components/ModalMenu';
import {break600} from '../lib/constants';
import { useRouter } from 'next/router';

export default function Home(
  {destination, menuState, setMenuState, winWidth}: {
    destination: string,
    menuState: MenuState,
    setMenuState: Dispatch<SetStateAction<MenuState>>,
    winWidth: number
  }
) {

  const renderMenu = () => {
    if (menuState === 'open' && winWidth < break600) {
      return <ModalMenu {...{setMenuState, navState: 'home'}}/>;
    } else {
      return <></>;
    }
  }

  return (
    <div>
      <Head>
        <title>Space Tourism</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div className={styles.canvas}>
        {renderMenu()}
        <div className={styles.background}>
          <div className={styles.yPadding}>
            <Header
              {...{menuState, setMenuState, winWidth, navState: 'home'}}
            />
            <div className={styles.xPadding}>
              <div className={styles.textAndBtn}>
                <div className={styles.text}>
                  <h5 className={
                    join(styles.heading5Ext,barlowCondensed.className)
                  }>
                    So, you want to travel to
                  </h5>
                  <h1
                    className={join(styles.heading1Ext, bellefair.className)}
                  >
                    Space
                  </h1>
                  <p className={join(styles.bodyTextExt, barlow.className)}>
                  Let’s face it; if you want to go to space, you might as well genuinely go to 
              outer space and not hover kind of on the edge of it. Well sit back, and relax 
              because we’ll give you a truly out of this world experience!
                  </p>
                </div>
                <Link
                  href={`/destinations/${kebabCase(destination)}`}
                  className={styles.exploreBtn}
                >
                  <div className={
                    join(styles.exploreTxt,bellefair.className)
                  }>
                    Explore
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function getStaticProps() {
  return {
    props: getFirstPageNameForEachNavItem()
  };
}
