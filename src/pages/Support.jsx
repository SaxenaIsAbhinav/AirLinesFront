import React, { useEffect, useRef, useState } from "react";

const faqData = [
  {
    keywords: ["book"],
    response: "To book a flight, go to the 'Book Tickets' page, enter your travel details, select your flight, and proceed with payment.",
    suggestions: [
      { text: "Can I book round trips?", response: "Yes, round trip bookings are supported. Just choose 'Round Trip' on the booking page." },
      { text: "What payment methods are accepted?", response: "We accept credit/debit cards, UPI, net banking, and wallets like PayTM & PhonePe." },
      { text: "Can I choose my seat?", response: "Absolutely! You can select a seat during booking or via 'Manage Booking'." }
    ]
  },
  {
keywords: ["hi", "hello", "hey"],
response: "Hello there! 👋 I'm SkyEase Assistant. How can I help you today?",
suggestions: [
{ text: "How to book a flight?", response: "To book a flight, go to the 'Book Tickets' page, enter your travel details, select your flight, and proceed with payment." },
{ text: "How to cancel a flight?", response: "Visit 'My Bookings', select the flight you want to cancel, and follow the instructions." },
{ text: "Can I reschedule my flight?", response: "Yes, you can reschedule under 'Manage Booking'. Charges may apply based on fare rules." },
{ text: "Talk to support", response: "Sure! You can reach support at 1800-123-4567 or use our live chat from 9am to 9pm IST." }
]
},
{
keywords: ["hi", "hello", "hey"],
response: "Hello there! 👋 I'm SkyEase Assistant. How can I help you today?",
suggestions: [
{ text: "How to book a flight?", response: "To book a flight, go to the 'Book Tickets' page, enter your travel details, select your flight, and proceed with payment." },
{ text: "How to cancel a flight?", response: "Visit 'My Bookings', select the flight you want to cancel, and follow the instructions." },
{ text: "Can I reschedule my flight?", response: "Yes, you can reschedule under 'Manage Booking'. Charges may apply based on fare rules." },
{ text: "Talk to support", response: "Sure! You can reach support at 1800-123-4567 or use our live chat from 9am to 9pm IST." }
]
},
  {
    keywords: ["cancel", "cancellation"],
    response: "To cancel a ticket, visit 'My Bookings', select your flight and click on 'Cancel'. Refunds are processed as per our policy.",
    suggestions: [
      { text: "Will I get a full refund?", response: "Refunds depend on the fare type. Some tickets are non-refundable while others offer partial/full refunds." },
      { text: "How long does a refund take?", response: "Refunds are processed within 5-7 working days. You’ll receive updates via email/SMS." },
      { text: "Can I cancel partially?", response: "Partial cancellations are allowed for some airlines. Please check 'Manage Booking' to see options." }
    ]
  },
  {
    keywords: ["check-in"],
    response: "You can check in online from 48 hours to 60 minutes before departure via 'Manage Booking'.",
    suggestions: [
      { text: "Can I choose my seat during check-in?", response: "Yes! You can choose your seat during online check-in or even before through 'Manage Booking'." },
      { text: "Do I need a printout?", response: "A digital boarding pass is enough, but a printout is recommended if you're carrying check-in baggage." }
    ]
  },
  {
    keywords: ["baggage", "luggage"],
    response: "Each passenger is allowed 15 kg of check-in baggage and 7 kg of cabin baggage on domestic flights.",
    suggestions: [
      { text: "Can I carry extra baggage?", response: "Yes. You can pre-book excess baggage online for discounted rates or pay at the airport." },
      { text: "Are power banks allowed?", response: "Power banks are allowed only in cabin baggage. They are prohibited in check-in baggage." }
    ]
  },
  {
    keywords: ["meal", "food", "eat"],
    response: "Meals are available on select flights and can be pre-booked or purchased onboard.",
    suggestions: [
      { text: "Are vegetarian options available?", response: "Yes, vegetarian and special dietary meals are available. You can select them while booking or via 'Manage Booking'." },
      { text: "Can I bring my own food?", response: "Yes, dry food items are generally allowed on board. Avoid liquid or strong-smelling food." }
    ]
  },
  {
    keywords: ["delay", "late", "reschedule"],
    response: "We’re sorry for the inconvenience. If your flight is delayed, you'll receive updates via SMS or email.",
    suggestions: [
      { text: "Can I reschedule my flight?", response: "Yes, rescheduling is possible from 'Manage Booking' based on fare conditions." },
      { text: "Will I get compensation?", response: "Compensation policies vary by airline and delay duration. Please check with support." }
    ]
  },
  {
    keywords: ["contact", "support", "help"],
    response: "You can contact our support team 24/7 via call at 1800-123-4567 or email us at support@skyease.com.",
    suggestions: [
      { text: "Do you offer live chat support?", response: "Yes! Our live chat is available from 9am–9pm IST on the website Help & Support page." },
      { text: "How can I raise a complaint?", response: "Go to 'Help & Support' > 'Raise a Complaint', or email us with your booking ID and issue details." }
    ]
  },

{
keywords: ["book"],
response: "To book a flight, go to the 'Book Tickets' page, enter your travel details, select your flight, and proceed with payment.",
suggestions: [
  { text: "Can I book round trips?", response: "Yes, round trip bookings are supported. Just choose 'Round Trip' on the booking page." },
  { text: "What payment methods are accepted?", response: "We accept credit/debit cards, UPI, net banking, and wallets like PayTM & PhonePe." },
  { text: "Can I choose my seat?", response: "Absolutely! You can select a seat during booking or via 'Manage Booking'." },
  { text: "Is there a charge for seat selection?", response: "Some seats are free, but preferred or extra legroom seats may incur a fee." },
  { text: "Can I upgrade my seat?", response: "Yes! Upgrades can be done during booking or at check-in based on availability." },
  { text: "What if my selected seat is unavailable?", response: "In rare cases, seat changes may occur due to operational reasons. You’ll be notified." }
]
},
{
keywords: ["payment", "fail", "money"],
response: "If your payment failed, don't worry. You can retry from 'Manage Booking' or contact support for help.",
suggestions: [
  { text: "Payment failed, what now?", response: "If your payment failed, please wait a few minutes. If money was deducted, it will be refunded." },
  { text: "How to retry payment?", response: "Go to 'My Bookings', select your flight, and click 'Retry Payment'." },
  { text: "Is my money safe?", response: "Yes, if payment was deducted but the booking wasn't confirmed, it will be auto-refunded within 5-7 days." }
]
},
{
keywords: ["cancel", "cancellation"],
response: "To cancel a ticket, visit 'My Bookings', select your flight and click on 'Cancel'. Refunds are processed as per our policy.",
suggestions: [
  { text: "Will I get a full refund?", response: "Refunds depend on the fare type. Some tickets are non-refundable while others offer partial/full refunds." },
  { text: "How long does a refund take?", response: "Refunds are processed within 5-7 working days. You’ll receive updates via email/SMS." },
  { text: "Can I cancel partially?", response: "Partial cancellations are allowed for some airlines. Please check 'Manage Booking' to see options." },
  { text: "What if the flight was canceled by the airline?", response: "In case of airline-initiated cancellations, a full refund is generally issued automatically." },
  { text: "How is the refund calculated?", response: "Refunds are based on the fare rules and deductions if any. Taxes are usually fully refundable." },
  { text: "Can I track my refund?", response: "Yes, go to 'My Bookings' and check the refund status for each canceled flight." }
]
},
{
keywords: ["status", "delayed", "late", "reschedule"],
response: "Flight delays are updated in real time. Check your flight status using 'Flight Status'.",
suggestions: [
  { text: "What if my flight is delayed?", response: "You will receive SMS and email notifications with updates and options to reschedule if available." },
  { text: "How often is the status updated?", response: "Flight status is updated in real-time using live air traffic data and airline feeds." },
  { text: "Can I get alerts?", response: "Yes, enable notifications when booking or opt-in under 'Manage Booking' to receive alerts." },
  { text: "Is there a reschedule fee?", response: "Reschedule fees vary based on fare type. Some changes may be free if made early." },
  { text: "How many times can I reschedule?", response: "Most tickets allow one or two free changes. Further changes may incur fees." },
  { text: "Can I reschedule on the same day?", response: "Yes, if available. Charges may apply depending on the fare rules and time left before departure." }
]
},
{
keywords: ["check-in"],
response: "You can check in online from 48 hours to 60 minutes before departure via 'Manage Booking'.",
suggestions: [
  { text: "How to check-in?", response: "Go to 'Manage Booking' and click on 'Check-In'. Enter your booking ID and follow the prompts." },
  { text: "Online check-in?", response: "Yes, online check-in is available and recommended. It saves time at the airport." },
  { text: "Boarding process?", response: "After check-in, proceed to the boarding gate 45 minutes before departure with your ID and boarding pass." }
]
},
{
keywords: ["boarding pass", "pass"],
response: "Your boarding pass will be available after online check-in.",
suggestions: [
  { text: "Where is my boarding pass?", response: "It’s sent to your email or you can download it from 'Manage Booking'." },
  { text: "Download boarding pass?", response: "Yes, log in to 'Manage Booking' and click 'Download Boarding Pass'." },
  { text: "Do I need to print the boarding pass?", response: "A printed pass is not mandatory if you have a digital one, unless airport rules require it." },
  { text: "How early should I check in?", response: "For domestic flights, arrive 2 hours early. For international, arrive 3 hours before departure." }
]
},
{
keywords: ["baggage", "luggage"],
response: "Each passenger is allowed 15 kg of check-in baggage and 7 kg of cabin baggage on domestic flights.",
suggestions: [
  { text: "What items are restricted?", response: "Sharp objects, explosives, flammable liquids, and aerosols are restricted in both baggage types." },
  { text: "Can I buy extra baggage?", response: "Yes. Pre-book extra baggage online for cheaper rates or pay at the airport." },
  { text: "Are there charges for excess baggage?", response: "Yes. Charges vary per kg based on the route and airline." }
]
},
{
keywords: ["meal", "food"],
response: "Meals are available on select flights and can be pre-booked or purchased onboard.",
suggestions: [
  { text: "Can I choose a vegetarian meal?", response: "Yes, vegetarian and special dietary meals are available. You can choose during booking." },
  { text: "Is outside food allowed?", response: "Yes, dry snacks are usually allowed. Avoid liquids and strong-smelling food." },
  { text: "What snacks are available?", response: "You can buy sandwiches, chips, cookies, and beverages onboard depending on the flight." }
]
},
{
keywords: ["infant", "baby", "child"],
response: "Infants under 2 years can travel on an adult’s lap. Certain fees and documents may apply.",
suggestions: [
  { text: "Is there an add-on fee for infants?", response: "Yes, a nominal fee is charged. Infants do not get their own seat." },
  { text: "Can I bring a stroller?", response: "Yes. You can carry a foldable stroller to the boarding gate. It will be tagged and checked in." },
  { text: "Are baby meals available?", response: "Some flights provide baby meals if pre-requested. Please check while booking." }
]
},
{
keywords: ["wheelchair", "disabled", "assistance"],
response: "Wheelchair assistance is available for those who need it. Request it during or after booking.",
suggestions: [
  { text: "Is wheelchair service free?", response: "Yes, for genuine needs. You can request it via 'Manage Booking' or at the airport." },
  { text: "Can someone accompany me?", response: "Yes, airport staff will assist. A travel companion can also help during the journey." },
  { text: "Where do I go at the airport?", response: "Visit the assistance desk at the entrance or ask airport staff for directions." }
]
},
{
keywords: ["id", "identity", "document"],
response: "A government-issued ID is mandatory for all passengers. Children must also have valid ID.",
suggestions: [
  { text: "Is Aadhaar card accepted?", response: "Yes, Aadhaar card is valid ID for domestic flights." },
  { text: "What if my ID is expired?", response: "You must carry a valid, unexpired ID. Expired documents are not accepted." },
  { text: "Do kids need ID?", response: "Yes, kids need a school ID, birth certificate, or any government-issued ID." }
]
},
{
keywords: ["contact", "support", "help"],
response: "You can contact our support team 24/7 via call at 1800-123-4567 or email us at support@skyease.com.",
suggestions: [
  { text: "Can I talk to a human?", response: "Yes! Call our helpline or request live chat via the Help page between 9am–9pm IST." },
  { text: "Is chat support available?", response: "Yes! You can chat with us live from 9am–9pm IST daily." },
  { text: "Where is the support center located?", response: "Our central support is online, but we operate offices in major cities for escalations." },
  { text: "Contact support team?", response: "Sure! Call us at 1800-123-4567 or email support@skyease.com for any issue." }
]
}, {
  keywords: ["book", "flight"],
  response: "To book a flight, just use our search bar on the home page and follow the prompts.",
  suggestions: [
    { text: "How to cancel a ticket?", response: "Go to 'My Bookings' and click on 'Cancel'." }
  ]
},
{
  keywords: ["cancel", "ticket"],
  response: "To cancel a ticket, go to your bookings, select the ticket and press 'Cancel'.",
  suggestions: [
    { text: "How to book a flight?", response: "Use our flight search to start a new booking." }
  ]
},
{
  keywords: ["contact", "support"],
  response: "You can contact our support team at 1800-123-4567 or support@skyease.com",
  suggestions: []
}
];




// export default function Support() {
//   const [chatLog, setChatLog] = useState([
//     {
//       sender: "bot",
//       text: "👋 Hello! How can I assist you today?",
//       suggestions: [
//         { text: "How to book a flight?" },
//         { text: "How to cancel a ticket?" },
//         { text: "Want to contact support?" }
//       ]
//     }
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleAutoFill = (text) => {
//     setUserInput(text);
//     handleSendMessage(text);
//   };

//   const handleSendMessage = (customInput) => {
//     const input = (customInput || userInput).trim();
//     if (!input) return;

//     setChatLog((prev) => [...prev, { sender: "user", text: input }]);
//     setUserInput("");

//     const lowerInput = input.toLowerCase();
//     const matched = faqData.find((entry) =>
//       entry.keywords.some((keyword) => lowerInput.includes(keyword))
//     );

//     // Simulate typing delay
//     setChatLog((prev) => [
//       ...prev,
//       { sender: "bot", text: "typing...", typing: true }
//     ]);

//     setTimeout(() => {
//       setChatLog((prev) => {
//         const withoutTyping = prev.filter((msg) => !msg.typing);
//         if (matched) {
//           return [
//             ...withoutTyping,
//             {
//               sender: "bot",
//               text: matched.response,
//               suggestions: matched.suggestions || []
//             }
//           ];
//         } else {
//           return [
//             ...withoutTyping,
//             {
//               sender: "bot",
//               text:
//                 "I'm sorry, I didn't quite catch that. Try contacting our support team at 1800-123-4567 or support@skyease.com."
//             }
//           ];
//         }
//       });
//     }, 1500);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatLog]);

//   return (
//     // <div className="chat-container">
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
//   <div className="chat-container w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
//     {/* Chat header, log, input goes here */}


//       <div className="chat-header">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
//           alt="Bot Icon"
//         />
//         <h2>SkyEase Assistant</h2>
//       </div>

//       <div id="chatlog">
//         {chatLog.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`message ${msg.sender} ${msg.typing ? "typing" : ""}`}
//           >
//             {!msg.typing ? (
//               <>
//                 {msg.text}
//                 {msg.suggestions &&
//                   msg.suggestions.map((sug, index) => (
//                     <button key={index} onClick={() => handleAutoFill(sug.text)}>
//                       {sug.text}
//                     </button>
//                   ))}
//               </>
//             ) : (
//               <>
//                 <span className="dot" />
//                 <span className="dot" />
//                 <span className="dot" />
//               </>
//             )}
//           </div>
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           id="userInput"
//           placeholder="Type your question..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button onClick={() => handleSendMessage()}>Send</button>
//       </div>
//     </div>  </div>
//   );
// }

// assuming this exists

export default function Support() {
  const [chatLog, setChatLog] = useState([
    {
      sender: "bot",
      text: "👋 Hello! How can I assist you today?",
      suggestions: [
        { text: "How to book a flight?" },
        { text: "How to cancel a ticket?" },
        { text: "Want to contact support?" }
      ]
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAutoFill = (text) => {
    setUserInput(text);
    handleSendMessage(text);
  };

  const handleSendMessage = (customInput) => {
    const input = (customInput || userInput).trim();
    if (!input) return;

    setChatLog((prev) => [...prev, { sender: "user", text: input }]);
    setUserInput("");

    const lowerInput = input.toLowerCase();
    const matched = faqData.find((entry) =>
      entry.keywords.some((keyword) => lowerInput.includes(keyword))
    );

    setChatLog((prev) => [
      ...prev,
      { sender: "bot", text: "typing...", typing: true }
    ]);

    setTimeout(() => {
      setChatLog((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.typing);
        if (matched) {
          return [
            ...withoutTyping,
            {
              sender: "bot",
              text: matched.response,
              suggestions: matched.suggestions || []
            }
          ];
        } else {
          return [
            ...withoutTyping,
            {
              sender: "bot",
              text:
                "I'm sorry, I didn't quite catch that. Try contacting our support team at 1800-123-4567 or support@skyease.com."
            }
          ];
        }
      });
    }, 1500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-xl flex flex-col space-y-4">
        {/* Chat Header */}
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
            alt="Bot Icon"
            className="w-10 h-10"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">SkyEase Assistant</h2>
        </div>

        {/* Chat Log */}
        <div
          id="chatlog"
          className="flex flex-col space-y-2 overflow-y-auto max-h-[350px] pr-2"
        >
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                msg.typing
                  ? "flex gap-1 items-center"
                  : msg.sender === "user"
                  ? "self-end bg-green-100 text-gray-800 dark:bg-green-200"
                  : "self-start bg-blue-50 text-gray-800 dark:bg-blue-100"
              }`}
            >
              {msg.typing ? (
                <>
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" />
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]" />
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]" />
                </>
              ) : (
                <>
                  {msg.text}
                  {msg.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.suggestions.map((sug, index) => (
                        <button
                          key={index}
                          onClick={() => handleAutoFill(sug.text)}
                          className="px-3 py-1 text-sm border border-blue-500 text-blue-500 bg-white dark:bg-neutral-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-700 transition duration-200"
                        >
                          {sug.text}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex gap-2">
          <input
            type="text"
            id="userInput"
            placeholder="Type your question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
