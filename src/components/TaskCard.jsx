import React from 'react';
import styled from 'styled-components';

// Styled components
const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  font-family: Calibri, Arial, sans-serif; /* Updated font-family */
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskId = styled.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.h2`
  margin: 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  color: #111827;
`;

const TagText = styled.span`
  font-size: 14px;
  color: #6B7280;
  padding: 4px 8px;
  background-color: #F3F4F6;
  border-radius: 6px;
`;

// Main component
const TaskCard = () => {
  return (
    <Card>
      <Header>
        <TaskId>CAM-11</TaskId>
        <ProfileImage src="https://pngtree.com/freepng/salon-logo_6872052.html" alt="Profile" />
      </Header>
      <Title>Conduct Security Vulnerability Assessment</Title>
      <TagContainer>
        <TagIcon>!</TagIcon>
        <TagText>Feature Request</TagText>
      </TagContainer>
    </Card>
  );
};

export default TaskCard;
