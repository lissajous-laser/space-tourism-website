import {getDestinationsData, Destination, getDestination} from '../../lib/dataFetch'
import {kebabCase} from '../../lib/utils';
import Nav from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function DestinationPage(
    {destination}: {destination: Destination | null}
  ) {

  if (destination !== null) {
    return (
      <div>
        <Nav/>
        <Image
          src={destination.images.png.substring(1)}
          width={445}
          height={445}
          alt={destination.name}
        />
        <ul>
          {getDestinationsData().map((x) => (
            <li key={x.name}>
              <Link href={`/destinations/${kebabCase(x.name)}`}>
                {x.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>{destination.name}</h2>
        <p>{destination.description}</p>
        <div>{destination.distance}</div>
        <div>{destination.travel}</div>
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