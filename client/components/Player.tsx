import React, { useState } from "react";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { IconButton } from "@material-ui/core";
import styles from "../styles/Player.module.scss";
import { Grid } from "@material-ui/core";
import { TrackProgress } from "./TrackProgress";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AirplaySharp } from "@material-ui/icons";
import { TrackApi } from "../services/track";

interface PlayerProps {}

let audio;

export const Player: React.FC<PlayerProps> = ({}): React.ReactElement | null => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    playTrack,
    pauseTrack,
    setCurrentTime,
    setVolume,
    setDuration,
  } = useActions();

  React.useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else if (!pause) {
      setAudio();
    }
  }, [active]);
  React.useEffect(() => {
    if (pause && audio) {
      audio.pause();
    } else if (audio) {
      audio.play();
    }
  }, [pause]);
  const setAudio = () => {
    if (active) {
      audio.src = process.env.basePath + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.currentTime === audio.duration) {
          setCurrentTime(0)
          audio.currentTime = 0
          audio.play()
          TrackApi.addListen(active._id)
        }
      };
      audio.play();
      playTrack();
    }
  };
  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = +e.target.value ?? 0;
    setVolume(volume);
    audio.volume = volume / 100;
  };

  const onPlayerClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e && e.stopPropagation();
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = +e.target.value ?? 0;
    setCurrentTime(time);
    audio.currentTime = time;
  };
  if (!active) {
    return null;
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={onPlayerClick}>
        {pause ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
      <Grid container direction="column" className={styles.player__info}>
        <div>{active.name}</div>
        <div>{active.artist}</div>
      </Grid>
      <TrackProgress
        current={currentTime}
        total={duration}
        onChange={onChangeProgress}
        minutes
      />
      <VolumeUpIcon className={styles.player__volume} />
      <TrackProgress current={volume} total={100} onChange={onChangeVolume} />
    </div>
  );
};
