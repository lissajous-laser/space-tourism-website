import {getTechnologiesData, Technology, getTechnology} from '../../lib/dataFetch';
import {join, kebabCase} from '../../lib/utils';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from './[id].module.scss';
import {barlow, barlowCondensed,barlowCondensedB, bellefair} from '../../lib/fonts';

export default function TechnologyPage(
    {technology}: {technology: Technology | null}
  ) {

  if (technology !== null) {
    return (
      <div className={styles.canvas}>
        <div className={styles.background}>
          <div className={styles.yPadding}>
            <Header/>

              <div className={styles.rightAlign}>
                <div className={styles.xPadding}>
                  <h5
                    className={join(styles.heading5White, barlowCondensed.className)}
                  >
                    <span className={join(styles.index, barlowCondensedB.className)}>
                      03
                    </span>
                    SPACE LAUNCH 101
                  </h5>
                  <div className={styles.imgTextSubnav}>
                    <div className={styles.textAndSubnav}>
                      <ul className={styles.subnav}>
                        {getTechnologiesData().map((x, idx) => (
                          <li key={x.name}>
                            <Link href={`/technology/${kebabCase(x.name)}`}>
                              <div className={join(styles.circle, bellefair.className)} >
                                {idx + 1}
                              </div>

                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.text}>
                        <div
                          className={join(styles.navTextExt, barlowCondensed.className)}
                        >
                          THE TERMINOLOGY...
                        </div>
                        <h3 className={join(styles.heading3Ext, bellefair.className)}>
                          {technology.name}
                        </h3>
                        <p className={join(styles.bodyTextExt, barlow.className  )}>{technology.description}</p>
                      </div>
                    </div>
                    <Image
                      src={technology.images.portrait.substring(1)}
                      width={515}
                      height={527}
                      alt={technology.name}
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

export function getStaticProps({params}: {params: {id: string}}) {
  return {
    props: {
      technology: getTechnology(params.id)
    }
  };
}

export function getStaticPaths() {
  const paths = getTechnologiesData().map((x) => ({
    params: {id: kebabCase(x.name)
  }}));
  return {
    paths: paths,
    fallback: false,
  };
}