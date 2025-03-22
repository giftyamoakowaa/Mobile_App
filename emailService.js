import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password"
  }
});

// Function to send email to all users
export const sendEmailNotification = async (title) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "allusers@example.com", // You need to store user emails in the database
    subject: "New Story Alert!",
    text: `Check out the latest story: ${title}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
