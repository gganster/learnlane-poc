import { useRoom } from "@/components/room-provider";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth-provider";
import { LucideFile, LucideSendHorizontal, LucideUpload } from "lucide-react";

import { useState, useEffect } from "react";
import { sendMessage, uploadAttachment, getMessagesRealTime } from "@/services/chat";


const RoomChat = (props) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [preview, setPreview] = useState(null);
    
    const { auth } = useAuth();
    const { state } = useRoom();
    const { room } = state;

    useEffect(() => {
        const unsubscribe = getMessagesRealTime(state.room.id, setMessages);
        return () => unsubscribe();
    }, [state.room.id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAttachment(file);

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSend = async () => {
        const message = {
            id: Date.now().toString(),
            userId: auth.user.uid,
            userName: auth.user.userName + " " + auth.user.userSurname || "Utilisateur",
            role: auth.user.role,
            content: input,
            attachmentUrl: attachment ? await uploadAttachment(attachment, state.room.id, auth.user.uid) : null,
            timestamp: new Date().toISOString(),
        };
        
        await sendMessage(state.room.id, message);
        setInput("");
        setAttachment(null);
        setPreview(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="mt-5 border rounded-lg">
            <div className="chat-container flex flex-col gap-2 rounded-t-lg border-b p-4 h-[500px] overflow-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message w-full flex ${msg.userId === auth.user.uid ? "flex-row-reverse text-right" : ""} justify-between`}
                    >   
                        <div className={`message w-fit min-w-[100px] border border-border rounded-lg p-3 flex flex-col ${msg.userId === auth.user.uid ? "text-right bg-slate-900/30" : "bg-slate-900"} justify-between ${msg.pinned ? "bg-yellow-200" : ""}`}>
                            <div className={`flex flex-col`}>
                                <span className={`text-sm font-bold ${msg.role == "admin" ? "text-red-500" : "text-white/70"}`}>
                                    {msg.userId === auth.user.uid ? "Vous" : msg.role == "admin" ? "Administrateur" : msg.userName}
                                </span>
                                <p className="text-sm -mt-[1.5px] text-slate-400">{msg.content}</p>
                            </div>

                            {msg.attachmentUrl && (
                                msg.attachmentUrl.split("%2F").pop().split("?")[0].match(/\.(jpeg|jpg|gif|png)$/) ? (
                                    <div className="w-full mt-3">
                                        <img src={msg.attachmentUrl} alt="Attachment" className="mt-2 max-w-[200px] rounded-md" />
                                    </div>
                                ) : (
                                    <div className="w-full mt-3">
                                        <a href={msg.attachmentUrl} download className="border rounded-md text-xs p-4 py-2 mt-2 underline text-white/60">
                                        Download {msg.attachmentUrl.split("%2F").pop().split("?")[0]}
                                        </a>
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                ))}
            </div>
            <div className="input-container flex items-center h-[40px] overflow-hidden border-b">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    className="w-full text-xs px-3 h-full bg-transparent outline-none"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                />
                <label htmlFor="file-input" className="flex items-center h-full justify-center cursor-pointer">
                    <LucideUpload size={15} />
                </label>
                <button onClick={handleSend} className="flex items-center h-full justify-center w-12">
                    <LucideSendHorizontal size={15} />
                </button>
            </div>
            <div className="flex items-center justify-between p-2">
                {attachment && (
                    <span className="flex items-center gap-2 text-xs px-3 py-2 border border-border rounded-lg text-slate-400"><LucideFile size={15} /> {attachment.name}</span>
                )}
            </div>
        </div>
    )
}

export default RoomChat;