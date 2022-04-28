import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import messageModel from '../models/messageModel.js';

export const createMessage = async (req, res) => {
  const message = new messageModel({
    fullNames: req.body.fullNames,
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text

        })
        try {
          const newMessage = await message.save()
          const savedMessageId = newMessage.id
          res.status(201).json({newMessage, savedMessageId})
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      }

export const getMessages = async (req, res) => {
  try{
      const getallMessages = await messageModel.find();
      res.status(200).json({
          message: "All Messages",
          getallMessages
      });
  }catch(err){
      res.json({ message: "Fail" });
  }
}



export const getMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const message = await messageModel.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      message
    }
    
  });
  
});


export const deleteMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const message = await messageModel.deleteOne({ _id: id });

  if (!message) {
    return next(new AppError('No Blog found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});