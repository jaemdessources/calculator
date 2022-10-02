import styled from "styled-components";

const HistoryIcon = () => {
  return (
    <Container
      alt="history"
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C9.61305 0 7.32387 0.948211 5.63604 2.63604C3.94821 4.32387 3 6.61305 3 9H0L3.89 12.89L3.96 13.03L8 9H5C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 12.87 15.87 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C6.47341 16.198 7.46449 16.8627 8.55606 17.3158C9.64764 17.769 10.8181 18.0015 12 18C14.3869 18 16.6761 17.0518 18.364 15.364C20.0518 13.6761 21 11.3869 21 9C21 6.61305 20.0518 4.32387 18.364 2.63604C16.6761 0.948211 14.3869 3.55683e-08 12 0ZM11 5V10L15.28 12.54L16 11.33L12.5 9.25V5H11Z"
        fill="#9aa0a6"
      />
    </Container>
  );
};

export default HistoryIcon;

const Container = styled.svg`
  height: 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  cursor: pointer;

  & path {
    fill: #9aa0a6;
  }
  &:hover path {
    fill: #e8eaed;
  }
`;
