import { Router } from 'express';
import { dbM as dbInstance } from './api/product.routes.js';
import { dbM as dbCart } from './api/carts.routes.js';

// Importar todos los routers;
export const router = Router();

router.get("/products", async (req, res) => {

    

    try {
        const { limit, page, sort } = req.query
        let on = await dbInstance.getProducts(limit, page, sort)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos)
        res.render("products", {
            email: req.session.email,
            adminRole: req.session.adminRole,
            hasNextPage: productos.hasNextPage,
            hasPrevPage: productos.hasPrevPage,
            nextLink: productos.nextLink ? `http://localhost:8080/products?page=${productos.page + 1}&limit=${limit?limit:10}` : null,
            prevLink: productos.prevLink ? `http://localhost:8080/products?page=${productos.page - 1}&limit=${limit?limit:10}` : null,
            productos: productos.payload,
            
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})

router.get("/products/:pid", async (req, res) => {

    try {
        const { pid } = req.params
        let on = await dbInstance.getProductById(pid)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos)
        res.render("detail", {
            producto: productos
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})

router.get("/carts/:cid", async (req, res) => {

    try {
        const { cid } = req.params
        let on = await dbCart.getCartById(cid)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos.products)
        res.render("carts", {
            productos: productos.products
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})

router.get("/login", async (req, res) => {

    if(req.session.email) return res.redirect("/products")
    try {

        res.render("login")
    } catch (e) {
        res.send(500).json({ error: e })
    }
})

router.get("/register", async (req, res) => {
    if(req.session.email) return res.redirect("/products")

    try {

        res.render("register")
    } catch (e) {
        res.send(500).json({ error: e })
    }
})


/** esto funciona */
router.get("/profile", async (req, res) => { 
    if (!req.session.email) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        email: req.session.email,
        adminRole: req.session.adminRole,
        age: req.session.age

    });
})