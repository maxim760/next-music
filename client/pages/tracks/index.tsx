import { Grid, Card, Button, TextField, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import TrackList from "../../components/TrackList";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SagaStore, wrapper } from "../../store";
import { fetchTracks } from "../../store/actions/track";
import { ITrack } from "../../types/track";
import { END } from "redux-saga";

const Tracks = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const {searchTracks} = useActions()
  const [timer, setTimer] = useState(null)
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(() => {
        searchTracks(query);
      }, 400)
    )
  };
  const onGoToCreateTrack = () => router.push("/tracks/create");

  const { tracks, error } = useTypedSelector((state) => state.track);
  if (error) {
    return (
      <MainLayout title="Ошибка">
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Список треков">
      <Grid container justifyContent="center" className="gridWrap">
        <Card className="card">
          <Grid container justifyContent="space-between" alignItems="center">
            <h1>Список треков</h1>
            <Button onClick={onGoToCreateTrack}>Загрузить</Button>
          </Grid>
          <Box p={2}>
            <TextField
              fullWidth
              value={query}
              onChange={search}
              label="Найти.."
            />
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
      <style>{`
      .gridWrap {
        margin-top:50px;
      }
        .card {
          padding: 15px;
          width: 850px;
        }
      `}</style>
    </MainLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    // regular stuff
    store.dispatch(fetchTracks());
    store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();
  }
);
