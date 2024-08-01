import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { DashCamContentData } from '@/types/channelType';
import { MdAccessTime } from 'react-icons/md';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 16px;
  padding : 5px 28px;
`;

const Title = styled.div`
   padding : 0px 28px;
   border-bottom: 1px solid #e0e0e0;
`

const Body = styled.div`
   padding : 0px 28px;
`

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  font-weight: bold;
`;

const CarInfo = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 4px;
`;

const FormatDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const Tags = styled.div`
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background-color: #ddd;
  border-radius: 9px;
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 12px;
`;

const VideoContainer = styled.div`
  width: 100%;

  video {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  vertical-align: middle;
`;

const HeartButton = styled.button`
  margin: 5px 1px 5px auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: #666;
  }
`;

const TimeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 14px;
`;

const DashCamContent: React.FC<DashCamContentData> = ({
   id, member, title, createdAt, videoUrl, content, mentionedLeagues
}) => {
   const [isLiked, setIsLiked] = useState(false);

   const toggleLike = () => {
      setIsLiked(!isLiked);
   };

   const formatPostDate = (createdAt: string) => {
      const postDate = new Date(createdAt);
      const today = new Date();

      if (postDate.toDateString() === today.toDateString()) {
         return postDate.toLocaleTimeString([], {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
         });
      } else {
         return postDate.toISOString().split("T")[0].replace(/-/g, ".");
      }
   };

   return (
      <Container>
         <Title>
            <h2>{title}</h2>
         </Title>
         <Header>
            <User>
               <Avatar />
               <UserInfo>
                  <Username>{member.nickname}</Username>
                  <CarInfo>{member.carTitle}</CarInfo>
               </UserInfo>
            </User>
            <TimeSection>
               <Icon>
                  <MdAccessTime />
               </Icon>
               <FormatDate>{formatPostDate(createdAt)}</FormatDate>
            </TimeSection>
         </Header>
         <Body>
            <Tags>
               {mentionedLeagues.map((league, index) => (
                  <Tag key={index}>@ {league.name}</Tag>
               ))}
            </Tags>
            <VideoContainer>
               <video controls autoPlay loop>
                  <source src={videoUrl[0]} type="video/mp4" />
               </video>
            </VideoContainer>
            <HeartButton onClick={toggleLike}>
               {isLiked ? <FaHeart /> : <FaRegHeart />}
            </HeartButton>
            <Content>
               {content}
            </Content>
         </Body>
      </Container>
   );
};

export default DashCamContent;
