import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2';
import formatCurrency from "common/mask/maskCurrency";

import "./styles.scss";
import {
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";

import api from "config/api";
import Page from "components/Page";
import errorRequest from "common/errorRequest";

function Products() {
  const history = useHistory();
  const idCliente = localStorage.getItem("idCliente");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await api.get(`/produtos`);
      setProducts(data);
    } catch (error) {
      errorRequest(history, error);
    }
    setLoading(false);
  }

  async function addWishlist(idProduct){
    setLoading(true);
    try {
      await api.post(`/wishlist`, {
        id_cliente: idCliente,
        id_produto: idProduct
      });
      Swal.fire('Sucesso!', 'O produto foi adicionado na sua lista de favoritos!', 'success');
    } catch (error) {
      Swal.fire('Alerta!', 'Produto já está na wishlist do cliente!', 'error');
    }
    setLoading(false);
  }

  return (
    <Page loading={loading}>
      <>
        <Row>
          <Col>
            <Table className="d-none d-md-table" responsive striped>
              <thead>
                <tr>
                  <th className="TableTh">Imagem</th>
                  <th className="TableTh">Nome</th>
                  <th className="TableTh">Preço</th>
                  <th className="TableTh">Quantidade</th>
                  <th className="TableTh">Favorito</th>
                </tr>
              </thead>
              <tbody>
                {
                  products && products.length === 0 ?
                    <tr>
                      <td className="text-center" colSpan="5">Nenhum registro foi encontrado...</td>
                    </tr> :
                    products.map((product) => (
                      <tr key={product.codigo}>
                        <td className="TableTd table-adm-td">
                          <div className="table-image-product">
                            {
                              <img 
                                className="list-image-contact" 
                                src="https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg" 
                                alt="avatar">
                              </img>
                            }
                          </div>
                        </td>
                        <td className="TableTd">{product.nome}</td>
                        <td className="TableTd">{formatCurrency(product.valorUnitario)}</td>
                        <td className="TableTd">{product.quantidadeEstoque}</td>


                        <td className="TableTd">
                          <Button
                            className="table-action-button-danger"
                            onClick={() => addWishlist(product.codigo)}
                          >
                            <i className="fa fa-heart" />
                          </Button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </Table>
            <ul style={{ listStyle: "none" }} className="d-md-none pl-0 mt-3" >
              {
                products && products.length === 0 ?
                  <li className="mt-3 text-center">Nenhum registro foi encontrado...</li> :
                  products.map((product) => (
                    <li key={product.codigo}>
                      <Row className="d-flex justify-content-between">
                        <Col xs="8" className="d-flex p-0">
                          <div className="list-image-contact mt-1">
                            {
                              <img 
                                className="list-image-contact" 
                                src={product.nomeArquivo ? product.urlImagem : "https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg"} 
                                alt="avatar">
                              </img>
                            }
                          </div>
                          <div className="pl-1">
                            <strong>Nome:</strong><br />
                            <small>{product.nome}</small><br />
                            <small>{formatCurrency(product.valorUnitario)}</small><br />
                            <small>{product.quantidadeEstoque}</small>
                          </div>
                        </Col>
                        <Col xs="4" className="buttons-content p-0">
                          <Button
                            className="table-action-button-danger"
                            onClick={() => addWishlist(product.codigo)}
                          >
                            <i className="fa fa-heart" />
                          </Button>
                        </Col>
                      </Row>
                      <hr></hr>
                    </li>
                  ))
              }
            </ul>
          </Col>
        </Row>
      </>
    </Page>
  );
}

export default Products;
