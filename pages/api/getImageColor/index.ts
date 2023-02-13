import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from 'canvas';
import { auth } from "../../../services/firebase-admin";
import { async } from "@firebase/util";
export default async function index(req:NextApiRequest,res:NextApiResponse) {
    
    try {
        const linkImage = req.body
        console.log('get image req.body',req.body)
        const tokenId= req.headers.authorization;
        if(!tokenId){
            return res.status(401).end("Not a valid user");
    
        }
        const decodedToken= (await 
            //    admin
                // .
                auth
                .verifyIdToken(tokenId)
                .then((decodedToken) => {
                    console.log('api user data decoded',decodedToken)
                    const uid = decodedToken.uid;
                    return uid
                   
                    // ...
                })
                .catch((error) => {
                    // Handle error
                    res.status(401).end("Not a valid token");
                }));
        // });


        if (req.method === "POST" && decodedToken) {
        
        const getColor = (url: string): Promise<string> => {
            return new Promise((resolve, reject) => {
              loadImage(url).then((img) => {
                const canvas = createCanvas(img.width, img.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(0, 0, img.width, img.height).data;
                const colors: { [key: string]: number } = {};
                for (let i = 0; i < data.length; i += 4) {
                  const rgb = `rgb(${data[i]}, ${data[i+1]}, ${data[i+2]})`;
                  if (rgb in colors) {
                    colors[rgb]++;
                  } else {
                    colors[rgb] = 1;
                  }
                }
                const dominantColor = Object.keys(colors).reduce((a, b) => colors[a] > colors[b] ? a : b);
                resolve(dominantColor);
              }).catch((err) => {
                reject('Error loading image');
              });
            });
          };
          
          // Exemplo de uso:
          getColor('https://upload.wikimedia.org/wikipedia/commons/5/5e/Steven_Pruitt_-_Depths_of_Wikipedia_DC_-_2022-05-27_%28cropped%29.jpg')
            .then((color) => {
              console.log(color);
              return res.status(200).json(color);
            })
            .catch((error) => {
              console.error(error);
              res.status(401).end("Erro on getcolor Predomant");
            });
        }

    } catch (error) {
        res.status(400).json({
            error: `Erro call recived, but no method found!`,
        });
    }

   
      
  
}
