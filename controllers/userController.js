import User from "../models/user.js";
import UserProfile from "../models/userProfile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    let imageUrl = req.file ? req.file.path : null

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let hashedPassword = await bcrypt.hash(password, 5);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.USER,
            pass:process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
  from: process.env.USER,
  to: email,
  subject: "Welcome to Chef's Blog 🍽️",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:40px 16px;background:#f5f0e8;font-family:'Lato',sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fffef9;border:1px solid #e8dfd0;box-shadow:0 8px 40px rgba(90,60,20,0.10);">
    
    <!-- HEADER -->
    <div style="background:#1a1208;padding:48px 48px 36px;text-align:center;">
      <div style="font-size:10px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:#c8943c;margin-bottom:12px;">Est. 2024</div>
      <div style="margin-bottom:20px;">── 🍽️ ──</div>
      <div style="font-family:'Playfair Display',serif;font-size:40px;font-weight:700;color:#fffef9;">Chef's <span style="font-style:italic;color:#c8943c;">Blog</span></div>
      <div style="font-size:11px;letter-spacing:3px;color:#a07840;margin-top:10px;text-transform:uppercase;">Recipes · Stories · Savoir-Faire</div>
    </div>

    <!-- QUOTE BAND -->
    <div style="background:#c8943c;padding:14px 48px;text-align:center;">
      <p style="font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:#1a1208;margin:0;">"Good food is the foundation of genuine happiness."</p>
    </div>

    <!-- BODY -->
    <div style="padding:52px 56px;">
      <div style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#c8943c;margin-bottom:8px;">Welcome aboard</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:32px;color:#1a1208;margin-bottom:28px;">Hello, <em style="font-style:italic;color:#8b5e1a;">${firstName}</em> 👋</h2>

      <p style="font-size:15px;line-height:1.85;color:#4a3a28;font-weight:300;margin-bottom:20px;">
        Thank you for joining our table. We're truly delighted to have you as part of the <strong style="font-weight:700;color:#1a1208;">Chef's Blog</strong> community — a place built for those who believe that cooking is both an art and an act of love.
      </p>
      <p style="font-size:15px;line-height:1.85;color:#4a3a28;font-weight:300;margin-bottom:32px;">
        Whether you're a seasoned home cook or just starting out, you'll find recipes, techniques, and stories curated with care. Your culinary journey starts here.
      </p>

      <!-- FEATURES -->
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8dfd0;margin-bottom:36px;">
        <tr><td style="padding:20px 24px;border-bottom:1px solid #e8dfd0;background:#fffef9;">
          <span style="font-size:22px;">📖</span>&nbsp;&nbsp;<strong style="font-family:'Playfair Display',serif;color:#1a1208;">Curated Recipes</strong>
          <div style="font-size:13px;color:#7a6a52;margin-top:4px;">Hundreds of tested recipes organized by season and skill level.</div>
        </td></tr>
        <tr><td style="padding:20px 24px;border-bottom:1px solid #e8dfd0;background:#fffef9;">
          <span style="font-size:22px;">🎥</span>&nbsp;&nbsp;<strong style="font-family:'Playfair Display',serif;color:#1a1208;">Video Tutorials</strong>
          <div style="font-size:13px;color:#7a6a52;margin-top:4px;">Step-by-step cooking videos that make complex techniques approachable.</div>
        </td></tr>
        <tr><td style="padding:20px 24px;background:#fffef9;">
          <span style="font-size:22px;">🌿</span>&nbsp;&nbsp;<strong style="font-family:'Playfair Display',serif;color:#1a1208;">Weekly Inspiration</strong>
          <div style="font-size:13px;color:#7a6a52;margin-top:4px;">Seasonal spotlights and meal-planning guides delivered to your inbox.</div>
        </td></tr>
      </table>

      <!-- CTA -->
      <div style="text-align:center;margin:40px 0;">
        <a href="https://yoursite.com" style="display:inline-block;background:#1a1208;color:#fffef9;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:18px 44px;border:2px solid #1a1208;">Explore the Blog</a>
        <p style="font-size:12px;color:#a89070;margin-top:14px;">Your kitchen adventure awaits →</p>
      </div>

      <!-- SIGNATURE -->
      <div style="margin-top:44px;padding-top:28px;border-top:1px solid #e8dfd0;">
        <p style="font-size:13px;color:#7a6a52;font-weight:300;margin-bottom:4px;">With warmth,</p>
        <p style="font-family:'Playfair Display',serif;font-size:20px;color:#1a1208;font-style:italic;">The Chef's Blog Team</p>
        <p style="font-size:11px;color:#c8943c;letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Curators of Good Taste</p>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background:#f0e8d8;padding:28px 48px;border-top:1px solid #e8dfd0;text-align:center;">
      <p style="font-size:11px;color:#b09878;line-height:1.7;">
        You're receiving this because you signed up at chefsblog.com.<br/>
        <a href="#" style="color:#c8943c;text-decoration:none;">Unsubscribe</a> · 
        <a href="#" style="color:#c8943c;text-decoration:none;">Privacy Policy</a> · 
        © 2024 Chef's Blog
      </p>
    </div>

  </div>
</body>
</html>
  `
}
      
      await transporter.sendMail(mailOptions, (error, info)=>{
          if (error) {
              return console.log("Error while sending mail", error);
          } else {
              console.log("Email sent: " + info.response);
          }
      })

    let user = await User.create({
      firstName,
      lastName,
      email,
      image: imageUrl,
      password: hashedPassword,
    });
    

    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createUserProfile = async(req,res)=>{
  try {
    let { bio, dob } = req.body;
    let userId = req.user.id;

    let existingUser = await User.findById(userId)

    if(existingUser.profile){
      return res.status(400).json({message: "Profile already exists"});
    }

    if (!bio || !dob) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let profile = await UserProfile.create({
      bio,
      dob,
      userId
    });

    existingUser.profile = profile._id;
    await existingUser.save()

    res.status(201).json({ message: "Profile created successfully" });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneUser = async (req, res) => {
  try {
    let { id } = req.params;

    let user = await User.findById(id).populate("profile").populate('posts')

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    let { id } = req.params;

    let user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOneUser = async (req, res) => {
  try {
    let { id } = req.params;

    let newData = req.body;

    let user = await User.findByIdAndUpdate(id, newData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let checkEmail = await User.findOne({ email }).select("+password");

    if (!checkEmail) {
      return res.status(404).json({ message: "Invalid email" });
    }

    let checkPassword = await bcrypt.compare(password, checkEmail.password);

    if (!checkPassword)
      return res.status(400).json({ message: "invalid password" });

    let token = jwt.sign(
      { id: checkEmail._id, role: checkEmail.role },
      process.env.SECRETKEY,
      { expiresIn: "1h" },
    );
    
    res.cookie('token',token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        maxAge: 60 * 60 * 1000 // 1 hour
    })

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  login,
  createUserProfile
};
