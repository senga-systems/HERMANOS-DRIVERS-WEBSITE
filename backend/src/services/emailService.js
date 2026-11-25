import nodemailer from 'nodemailer';

const DEFAULT_QUOTE_RECIPIENT = 'hermanosgroup265@gmail.com';

const SERVICE_LABELS = {
  VEHICLE_DELIVERY: 'Vehicle Delivery (Cross-Border / Intercity)',
  LONG_DISTANCE: 'Long-Distance Trips (Inter-city / Regional)',
  PRIVATE_DRIVING: 'Personal & Private Driving (Business & Daily)',
  VEHICLE_COLLECTION: 'Vehicle Collection & Doorstep Handover',
};

const escapeHtml = (value) => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const isPlaceholderValue = (val = '') =>
  !val ||
  val.includes('your_') ||
  val.includes('replace_') ||
  val === 'changeme';

const isSmtpConfigured = () => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  return Boolean(user && pass && !isPlaceholderValue(user) && !isPlaceholderValue(pass));
};

const createTransporter = () => {
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS.trim(),
    },
  });
};

/**
 * Sends a quote/booking notification email to Hermanos Drivers (hermanosgroup265@gmail.com)
 * and, when the customer supplied an email address, sends them an automatic confirmation.
 */
export const sendQuoteRequestEmail = async (quoteDetails) => {
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL?.trim() || DEFAULT_QUOTE_RECIPIENT;

  if (!isSmtpConfigured()) {
    console.warn(
      `[EMAIL SERVICE] SMTP credentials are not configured. Quote request for ${quoteDetails.customerName} was saved to the database without sending an email to ${recipient}.`
    );
    return {
      sent: false,
      configured: false,
      recipient,
      customerConfirmationSent: false,
      reason: 'SMTP email credentials are not configured on the server.',
    };
  }

  const {
    id,
    customerName,
    customerEmail,
    phoneNumber,
    serviceType,
    pickupLocation,
    dropoffLocation,
    vehicleType,
    travelDate,
    tripNotes,
    notes,
    createdAt,
  } = quoteDetails;

  const serviceLabel = SERVICE_LABELS[serviceType] || serviceType;
  const submittedAt = createdAt ? new Date(createdAt).toUTCString() : new Date().toUTCString();
  const detailsText = tripNotes || notes || 'None provided';
  const fromAddress =
    process.env.SMTP_FROM?.trim() || `"Hermanos Drivers Quotes" <${process.env.SMTP_USER.trim()}>`;

  const transporter = createTransporter();

  const textBody = [
    'NEW QUOTE / DRIVER BOOKING REQUEST — HERMANOS DRIVERS',
    '====================================================',
    `Reference ID: ${id || 'N/A'}`,
    `Submitted At: ${submittedAt}`,
    '',
    `Customer Name:   ${customerName}`,
    `Customer Email:  ${customerEmail || 'Not provided'}`,
    `Phone / WhatsApp:${phoneNumber}`,
    `Service:         ${serviceLabel}`,
    `Pickup Point:    ${pickupLocation || 'Not specified'}`,
    `Drop-Off Point:  ${dropoffLocation || 'Not specified'}`,
    `Vehicle Category:${vehicleType || 'Not specified'}`,
    `Preferred Date:  ${travelDate || 'Not specified'}`,
    `Special Details: ${detailsText}`,
    '',
    customerEmail
      ? `Reply directly to this email to send the quotation to ${customerEmail}.`
      : `Customer did not provide an email address; contact via Phone/WhatsApp at ${phoneNumber}.`,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; background-color: #f4f5f8; padding: 24px; color: #070c32;">
      <div style="background-color: #070c32; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0; border-bottom: 4px solid #f19e02;">
        <p style="margin: 0 0 6px; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: #f19e02;">
          Hermanos Drivers Dispatch
        </p>
        <h1 style="margin: 0; font-size: 22px; font-weight: 800;">
          New Quote &amp; Booking Request
        </h1>
      </div>

      <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 16px; font-size: 14px; color: #374151;">
          A customer has submitted a quote request on the Hermanos Drivers website.
          ${customerEmail ? `You can reply directly to this email to send the quotation to <strong>${escapeHtml(customerEmail)}</strong>.` : ''}
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 38%;">Reference ID</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-family: monospace;">${escapeHtml(id || 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Customer Name</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${escapeHtml(customerName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Reply Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
              ${
                customerEmail
                  ? `<a href="mailto:${escapeHtml(customerEmail)}" style="color: #070c32; font-weight: bold;">${escapeHtml(customerEmail)}</a>`
                  : '<span style="color: #9ca3af;">Not provided</span>'
              }
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Phone / WhatsApp</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${escapeHtml(phoneNumber)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Service Required</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #b45309; font-weight: bold;">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Pickup Point</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(pickupLocation || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Drop-Off Destination</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(dropoffLocation || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Vehicle Category</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(vehicleType || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Preferred Date</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(travelDate || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #4b5563; vertical-align: top;">Trip Details / Notes</td>
            <td style="padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(detailsText)}</td>
          </tr>
        </table>

        <p style="margin: 20px 0 0; font-size: 12px; color: #6b7280;">
          Submitted on ${escapeHtml(submittedAt)}
        </p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      ...(customerEmail ? { replyTo: customerEmail } : {}),
      subject: `[Quote Request] ${serviceLabel} — ${customerName}`,
      text: textBody,
      html: htmlBody,
    });

    let customerConfirmationSent = false;
    if (customerEmail) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: customerEmail,
          replyTo: recipient,
          subject: 'We Received Your Quote Request — Hermanos Drivers',
          text: [
            `Hello ${customerName},`,
            '',
            'Thank you for requesting a quote from Hermanos Drivers ("Your Journey, Our Responsibility!").',
            'Our dispatch team has received your trip details and will reply to this email or reach out via phone/WhatsApp with your quotation shortly.',
            '',
            `Reference ID: ${id || 'N/A'}`,
            `Service: ${serviceLabel}`,
            `Route: ${pickupLocation || 'Not specified'} -> ${dropoffLocation || 'Not specified'}`,
            `Vehicle Category: ${vehicleType || 'Not specified'}`,
            `Preferred Date: ${travelDate || 'Not specified'}`,
            '',
            'Need urgent assistance? Call or WhatsApp +265 997 096 922 or email hermanosgroup265@gmail.com.',
          ].join('\n'),
          html: `
            <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f5f8; padding: 24px; color: #070c32;">
              <div style="background-color: #070c32; color: #ffffff; padding: 24px; border-radius: 12px 12px 0 0; border-bottom: 4px solid #f19e02;">
                <h1 style="margin: 0; font-size: 20px;">Quote Request Received</h1>
                <p style="margin: 6px 0 0; font-size: 13px; color: #f19e02;">Hermanos Drivers — Your Journey, Our Responsibility!</p>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; font-size: 14px; line-height: 1.6;">
                <p>Hello <strong>${escapeHtml(customerName)}</strong>,</p>
                <p>Thank you for contacting Hermanos Drivers. Our dispatch operations team has received your quote request and will send your quotation directly to this email address shortly.</p>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin: 16px 0;">
                  <p style="margin: 4px 0;"><strong>Reference ID:</strong> ${escapeHtml(id || 'N/A')}</p>
                  <p style="margin: 4px 0;"><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
                  <p style="margin: 4px 0;"><strong>Route:</strong> ${escapeHtml(pickupLocation || 'Not specified')} &rarr; ${escapeHtml(dropoffLocation || 'Not specified')}</p>
                  <p style="margin: 4px 0;"><strong>Vehicle:</strong> ${escapeHtml(vehicleType || 'Not specified')}</p>
                  <p style="margin: 4px 0;"><strong>Preferred Date:</strong> ${escapeHtml(travelDate || 'Not specified')}</p>
                </div>
                <p style="font-size: 13px; color: #4b5563;">Need urgent dispatch? Call or WhatsApp <strong>+265 997 096 922</strong> or reply to this email (${escapeHtml(recipient)}).</p>
              </div>
            </div>
          `,
        });
        customerConfirmationSent = true;
      } catch (confirmErr) {
        console.error('[EMAIL SERVICE] Failed to send customer confirmation email:', confirmErr.message);
      }
    }

    return {
      sent: true,
      configured: true,
      recipient,
      customerConfirmationSent,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('[EMAIL SERVICE] Failed to send quote email:', error);
    return {
      sent: false,
      configured: true,
      recipient,
      customerConfirmationSent: false,
      reason: error.message || 'Failed to send email notification.',
    };
  }
};
