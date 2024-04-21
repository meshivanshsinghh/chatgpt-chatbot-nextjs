import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";
import { ChatGPTMessage } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // parse through our schema to make sure client input is legit.
  const parsedMessages = MessageArraySchema.parse(messages);

  // calling the api
  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  // push puts in the last set of array, while unshift puts in first set of array
  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });
}
