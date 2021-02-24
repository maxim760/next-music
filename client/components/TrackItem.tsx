import React, { useState } from "react";
import { ITrack } from "../types/track";
import styles from "../styles/TrackItem.module.scss";
import { Card, Grid, IconButton } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { toMinutes } from "./TrackProgress";
type TrackItemProps = {
  track: ITrack;
};

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { active, currentTime, duration, pause } = useTypedSelector(state => state.player)
  const isThisPlay = !pause && active?._id === track._id
  const { playTrack, pauseTrack, setActive, setCurrentTime } = useActions();
  const onGoToTrack = () => router.push(`/tracks/${track._id}`);
  const onPlayerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (track._id !== active?._id) {
      setCurrentTime(0)
      playTrack();
      setActive(track);
    } else {
      isThisPlay ? pauseTrack() : playTrack()
    }
  };
  const onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <Card className={styles.track} onClick={onGoToTrack}>
      <IconButton onClick={onPlayerClick}>
        {isThisPlay ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      <img width={70} height={70} src={process.env.basePath + track.picture} />
      <Grid container direction="column" className={styles.track__info}>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </Grid>

      {isThisPlay && <p className={styles.track__time}>{toMinutes(currentTime)}&nbsp;/&nbsp;{toMinutes(duration)}</p>}
      <IconButton onClick={onRemove} className={styles.track__delete}>
        {<DeleteIcon />}
      </IconButton>
    </Card>
  );
};

export default TrackItem;
