import { withFirebase } from '../firebase';
import { NextApiRequest, NextApiResponse } from 'next';

export default withFirebase(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    // Recupera o texto do Firebase usando a ID
    const snapshot = await req.firebase.database().ref(`text/${id}`).once('value');
    const text = snapshot.val().text;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao recuperar texto' });
  }
});