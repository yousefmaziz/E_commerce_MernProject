import nodemailer from "nodemailer";

// =========================
// Types
// =========================

interface EmailItem {
  productTitle: string;
  price: number;
  quantity: number;
}

// =========================
// Transporter
// =========================

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

// =========================
// Send Order Email
// =========================

export const sendOrderEmail = async (
  customerEmail: string,
  customerName: string,
  orderId: string,
  address: string,
  items: EmailItem[],
  totalPrice: number,
) => {
  console.log("sendOrderEmail CALLED 📧");
  console.log("CUSTOMER:", customerEmail);
  console.log("ADMIN:", process.env.ADMIN_EMAIL);

  // =========================
  // Items HTML
  // =========================

  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ${item.productTitle}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ${item.quantity}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            $${item.price.toFixed(2)}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            $${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `,
    )
    .join("");

  // =========================
  // Customer Email
  // =========================

  const customerInfo = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Confirmation - ${orderId}`,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 20px;
        "
      >

        <h2>Order Confirmed ✅</h2>

        <p>Hi ${customerName},</p>

        <p>
          Thank you for your order!
          Your order has been created successfully.
        </p>

        <hr />

        <h3>Order Details</h3>

        <p>
          <strong>Order ID:</strong>
          ${orderId}
        </p>

        <p>
          <strong>Delivery Address:</strong>
          ${address}
        </p>

        <table
          style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          "
        >
          <thead>
            <tr>
              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Product
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Quantity
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Price
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="margin-top: 25px;">
          Total: $${totalPrice.toFixed(2)}
        </h3>

        <hr />

        <p>
          Thank you for shopping with us! ❤️
        </p>

      </div>
    `,
  });

  console.log("CUSTOMER EMAIL SENT ✅", customerInfo.messageId);

  // =========================
  // Admin Email
  // =========================

  const adminInfo = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order Received - ${orderId}`,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 20px;
        "
      >

        <h2>New Order Received 🛒</h2>

        <h3>Customer Details</h3>

        <p>
          <strong>Name:</strong>
          ${customerName}
        </p>

        <p>
          <strong>Email:</strong>
          ${customerEmail}
        </p>

        <p>
          <strong>Delivery Address:</strong>
          ${address}
        </p>

        <hr />

        <h3>Order Details</h3>

        <p>
          <strong>Order ID:</strong>
          ${orderId}
        </p>

        <table
          style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          "
        >
          <thead>
            <tr>
              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Product
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Quantity
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Price
              </th>

              <th
                style="
                  text-align: left;
                  padding: 10px;
                  border-bottom: 2px solid #ddd;
                "
              >
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="margin-top: 25px;">
          Total: $${totalPrice.toFixed(2)}
        </h3>

      </div>
    `,
  });

  console.log("ADMIN EMAIL SENT ✅", adminInfo.messageId);
};
