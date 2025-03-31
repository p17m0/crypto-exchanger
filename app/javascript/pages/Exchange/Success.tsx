interface Props {
    you_send: number;
    you_get: number;
    recipient_address: string;
    network_fee: number;
    exchange_fee: number;
    txid: string;
  }

  export default function ExchangeSuccess({ you_send, you_get, recipient_address, network_fee, exchange_fee, txid }: Props) {
    return (
      <div className="container mt-5">
        <h2>Transaction Successful</h2>
        <div className="card">
          <div className="card-body">
            <p>You send: {you_send} USDT</p>
            <p>You get: {you_get} sBTC</p>
            <p>Recipient address: {recipient_address}</p>
            <p>Network fee: {network_fee} sBTC</p>
            <p>Exchange fee: {exchange_fee} USDT</p>
            <p>Txid: {txid}</p>
          </div>
        </div>
      </div>
    );
  }
