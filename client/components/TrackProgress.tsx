import React from "react";
interface TrackProgressProps {
  current: number;
  total: number;
  onChange(e: React.ChangeEvent): void;
  minutes?: boolean;
}

export const toMinutes = (seconds: number) => {
  const min = ~~(seconds / 60) + "";
  const sec = (~~seconds % 60) + "";
  return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
};

export const TrackProgress: React.FC<TrackProgressProps> = ({
  current,
  total,
  onChange,
  minutes = false,
}): React.ReactElement => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type="range"
          min={0}
          max={total}
          value={current}
          onChange={onChange}
        />
        <div className={`progress__info ${minutes ? "progress__min" : ""}`}>
          {minutes
            ? `${toMinutes(current)} / ${toMinutes(total)}`
            : `${current} / ${total}`
          }
        </div>
      </div>
      <style>{`
        .progress__info {
          padding:4px;
          width:85px;
          display:flex;
          align-items: center;
          justify-content: flex-end;
        }
        .progress__min {
          width:160px;
          justify-content: flex-start;
        }
      `}</style>
    </>
  );
};
