import React, { useState, useEffect } from 'react';
import NumberFormat from "react-number-format";
import { useHistory, Link, } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import Loading from 'components/Loading';
import api from 'config/api';

import "./styles.scss";
import "../../styles.scss";
import validatePassword from '../../../common/validation/validatePassword';
import maskPhone from "common/mask/maskPhone";
import validationEmail from "common/validation/validationEmail";
import errorRequest from "common/errorRequest";

export default function Login() {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [strong, setStrong] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cellphone, setCellphone] = useState("");
  const [cpf, setCpf] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  


  useEffect(() => {
    if(password){
      const { strong, error } = validatePassword(password);
      setStrong(strong);
      setError(error ? error : "");
    }
  }, [password]);

  async function saveUser(e) {
    e.preventDefault();

    if (!nome || !email || !password || !confirmPassword || !cellphone || !estado || !logradouro || !cpf || !cidade || !bairro || !numero) {
      setError("Preencha todos os campos e tente novamente!");
      return;
    }

    if(validationEmail(email)){
      setError('Formato de email inválido');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    Swal.fire({
      title: "Atenção",
      text: "Deseja Realmente salvar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim!",
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        try {
          await api.post('clientes', {
            nome,
            email,
            bairro,
            complemento,
            cep,            
            telefone: cellphone.replace(/\D/g, ""),
            cpf,
            cidade,
            estado,
            logradouro,
            numero,       
          });
          Swal.fire(
            'Cadastro realizado com sucesso!',
            'Agora acesse seu e-mail para confirmá-lo',
            'success'
          ).then(() => {
            history.push('/');
          });
        } catch (error) {
          console.log(error);
          errorRequest(history, error)
        }
        setLoading(false);
      }
    });
  }

  return (
    <div className="register-container">
      {loading && <Loading />}
      <Col lg="5" md="7">
        <Card className="card-logo bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <h1>Cadastre-se aqui</h1>
          </CardHeader>
          <Link className="mt-2 ml-2" to="/"><i className="fa fa-arrow-left" /> Voltar</Link>
          <CardBody className="px-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="far fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="far fa-envelope" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-file" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-map-marker-alt" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-laptop-house" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Logradouro"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-laptop-house" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-laptop-house" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-laptop-house" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-map-marker-alt" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-city" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="form-input"
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              



              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-phone" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <NumberFormat
                    className="form-input"
                    type="text"
                    id="inputTel"
                    placeholder="Telefone"
                    format={maskPhone}
                    customInput={Input}
                    value={cellphone}
                    onChange={(e) => setCellphone(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    type="password"
                    maxLength="24"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar Senha"
                    type="password"
                    maxLength="24"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  segurança da senha:{' '}
                  {!strong ? (
                    <span className="text-danger font-weight-700">fraca</span>
                  ) : (
                      <span className="text-success font-weight-700">forte</span>
                    )}
                </small>
                <p className="text-danger">
                  <small>{error}</small>
                </p>
              </div>
              <div className="text-center">
                <Button
                  onClick={(e) => saveUser(e)}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Salvar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
