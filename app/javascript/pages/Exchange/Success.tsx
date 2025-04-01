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
    <div className="max-w-md mx-auto mt-12 p-6 bg-white border-4 border-black shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Transaction Successful</h2>
      <div className="text-left space-y-2">
        <p><strong>You send:</strong> {you_send} USDT</p>
        <p><strong>You get:</strong> {you_get} sBTC</p>
        <p><strong>Recipient address:</strong> {recipient_address}</p>
        <p><strong>Network fee:</strong> {network_fee} sBTC</p>
        <p><strong>Exchange fee:</strong> {exchange_fee} USDT</p>
        <p><strong>Txid:</strong> {txid}</p>
      </div>
    </div>
  );
}
