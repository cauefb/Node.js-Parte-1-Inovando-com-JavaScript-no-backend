const LivroDao = require("../infra/livro-dao");

const db = require("../../config/database");
module.exports = (app) => {
  app.get("/", function (req, res) {
    res.send(
      `
            <h1> Casa do Código </h1>
            `
    );
  });

  app.get("/livros", function (req, res) {
    const livroDao = new LivroDao(db);
    livroDao
      .lista()
      .then((livros) =>
        res.marko(require("../views/livros/lista/lista.marko"), {
          livros: livros,
        })
      )
      .catch((error) => console.log(error));
  });

  app.get("/livros/form", function (req, resp) {
    resp.marko(require("../views/livros/form/form.marko"),{livros:{}});
  });

  app.get("/livros/form/:id", function (req, resp) {
    const id = req.params.id;
    const livroDao = new LivroDao(db);
    livroDao
      .buscaPorId(id)
      .then((livro) =>
        resp.marko(require("../views/livros/form/form.marko"), 
        { livro: livro })
      )
      .catch((erro) => console.log(erro));
  });

  app.post("/livros", function (req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao
      .adiciona(req.body)
      .then(resp.redirect("/livros"))
      .catch((error) => console.log(error));
  });
  app.put('/livros', function(req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    
    livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
});

  app.delete("/livros/:id", function (req, resp) {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao
      .remove(id)
      .then(() => resp.status(200).end())
      .catch((erro) => console.log(erro));
  });
};
