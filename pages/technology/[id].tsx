import {getTechnologiesData, Technology, getTechnology} from '../../resources/dataFetch';
import {kebabCase} from '../../lib/utils';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Nav from '../../components/Nav';

export default function TechnologyPage(
    {technology}: {technology: Technology | null}
  ) {

  if (technology !== null) {
    return (
      <div>
        <Nav/>
        <ul>
          {getTechnologiesData().map((x) => (
            <li key={x.name}>
              <Link href={`/technology/${kebabCase(x.name)}`}>
                {x.name}
              </Link>
            </li>            
          ))}
        </ul>
        <h2>{technology.name}</h2>
        <p>{technology.description}</p>
        <Image
          src={technology.images.portrait.substring(1)}
          width={515}
          height={527}
          alt={technology.name}
        />
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