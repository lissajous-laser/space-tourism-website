import Link from 'next/link';
import { getFirstPageNameForEachNavItem } from '../resources/dataFetch';
import { kebabCase } from '../lib/utils';


export default function Nav() {
  const pageNameForEachNavItem = getFirstPageNameForEachNavItem();

  return (
    <nav>
      <ul>
        <li><Link href='/'>00 Home</Link></li>
        <li>
          <Link
            href={`/destinations/${kebabCase(pageNameForEachNavItem.destination)}`}
          >
            01 Destination
          </Link>
        </li>
        <li>
          <Link 
            href={`/crew/${kebabCase(pageNameForEachNavItem.crew)}`}
          >
            02 Crew
          </Link>
        </li>
        <li>
          <Link
            href={`/technology/${kebabCase(pageNameForEachNavItem.technology)}`}
          >
            03 Technology
          </Link>
        </li>
      </ul>
    </nav>
  );
}