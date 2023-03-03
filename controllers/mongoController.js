const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URL;

// strictQuery will become false in mongoose 7
mongoose.set('strictQuery', false);

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, options)
      .then(() => {
        console.log('Connected to database..');

        // create schema
        const articleSchema = mongoose.Schema({
          title: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        });
        const Article = mongoose.model('articles', articleSchema);
        resolve(Article);
      })

      .catch((e) => reject(e));
  });
}

module.exports = connect();
