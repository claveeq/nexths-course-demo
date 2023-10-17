import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";
import prisma from "../lib/prisma";
import { signOut, useSession } from "next-auth/react";

function HomePage(props) {
  const { data: session } = useSession();
  if (!session?.expires) {
    return (
      <section className="grid h-screen place-items-center">
        <div className="w-25">
          <p>You do not have permission to view this page!</p>
        </div>
      </section>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description\"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const meetups = await prisma.meetup.findMany();
  return {
    props: { meetups },
    revalidate: 10,
  };
}

export default HomePage;
