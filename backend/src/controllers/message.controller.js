import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch(error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                { senderId:myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const {id: receiverId }= req.params.id;
        const senderId = req.user._id;

        let imgUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl,
        });

        await newMessage.save();
        
        //todo: realtime functionality to emit the message to the receiver
        //socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in send message controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};