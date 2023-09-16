import dotenv from 'dotenv';
import { Request, Response } from 'express';
import MailServer from '../utils/mailHandler';

dotenv.config();

const SendMail = async (request: Request, response: Response) => {
  try {
    const {
      name, email, message, value,
    } = request.body;

    await MailServer({
      destinationUser: process.env.EMAIL,
      subjectText: 'Nodemailer funcionando',
      htmlOption: `<p>
        Um usuário entrou em contato. Esse usuário tem o nome ${name} e apresenta o email ${email} e informou o valor ${value}. Esse usuário deixou a seguinte mensagem: ${message}
      </p>`,
    });

    return response.status(200).send({
      answer: 'Enviado.',
    });
  } catch (error) {
    return response.status(500).send({
      answer: 'Algo deu errado.',
    });
  }
};

export default SendMail;
