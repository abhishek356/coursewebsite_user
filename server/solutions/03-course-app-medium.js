const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
//Import {z} from '../node_modules/zod'
const z = require('zod')

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let currentlyLoggedInUser;
let validInput = z.object({
  username  :z.string().min(8).max(20),
  password : z.string().min(10).max(20)
})
// Read data from file, or initialize to empty array if file does not exist
try {
    ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
} catch {
    ADMINS = [];
    USERS = [];
    COURSES = [];
}
console.log(ADMINS);

const SECRET = 'my-secret-key';

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post('/admin/signup', (req, res) => {

  const parsedInput = validInput.safeParse(req.body)

  if(!parsedInput.success)
  {
    return res.status(411).json(
      {
        msg: parsedInput.error
      }
    )
  }
  //Making changes for the inclusion of zod
  //const { username, password } = req.body;

  let username = validInput.data.username;
  let password = validInput.data.password

  console.log(`request received from the client side`, username,password)
  console.log(`the value of request`,req.body)
  const admin = ADMINS.find(a => a.username === username);
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', (req, res) => {
  console.log(req.body)
  currentlyLoggedInUser = req.body.username;
  const { username, password } = req.body;
 // console.log(`values in the authorization are `,req.headers.authorization)
  console.log(`backend was hit`,username,password);
  const admin = ADMINS.find(a => a.username === username && a.password === password);
  console.log(`the value of admin is`,admin)
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});


app.post('/admin/me',authenticateJwt,(req,res)=>{
  console.log('admin/me is triggered from the front end')
  res.json({currentlyLoggedInUser})
  console.log(`Checking if the user is currently logged in !!`)
})


app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body;
  console.log('request received from the front end to add the course');
  course.id = COURSES.length + 1;
  COURSES.push(course);
  fs.writeFileSync('courses.json', JSON.stringify(COURSES));
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {

  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  console.log(`request received to update the course from the front end, with course id ${req.params.courseId}`)
  if (course) {
    Object.assign(course, req.body);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.get('/admin/getCourse/:courseId',authenticateJwt, (req,res)=>{
  let id = req.params.courseId;

  let course = COURSES.filter((course)=>course.id ==id);

  console.log(`the course is ${course} with id ${id}`)

  if(course)
  {
    res.json(course)
  }
  else{ 
res.json({message : 'error while retrieving a single course'})
  }
})

// User routes
app.post('/users/signup', (req, res) => {

  let parsedInput = validInput.safeParse(res.body)

  if(!parsedInput.success)
  {
    return res.status(411).json({
      msg:parsedInput.error
    })
  }
  //Making changes for the inclusion of zod

  //const { username, password } = req.body;
  let username = parsedInput.data.username;
  let password = parsedInput.data.password
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    let purchasedCourses=[]
    const newUser = { username, password, purchasedCourses};
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`request received from the front-end is`,req.body)

  currentlyLoggedInUser =  username;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    console.log(`the list of courses bought by the user is ${JSON.stringify(user)}`)
    res.json({ message: 'Logged in successfully', token, purchasedCourses :user.purchasedCourses });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  console.log(`request received from the frontend to get all the courses, and
  the list of courses is `,COURSES)
  res.json( COURSES );
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.post('/user/me',authenticateJwt,(req,res)=>{

  console.log('function to check if the user is logged in or not',currentlyLoggedInUser)
  res.json({currentlyLoggedInUser})

});

app.post('/loadCourses',(req,res)=>{

  res.status(200).json({data:COURSES})
})


app.listen(3000, () => console.log('Server running on port 3000'));
