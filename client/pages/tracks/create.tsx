import { TextField } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { FileUpload } from "../../components/FileUpload";
import { MainLayout } from "../../components/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import { TrackApi } from "../../services/track";
import { ACCEPT } from "../../types/track";

const Create = () => {
  const router = useRouter()
  const [step, setStep] = useState(0);
  const [picture, setPicture] = useState<File>(null);
  const [audio, setAudio] = useState<File>(null);
  const text = useInput()
  const name = useInput()
  const artist = useInput()

  const isLast = step >= 2;
  const onNext = async () => {
    if (isLast) {
      const formData = new FormData()
      formData.append("name", name.value)
      formData.append("text", text.value)
      formData.append("artist", artist.value)
      formData.append("audio", audio)
      formData.append("picture", picture)
      try {
        await TrackApi.create(formData)
        router.push("/tracks")
      } catch (error) {
        console.log(error)
      }
    } else {
      setStep((prev) => ++prev);
    }
  };
  const onBack = () => setStep((prev) => --prev);

  return (
    <MainLayout title="Добавить трек">
      <StepWrapper activeStep={step}>
        {step === 0 ? (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField style={{ marginTop: 10 }} label="Название трека" {...name} />
            <TextField style={{ marginTop: 10 }} label="Имя исполнителя" {...artist} />
            <TextField
              style={{ marginTop: 10 }}
              label="Слова к треку"
              multiline
              {...text}
            />
          </Grid>
        ) : step === 1 ? (
          <>
            <FileUpload setFile={setPicture} accept={ACCEPT.IMAGE}>
              <Button>Загрузить изображение</Button>
            </FileUpload>
            {picture && <p>{picture.name}</p>}
          </>
        ) : step === 2 ? (
          <>
            <FileUpload setFile={setAudio} accept={ACCEPT.AUDIO}>
              <Button>Загрузить аудио</Button>
            </FileUpload>
            {audio && <p>{audio.name}</p>}
          </>
        ) : null}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={!step} onClick={onBack}>
          Назад
        </Button>
        <Button onClick={onNext}>
          Далее
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
