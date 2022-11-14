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

export default function DestinationPage(
  {destination, menuState, setMenuState}: {
    destination: Destination | null,
    menuState: MenuState,
    setMenuState: Dispatch<SetStateAction<MenuState>>;
  }
) {

  const renderMenu = () => {
    if (menuState === 'open') {
      return <ModalMenu setMenuState={setMenuState}/>;
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
        {renderMenu()}
        <div className={styles.canvas}>
          <div className={styles.background}>
            <div className={styles.yPadding}>
              <Header {...{menuState, setMenuState}}/>
              <h5
                className={join(styles.heading5White, barlowCondensed.className)}
            >
                <span className={join(styles.index, barlowCondensedB.className)}>
                  01
                </span>
                PICK YOUR DESTINATION
              </h5>
              <div className={styles.xPadding}>
  
                <div className={styles.imageAndText}>
                  <div className={styles.imgContainer}>
                    <Image
                      className={styles.img}
                      src={destination.images.png.substring(1)}
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
                          className={join(barlowCondensed.className, styles.navTextExt)}
                        >
                          <Link href={`/destinations/${kebabCase(x.name)}`}>
                            {x.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h2 className={join(bellefair.className, styles.heading2Ext)}>
                      {destination.name}
                    </h2>
                    <p className={join(styles.bodyTextExt, barlow.className)}>
                      {destination.description}
                    </p>
                    <div className={styles.stats}>
                      <div>
                        <h5
                          className={join(styles.attrLeft, barlowCondensed.className)}
                        >
                          AVG. DISTANCE
                        </h5>
                        <div
                          className={join(styles.subheading1, bellefair.className)}
                        >
                          {destination.distance}
                        </div>
                      </div>
                      <div>
                        <h5
                          className={join(styles.attr, barlowCondensed.className)}
                        >
                          EST. TRAVEL TIME
                        </h5>
                        <div
                          className={join(styles.subheading1, bellefair.className)}
                        >
                          {destination.travel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
