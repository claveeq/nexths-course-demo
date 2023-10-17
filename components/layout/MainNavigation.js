import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const { data: session } = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          {!!session?.expires && (
            <>
              <li>
                <Link href="/">All Meetups</Link>
              </li>
              <li>
                <Link href="/new-meetup">Add New Meetup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
