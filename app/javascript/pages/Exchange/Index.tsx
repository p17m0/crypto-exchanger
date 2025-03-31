import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
  exchange_rate: number;
  max_usdt: number;
  errors: Record<string, string>;
}

export default function ExchangeIndex({ exchange_rate, max_usdt, errors }: Props) {
  const { data, setData, post, processing } = useForm({
    amount_usdt: '',
    recipient_address: '',
    email: '',
    kyc_accepted: false,
  });

  const [amountSbtc, setAmountSbtc] = useState(0);

  useEffect(() => {
    const usdt = parseFloat(data.amount_usdt) || 0;
    const sbtc = (usdt * (1 - 0.03) * exchange_rate) - 0.000006;
    setAmountSbtc(sbtc > 0 ? sbtc.toFixed(8) : 0);
  }, [data.amount_usdt, exchange_rate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/exchanges');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>You send (USDT)</label>
          <input
            type="number"
            className="form-control"
            value={data.amount_usdt}
            onChange={(e) => setData('amount_usdt', e.target.value)}
            max={max_usdt}
          />
          {errors.amount_usdt && <div className="text-danger">{errors.amount_usdt}</div>}
        </div>
        <div className="mb-3">
          <label>You get (sBTC)</label>
          <input type="number" className="form-control" value={amountSbtc} readOnly />
        </div>
        <div className="mb-3">
          <label>Recipient address</label>
          <input
            type="text"
            className="form-control"
            value={data.recipient_address}
            onChange={(e) => setData('recipient_address', e.target.value)}
          />
          {errors.recipient_address && <div className="text-danger">{errors.recipient_address}</div>}
        </div>
        <div className="mb-3">
          <label>E-mail address</label>
          <input
            type="email"
            className="form-control"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={data.kyc_accepted}
            onChange={(e) => setData('kyc_accepted', e.target.checked)}
          />
          <label className="form-check-label">I agree with KYC/AML terms</label>
          {errors.kyc_accepted && <div className="text-danger">{errors.kyc_accepted}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={processing}>
          Exchange now
        </button>
      </form>
    </div>
  );
}
