// 'use client';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useMutation } from '@tanstack/react-query';
// import { generateChatResponse } from '../utlis/actions'; // Ensure this path is correct

// const Chat = () => {
//   const [text, setText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const { mutate } = useMutation({
//     mutationFn: (message) => generateChatResponse(message),
//     onSuccess: (data) => {
//       setMessages((prevMessages) => [...prevMessages, { text, response: data }]);
//       setText('');
//     },
//     onError: (error) => {
//       toast.error('Error occurred while generating response');
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(text); // This will log the message to the console
//     mutate(text);
//   };

//   return (
//     <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
//       <div>
//         <h2 className="text-5xl">Messages</h2>
//       </div>
//       <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
//         <div className="join w-full">
//           <input
//             type="text"
//             placeholder="Message GeniusGPT"
//             className="input input-bordered join-item w-full"
//             value={text}
//             required
//             onChange={(e) => setText(e.target.value)}
//           />
//           <button className="btn btn-primary join-item" type="submit">
//             Ask a question
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Chat;

'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { generateChatResponse } from '../utlis/actions'; // Ensure this path is correct

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const mutation = useMutation({
    mutationFn: (message) => generateChatResponse(message),
    onSuccess: (data) => {
      if (data) {
        setMessages((prevMessages) => [...prevMessages, { text, response: data }]);
        setText('');
      } else {
        toast.error('No response received from the server');
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error('Error occurred while generating response');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text); // This will log the message to the console
    mutation.mutate(text);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">Messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit">
            Ask a question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
