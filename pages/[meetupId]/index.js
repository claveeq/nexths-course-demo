import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetuDetialsPage(props) {
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
  const client = await MongoClient.connect(
    "mongodb+srv://admin:vrXD0ubwvdrQ42MT@meetups.b57yqdj.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin:vrXD0ubwvdrQ42MT@meetups.b57yqdj.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeedtup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(selectedMeedtup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeedtup._id.toString(),
        title: selectedMeedtup.title,
        address: selectedMeedtup.address,
        image: selectedMeedtup.image,
        description: selectedMeedtup.description,
      },
    },
  };
}

export default MeetuDetialsPage;
