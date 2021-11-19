import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, TransactionTypeContainer, RadialBox } from "./styles";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const sucessNotify = () =>
    toast.success("Transação cadastrada com Sucesso!", {
      className: "custom-success-toast",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });

  const errorNotify = () =>
    toast.error("Preencha todos os campos!", {
      className: "custom-error-toast",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (!title || !amount || !category) {
      errorNotify();
      return;
    } else {
      await createTransaction({
        title,
        amount,
        category,
        type,
      });

      setTitle("");
      setAmount(0);
      setType("deposit");
      setCategory("");
      onRequestClose();
      sucessNotify();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(parseInt(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadialBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadialBox>
          <RadialBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Entrada</span>
          </RadialBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
