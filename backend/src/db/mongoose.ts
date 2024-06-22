// // db/mongoose.ts
// import dotenv from "dotenv";
// dotenv.config();
// import mongoose from 'mongoose';


// mongoose.connect(process.env.COHERE_API_KEY || "", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// export default db;
