import nodemailer from "nodemailer";
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD ? "EXISTS ✅" : "MISSING ❌",
);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
transporter.verify((error) => {
  if (error) {
    console.error("EMAIL ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY ✅");
  }
});
export const sendOrderEmail = async (
  customerEmail: string,
  orderId: string,
  totalPrice: number,
) => {
  // =========================
  // Email to Customer
  // =========================

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: "Order Confirmation",
    html: `
      <h2>Order Confirmed ✅</h2>

      <p>Your order has been created successfully.</p>

      <p>
        <strong>Order ID:</strong>
        ${orderId}
      </p>

      <p>
        <strong>Total Price:</strong>
        $${totalPrice}
      </p>

      <p>Thank you for your order!</p>
    `,
  });

  // =========================
  // Email to Admin
  // =========================

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Received",
    html: `
      <h2>New Order Received 🛒</h2>

      <p>
        <strong>Customer:</strong>
        ${customerEmail}
      </p>

      <p>
        <strong>Order ID:</strong>
        ${orderId}
      </p>

      <p>
        <strong>Total Price:</strong>
        $${totalPrice}
      </p>
    `,
  });
};
