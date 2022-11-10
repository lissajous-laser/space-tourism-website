import {getCrewData, Crew, getCrew} from '../../resources/dataFetch';
import {kebabCase} from '../../lib/utils';
import Nav from '../../components/Nav';
import Link from 'next/link';
import Image from 'next/image';
import anoushehAnsari from '../../public/assets/crew/image-anousheh-ansari.png';
import douglasHurley from '../../public/assets/crew/image-douglas-hurley.png';
import markSuttleworth from '../../public/assets/crew/image-mark-shuttleworth.png';
import victorGlover from '../../public/assets/crew/image-victor-glover.png';

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
      <div>
        <Nav/>
        <ul>
          {getCrewData().map((x) => (
            <li key={x.name}>
              <Link href={`/crew/${kebabCase(x.name)}`}>
                {x.name}
              </Link>
            </li>            
          ))}
        </ul>
        <h3>{crew.role}</h3>
        <h2>{crew.name}</h2>
        <p>{crew.bio}</p>
        <Image
          src={selectImage()}
          alt={crew.name}
        />
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