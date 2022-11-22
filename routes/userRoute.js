const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const authMiddleware = require("./../middleware/authMiddleware");
const Doctor = require("../models/doctorModel");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).send({ message: "User already Exist", success: false });
    }

    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res
      .status(200)
      .send({ message: "User Created Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error Creating User!!", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is Incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "Login successful",
        success: true,
        data: token,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          seenNotification: user.seenNotification,
          isDoctor: user.isDoctor,
          unseenNotification: user.unseenNotification,
        },
        success: true,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Getting user info", success: false });
  }
});

router.post("/apply-doctor-account", async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotification = await adminUser.unseenNotification;
    unseenNotification.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotification });
    return res
      .status(200)
      .send({ message: "Doctor Account Applied Successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Applying doctor Account !!", success: false });
  }
});
module.exports = router;
