import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";
import prisma from "../../lib/prisma";

function MeetuDetialsPage(props) {
  console.log("props", props);
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const meetupData = await prisma.meetup.findMany();
  return {
    fallback: "blocking",
    paths: meetupData.map((meetup) => ({
      params: { meetupId: meetup.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupData = await prisma.meetup.findUnique({
    where: {
      id: Number(context.params.meetupId),
    },
  });

  return {
    props: { meetupData },
  };
}

export default MeetuDetialsPage;
