const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('esta listo en http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/preindex', (req, res) => {
  console.log('servidor super ready');
  res.send('ready ready');
});

app.get('/index', (req, res) => {
  res.send('pagina principal magica');
});

app.get('/services', (req, res) => {
  res.send('servicios misticos');
});

app.get('/contact', (req, res) => {
  res.send('no nos contacte');
});

app.get('/staff', (req, res) => {
  res.send('la gente que trabaja aca');
});

//ruta producto

app.get('/products', (req, res) => {
  const productlist = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
res.json(productlist);
});

app.post('/products', (req, res) => {
  const producto = req.body; // extraigo el producto que me envia el usuario en JSON y lo trasnformo  hs
  const productlistJSON = fs.readFileSync('products.json', 'utf-8'); // leo el archivo products.jason y lo guardo en la variante
  const productlist = JSON.parse(productlistJSON); // transformo la lista de productos en un objeto de JS
  productlist.push(producto); // agrego el producto que me envio el usuario a la lista de productos
  fs.writeFileSync('products.json', JSON.stringify(productlist, null, 2)); // sobreescribo el archivo products.json con la nueva lista de productos
  res.send('producto recibido consolea');
});

app.put('/products/:id',(req, res) => {
  const modificacion = req.body;
  const {id }= req.params;

  console.log(modificacion,id);

  const productlistJSON = fs.readFileSync('products.json', 'utf-8')
  const productlist = JSON.parse(productlistJSON)
  const posicionproductomodificado = productlist.findIndex((p) => p.id == id)
  productlist[posicionproductomodificado] = modificacion
  fs.writeFileSync('products.json', JSON.stringify(productlist, null, 2))
  res.send ('producto modificado')
});

app.delete('/products', (req, res) => {
    const {id} = req.query
    console.log(id)

    const productlistJSON = fs.readFileSync('products.json', 'utf-8')
    const productlist = JSON.parse(productlistJSON)
    const listaactualizada = productlist.filter((p) => p.id != id)
    fs.writeFileSync('products.json', JSON.stringify(listaactualizada, null, 2))
    console.log(listaactualizada)
  res.send('producto eliminado');
});

