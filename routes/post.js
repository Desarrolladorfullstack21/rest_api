const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");

// 1. Crear un post (POST /servicios)
router.post("/", async (req, res) => {
  const post = new Post({
    tittle: req.body.tittle,
    description: req.body.description
  });
  try {
    const savedPost = await post.save(); // Método que guarda en la BD
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Listar todos los posts (GET /servicios) - Útil para ver resultados directo en el navegador
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Mostrar solo un post por su ID (GET /servicios/:postId)
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // Encuentra por ID
    if (!post) return res.status(404).json({ message: "No encontrado" });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Borrar un post por su ID (DELETE /servicios/:postId) -> CORREGIDO
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.postId); // Reemplaza a Post.remove()
    if (!removedPost) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Post eliminado correctamente", data: removedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Actualizar un post (PATCH /servicios/:postId)
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { tittle: req.body.tittle, description: req.body.description } },
      { new: true, runValidators: true }
    );
    if (!updatePost) return res.status(404).json({ message: "No encontrado" });
    res.json(updatePost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;