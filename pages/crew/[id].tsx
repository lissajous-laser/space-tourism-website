import {getCrewData, Crew, getCrew} from '../../lib/dataFetch';
import {join, kebabCase} from '../../lib/utils';
import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import anoushehAnsari from '../../public/assets/crew/image-anousheh-ansari.png';
import douglasHurley from '../../public/assets/crew/image-douglas-hurley.png';
import markSuttleworth from '../../public/assets/crew/image-mark-shuttleworth.png';
import victorGlover from '../../public/assets/crew/image-victor-glover.png';
import styles from './[id].module.scss';
import {barlow, barlowCondensed, barlowCondensedB, bellefair} from '../../lib/fonts';

export default function CrewPage({crew}: {crew: Crew | null}) {
  const selectImage = () => {
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
    return (
      <div className={styles.canvas}>
        <div className={styles.background}>
          <div className={styles.yPadding}>
            <Header/>
            <h5
              className={join(styles.heading5White, barlowCondensed.className)}
            >
              <span className={join(styles.index, barlowCondensedB.className)}>
                02
              </span>
              MEET YOUR CREW
            </h5>
            <div className={styles.rightAlign}>
              <div className={styles.xPadding}>
                <div>
                  <div className={styles.textAndSubnav}>
                    <h4 className={join(styles.role, bellefair.className)}>{crew.role}</h4>
                    <h3 className={join(styles.heading3Ext, bellefair.className)}>{crew.name}</h3>
                    <p className={join(styles.bodyTextExt, barlow.className)}>{crew.bio}</p>
                    <ul className={styles.subnav}>
                      {getCrewData().map((x) => (
                        <li key={x.name}>
                          <Link href={`/crew/${kebabCase(x.name)}`}>
                            <div className={styles.circle}></div>
                          </Link>
                        </li>            
                      ))}
                    </ul>
                  </div>
                  <Image
                    className={styles.img}
                    src={selectImage()}
                    alt={crew.name}
                  />
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