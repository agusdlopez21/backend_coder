const express = require('express')

const ContainerCarritos = require('../contenedores/ContainerCarritos')

const router = express.Router()

const cartContainer = new ContainerCarritos()

//Endpoints 

router.post('/', async (req, res)=>{
res.json(await cartContainer.newCart())
})

router.delete('/:id', async (req, res)=>{
res.json(await cartContainer.deleteCart(req.params.id))
})


router.get('/:id/products', async (req, res)=>{
res.json(await cartContainer.getById(parseInt(req.params.id)))
})


router.post('/:cartId/:productId/products', async (req, res)=>{
const newProduct = await cartContainer.getById(parseInt(req.params.productId));
res.json(await cartContainer.newProductInCart(newProduct, parseInt(req.params.cartId)))
})


router.delete('/:cartId/products/:productId', async (req, res)=>{
res.json(await cartContainer.deleteObjInCart(parseInt(req.params.cartId), parseInt(req.params.productId)))
})





module.exports = router;
