import {getCrewData, Crew, getCrew} from '../../lib/dataFetch';
import {join, kebabCase} from '../../lib/utils';
import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import anoushehAnsari from '../../public/assets/crew/image-anousheh-ansari.webp';
import douglasHurley from '../../public/assets/crew/image-douglas-hurley.webp';
import markSuttleworth from '../../public/assets/crew/image-mark-shuttleworth.webp';
import victorGlover from '../../public/assets/crew/image-victor-glover.webp';
import styles from './[id].module.scss';
import {barlow, barlowCondensed, barlowCondensedB, bellefair} from '../../lib/fonts';
import {Dispatch, SetStateAction} from 'react';
import {break600} from '../../lib/constants';
import ModalMenu from '../../components/ModalMenu';
import {MenuState} from '../../lib/types';
import Head from 'next/head';

export default function CrewPage(
  {crew, menuState, setMenuState, winWidth}: {
    crew: Crew | null,
    menuState: MenuState,
    setMenuState: Dispatch<SetStateAction<MenuState>>,
    winWidth: number
  }
) {

  const renderMenu = () => {
    if (menuState === 'open' && winWidth < break600) {
      return <ModalMenu {...{setMenuState, navState: 'crew'}}/>;
    } else {
      return <></>;
    }
  }

  const selectPortrait = () => {
    if (crew === null) {
      throw new Error('No Image found');
    }
    switch (crew.name) {
      case 'Anousheh Ansari':
        return anoushehAnsari;
      case 'Douglas Hurley':
        return douglasHurley;
      case 'Mark Shuttleworth':
        return markSuttleworth;
      case 'Victor Glover':
        return victorGlover;
    }
    throw new Error('No Image found');
  }
  
  if (crew !== null) {
    // Used to render crew portrait based on window width.
    const renderPortrait = (shouldRender: boolean) => {
      if (shouldRender) {
        return (
        <Image
            className={styles.img}
            src={selectPortrait()}
            alt={crew.name}
          />        
        );
      } else {
        return <></>;
      }
    }
    // Render
    const renderSubnav = (shouldRender: boolean) => {
      if (shouldRender) {
        return (
          <ul className={styles.subnav}>
            {getCrewData().map((x) => (
              <li key={x.name}>
                <Link href={`/crew/${kebabCase(x.name)}`}>
                  <div className={styles.circleClickableArea}>
                    <div 
                      {... x.name === crew.name ?
                        {className: styles.circleSelected}
                        : {className: styles.circle}}
                    >
                    </div>
                  </div>
                </Link>
              </li>            
            ))}
          </ul>
        );
      } else {
        return <></>;
      }
    }

    return (
      <div>
        <Head>
          <title>{crew.name}</title>
        </Head>
        <div className={styles.canvas}>
          {renderMenu()}
          <div className={styles.background}>
            <div className={styles.yPadding}>
              <Header {...{
                menuState,
                setMenuState,
                winWidth,
                navState: 'crew'
              }}/>
              <main>
                <h5 className={
                  join(styles.heading5White, barlowCondensed.className)
                }>
                  <span className={
                    join(styles.index, barlowCondensedB.className)
                  }>
                    02
                  </span>
                  MEET YOUR CREW
                </h5>
                <div className={styles.rightAlign}>
                  <div className={styles.xPadding}>
                    {renderPortrait(winWidth < break600)}
                    <div className={styles.textAndSubnav}>
                      {renderSubnav(winWidth < break600)}
                      <h4 className={join(styles.role, bellefair.className)}>
                        {crew.role}
                      </h4>
                      <h3 className={
                        join(styles.heading3Ext, bellefair.className)
                      }>
                        {crew.name}
                      </h3>
                      <p className={join(styles.bodyTextExt, barlow.className)}>
                        {crew.bio}
                      </p>
                      {renderSubnav(winWidth >= break600)}
                    </div>
                    {renderPortrait(winWidth >= break600)}
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

export function getStaticProps({params} : {params: {id: string}}) {
  return {
    props: {
      crew: getCrew(params.id)
    }
  };
}

export function getStaticPaths() {
  const paths = getCrewData().map((x) => ({
    params: {id: kebabCase(x.name)
  }}));
  return {
    paths: paths,
    fallback: false,
  };
}