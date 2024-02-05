import httpStatus from 'http-status'
import Notification from '../../Models/Notification.js'


export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find()
        res.status(httpStatus.OK).json(notifications)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
}

export const deleteNotification = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedNotification = await Notification.findByIdAndDelete(id);
  
      if (!deletedNotification) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Notification not found' });
      }
  
      res.status(httpStatus.OK).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }


