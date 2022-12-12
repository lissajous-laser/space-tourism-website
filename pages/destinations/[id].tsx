import {getDestinationsData, Destination, getDestination} from '../../lib/dataFetch'
import {join, kebabCase} from '../../lib/utils';
import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import styles from './[id].module.scss';
import {barlow, barlowCondensed, barlowCondensedB, bellefair} from '../../lib/fonts';
import Head from 'next/head';
import {MenuState} from '../../lib/types';
import {Dispatch, SetStateAction} from 'react';
import ModalMenu from '../../components/ModalMenu';
import { break600 } from '../../lib/constants';

export default function DestinationPage(
  {destination, menuState, setMenuState, winWidth}: {
    destination: Destination | null,
    menuState: MenuState,
    setMenuState: Dispatch<SetStateAction<MenuState>>,
    winWidth: number
  }
) {

  const renderMenu = () => {
    if (menuState === 'open' && winWidth < break600) {
      return <ModalMenu {...{setMenuState, navState: 'destination'}}/>;
    } else {
      return <></>;
    }
  }

  if (destination !== null) {
    return (
      <div>
        <Head>
          <title>{destination.name}</title>
        </Head>
        <div className={styles.canvas}>
          {renderMenu()}
          <div className={styles.background}>
            <div className={styles.yPadding}>
              <Header {...{
                menuState,
                setMenuState,
                winWidth,
                navState: 'destination'
              }}/>
            <main>
              <h5 className={
                  join(styles.heading5White,barlowCondensed.className)
                }>
                  <span className={
                    join(styles.index, barlowCondensedB.className)
                  }>
                    01
                  </span>
                  PICK YOUR DESTINATION
                </h5>
                <div className={styles.xPadding}>
    
                  <div className={styles.imageAndText}>
                    <div className={styles.imgContainer}>
                      <Image
                        className={styles.img}
                        src={destination.images.webp.substring(1)}
                        width={445}
                        height={445}
                        alt={destination.name}
                      />
                    </div>
                    <div className={styles.text}>
                      <ul className={styles.ul}>
                        {getDestinationsData().map((x) => (
                          <li 
                            key={x.name}
                            {...x.name === destination.name ?
                              {className: join(barlowCondensed.className, styles.navTextExtSelected)}
                              : {className: join(barlowCondensed.className, styles.navTextExt)}}
                          >
                            <Link href={`/destinations/${kebabCase(x.name)}`}>
                              {x.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <h2 className={
                        join(bellefair.className, styles.heading2Ext)
                      }>
                        {destination.name}
                      </h2>
                      <p className={
                        join(styles.bodyTextExt, barlow.className)
                      }>
                        {destination.description}
                      </p>
                      <div className={styles.stats}>
                        <div>
                          <h5 className={
                            join(styles.attrLeft, barlowCondensed.className)
                          }>
                            AVG. DISTANCE
                          </h5>
                          <div className={
                            join(styles.subheading1, bellefair.className)
                          }>
                            {destination.distance}
                          </div>
                        </div>
                        <div>
                          <h5 className={
                            join(styles.attr, barlowCondensed.className)
                          }>
                            EST. TRAVEL TIME
                          </h5>
                          <div className={
                            join(styles.subheading1, bellefair.className)
                          }>
                            {destination.travel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



            </main>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>
  }
}

export function getStaticProps({params}: {params: {id: string}}) {
  return {
    props: {
      destination: getDestination(params.id)
    }
  };
}

export function getStaticPaths() {
  const paths = getDestinationsData().map((x) => ({
    params: {id: kebabCase(x.name)
  }}));
  return {
    paths: paths,
    fallback: false,
  };
}
