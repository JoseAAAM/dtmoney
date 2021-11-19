import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { Container } from "./styles";

import { useTransactions } from "../../hooks/useTransactions";

interface TransactionType {
  createdAt: string;
}

export function TransactionsTable() {
  const { transactions, removeTransaction } = useTransactions();

  function compare(a: TransactionType, b: TransactionType) {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  }

  transactions.sort(compare);

  console.log(transactions);

  const sucessNotify = () =>
    toast.success("Transação removida com sucesso!", {
      className: "custom-success-toast",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });

  function handleRemoveTransaction(createdAt: string) {
    removeTransaction(createdAt);

    sucessNotify();
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === "withdraw"
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                      .format(transaction.amount)
                      .replace("R$", "-R$")
                  : new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR", {}).format(
                  new Date(transaction.createdAt),
                )}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveTransaction(transaction.createdAt)}
                >
                  <FiTrash2 size={22} color="var(--red)" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
