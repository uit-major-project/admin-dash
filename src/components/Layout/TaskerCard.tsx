import styled from '@emotion/styled';
import { Avatar, Rate } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
// import { BiUserCircle } from 'react-icons/bi';

const StyledDiv = styled.div`
  .tasker-card {
    width: 100%;
    max-width: 700px;
    padding: 2rem;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 0px 5px #ccc;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .tasker-card-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      .tasker-image {
        width: 20%;
        max-width: 5em;
        // width: 10rem;
        // height: 100%;
        height: 5em;
        border-radius: 5px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        span {
          width: 100%;
          height: 100%;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      .tasker-details {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;

        .tasker-lead {
          font-size: 1.25em;
          font-weight: bold;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;

          .name {
            text-transform: uppercase;
          }
        }
      }
    }
    .tasker-card-bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 1rem;

      button {
        width: 100%;
        background: #00b074;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
`;

export const TaskerCard = ({
  tasker,
  taskCategory,
}: {
  tasker: any;
  taskCategory: any;
}) => {
  console.log('tasker card', tasker, taskCategory);
  return (
    <StyledDiv>
      <div className="tasker-card" key={tasker.id}>
        <div className="tasker-card-top">
          <div className="tasker-image">
            {tasker.image && tasker.image !== '' ? (
              <img src={tasker.image} alt="tasker" />
            ) : (
              <Avatar size={'large'} icon={<AiOutlineUser />} />
            )}
          </div>
          <div className="tasker-details">
            <div className="tasker-lead">
              <div className="name">
                {tasker.firstname} {tasker.lastname}
              </div>
              <div>Rs.{tasker.pricePerHourInRs ?? 100}/hr</div>
            </div>
            {tasker.ratingCount !== 0 ? (
              <div>
                <Rate defaultValue={tasker.rating} />
                <p>
                  {tasker.ratingCount === 1
                    ? '1 rating'
                    : `${tasker.ratingCount} ratings`}
                </p>
              </div>
            ) : (
              <div>No ratings</div>
            )}
            <p className="tasker-experience">
              {tasker.experience > 0
                ? `Experience of over ${tasker.experience} years`
                : ''}
            </p>
            <p>Address: {tasker.permanentAddress}</p>
          </div>
        </div>
        <div className="tasker-card-bottom">
          {/* <p className="tasker-experience">
            {tasker.experience === '' ? (
              'I have over 4 years of working experience with these type of tasks. I have good understanding of english language. 2 hrs min and travel expense may be added depending on distance. I look forward to working with you soon.'
            ) : (
              <span>{tasker.experience}</span>
            )}
          </p> */}
          {/* <button
            onClick={() => {
              setTaskDetails({
                ...taskDetails,
                taskerInContact: tasker.email,
              });
              next();
            }}
          >
            Select and Continue
          </button> */}
        </div>
      </div>
    </StyledDiv>
  );
};
