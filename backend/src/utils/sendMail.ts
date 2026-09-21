import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderEmail = async (
  email: string,
  orderId: string,
  totalPrice: number,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Order Confirmation",
    html: `
      <h2>Order Confirmed ✅</h2>
      <p>Your order has been created successfully.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total:</strong> $${totalPrice}</p>
    `,
  });
};
