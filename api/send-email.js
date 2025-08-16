// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método no permitido' 
    });
  }

  console.log('🔧 Debug - nodemailer object:', typeof nodemailer);
  console.log('🔧 Debug - createTransport exists:', typeof nodemailer.createTransport);

  const { nombre, correo, motivo, mensaje } = req.body;

  // Validaciones
  if (!nombre || !correo || !motivo || !mensaje) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son requeridos'
    });
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      success: false,
      message: 'El correo electrónico no es válido'
    });
  }

  try {
    // CORRECCIÓN: usar createTransport en lugar de createTransporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.maileroo.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // true para puerto 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER || 'clients@interstellawebs.com',
        pass: process.env.SMTP_PASS || '94fffab9fd9a347c564a67df'
      },
      tls: {
        rejectUnauthorized: false
      },
      // Timeouts optimizados para Vercel
      connectionTimeout: 30000, // 30 segundos
      greetingTimeout: 30000,   // 30 segundos
      socketTimeout: 30000      // 30 segundos
    });

    console.log('✅ Transporter creado exitosamente');

    // Verificar conexión (opcional)
    try {
      await transporter.verify();
      console.log('✅ Conexión SMTP verificada');
    } catch (verifyError) {
      console.log('⚠️ Advertencia: No se pudo verificar la conexión SMTP:', verifyError.message);
      // Continuar de todas formas
    }

    // Configuración del email
    const mailOptions = {
      from: {
        name: 'InterstellaWebs Contact Form',
        address: process.env.FROM_EMAIL || 'clients@interstellawebs.com'
      },
      to: [
        process.env.TO_EMAIL_1 || 'sakman37xd@gmail.com',
        process.env.TO_EMAIL_2 || 'luisgcsma@gmail.com'
      ],
      replyTo: correo,
      subject: `🚀 Nuevo contacto: ${motivo}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo contacto - InterstellaWebs</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">
                🚀 InterstellaWebs
              </h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                Nuevo mensaje desde el formulario de contacto
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 25px; font-size: 24px; font-weight: 600; text-align: center;">
                📬 Detalles del Contacto
              </h2>
              
              <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #ff6b35;">
                <div style="margin-bottom: 20px;">
                  <strong style="color: #4a5568; font-size: 14px;">NOMBRE:</strong><br>
                  <span style="color: #2d3748; font-weight: 600; font-size: 16px;">${nombre}</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #4a5568; font-size: 14px;">EMAIL:</strong><br>
                  <a href="mailto:${correo}" style="color: #2d3748; font-weight: 600; font-size: 16px; text-decoration: none;">${correo}</a>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #4a5568; font-size: 14px;">MOTIVO:</strong><br>
                  <span style="color: #2d3748; font-weight: 600; font-size: 16px;">${motivo}</span>
                </div>
              </div>

              <h3 style="color: #333; margin: 0 0 15px; font-size: 20px; font-weight: 600;">
                💬 Mensaje:
              </h3>
              <div style="background: #f7fafc; padding: 25px; border: 2px solid #e2e8f0; border-radius: 12px; border-left: 5px solid #48bb78;">
                <p style="line-height: 1.8; color: #2d3748; margin: 0; font-size: 16px; white-space: pre-wrap;">${mensaje}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f7fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                📧 Mensaje enviado desde <strong>InterstellaWebs.com</strong>
              </p>
              <p style="color: #a0aec0; margin: 8px 0 0; font-size: 12px;">
                Fecha: ${new Date().toLocaleString('es-ES', { 
                  timeZone: 'America/Bogota',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} (COT)
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Nuevo contacto desde InterstellaWebs
        
        Nombre: ${nombre}
        Email: ${correo}
        Motivo: ${motivo}
        
        Mensaje:
        ${mensaje}
        
        ---
        Este mensaje fue enviado desde InterstellaWebs.com
        Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' })}
      `
    };

    console.log('📧 Intentando enviar email...');

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado exitosamente:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });

    res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error detallado al enviar email:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Manejo específico de errores
    let errorMessage = 'Error interno del servidor';
    let statusCode = 500;
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticación SMTP. Verifica las credenciales.';
      statusCode = 401;
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Error de conexión con el servidor SMTP.';
      statusCode = 503;
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'Error en el formato del mensaje.';
      statusCode = 400;
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Timeout al conectar con el servidor de email.';
      statusCode = 504;
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'No se pudo encontrar el servidor SMTP.';
      statusCode = 503;
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      errorCode: error.code,
      timestamp: new Date().toISOString(),
      // Solo incluir detalles en desarrollo
      ...(process.env.NODE_ENV === 'development' && { 
        error: error.message,
        stack: error.stack
      })
    });
  }
}