import React from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
// import { useReactiveVar } from '@apollo/client';

// import EmptyDisplay from 'src/components/EmptyDisplay';

// import { RiTodoLine } from 'react-icons/ri';
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
// import { tasks } from 'data/tasks';
import { MdOutlineTaskAlt, MdSort } from 'react-icons/md';

// import { useTable, useSortBy, Row } from 'react-table';

import { format } from 'date-fns';
import { Button, Space, Table, Tag } from 'antd';
import Link from 'next/link';
// import { StyledLoader } from '../Loader';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { adminVar, tasksVar } from '@/apollo/reactiveVars';

export const getFormattedTimeFromUnix = (timestamp: string) =>
  `${format(new Date(Number(timestamp)), 'MMM d, yyyy')}`;

// const StyledDiv = styled.div`
//   padding: 1em 3rem;

//   h2 {
//     margin: 0.25em 0 1em 0;
//     font-size: 2rem;
//     font-weight: 500;
//     // text-align: center;
//   }

//   .table-container {
//     height: calc(100vh - 15em);
//     overflow: auto;
//   }

//   table {
//     width: 100%;
//     border-spacing: 0;
//     // border: 1px solid black;

//     .table-body {
//       z-index: 0;
//       max-height: 100%;
//       // overflow-y: auto;
//     }

//     tr {
//       // display: flex;
//       background: #fafafa;
//       cursor: pointer;
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     tr: hover {
//       background-color: #f4f4f4;
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5em 1.5em;
//       // border-bottom: 1px solid black;
//       // border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//       :first-child {
//         padding: 0.5em 0.5em;
//       }
//     }

//     th {
//       text-align: left;
//       // display: flex;

//       background: #eee;

//       position: sticky;
//       top: 0px;
//       margin: 0 0 0 0;
//       overflow: hidden;
//       z-index: 1;

//       svg {
//         width: 1em;
//         height: auto;
//       }
//     }
//   }
// `;

const StyledDiv = styled.div`
  padding: 1em 3rem;
`;

const getStatusTagColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'blue';
    case 'in_progress':
      return 'cyan';
    case 'done':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'blue';
  }
};

// function Table({ columns, data }: any) {
//   // Use the useTable Hook to send the state and dispatch actions to
//   // your table.
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns,
//         data,
//       },
//       useSortBy
//     );

//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup: any, index: number) => (
//           <tr
//             className="header-row"
//             {...headerGroup.getHeaderGroupProps()}
//             key={index}
//           >
//             {headerGroup.headers.map((column: any, columnIndex: number) => (
//               <th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 key={columnIndex}
//                 className={'column-header'}
//               >
//                 <span style={{ textTransform: 'uppercase' }}>
//                   {column.render('Header')}
//                 </span>
//                 <span>
//                   {column.isSorted ? (
//                     column.isSortedDesc ? (
//                       // <MdSort />
//                       <FaSortDown />
//                     ) : (
//                       // <MdSort direction="up" />
//                       <FaSortUp />
//                     )
//                   ) : (
//                     ''
//                   )}
//                 </span>
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody className="table-body" {...getTableBodyProps()}>
//         {rows.slice(0, 10).map((row: any, rowIndex: number) => {
//           prepareRow(row);
//           console.log('row', row);
//           // if (!row.original || !row.original.id) {
//           //   return <></>;
//           // }
//           return (
//             // <Link passHref href={`/task/${row.original.id}`} key={rowIndex}>
//             <Link passHref href={`#`} key={rowIndex}>
//               <tr {...row.getRowProps()} key={rowIndex}>
//                 {row.cells.map((cell: any, index: number) => {
//                   const cellHeader: any = cell.column.Header;
//                   // console.log(
//                   //   'cellHeader',
//                   //   cellHeader,
//                   //   'cell value',
//                   //   cell.value
//                   // );
//                   if (cellHeader === 'Tasker') {
//                     return (
//                       <td {...cell.getCellProps()} key={index}>
//                         <span>
//                           {cell?.value?.firstname} {cell?.value?.lastname}
//                         </span>
//                       </td>
//                     );
//                   }
//                   if (
//                     cellHeader === 'Due Date' ||
//                     cellHeader === 'Created At'
//                     // cellHeader.props.children === 'Due Date'
//                   ) {
//                     return (
//                       <td {...cell.getCellProps()} key={index}>
//                         {getFormattedTimeFromUnix(cell.value)}
//                       </td>
//                     );
//                   }
//                   if (cellHeader === 'Status') {
//                     return (
//                       <td {...cell.getCellProps()} key={index}>
//                         <Tag color={getStatusTagColor(cell.value)}>
//                           {cell.value}
//                         </Tag>
//                       </td>
//                     );
//                   }
//                   return (
//                     <td {...cell.getCellProps()} key={index}>
//                       {cell.render('Cell')}
//                     </td>
//                   );
//                 })}
//               </tr>
//             </Link>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }



const DashMain = () => {
  const admin = useReactiveVar(adminVar);
  const tasks = useReactiveVar(tasksVar);

  // console.log(user);
  if (!admin) {
    typeof window !== 'undefined' && Router.push('/login');
  }

  // React.useEffect(() => {
  //   if (!user) {
  //     Router.push('/login');
  //   }
  // }, []);

  const bookingAction = {
    href: '/dashboard/explore',
    name: 'Book now',
  };

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

  const { data, error, loading } = useQuery(GET_ALL_TASKS, {
    fetchPolicy: 'network-only',
    // ...variables,
  });

  if (error) {
    console.error('error fetching tasks', error);
  }

  if (loading) {
    console.log('fetching all tasks...');
  }

  React.useEffect(() => {
    if (data && data.tasks && data.tasks.length > 0) {
      console.log('tasks*****', data.tasks);
      tasksVar(data.tasks);
    }
  }, [data]);

  // const tableColumns = React.useMemo(
  //   () => [
  //     // {
  //     //   Header: '#',
  //     //   accessor: 'id',
  //     //   Cell: (row: any, index: number) => index + 1,
  //     // },
  //     {
  //       Header: 'Due Date',
  //       accessor: 'dueDate',
  //     },
  //     // {
  //     //   Header: 'Created At',
  //     //   accessor: 'createdAt',
  //     // },
  //     {
  //       Header: 'Category',
  //       accessor: 'category',
  //     },
  //     {
  //       Header: 'Description',
  //       accessor: 'description',
  //     },
  //     {
  //       Header: 'Location',
  //       accessor: 'location',
  //     },
  //     // {
  //     //   Header: 'Pincode',
  //     //   accessor: 'pincode',
  //     // },
  //     {
  //       Header: 'Size',
  //       accessor: 'size',
  //     },
  //     {
  //       Header: 'Status',
  //       accessor: 'status',
  //     },
  //     {
  //       Header: 'Tasker',
  //       accessor: 'taskerInContact',
  //     },
  //     // {
  //     //   Header: 'Is Payment Done',
  //     //   accessor: 'isPaymentDone',
  //     // },
  //     // {
  //     //   Header: 'Action',
  //     //   accessor: 'action',
  //     // },
  //   ],
  //   []
  // );

  const tableData = React.useMemo(() => {
    if (data?.tasks && data.tasks.length > 0) {
      return data.tasks.map((task: any) => {
        return {
          dueDate: task.dueDate,
          description: task.description,
          location: task.location,
          pincode: task.pincode,
          size: task.size,
          status: task.status,
          createdAt: task.createdAt,
          taskerInContact: task.taskerInContact,
          id: task.id,
          isPaymentDone: task.isPaymentDone,
          category: task.category,
        };
      });
    }
  }, [data]);

  console.log('tableData', tableData);


  const tableColumns = React.useMemo(
    () => [
      // {
      //   Header: '#',
      //   dataIndex: 'id',
      //   Cell: (row: any, index: number) => index + 1,
      // },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (dueDate: any) => {
          return (
            <div>
              <span>{getFormattedTimeFromUnix(dueDate)}</span>
            </div>
          );
        },
      },
      // {
      //   title: 'Created At',
      //   dataIndex: 'createdAt',
      // },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      // {
      //   title: 'Pincode',
      //   dataIndex: 'pincode',
      // },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: any) => {
          return (
            <div>
              <Tag color={getStatusTagColor(status)}>{status}</Tag>
            </div>
          );
        },
      },
      {
        title: 'Tasker',
        dataIndex: 'taskerInContact',
        key: 'taskerInContact',
        render: (taskerInContact: any) => {
          return (
            <div>
              <span>
                {taskerInContact?.firstname} {taskerInContact?.lastname}
              </span>
            </div>
          );
        },
      },
      // {
      //   title: 'Is Payment Done',
      //   dataIndex: 'isPaymentDone',
      // },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      // },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any) => {
          if (record.status === 'open') {
            // assign tasker to task or cancel task
            return (
              <Space size="middle">
                <Link href={`/dashboard/assign-tasker/${record.id}`}>
                  Assign Tasker
                </Link>
                <Button onClick={() => markTaskAsCancelled(record.id)}>
                  Cancel Task
                </Button>
              </Space>
            );
          } else if (record.status === 'in_progress') {
            // mark task as done or cancel task
            return (
              <Space size="middle">
                <Button onClick={() => markTaskAsDone(record.id)}>
                  Mark as Done
                </Button>
                <Button onClick={() => markTaskAsCancelled(record.id)}>
                  Cancel Task
                </Button>
              </Space>
            );
          }
        }
      },
    ],
    []
  );

  //////////////////////////////////////////   CANCEL TASK / COMPLETE TASK   //////////////////////////////////////////

  const UPDATE_TASK = gql`
    mutation updateTask(
      $id: ID!
      $status: TaskStatus
      # $isPaymentDone: Boolean
    ) {
      updateTask(id: $id, status: $status) {
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

  const [updateTask, { error: errorU, loading: loadingU }] = useMutation(UPDATE_TASK, {
    onCompleted: (data: any) => {
      console.log('data', data);
      // re run the query to get all tasks
      Router.reload();
    },
  });

  if (errorU) {
    console.error(errorU);
  }

  const markTaskAsCancelled = (taskId: string) => {
    console.log('mark task as cancelled');
    updateTask({
      variables: {
        id: taskId,
        status: 'cancelled',
      },
    });
  };

  const markTaskAsDone = (taskId: string) => {
    console.log('mark task as done');
    updateTask({
      variables: {
        id: taskId,
        status: 'done',
      },
    });
  };


  //////////////////////////////////////////////////////////

  return (
    <StyledDiv>
      {loading || loadingU ? (
        // <StyledLoader />
        <div>Loading...</div>
      ) : (
        <>
          {tasks && tasks.length > 0 ? (
            <div>
              {/* {user.tasks.map((task: any) => (
              <div key={task.id}>
                <p>{task.id}</p>
              </div>
            ))} */}
              <h2>All Tasks</h2>
              <div className="table-container">
                {/* <Table columns={tableColumns} data={tableData} /> */}
                <Table  columns={tableColumns} dataSource={tableData} />
              </div>
            </div>
          ) : (
            // <EmptyDisplay
            //   icon={<MdOutlineTaskAlt />}
            //   title="Have something you want to get done?"
            //   action={bookingAction}
            // />
            <div>Nothing to show</div>
          )}
        </>
      )}
    </StyledDiv>
  );
};

export default DashMain;
