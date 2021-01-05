// import { Fragment, useState, useEffect } from 'react';
// import MainMenu from '../../components/molecules/mainMenu';
// import { API } from '../../config/api';
// import { useParams, useHistory } from 'react-router-dom';
// import './mySubscriberPage.css';

// export default function MySubscribersPage() {
//   const [subscriber, setSubscriber] = useState([]);

//   const { id } = useParams();
//   const router = useHistory();
//   const fetchSubscriber = async () => {
//     try {
//       const response = await API(`/channel/${id}`);
//       setSubscriber(response.data.data.channel.subscribers);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriber();
//   }, []);

//   return (
//     <Fragment>
//       <MainMenu />
//       <div
//         className='container'
//         style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
//       >
//         <h4 className='text-white' style={{ marginBottom: '-15px' }}>
//           My Subscribers
//         </h4>
//         <hr color='white' width='16%' />
//         <div
//           className='row justify-content-between'
//           style={{ marginTop: '35px' }}
//         >
//           {subscriber.map((channel, index) => {
//             console.log(channel.subscribers);
//             return (
//               <div
//                 className='col-3 mb-3'
//                 key={index}
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => router.push(`/content-creator/${channel.id}`)}
//               >
//                 <div className='wrapper-mysubscribe d-flex'>
//                   <div className='channel-image'>
//                     <img
//                       width='100%'
//                       height='100%'
//                       src={JSON.parse(channel.photo).path}
//                       alt='photo'
//                     />
//                   </div>
//                   <div
//                     className='desc-channel'
//                     style={{
//                       textOverflow: 'ellipsis',
//                       overflow: 'hidden',
//                       width: '100%',
//                       display: 'inline-block',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     <h6 className='text-white'>{channel.channelName}</h6>
//                     <p>
//                       {channel.subscribers && channel.subscribers.length}{' '}
//                       Subscriber
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Fragment>
//   );
// }
