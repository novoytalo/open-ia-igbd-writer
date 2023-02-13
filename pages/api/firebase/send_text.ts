import { withFirebase } from './get_text';
import { NextApiRequest, NextApiResponse } from 'next';

export default withFirebase(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { text, id } = req.body;
    // Adiciona o texto e o id ao Firebase
    await req.firebase.database().ref(`text/${id}`).set({ text });
    res.status(200).json({ message: 'Texto enviado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar texto' });
  }
});