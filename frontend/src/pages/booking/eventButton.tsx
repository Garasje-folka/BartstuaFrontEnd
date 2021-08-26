import { DropInEvent } from "utils/dist/bookingManagement/types";
import {
  PlacesContainer,
  StyledButton,
  TimeContainer,
} from "./eventButton.styled";

type Props = {
  event: DropInEvent;
  disabled?: boolean;
  selected?: boolean;
  onClickCallback: (event: DropInEvent, selected: boolean) => void;
};

const EventButton: React.FC<Props> = (props: Props) => {
  const { event, disabled, selected, onClickCallback } = props;

  const onClick = () => {
    onClickCallback(event, !selected);
  };

  return (
    <StyledButton selected={!!selected} onClick={onClick} disabled={disabled}>
      <TimeContainer>{`${event.time.hour}:00 - ${
        event.time.hour + 1
      }:00`}</TimeContainer>
      <PlacesContainer>{/* TODO: (haryp2309) localise */}</PlacesContainer>
    </StyledButton>
  );
};

export { EventButton };
export type { Props as EventButtonProps };
