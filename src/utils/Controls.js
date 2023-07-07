let carrito = {
  id: "default",
  img: "deefault",
  des: "default",
  precio: 0.0,
  cantidad: 0,
};
let precioTotal = 0;
let compraImg;
let compraDes;

for (var i = 0; i < document.getElementsByClassName("Product").length; i++) {
  document.getElementsByClassName("Producto")[i].onclick = function() {
    this.dataset.cantidad++;
    anadirCarrito(
      this.dataset.idproducto,
      this.dataset.img,
      this.dataset.des,
      this.dataset.precio,
      this.dataset.cantidad
    );
    precioTotal = precioTotal + carrito.precio;
    //Añadir al <p> con el id precioTotal la cantidad total de dinero
    document.getElementById("precioTotal").innerHTML =
      "Total: B/." + precioTotal.toFixed(2);
    if (this.dataset.cantidad <= 1) {
      //Agregar div con contenido unico de carrito de compras (solo puede existir 1)
      var compra = document.createElement("div");
      compra.setAttribute("id", carrito.id);
      document.getElementById("carritoDeCompras").appendChild(compra);
      agregarElementos(this.dataset.cantidad);
    } else {
      agregarElementos();
    }
  };
}
