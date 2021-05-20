import Products from "views/admin/Products/index.jsx";
import Wishlist from "views/admin/Wishlist/index.jsx";


var routes = [ 
  {
    path: "/products",
    name: "Produtos",
    icon: "fas fa-box",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/wishlist",
    name: "Favoritos",
    icon: "fas fa-star",
    component: Wishlist,
    layout: "/admin",
  }
];
export default routes;
