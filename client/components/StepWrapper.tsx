import { Card, Grid, Step, StepLabel } from "@material-ui/core";
import { Container, Stepper } from "@material-ui/core";
import React from "react";

type IStepWrapperProps = {
  activeStep: number;
};

const steps = ["Информация о треке", "Загрузите обложку", "Загрузите сам трек"];

const StepWrapper: React.FC<IStepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container style={{marginTop: 24}}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={i} completed={activeStep > i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 270 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
