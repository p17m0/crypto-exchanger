import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
  exchange_rate: number;
  max_usdt: number;
  errors: Record<string, string>;
}

export default function ExchangeIndex({ exchange_rate, max_usdt, errors }: Props) {
  const { data, setData, post, processing } = useForm({
    exchange: {
      amount_usdt: '',
      recipient_address: '',
      email: '',
      kyc_accepted: false,
    },
  });

  const [amountSbtc, setAmountSbtc] = useState(0);

  useEffect(() => {
    const usdt = parseFloat(data.exchange.amount_usdt) || 0;
    const sbtc = (usdt * (1 - 0.03) * exchange_rate) - 0.000006;
    setAmountSbtc(sbtc > 0 ? sbtc.toFixed(8) : 0);
  }, [data.exchange.amount_usdt, exchange_rate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/exchanges');
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white border-4 border-black shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative bg-black text-white text-center py-3 font-bold text-lg uppercase rotate-12 -top-5 -right-10 w-80">Crypto Exchanger</div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xl font-bold border-b-2 border-black mb-2">You send (USDT)</label>
          <input
            type="number"
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={data.exchange.amount_usdt}
            onChange={(e) => setData('exchange', { ...data.exchange, amount_usdt: e.target.value })}
            max={max_usdt}
          />
          {errors.amount_usdt && <div className="text-red-500 text-sm mt-1">{errors.amount_usdt}</div>}
        </div>
        <div>
          <label className="block text-xl font-bold border-b-2 border-black mb-2">You get (sBTC)</label>
          <input type="number" className="w-full p-3 border-2 border-black bg-gray-100" value={amountSbtc} readOnly />
        </div>
        <div>
          <label className="block text-xl font-bold border-b-2 border-black mb-2">Recipient address</label>
          <input
            type="text"
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={data.exchange.recipient_address}
            onChange={(e) => setData('exchange', { ...data.exchange, recipient_address: e.target.value })}
          />
          {errors.recipient_address && <div className="text-red-500 text-sm mt-1">{errors.recipient_address}</div>}
        </div>
        <div>
          <label className="block text-xl font-bold border-b-2 border-black mb-2">E-mail address</label>
          <input
            type="email"
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={data.exchange.email}
            onChange={(e) => setData('exchange', { ...data.exchange, email: e.target.value })}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={data.exchange.kyc_accepted}
            onChange={(e) => setData('exchange', { ...data.exchange, kyc_accepted: e.target.checked })}
          />
          <label className="text-lg">I agree with KYC/AML terms</label>
        </div>
        {errors.kyc_accepted && <div className="text-red-500 text-sm">{errors.kyc_accepted}</div>}
        <button
          type="submit"
          className="bg-black text-white py-3 text-lg font-bold uppercase border-2 border-black transition-transform duration-300 hover:bg-white hover:text-black hover:translate-y-[-2px]"
          disabled={processing}
        >
          Exchange Now
        </button>
      </form>
    </div>
  );
}
