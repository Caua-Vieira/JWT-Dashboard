const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function enviarEmail(req, res) {
    try {

        const email = req.body

        const emailOptions = {
            from: `JWT Dashboard <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Confirmação de alteração de senha',
            text: 'Clique no link abaixo para confirmar alteração de senha: \n\nhttps://localhost:8000/alterar/senha '
        }

        transport.sendMail(emailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao tentar enviar e-mail"
                })
            } else {
                return res.status(200).send({
                    message: "E-mail de confirmação enviado com sucesso"
                })
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar enviar e-mail de confirmação"
        })
    }
}
