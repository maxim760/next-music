import { Button, Grid, TextField } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import TrackItem from "../../components/TrackItem";
import { useInput } from "../../hooks/useInput";
import { TrackApi } from "../../services/track";
import { ITrack } from "../../types/track";

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const router = useRouter();
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const username = useInput();
  const text = useInput();

  const backToList = () => router.push("/tracks");
  const trackInfo = [
    { info: track.name, comment: "Название трека" },
    { info: track.artist, comment: "Исполнитель" },
    { info: track.listens, comment: "Прослушиваний" },
  ];

  const addComment = async () => {
    try {
      const response = await TrackApi.addComment({
        username: username.value,
        text: text.value,
        track: track._id,
      });
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout title={`${track.artist} — ${track.name}`}>
      <Button
        variant="outlined"
        onClick={backToList}
        style={{ fontSize: 32, marginTop: 20 }}
      >
        К списку
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={process.env.basePath + track.picture}
          width={200}
          height={200}
          style={{ marginRight: 20 }}
        />
        <div>
          {trackInfo.map(({ info, comment }, i) => (
            <h1 key={i}>
              {comment}&nbsp;-&nbsp;{info}
            </h1>
          ))}
        </div>
      </Grid>
      <h1>Текст песни</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {track.text.replace(/\\n/g, "\n")}
      </p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField label="Ваше имя" fullWidth {...username} />
        <TextField label="Комментарий" fullWidth multiline rows={4} {...text} />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments &&
          track.comments.map((comment) => (
            <div key={comment._id}>
              <div>Автор - {comment.username}</div>
              <div>Комментарий - {comment.text}</div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const track = await TrackApi.getOne(params.id as string);
  return {
    props: {
      serverTrack: track,
    },
  };
};
