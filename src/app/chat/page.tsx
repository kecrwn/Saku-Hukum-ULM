import { Chatbot } from "@/components/Chatbot";

export default function ChatPage() {
  return (
    <div className="w-full h-[100dvh] bg-paper">
      <Chatbot fullScreen={true} />
    </div>
  );
}
