import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
// import { taskCategoryVar, userVar } from 'src/apollo/reactiveVars';
// import { Task, TaskType } from 'src/utils/types';
import styled from '@emotion/styled';
// import { getFormattedTimeFromUnix } from 'src/components/Pages/userDashActive';

import { FiInfo } from 'react-icons/fi';
import { Tooltip, Col, Row, Avatar, Rate } from 'antd';
import { tasksVar } from '@/apollo/reactiveVars';
import { Task, Tasker } from '@/utils/types';
import { AiOutlineUser } from 'react-icons/ai';
// import { TaskerCard } from 'src/components/TaskerCard';
// import { StyledLoader } from 'src/components/Loader';

const StyledDiv = styled.div`
  padding: 1em 3rem;

  .tasker-cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-top: 1rem;

    .tasker-card {
      width: 100%;
      max-width: 700px;
      padding: 1rem;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0px 0px 5px #ccc;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .tasker-card-top {
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;

        // .tasker-image {
        //   width: 30%;
        //   height: 100%;
        //   border-radius: 5px;
        //   background-size: cover;
        //   background-position: center;
        //   background-repeat: no-repeat;
        // }

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
          padding: 0 1.5rem;
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
          background: #72be90;
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
  }
`;

const Task = () => {
  const router = useRouter();
  const taskId = router.query.taskid;

  // Get all tasks from tasksVar and then find the current task
  // TODO : it may happen that the current task is not in the tasksVar
  // because the user may have refreshed the page
  // so we need to fetch the task from the server
  // const tasks = useReactiveVar(tasksVar) as any;
  // const currentTask11 = tasks.find((task: Task) => task.id === taskId);

  // console.log('currentTask11', currentTask11);

  const [currentTask, setCurrentTask] = React.useState<Task | null>(null);
  const [taskers, setTaskers] = React.useState<any>([]);

  // make a graphql query to get the current task from id then save in state
  const GET_ALL_TASKS = gql`
    query tasks {
      tasks {
        id
        createdAt
        updatedAt

        description
        dueDate
        location
        pincode

        taskerInContact {
          firstname
          lastname
          email
          image
          phone
          experience
          pricePerHourInRs
        }

        size
        status

        category
        isPaymentDone
      }
    }
  `;

  const { data: fetchedTasks, error: errorT1, loading: loadingT1 } = useQuery(GET_ALL_TASKS);

  if (errorT1) {
    console.error('error fetching tasks', errorT1);
  }

  if (loadingT1) {
    console.log('fetching tasks...');
  }

  React.useEffect(() => {
    if (fetchedTasks && fetchedTasks.tasks) {
      console.log('task', fetchedTasks.tasks);
      console.log('taskId', taskId)
      const currentTask11 = fetchedTasks.tasks.find((task: Task) => task.id == taskId);
      setCurrentTask(currentTask11);
    }
  }, [fetchedTasks]);

  const GET_TASKERS = gql`
    query taskers {
      taskers {
        id
        firstname
        lastname
        email
        image
        pincode
        phone
        permanentAddress
        isVerified
        hasPaidOneTimeFee
        pricePerHourInRs
        experience
        isActive
        category
        area
        rating
        ratingCount
      }
    }
  `;

  const { data: fetchedTaskers, error: errorT, loading: loadingT } = useQuery(GET_TASKERS);


  if (errorT) {
    console.error('error fetching taskers', errorT);
  }

  if (loadingT) {
    console.log('fetching taskers...');
  }

  React.useEffect(() => {
    if (fetchedTaskers && fetchedTaskers.taskers) {
      console.log('taskers', fetchedTaskers.taskers);
      setTaskers(fetchedTaskers.taskers);
    }
  }, [fetchedTaskers]);

  const [taskersForArea, setTaskersForArea] = React.useState<any>([]);

  React.useEffect(() => {
    console.log('SET TASKERS FOR AREA');
    console.log('currentTask', currentTask);
    console.log('taskers', taskers);
    if (currentTask !== null && taskers && taskers.length > 0) {
      const taskersForAreaFound = taskers.filter(
        (tasker: any) =>
          tasker.area === currentTask.location && tasker.category === currentTask.category,
      );
      console.log('taskersForArea', taskersForAreaFound);
      setTaskersForArea(taskersForAreaFound);
    }
  }, [currentTask, taskers]);

  // const [selectedTasker, setSelectedTasker] = React.useState<Tasker | null>(null);

  // assign a tasker to the task
  const UPDATE_TASK = gql`
    mutation updateTask(
      $id: ID!
      $taskerInContactId: String
      # $isPaymentDone: Boolean
      $status: TaskStatus
    ) {
      updateTask(id: $id, taskerInContactId: $taskerInContactId, status: $status) {
        id
        # createdAt
        # updatedAt

        # description
        # dueDate
        # location
        # pincode

        taskerInContact {
        #   firstname
        #   lastname
          email
        #   image
        #   phone
        #   experience
        #   pricePerHourInRs
        }

        # size
        # status

        # category
        # isPaymentDone
      }
    }
  `;

  const [updateTask, { error, loading }] = useMutation(UPDATE_TASK, {
    onCompleted: (data) => {
      console.log('data', data);
    },
  });

  if (error) {
    console.error(error);
  }

  // const markTaskAsCancelled = () => {
  //   console.log('mark task as cancelled');
  //   updateTask({
  //     variables: {
  //       id: taskId,
  //       status: 'cancelled',
  //     },
  //   });
  // };

  // console.log('currentTask', currentTask);

  const TaskerSelection = () => {
    return (
      <div className="tasker-cards-container">
        <h2>Tasker Selection</h2>
        <p>Available taskers : {taskersForArea.length}</p>
        {taskersForArea.map((tasker: any) => (
          <div className="tasker-card" key={tasker.id}>
            <div className="tasker-card-top">
              <div className="tasker-image">
                {/* <img src={tasker.image} alt="tasker" /> */}
                {tasker.image && tasker.image !== '' ? (
                  <img src={tasker.image} alt="tasker" />
                ) : (
                  <Avatar size={'large'} icon={<AiOutlineUser />} />
                )}
              </div>
              <div className="tasker-details">
                <div className="tasker-lead">
                  <div>
                    {tasker.firstname} {tasker.lastname}
                  </div>
                  <div>Rs.{tasker.pricePerHourInRs ?? 100}/hr</div>
                </div>
                {/* {tasker.ratingCount ? (
                  <p>
                    {tasker.ratingCount === 1
                      ? '1 rating'
                      : `${tasker.ratingCount} ratings`}
                  </p>
                ) : (
                  <p>No ratings</p>
                )} */}
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
                {/* {tasker.tasks ? (
                  <p>
                    {tasker.tasks.length === 1
                      ? `1 ${taskCategory} review`
                      : `${tasker.tasks.length} ${taskCategory} tasks`}
                  </p>
                ) : (
                  <p>No {taskCategory} tasks</p>
                )} */}
              </div>
            </div>
            <div className="tasker-card-bottom">
              {/* <p className="tasker-experience">
                {tasker.experience ??
                  'I have over 4 years of experience for this. I do not currently take order that take more then 5hrs at the moment. 2 hrs min and travel expense may be added depending on distance. I look forward to working with you soon.'}
              </p> */}
              <button
                onClick={() => {
                  // setTaskDetails({
                  //   ...taskDetails,
                  //   taskerInContact: tasker.email,
                  // });
                  updateTask({
                    variables: {
                      id: taskId,
                      taskerInContactId: tasker.id,
                      status: 'in_progress',
                    },
                  });
                  router.push('/');
                }}
              >
                Select this Tasker
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <StyledDiv>
      {loading || loadingT || loadingT1 ? (
        // <StyledLoader />
        <div>Loading...</div>
      ) : (
        <div>
          <TaskerSelection />
        </div>
      )}
    </StyledDiv>
  );
};

export default Task;
