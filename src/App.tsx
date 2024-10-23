import AppName from './components/AppName';
import Button from './components/Button';
import Chat from './components/Chat';
import Groq from 'groq-sdk';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';
import { useState, useEffect } from 'react';

const groq = new Groq({
  apiKey: import.meta.env.VITE_REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  prompt: string;
  response: string;
}

const App: React.FC = () => {
  // Initialize state with an empty string
  const [inputValue, setInputValue] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const localValue = localStorage.getItem('chatMessages');
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  // State to control the visibility of the Chat component
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);

  // state to control the visibility of the Header component
  const [isHeadersVisible, setIsHeaderVisible] = useState<boolean>(true);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update state with the new input value
    setInputValue(event.target.value);
  };

  // Check if the input value is empty or contains only whitespace
  const noChatPrompt = inputValue.trim() === '';

  // Send the prompt to the API
  const handleSubmit = async (value: string) => {
    if (noChatPrompt) return;
    const chatPrompt = `You: ${value}`;
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: value,
          },
        ],
        model: 'llama3-8b-8192',
      });
      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };
      // Append the new chat message to the array
      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage = 'Error fetching chat completion';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      // Append the error message to the array
      setChatMessages([...chatMessages, newChatMessage]);
    } finally {
      // clears the input field
      setInputValue('');

      // Show the Chat component after sending a message
      setIsChatVisible(true);

      // Hide the Header component after starting a chat
      setIsHeaderVisible(false)
    }
  };

  const handleClearChat = () => {
    // Clear the chat messages state
    setChatMessages([]);

    // Remove chat history from localStorage
    localStorage.removeItem('chatMessages');

    // Hide Chat component after clearing the chat
    setIsChatVisible(false)

    // Show the Headers component after clearing the chat
    setIsHeaderVisible(true)
  };

  return (
    <> 
      <AppName>
        <div><span>Grëg's </span>ChatBox</div>
      </AppName>
     { isHeadersVisible && (<div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>
        </Headings>
      </div>)}
      {isChatVisible && (
        <div>
          <Chat>
            {/* Map over the chat messages to render each one */}
            {chatMessages.map((message, index) => (
              <div key={index} className="chatConversations">
                <div className="chat-prompt">{message.prompt}</div>
                <div className="chat-response">{message.response}</div>
              </div>
            ))}
            <Button textContent="Clear Chat" handleClick={handleClearChat} />
          </Chat>
        </div>
      )}
      <div>
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            // Use the handleInputChange function
            onChange={handleInputChange}
          />
          <Button
            textContent="Send"
            handleClick={() => handleSubmit(inputValue)}
            // Pass the disabled state to the Button component
            disabled={noChatPrompt}
          />
        </SearchBar>
      </div>
    </>
  );
};

export default App;
