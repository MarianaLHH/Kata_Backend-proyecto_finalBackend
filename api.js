import express from "express";
import db from "./database.js";
const PORT = 8001;
const api = express();
api.use(express.json()); //Para recivir un body

api.get("/", (req, res) => {
  res.json({
    msg: "API viva",
  });
});
//--------------------------------------CRUD PROVEEDOR--------------------------------------
//CREAR PROVEEDOR (CREATE)
api.post("/proveedor", async (req, res) => {
  const proveedorData = req.body;
  const newproveedor = await db("proveedor")
    .insert(proveedorData)
    .returning("*");
  res.json({
    proveedor: newproveedor,
  });
});

//Consdultar proveedor(READ)
api.get("/proveedor", async (req, res) => {
  const proveedor = await db.select("*").from("proveedor");

  res.json({
    proveedor,
  });
});

//Consultar proveedor por id(READ)
api.get("/proveedor/:proveedorId", async (req, res) => {
  const id_proveedor = req.params.proveedorId;

  const proveedor = await db.select("*").from("proveedor").where({
    id_proveedor, //id_proveedor=id_proveedor SI SE GUARDO LA COMA
  });
  res.json({ proveedor });
});

// Actualizar un proveedor(UPDATE)
api.put("/proveedor/:proveedorId", async (req, res) => {
  const id_proveedor = req.params.proveedorId;
  const proveedorData = req.body;

  const updated = await db("proveedor")
    .update(proveedorData)
    .where({ prov: id_proveedor })

    .returning("*");

  res.json({
    updated,
  });
});

// Eliminar un proveedor
api.delete("/proveedor/:proveedorId", async (req, res) => {
  const id_proveedor = req.params.proveedorId;

  await db("proveedor").delete().where({
    id_proveedor,
  });
  res.json({
    msg: ` proveedor con id ${id_proveedor} ha sido eliinado`,
  });
});

//--------------------------------------CRUD CATEGORIA--------------------------------------
//CREAR PROVEEDOR (CREATE)
api.post("/categoria", async (req, res) => {
  const categoriaData = req.body;
  const newcategoria = await db("categoria")
    .insert(categoriaData)
    .returning("*");
  res.json({
    categoria: newcategoria,
  });
});

//LEER CATEGORIA (READ)
api.get("/categoria", async (req, res) => {
  const categoria = await db.select("*").from("categoria");

  res.json({
    categoria: categoria,
  });
});

//RUTA PARA CONSULTAR CATEGORIA POR ID
api.get("/categoria/:categoriaId", async (req, res) => {
  const id_categoria = req.params.categoriaId;

  const categoria = await db.select("*").from("categoria").where({
    id_categoria: id_categoria,
  });
  res.json({ categoria });
});

//ACTUALIZAR UNA CATEGORIA
api.put("/categoria/:categoriaId", async (req, res) => {
  const id_categoria = req.params.categoriaId;
  const categoriaData = req.body;

  const updated = await db("categoria")
    .update(categoriaData)
    .where({
      id_categoria,
    })
    .returning("*");
  res.json({
    updated,
  });
});
//ELIMINAR UNA CATEGORIA//----------------------------------------NO ME PERMITE PORQUE TIENE UNA RELACION DONDE PIEZA DEPENDE DE UNA LLAVE FORANEA CATEGORIA
api.delete("/categoria/:categoriaId", async (req, res) => {
  const id_categoria = req.params.categoriaId;

  await db("categoria").delete().where({
    id_categoria,
  });
  res.json({
    msg: `Categoria con id ${id_categoria} ha sido eliminado`,
  });
});

api.listen(PORT, () => {
  console.log(`Api en el puerto ${PORT}`); // `
});

//--------------------------------------------CRUD PIEZA--------------------------------------
//CREAR PIEZA (CREATE)
api.post("/pieza", async (req, res) => {
  const piezaData = req.body;
  const newpieza = await db("pieza").insert(piezaData).returning("*");
  res.json({
    pieza: newpieza,
  });
});

//LEER PIEZA (READ)
api.get("/pieza", async (req, res) => {
  const pieza = await db.select("*").from("pieza");

  res.json({
    pieza: pieza,
  });
});

//RUTA PARA CONSULTAR PIEZA POR ID
api.get("/pieza/:piezaId", async (req, res) => {
  const id_pieza = req.params.piezaId;

  const pieza = await db.select("*").from("pieza").where({
    id_pieza: id_pieza,
  });
  res.json({ pieza });
});

// ELIMINAR UNA PIEZA (DELETE)
api.delete("/pieza/:piezaId", async (req, res) => {
  const id_pieza = req.params.piezaId;

  await db("pieza").delete().where({
    id_pieza,
  });
  res.json({
    msg: `Pieza con id ${id_pieza} ha sido eliminado`,
  });
});

//--------------------CRUD PROVEEDOR_PIEZA---------------------------------------
// CREAR UN PROVEEDOR_PIEZA
api.post("/proveedor_pieza", async (req, res) => {
  const proveedor_piezaData = req.body;
  const newproveedorPieza = await db("proveedor_pieza")
    .insert(proveedor_piezaData)
    .returning("*");
  res.json({
    propieza: newproveedorPieza,
  });
});

// RUTA PARA CONSULTAR UN PROOVEDOR_PIEZA(READ-GET)
api.get("/proveedor_pieza", async (req, res) => {
  const proveedorPieza = await db.select("*").from("proveedor_pieza");

  res.json({
    proveedor_pieza: proveedorPieza,
  });
});

// RUTA PARA CONSULTAR UN PROVEEDOR-PIEZA POR SU ID(READ-GET)
api.get("/proveedor_pieza/:id_propieza", async (req, res) => {
  //Este es el nombre del parámetro que defines en la ruta.
  // Este nombre es muy independiente a los nombres de las siguinetes constantes
  const propie_Id = req.params.id_propieza; //req.params.id_propieza: Este es el acceso correcto al valor del parámetro de la URL.

  const propi = await db.select("*").from("proveedor_pieza").where({
    id_proppieza: propie_Id, //Mandando un objeto en el filtro Where
  });
  res.json({ propi });
});

// RUTA PARA ACTUALIZAR UNA PROVEEDOR-PIEZA POR SU ID( UPDATE-PUT)
api.put("/proveedor_pieza/:id_propieza", async (req, res) => {
  const propie_Id = req.params.id_propieza;
  const proveedor_piezaData = req.body; //Extraer la data
  //Consulta que iteractua con la db
  const updated = await db("proveedor_pieza")
    .update(proveedor_piezaData)
    .where({
      id_proppieza: propie_Id,
    })
    .returning("*");
  res.json({
    updated,
  });
});

// RUTA PARA ELIMINAR UN PROVEEDOR-PIEZA POR SU ID(DELETE)
api.delete("/proveedor_pieza/:id_propieza", async (req, res) => {
  const propie_Id = req.params.id_propieza;
  await db("proveedor_pieza").delete().where({
    id_proppieza: propie_Id,
  });
  res.json({
    msg: ` proveedor con id ${propie_Id} ha sido eliinado`,
  });
});

// RUTA PARA CREAR HISTORIAL PIEZA
api.post("/historial", async (req, res) => {
  const historialData = req.body; //Vienen las propiedades de historial que meteremos en .insert()
  const newHistorial = await db("historial") // newHistorial guardamos lo insertado
    .insert(historialData)
    .returning("*");
  res.json({
    historial: newHistorial,
  });
});

//RUTA PARA CONSULTAR UN HISTORIAL
api.get("/historial", async (req, res) => {
  const historial = await db.select("*").from("historial");
  res.json({
    historial: historial,
  });
});
//RUTA PARA CONSULTAR UN HISTORIAL POR SU ID
api.get("/historial/:id_historial", async (req, res) => {
  const historial_id = req.params.id_historial;
  const hist_id = await db.select("*").from("historial").where({
    id_historial: historial_id,
  });
  res.json({ hist_id });
});
//RUTA PARA ACTUALIZAR UN HISTORIAL
api.put("/historial/:id_historial", async (req, res) => {
  const historial_id = req.params.id_historial;
  const historial_histData = req.body; // req.body Se utiliza para capturar los datos que estás enviando a través del cuerpo de la solicitud, los cuales se utilizarán para actualizar el registro correspondiente en la tabla
  const updated = await db("historial")
    .update(historial_histData)
    .where({
      id_historial: historial_id,
    })
    .returning("*");
  res.json({
    updated,
  });
});
// RUTA PARA ELIMINAR UN HISTORIAL
api.delete("/historial/:id_historial", async (req, res) => {
  const historial_id = req.params.id_historial;
  await db("historial").delete().where({
    id_historial: historial_id, // clave: valor,que lo obtenemos desde la ruta que enviamos
  });
  res.json({
    msg: `historial con id ${historial_id} ha sido eliminado`,
  });
});
